const { app, BrowserWindow, Menu } = require('electron')
const path = require('chart.js')
// const Chart = require('chart.js');

const createWindow = () => {
  const win = new BrowserWindow({
    
    width: 1000,
    height: 800,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, "script.js")
    }
  })

  
  win.loadFile('index.html')
}


const template = 
  // { role: 'appMenu' }
   [{
    label: "DevTools",
    submenu: [
      { 
        label: 'fabiricio apesta',
        role: 'show/hide',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  }] 


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
  createWindow()
})













