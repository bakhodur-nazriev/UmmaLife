<template>
    <h1>Show Article</h1>
</template>

<script>
export default {
  metaInfo() {
    const articleId = this.$route.params.id
    const pageTitle = `Статья ${articleId}`

    return {
      title: pageTitle
    }
  }
}
</script>

<style scoped lang="scss"></style>
