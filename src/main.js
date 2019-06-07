// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

function init () {
  const savedToken = Cookies.get('accessToken')
  if (savedToken) {
    // 저장된 토큰이 존재한다면 signinByToken 액션을 반환한다.
    return store.dispatch('signinByToken', savedToken)
  } else {
    // 토큰이 존재하지 않는다면 바로 Promise를 성공시킨다.
    return Promise.resolve()
  }
}

/* eslint-disable no-new */
init().then(res => {
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})
