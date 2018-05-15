const { BrowserWindow, app, globalShortcut, clipboard, ipcMain } = require('electron')
const url = require('url')
const isProduction = process.env.NODE_ENV === 'production'
const isMac = process.platform === 'darwin'
const isLinux = process.platform === 'linux'
const isWindows = process.platform === 'win32'

let win

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 800, show: false, frame: true })

  win.once('ready-to-show', () => {
    win.show()
  })

  win.webContents.openDevTools()
  win.loadURL(url.format({
    pathname: 'http://localhost:2333/index.html',
    // protocol: 'http',
  }))
  if (!isProduction && isMac) {
    const devtool = BrowserWindow.addDevToolsExtension('/Users/HQ/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/4.1.4_0')
  }
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })

  globalShortcut.register('Escape', () => {
    win.close()
    win = null
  })

}

ipcMain.on('poll-clipboard-content', (event, arg) => {
  event.sender.send('clipboard-content', clipboard.readText())
})

app.on('ready', createWindow)

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})


