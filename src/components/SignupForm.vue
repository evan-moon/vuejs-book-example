<template>
  <form @submit.prevent="submit" novalidate>
    <fieldset>
      <!-- 이름 입력 엘리먼트 -->
      <input type="text"
             v-model="name"
             placeholder="이름을 입력해주세요." />
      <!-- 이메일 입력 엘리먼트 -->
      <input type="email"
             v-model="email"
             placeholder="이메일을 입력해주세요." />
      <!-- 비밀번호 입력 엘리먼트 -->
      <input type="password"
             v-model="password"
             placeholder="비밀번호를 입력해주세요." />
      <!-- 비밀번호 확인 입력 엘리먼트 -->
      <input type="password"
             v-model="passwordConfirm"
             placeholder="비밀번호를 다시 한번 입력해주세요." />
      <!-- 회원가입 버튼 -->
      <button type="submit">회원가입</button>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'SignupForm',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    submit () {
      const { name, email, password, passwordConfirm } = this
      if (!name || !email || !password || !passwordConfirm) {
        alert('모든 항목을 입력해주세요.')
      }
      if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.')
        return
      }
      this.$emit('submit', { name, email, password })
    }
  }
}
</script>