<template>
  <div class="news">
    <PublicationTab class="profile__news" v-for="i in 5" :key="i" />
  </div>
</template>

<script>
import PublicationTab from '@/components/ui/Publications/PublicationTab.vue'

export default {
  components: { PublicationTab }
}
</script>

<style scoped lang="scss">
.news {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
  .reactions__block .reaction {
    border-radius: 8px;
  }
}
</style>
