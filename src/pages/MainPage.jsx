import { Outlet, Link, useNavigate } from "react-router";
import { useState, useRef } from "react";
import WindowHeader from "../components/navigation/WindowHeader.jsx";
import DashboardIcon from "../components/icons/DashboardIcon.jsx";
import LaunchIcon from "../components/icons/LaunchIcon.jsx";
import RemoteIcon from "../components/icons/RemoteIcon.jsx";

function Main () {
    const navigate = useNavigate();
    const [is_selected_section, set_selected_section] = useState("dashboard");

    return (
        <div className="window">
            <WindowHeader></WindowHeader>
            
            <div className="window_body">
                <div className="sidebar">
                    <button className={`dashboard_button ${is_selected_section === "dashboard" ? "selected" : ""}`} 
                        onClick={() => {
                            set_selected_section("dashboard");
                            navigate("/dashboard");
                        }}>
                        <DashboardIcon size={40} color="#FF7F50"></DashboardIcon>
                    </button>
                    <button className={`launch_button ${is_selected_section === "launch" ? "selected" : ""}`} 
                        onClick={() => {
                            set_selected_section("launch");
                            navigate("/launch");
                        }}>
                        <LaunchIcon size={35} color="#FF7F50"></LaunchIcon>
                    </button>
                    <button className={`remote_explorer_button ${is_selected_section === "remote_explorer" ? "selected" : ""}`} 
                        onClick={() => {
                            set_selected_section("remote_explorer");
                            navigate("/remote-explorer");
                        }}>
                        <RemoteIcon size={35} color="#FF7F50"></RemoteIcon>
                    </button>
                </div>

                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Main;



