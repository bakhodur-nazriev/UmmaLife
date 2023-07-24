<template>
  <div class="news">
    <PublicationsContent class="profile__news" v-for="i in 5" :key="i" />
  </div>
</template>

<script>
import PublicationsContent from '@/components/ui/Publications/PublicationsContent.vue'

export default {
  components: { PublicationsContent }
}
</script>

<style scoped lang="scss">
.news{
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}
</style>
