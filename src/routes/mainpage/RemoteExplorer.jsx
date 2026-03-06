import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router';
import { invoke } from '@tauri-apps/api/core';


function RemoteExplorer() {

    return (
        <div className="remote_explorer">
            <span className="remote_explorer_label"> Remote Explorer </span>
            
        </div>
    )
}
export default RemoteExplorer;