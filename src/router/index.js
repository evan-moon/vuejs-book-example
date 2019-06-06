import Vue from 'vue'
import Router from 'vue-router'
import PostListPage from '@/pages/PostListPage'
import PostViewPage from '@/pages/PostViewPage'
import Signup from '@/pages/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PostListPage',
      component: PostListPage
    },
    {
      path: '/post/:postId',
      name: 'PostViewPage',
      component: PostViewPage,
      props: true
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
