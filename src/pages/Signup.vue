<template>
<div class="sign-up-page">
    <h3>회원가입</h3>
    <signup-form @submit="onSubmit" />
    <p>이미 가입하셨나요? <router-link :to="{ name: 'Signup' }">로그인 하러가기</router-link></p>
  </div>
</template>

<script>
import SignupForm from '@/components/SignupForm'
import api from '@/api' // api 모듈을 추가한다.

export default {
  name: 'Signup',
  components: { SignupForm },
  methods: {
    onSubmit (payload) {
      const { email, password, name } = payload
      api.post('/auth/signup', { name, email, password })
        .then(res => {
          // 1. 회원가입이 성공했다면 사용자에게 회원가입이 성공했다는 메세지를 노출한다.
          alert('회원가입이 완료되었습니다.')
          this.$router.push('/')
        })
        .catch(err => {
          // 3. 회원가입이 실패했다면 서버로 부터 전송받은 에러메세지를 보여준다.
          alert(err.response.data.msg)
        })
    }
  }
}
</script>