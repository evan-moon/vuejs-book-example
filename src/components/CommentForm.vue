<template>
  <div class="comment-form">
    <textarea v-model="comment"
              rows="5"
              placeholder="댓글을 입력해주세요."/>
    <button type="button" @click="onSubmit">등록</button>
  </div>
</template>
<script>
export default {
  name: 'CommentForm',
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    // 1. '생성' 버튼 클릭 시 실행될 함수를 작성한다. 
    onSubmit () {
      // 2. 입력된 데이터를 submit 함수를 호출하며 함께 인자로 넘겨준다.
      const { comment } = this
      this.$emit('submit', comment)
      // 3. 작성이 완료된 후, 입력된 데이터를 초기화 해준다.
      this.comment = ''
    }
  }
}
</script>