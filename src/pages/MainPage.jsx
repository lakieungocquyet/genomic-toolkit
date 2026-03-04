import { Outlet, Link } from "react-router";
import WindowHeader from "../components/navigation/WindowHeader.jsx";

function Main () {
    return (
        <div className="window">
            <WindowHeader></WindowHeader>
            
            <div className="window_body">
                <div className="sidebar">

                </div>

                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Main;



