<template>
  <div class="shorts__reactions">
    <div class="reaction">
      <HeartIcon />
      <p>280</p>
    </div>
    <div class="reaction" @click="$emit('openModal')">
      <MessageBlackIcon />
      <p>280</p>
    </div>
    <div class="reaction">
      <ForwardIcon />
      <p>280</p>
    </div>
    <div class="reaction">
      <SavedBlackIcon />
    </div>
    <div class="reaction">
      <MenuBlackDetailsIcon />
    </div>
  </div>
</template>

<script>
import HeartIcon from '@/components/icons/HeartIcon.vue'
import MessageBlackIcon from '@/components/icons/MessageBlackIcon.vue'
import ForwardIcon from '@/components/icons/ForwardIcon.vue'
import SavedBlackIcon from '@/components/icons/SavedBlackIcon.vue'
import MenuBlackDetailsIcon from '@/components/icons/MenuBlackDetailsIcon.vue'

export default {
  components: { HeartIcon, MessageBlackIcon, ForwardIcon, SavedBlackIcon, MenuBlackDetailsIcon },
  emits: ['openModal']
}
</script>

<style lang="scss" scoped>
.shorts__reactions {
  position: absolute;
  bottom: 0;
  right: -40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 28px;
  .reaction {
    cursor: pointer;
    p {
      margin: 0;
      margin-top: 4px;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
    svg {
      display: block;
      width: 24px;
      height: 24px;
    }
  }
}
</style>
