<!-- src/components/AppHeader.vue -->
<template>
  <div class="app-header">
    <h1>Community</h1>
    <div v-if="isAuthorized">
      <strong>
        <button @click="toggle">{{ me.name }}님 환영합니다.
          <!-- isActive 값에 따라 변경되는 화살표 아이콘을 추가한다 -->
          <i v-if="!isActive" class="fas fa-sort-down"></i>
          <i v-else class="fas fa-sort-up"></i>
        </button>
      </strong>
      <ul v-if="isActive">
        <li><button @click="onClickSignout">로그아웃</button></li>
      </ul>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Signin' }">로그인</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
      ...mapGetters([ 'isAuthorized' ]),
      ...mapState([ 'me' ])
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive
    },
    onClickSignout () {
      this.signout()
      this.$router.push({ name: 'PostListPage' })
    },
    ...mapActions([ 'signout' ])
  }
}
</script>