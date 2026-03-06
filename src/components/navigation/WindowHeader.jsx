import { getCurrentWindow} from "@tauri-apps/api/window";
import { LogicalSize, PhysicalSize} from '@tauri-apps/api/dpi';
import { useState, useRef } from "react";
import OpenUrl from "../../utils/OpenUrl.jsx";

import GithubIcon from "../icons/GithubIcon.jsx";
import Logo from './Logo.jsx'

function WindowHeader() {
	const [is_window_maximized, set_is_window_maximized] = useState(false);

	const close_window = async () => {
		await getCurrentWindow().destroy();
	};
	const set_minsize_window = async () => {
		const appWindow = getCurrentWindow();

		if (await appWindow.isMaximized()) {
			await appWindow.unmaximize();
		}

		await appWindow.setSize(new LogicalSize(1000, 800));
		await appWindow.center();
		set_is_window_maximized(false);
	};
	const maximize_window = async () => {
    	await getCurrentWindow().maximize();
		set_is_window_maximized(true);
  	};
	const minimize_window = async () => {
    	await getCurrentWindow().minimize();
  	};
	return (
		<div className="window_header" data-tauri-drag-region>
			<Logo data-tauri-drag-region></Logo>

			<button 
				className="github_repository_button_header" 
				onClick={() => OpenUrl("https://github.com/lakieungocquyet/varkit")}>
				<GithubIcon size={30}></GithubIcon>
			</button>
			<div className="window_control_buttons">
				<button className="minimize_button" onClick={minimize_window}>
					<svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" stroke="#000000" stroke-width="1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M40,23.99H10c-0.552,0-1,0.447-1,1s0.448,1,1,1h30c0.552,0,1-0.447,1-1S40.552,23.99,40,23.99z"></path> </g></svg>
				</button>
				{
					is_window_maximized ? 
						(
							<button className="set_minsize_button" onClick={set_minsize_window}>
								<svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" stroke="#000000" stroke-width="1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.243,19.194c0.553,0,1-0.447,1-1s-0.447-1-1-1h-3.77c-0.553,0-1,0.447-1,1v21.951c0,0.553,0.447,1,1,1h21.951 c0.553,0,1-0.447,1-1v-3.765c0-0.553-0.447-1-1-1s-1,0.447-1,1v2.765H12.474V19.194H15.243z"></path> <path d="M41.474,9.146H19.522c-0.553,0-1,0.447-1,1v21.951c0,0.553,0.447,1,1,1h21.951c0.553,0,1-0.447,1-1V10.146 C42.474,9.593,42.026,9.146,41.474,9.146z M40.474,31.097H20.522V11.146h19.951V31.097z"></path> </g></svg>
							</button>
						) : (
							<button className="maximize_button" onClick={maximize_window}>
								<svg height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" fill="#000000" stroke="#000000" stroke-width="1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" d="M9.27,41.224h30c0.553,0,1-0.447,1-1v-30c0-0.552-0.447-1-1-1h-30c-0.553,0-1,0.448-1,1v30 C8.27,40.776,8.717,41.224,9.27,41.224z M10.27,11.224h28v28h-28V11.224z"></path> </g></svg>
							</button>
						)
				}
				<button className="close_button" onClick={close_window}>
					<svg height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" fill="#000000" stroke="#000000" stroke-width="1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#231F20" d="M9.016,40.837c0.195,0.195,0.451,0.292,0.707,0.292c0.256,0,0.512-0.098,0.708-0.293l14.292-14.309 l14.292,14.309c0.195,0.196,0.451,0.293,0.708,0.293c0.256,0,0.512-0.098,0.707-0.292c0.391-0.39,0.391-1.023,0.001-1.414 L26.153,25.129L40.43,10.836c0.39-0.391,0.39-1.024-0.001-1.414c-0.392-0.391-1.024-0.391-1.414,0.001L24.722,23.732L10.43,9.423 c-0.391-0.391-1.024-0.391-1.414-0.001c-0.391,0.39-0.391,1.023-0.001,1.414l14.276,14.293L9.015,39.423 C8.625,39.813,8.625,40.447,9.016,40.837z"></path> </g></svg>
				</button>
			</div>
		</div>
	);
}

export default WindowHeader;