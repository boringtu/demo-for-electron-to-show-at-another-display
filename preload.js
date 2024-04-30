const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('openUrl', (message) => {
	ipcRenderer.send('open-url', message);
});
