const { app, BrowserWindow, Menu } = require('electron')




    // const path = require('chart.js')
    // const Chart = require('chart.js');

const url = require('url');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({

        width: 1200,
        height: 800,
        titleBarStyle: 'hidden',
        webPreferences: {
            //preload: path.join(__dirname, "graficador.js")
            //preload: path.join(__dirname, "index.html")

        }
    })
    win.webContents.openDevTools();
    win.loadFile('index.html')
}


const template =
    // { role: 'appMenu' }
    [{
        label: "DevTools",
        submenu: [{
            label: 'dev tools',
            role: 'show/hide',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }]
    }]


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)


app.whenReady().then(() => {
    createWindow()
})