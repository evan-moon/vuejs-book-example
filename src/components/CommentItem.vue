<template>
  <div class="comment-item">
    <!-- 1. CommentList 컴포넌트에 있던 사용자 이름 부분을 그대로 가져오자. -->
    <strong>{{ comment.user.name }}</strong><span>{{ comment.createdAt }}</span>
    <div v-if="isEditing">
      <textarea v-model="editMessage" rows="3"></textarea>
      <button @click="onEdit">수정완료</button>
    </div>
    <p v-else>{{ comment.contents }}</p>
    <!-- 2. 댓글을 수정 또는 삭제할 수 있는 버튼을 추가한다. -->
    <ul v-if="isMyComment">
      <li><button type="button" @click="toggleEditMode">{{ editButtonText }}</button></li>
      <li><button type="button" @click="onDelete">삭제</button></li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CommentItem',
  data () {
    return {
      isEditing: false
    }
  },
  props: {
    comment: {
      type: Object,
      required: true,
      validator (comment) {
        const isValidCommentId = typeof comment.id === 'number'
        const isValidContents = comment.contents && comment.contents.length
        const isValidUser = !!comment.user
        return isValidCommentId && isValidContents && isValidUser
      }
    }
  },
  computed: {
    // 2. 현재 로그인한 사용자의 정보를 스토어의 상태를 참조하여 가져온다.
    ...mapState([ 'me' ]),
    // 3. 현재 로그인 여부를 알 수 있는 isAuthorized 게터를 가져온다.
    ...mapGetters([ 'isAuthorized' ]),
    // 4. 댓글을 작성한 사용자의 아이디와 현재 로그인한 사용자의 아이디를 비교한다.
    isMyComment () {
      return this.isAuthorized && this.comment.user.id === this.me.id
    },
    editButtonText () {
      return this.isEditing ? '수정 취소' : '수정'
    },
    isValidComment () {
      // 1. 수정된 댓글이 1자 이상 255자 이하면 참을 반환하고 아니면 거짓을 반환한다.
      return this.editMessage.length > 0 && this.editMessage.length < 256
    },
  },
  methods: {
    toggleEditMode () {
      this.isEditing = !this.isEditing
      // 4. 수정 모드로 변할 때마다 댓글의 내용을 수정할 메세지에 바인딩해준다.
      if (this.isEditing) {
        this.editMessage = this.comment.contents
      }
    },
    onEdit () {
      // 2. 댓글이 유효성 검증을 통과한 상태라면 edit 이벤트를 실행하고 아니라면 경고창을 노출한다.
      if (this.isValidComment) {
        this.isEditing = false
        const { id } = this.comment
        this.$emit('edit', { id, comment: this.editMessage })
      } else {
        alert('댓글은 1자 이상 255자 이하여야 합니다')
      }
    },
    onDelete () {
      const { id } = this.comment
      // 삭제 버튼 클릭 시, comment의 id 값을 넘긴다.
      this.$emit('delete', id)
    },
  }
}
</script>