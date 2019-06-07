<template>
  <div class="post-create-page">
    <h3>게시물 작성하기</h3>
    <post-create-form @submit="onSubmit"/>
  </div>
</template>

<script>
import PostCreateForm from '@/components/PostCreateForm'
import api from '@/api'

export default {
  name: 'PostCreatePage',
  components: { PostCreateForm },
  methods: {
    onSubmit (payload) {
      const { title, contents } = payload
      // 2. /api/posts 엔드포인트로 통신을 시작한다.
      api.post('/posts', { title, contents })
        .then(res => {
          alert('게시물이 성공적으로 작성되었습니다.')
          // 3. 게시물 작성이 성공했다면 내가 작성한 게시물 페이지로 이동한다.
          this.$router.push({
            name: 'PostViewPage',
            params: { postId: res.data.id.toString() }
          })
        })
        .catch(err => {
          // 4. 게시물 작성이 실패한 경우
          if (err.response.status === 401) {
            // 5. HTTP 상태코드가 401 UnAuthorized라면 사용자를 로그인 페이지로 이동시킨다.
            alert('로그인이 필요합니다.')
            this.$router.push({ name: 'Signin' })
          } else {
            // 6. 그 외의 경우 서버가 응답으로 보내준 에러 메세지를 사용자에게 노출시킨다.
            alert(err.response.data.msg)
          }
        })
    },
  }
}
</script>