import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './struct/app'
import 'vuetify/dist/vuetify.min.css'
import '@style/base.less'

Vue.use(Vuetify)

new Vue({
  el: '.root',
  created: function () {
    // `this` 指向 vm 实例
    console.log('this: ', this)
  },
  // template: '<App/>',
  components: {
    App
  },
  render(h) {
    return <App />
  }
})