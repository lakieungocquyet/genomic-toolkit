import {openUrl} from '@tauri-apps/plugin-opener';

const OpenUrl = async (url) => {
    try { 
        await openUrl(url);
    } catch (error) {
        console.error("Error opening URL:", error);
    }
};

export default OpenUrl;