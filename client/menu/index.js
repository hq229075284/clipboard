const { Menu, app } = require('electron')
const { isMac, isWindows } = require('../utils/judge')

module.exports = {
  createMenu() {
    const template = [
      {
        label: '设置',
        submenu: [
          { label: '偏好设置', click() {} },
        ],
      },
    ]

    if (isMac) {
      template.unshift({
        label: app.getName(),
        submenu: [
          { label: '退出', role: 'quit', accelerator: 'CommandOrControl+Q' },
        ],
      })
    }

    if (isWindows) {
      template.unshift({
        label: '文件',
        submenu: [
          { label: '隐藏窗口', accelerator: 'Esc' },
          { label: '退出', role: 'quit', accelerator: 'CommandOrControl+Q' },
        ],
      })
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  },
}
