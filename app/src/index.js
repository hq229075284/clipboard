import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@style/base.less'
import { ipcRenderer } from 'electron'
import './font/material-icons.css'
import App from './struct/app'

let count = 0
const timer = setInterval(() => {
  ipcRenderer.send('poll-clipboard-content')
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
