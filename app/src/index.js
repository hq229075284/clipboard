import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@style/base.less'
import './font/material-icons.css'
import { store } from './vuex'
import App from './struct/app'
import { listenerClipboard } from './utils'

listenerClipboard(store)

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
