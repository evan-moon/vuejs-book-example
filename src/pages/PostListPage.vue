<template>
  <div class="post-list-page">
    <h1>포스트 게시글</h1>
    <post-list :posts="posts" />
    <!-- 글쓰기 버튼을 추가하고 게시물 생성 페이지로 링크를 이어준다. -->
    <router-link :to="{ name: 'PostCreatePage' }">글쓰기</router-link>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import api from '@/api'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PostListPage',
  components: { PostList },
  computed: {
    ...mapState([ 'posts' ])
  },
  created () {
    this.fetchPostList()
  },
  methods: {
    ...mapActions([ 'fetchPostList' ])
  }
}
</script>