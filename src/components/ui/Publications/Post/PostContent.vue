<template>
  <div class="post__content">
    <p class="post__content--paragraph">
      The 29-year-old took more than a tenth of a second off a record that had stood for 16 years,
      clocking 52.20 seconds to beat Russian Yuliya<br />
      Pechonkina's previous mark of 52.34.<br />
      "I'm just shocked," said Muhammad.<br />
      "I've been kind of hitting that time in practice and my coach was like 'there's no way you
      can't do it'."
    </p>
    <div class="post__content--reactions">
      <PostReactions />
    </div>
  </div>
</template>

<script>
import PostReactions from '@/components/ui/Post/PostReactions.vue'
export default {
  components: {
    PostReactions
  }
}
</script>

<style scoped lang="scss">
.stats__separator {
  margin: 0 8px;
}

.post__content--reactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 14px 0;
}

.stats__reposts {
  color: var(--color-silver-chalice);
  display: flex;
  font-size: 14px;
}

.post__content--paragraph {
  margin: 0;
}

@media (min-width: 1280px) {}

@media (min-width: 1920px) {}
</style>
