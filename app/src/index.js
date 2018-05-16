import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@style/base.less'
import { ipcRenderer, clipboard } from 'electron'
import './font/material-icons.css'
import App from './struct/app'
import { store } from './vuex'


let count = 0
const timer = setInterval(() => {
  if (count > 9) {
    clearInterval(timer)
    return
  }
  console.log(clipboard.readText())
  count++
  // ipcRenderer.send('poll-clipboard-content')
}, 3000)

ipcRenderer.on('clipboard-content', (event, arg) => {
  if (count > 9) {
    clearInterval(timer)
    return
  }
  console.log(arg)
  count++
})


Vue.use(Vuetify)

new Vue({
  el: '.root',
  store,
  created() {
    // `this` 指向 vm 实例
    console.log('this: ', this)
  },
  // template: '<App/>',
  components: {
    App,
  },
  render(h) {
    return <App />
  },
})
