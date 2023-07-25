<template>
  <div class="articles">
    <ProfileArticles v-for="i in 5" :key="i" />
  </div>
</template>
<script>
import ProfileArticles from '@/components/ui/Publications/ProfileArticles.vue'

export default {
  components: {
    ProfileArticles
  }
}
</script>

<style scoped lang="scss">
.articles{
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}
</style>
