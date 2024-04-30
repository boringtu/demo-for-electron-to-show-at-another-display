const { app, BrowserWindow, screen, Tray, nativeImage, ipcMain, nativeTheme } = require('electron');
const path = require('path');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// 热加载
try {
	require('electron-reloader')(module, {});
} catch (_) {}

let mainWindow;
let newWin;

const createWindow = () => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	// const iconPath = path.join(__dirname, 'public/static/images/icon.png');
	const iconPath = path.join(__dirname, 'public/favicon.ico');
	// const appIcon = new Tray(path.join(__dirname, 'public/static/images/icon.png'));
	const icon = nativeImage.createFromPath(iconPath);
	mainWindow = new BrowserWindow({
		width,
		height,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			// 是否启用 NodeJS 环境
			nodeIntegration: true,
			// contextIsolation: false,
		},
		// icon: path.join(__dirname, 'public/static/images/icon.png'),
		// icon: appIcon,
		icon: iconPath,
	});
	// 判断当前环境
	if (process.env.NODE_ENV === 'development') {
		// 自动打开工作台
		mainWindow.webContents.openDevTools();
		// 加载本地服务地址
		mainWindow.loadURL('http://localhost:8080'); 
		// mainWindow.loadFile('./dist/index.html');
	} else {
		// 加载打包后的静态页面
		mainWindow.loadFile('./dist/index.html');
	}
	mainWindow.on('close', () => {
		// 主渲染进程关闭，则关闭所有窗口
		mainWindow = null;
		newWin = null;
		app.quit();
	});
};

app.whenReady().then(() => {
	createWindow();
	// app.on('activate', () => {
	// 	if (BrowserWindow.getAllWindows().length === 0) createWindow();
	// });
});

ipcMain.on('open-url', (event, url) => {
	console.log(url);
	// 当前显示器
	const currentDisplay = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
	// 获取所有显示器的列表
	const displays = screen.getAllDisplays();
	// 另一块显示器
	let anotherDisplay = displays.find((display) => display.id !== currentDisplay.id);
	if (!anotherDisplay) return;
	if (!newWin) {
		newWin = new BrowserWindow({
			// 4 个属性：x, y, width, height
			...anotherDisplay.bounds,
			webPreferences: {
				// 是否启用 NodeJS 环境
				nodeIntegration: true,
			},
		});
		// 最大化窗口
		newWin.maximize();
		newWin.on('close', () => {
			newWin = null;
		});
	}
	// 打开指定页面
	newWin.loadURL(url);

	// 在另一块显示器（非当前显示器）上弹出最大化窗口，并显示指定页面
	console.log(displays.map((display) => [display.id, display.bounds]));
});

app.on('window-all-closed', () => {
	// if (process.platform !== 'darwin') app.quit();
	app.quit();
});
