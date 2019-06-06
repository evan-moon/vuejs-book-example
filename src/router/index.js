import Vue from 'vue'
import Router from 'vue-router'
import PostListPage from '@/pages/PostListPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PostListPage',
      component: PostListPage
    }
  ]
})
