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
                    <div className="cpu_info">
                        <div className="cpu_usage_info">
                            <div className="cpu_usage_info_label"> Global usage: </div>
                            <div className="cpu_usage_info_value" > {global_usage.toFixed(2)}% </div>
                        </div>
                        <div className="cpu_cores_info"> used of {core_count} cores </div>
                        <button className="explore_details_cpu_info_button" onClick={() => set_show_cores(!show_cores)}>
                            {show_cores ? 
                                (<svg width="15px" height="15px" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.9,13.4l-4.2-4.2l0,0c-0.4-0.4-1-0.4-1.4,0l-4.2,4.2c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0l3.5-3.5l3.5,3.5c0.2,0.2,0.4,0.3,0.7,0.3l0,0c0.3,0,0.5-0.1,0.7-0.3C17.3,14.4,17.3,13.8,16.9,13.4z"></path></g></svg>) : 
                                (<svg width="15px" height="15px" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20,11H4c-0.6,0-1,0.4-1,1s0.4,1,1,1h16c0.6,0,1-0.4,1-1S20.6,11,20,11z M4,8h16c0.6,0,1-0.4,1-1s-0.4-1-1-1H4C3.4,6,3,6.4,3,7S3.4,8,4,8z M20,16H4c-0.6,0-1,0.4-1,1s0.4,1,1,1h16c0.6,0,1-0.4,1-1S20.6,16,20,16z"></path></g></svg>)
                            }
                        </button>
                    </div>
                    {show_cores && (
                        <div className="details_cpu_info">
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
                    <span className="memory_label"> System Memory </span>
                    <span> {memory_usage_percentage}% </span>
                    <span> {(used_memory / 1024 / 1024 / 1024).toFixed(2)} GB / {(total_memory / 1024 / 1024 / 1024).toFixed(2)} GB </span>
                </div>
                <div className="disk">
                    <span className="disk_label"> System Disk </span>
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