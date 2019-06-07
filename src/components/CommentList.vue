<template>
  <ul class="comments">
    <!-- 2. 등록된 comments props 데이터를 컴포넌트에 주입한다. -->
    <li v-for="comment in comments" :key="comment.id">
      <comment-item :comment="comment" @edit="onEdit" @delete=onDelete />
    </li>
    <!-- 3. 댓글이 없는 경우는 '입력된 댓글이 없습니다.' 라는 문구를 노출한다. -->
    <li v-if="comments.length <= 0">
      입력된 댓글이 없습니다.
    </li>
  </ul>
</template>

<script>
import CommentItem from '@/components/CommentItem'
import { mapActions } from 'vuex'

export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    comments: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    onEdit ({ id, comment }) {
      // 3. editComment 액션을 사용하여 API 서버에 댓글 수정 요청을 보낸다.
      this.editComment({ commentId: id, comment })
        .then(res => {
          alert('댓글이 수정되었습니다.')
        })
        .catch(err => {
          if (err.response.status === 401) {
            alert('로그인이 필요합니다.')
            this.$router.push({ name: 'Signin' })
          } else {
            alert(err.response.data.msg)
          }
        })
    },
    onDelete (commentId) {
      this.deleteComment(commentId)
        .then(res => {
          // 삭제 성공시, 성공에 해당하는 메세지를 노출한다.
          alert('댓글이 삭제되었습니다.')
        })
        .catch(err => {
          // 삭제 실패시, 상황에 따라 각각 처리한다.
          if (err.response.status === 401) {
            alert('로그인이 필요합니다.')
            this.$router.push({ name: 'Signin' })
          } else {
            alert(err.response.data.msg)
          }
        })
    },
    // 2. editComment 액션을 CommentList 컴포넌트에 등록한다.
    ...mapActions([ 'editComment', 'deleteComment' ]),
  }
}
</script>