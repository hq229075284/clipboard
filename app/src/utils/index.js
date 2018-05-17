import { clipboard } from 'electron'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import shortid from 'shortid'

export function listenerClipboard(store) {
  const adapter = new FileSync('db.json')
  const db = lowdb(adapter)

  db.defaults({ clipboardRecords: [], recordCounter: 0 }).write()
  store.commit('setRecords', db.get('clipboardRecords').value())

  // let count = 0
  const timer = setInterval(() => {
    // if (count > 9) {
    //   clearInterval(timer)
    //   return
    // }
    if (store.state.records[0] && store.state.records[0].content === clipboard.readText()) return

    if (db.get('clipboardRecords').find({ content: clipboard.readText() }).size().value() > 0) {
      db.get('clipboardRecords').remove({ content: clipboard.readText() }).value()
      // db.get('clipboardRecords').remove(a => a.content === clipboard.readText()).value()
    }
    db.get('clipboardRecords')
      .unshift({ id: shortid.generate(), content: clipboard.readText() })
      .write()

    store.commit('setRecords', db.get('clipboardRecords').value())
  }, 300)
}
