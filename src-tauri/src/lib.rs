// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use sysinfo::{System, Disks};
use std::{thread, time::Duration};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_memory_info() -> (u64, u64) {
    let mut sys: System = System::new_all();
    sys.refresh_all();

    let total_ram: u64 = sys.total_memory();
    let used_ram: u64 = sys.used_memory();

    return (total_ram, used_ram)
}

#[tauri::command]
fn get_cpu_info() -> (usize, f32, Vec<f32>) {
    let mut sys: System = System::new_all();

    sys.refresh_all();
    thread::sleep(Duration::from_millis(200));
    sys.refresh_all();

    let core_count: usize = sys.cpus().len();
    let global_usage: f32 = sys.global_cpu_usage();

    let each_core_usage: Vec<f32> = sys
        .cpus()
        .iter()
        .map(|cpu: &sysinfo::Cpu| cpu.cpu_usage())
        .collect();

    (core_count, global_usage, each_core_usage)
}

#[tauri::command]
fn get_disk_info() -> (u64, u64, f32) {
    let mut sys: System = System::new_all();
    sys.refresh_all();

    let mut total_sum: u64 = 0;
    let mut used_sum: u64 = 0;
    let disks: Disks = Disks::new_with_refreshed_list();
    for disk in &disks {
        let total: u64 = disk.total_space();
        let available: u64 = disk.available_space();

        total_sum += total;
        used_sum += total - available;
    }

    let percent: f32 = if total_sum > 0 {
        (used_sum as f32 / total_sum as f32) * 100.0
    } else {
        0.0
    };

    (used_sum, total_sum, percent)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_memory_info, get_cpu_info, get_disk_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
