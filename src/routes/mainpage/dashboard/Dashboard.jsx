import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router';
import { invoke } from '@tauri-apps/api/core';

function Dashboard() {
    const [core_count, set_core_count] = useState(0);
    const [global_usage, set_global_usage] = useState(0);
    const [cores, set_cores] = useState([]);

    const [total_memory, set_total_memory] = useState(0);
    const [used_memory, set_used_memory] = useState(0);

    const [total_disk, set_total_disk] = useState(0);
    const [used_disk, set_used_disk] = useState(0);
    const [disk_percent, set_disk_percent] = useState(0);


    const [show_cores, set_show_cores] = useState(false);
    const load_memory_info = async () => {
        const memory_info = await invoke("get_memory_info");
        const [total, used] = memory_info;
        set_total_memory(total);
        set_used_memory(used);
    };

    const load_cpu_info = async () => {
        const cpu_info = await invoke("get_cpu_info");
        const [core_count, global_usage, cores] = cpu_info;
        set_core_count(core_count);
        set_global_usage(global_usage);
        set_cores(cores);
    };
    const load_disk_info = async () => {
        const disk_info = await invoke("get_disk_info");
        const [used, total, percent] = disk_info;

        set_used_disk(used);
        set_total_disk(total);
        set_disk_percent(percent);
    };
    const loadSystemInfo = async () => {
        await load_memory_info();
        await load_cpu_info();
        await load_disk_info();
    };
    useEffect(() => {
        loadSystemInfo();
        const interval = setInterval(loadSystemInfo, 3000);
        return () => clearInterval(interval);
    }, []);

    const memory_usage_percentage = total_memory
        ? ((used_memory / total_memory) * 100).toFixed(1)
        : 0;

    return (
        <div className="dashboard">
            <div className="monitoring">
                <div className="cpu">
                    <span className="cpu_label"> System CPU </span>
                    <span>Total Cores: {core_count}</span>
                    <span>Global Usage: {global_usage.toFixed(2)}%</span>
                    <button onClick={() => set_show_cores(!show_cores)}>
                        {show_cores ? "Hide All Cores" : "Show All Cores"}
                    </button>
                    {show_cores && (
                        <div className="cores">
                        {cores.map((usage, index) => (
                            <div key={index} className="core">
                                <span>Core {index + 1}: </span>
                                <span>{usage.toFixed(2)}%</span>
                            </div>
                        ))}
                    </div>
                    )
                }
                    
                </div>
                <div className="memory">
                    <span className="memory_label"> System MEM </span>
                    <span> {memory_usage_percentage}% </span>
                    <span> {(used_memory / 1024 / 1024 / 1024).toFixed(2)} GB / {(total_memory / 1024 / 1024 / 1024).toFixed(2)} GB </span>
                </div>
                <div className="disk">
                    <span className="disk_label"> System DISK </span>
                    <span>{disk_percent.toFixed(1)}%</span>

                    <span>
                        {(used_disk / 1024 / 1024 / 1024).toFixed(2)} GB / {(total_disk / 1024 / 1024 / 1024).toFixed(2)} GB
                    </span>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;