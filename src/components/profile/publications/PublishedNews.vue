<template>
  <div>
    <PublicationsContent v-for="i in 5" :key="i" />
  </div>
</template>

<script>
import PublicationsContent from '@/components/ui/Publications/PublicationsContent.vue'

export default {
  components: { PublicationsContent }
}
</script>
