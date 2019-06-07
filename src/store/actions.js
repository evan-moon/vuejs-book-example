import api from '@/api'
import { FETCH_POST_LIST, FETCH_POST, SET_ACCESS_TOKEN, SET_MY_INFO, DESTROY_ACCESS_TOKEN, DESTROY_MY_INFO } from './mutations-types'

export default {
  fetchPostList ({ commit }) {
    return api.get('/posts')
      .then(res => {
        commit(FETCH_POST_LIST, res.data)
      })
  },
  fetchPost ({ commit }, postId) {
    // 3. API 요청시 인자로 받은 postId를 URI에 포함한다.
    return api.get(`/posts/${postId}`)
      .then(res => {
        // 4. 받아온 데이터와 함께 FETCH_POST 변이를 실행시킨다.
        commit(FETCH_POST, res.data)
      })
  },
  signin ({ commit }, payload) {
    const { email, password } = payload
    return api.post('/auth/signin', { email, password })
      .then(res => {
        const { accessToken } = res.data
        commit(SET_ACCESS_TOKEN, accessToken)
        return api.get('/users/me')
      }).then(res => {
        commit(SET_MY_INFO, res.data)
      })
  },
  signinByToken ({ commit }, token) {
    // 1. 토큰을 스토어에 커밋한다.
    commit(SET_ACCESS_TOKEN, token)
    // 2. 사용자의 정보를 받아온 후 스토어에 커밋한다.
    return api.get('/users/me')
      .then(res => {
        commit(SET_MY_INFO, res.data)
      })
  },
  signout ({ commit }) {
    commit(DESTROY_MY_INFO)
    commit(DESTROY_ACCESS_TOKEN)
  }
}