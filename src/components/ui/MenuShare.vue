<template>
  <div class="share__buttons--block" v-on-click-outside="() => (isShareWindowOpen = false)">
    <div class="share__buttons" v-if="isShareWindowOpen">
      <div class="share__window">
        <ul class="share__menu">
          <li class="share__item">
            <SendMenuIcon />
            <span>{{ $t('buttons.open_like_message') }}</span>
          </li>

          <SampleDivider class="share__item--divider" />

          <li class="share__item">
            <ShareMenuIcon />
            <span>{{ $t('buttons.share_on_my_page') }}</span>
          </li>

          <SampleDivider class="share__item--divider" />

          <li class="share__item">
            <MyGroupIcon />
            <span>{{ $t('buttons.share_in_group') }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="share__button open-share-button" @click="openShareWindow">
      <ShareIcon />
      <span>{{ $t('buttons.share') }}</span>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'

import ShareIcon from '@/components/icons/shorts/ShareIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import SendMenuIcon from '@/components/icons/MenuDetails/SendMenuIcon.vue'
import MyGroupIcon from '@/components/icons/MyGroupIcon.vue'
import ShareMenuIcon from '@/components/icons/MenuDetails/ShareMenuIcon.vue'

const isShareWindowOpen = ref(false)

const openShareWindow = () => {
  isShareWindowOpen.value = !isShareWindowOpen.value
}
</script>
