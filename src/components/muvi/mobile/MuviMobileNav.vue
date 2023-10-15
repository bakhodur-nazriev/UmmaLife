<template>
  <div class="bottom__nav muvi__nav">
    <ul class="bottom__nav--list">
      <li
        class="bottom__nav--item"
        v-for="(link, index) in links"
        :key="link.icon"
        :class="{ active: link.isSelected }"
        @click="emit('linkHandler', index)"
      >
        <component :is="`${link.icon}-icon`" :isActive="link.isSelected" />
      </li>
    </ul>
  </div>
</template>

<script setup>
/* eslint-disable */
import HomeIcon from '@/components/icons/shorts/nav/HomeIcon.vue'
import SearchIcon from '@/components/icons/shorts/nav/SearchIcon.vue'
import AddCircleIcon from '@/components/icons/shorts/nav/AddCircleIcon.vue'
import CommentIcon from '@/components/icons/shorts/nav/CommentIcon.vue'
import ProfileIcon from '@/components/icons/shorts/nav/ProfileIcon.vue'

const props = defineProps({
  links: Array
})

const emit = defineEmits(['linkHandler'])
</script>

<script>
export default {
  components: {
    HomeIcon,
    SearchIcon,
    AddCircleIcon,
    CommentIcon,
    ProfileIcon
  }
}
</script>

<style lang="scss">
.muvi__nav {
  .bottom__nav--item {
    color: var(--color-silver-chalice);
    cursor: pointer;
    &.active {
      color: var(--color-white);
    }
  }
}
</style>
