<template>
<div>
  <table>
    <colgroup>
      <col style="width: 10%;"/>
      <col style="width: 60%"/>
      <col style="width: 10%"/>
      <col style="width: 20%"/>
    </colgroup>
    <thead>
      <tr>
        <th scope="col">번호</th>
        <th scope="col">제목</th>
        <th scope="col">작성자</th>
        <th scope="col">작성일</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td scope="col">{{ post.id }}</td>
        <td scope="col">
          <!-- 제목을 클릭할 경우, 해당하는 게시물의 상세보기 페이지로 이동 되어야하나, 지금은 현재 상세보기 페이지가 없기 때문에 임의로 PostListPage로 지정한다. -->
          <router-link :to="{ name: 'PostListPage' }">{{ post.title }}</router-link>
          [{{ post.comments.length }}]
        </td>
        <td scope="col">{{ post.user.name }}</td>
        <td scope="col">{{ post.createdAt }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'PostList',
  props: {
    posts: {
      type: Array
    }
  }
}
</script>
