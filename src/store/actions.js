import api from '@/api'
import { FETCH_POST_LIST, FETCH_POST } from './mutations-types'

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
  }
}