<template>
  <div
    class="notification__container"
    :class="{ modal__container: modal, main__container: main }"
    v-on-click-outside="closeHandler"
  >
    <div class="notification__container--top">
      <div class="notification__container--title">{{ $t('notification.title') }}</div>
      <div class="notification__container--clear">{{ $t('notification.clear') }}</div>
    </div>
    <div class="notification__container--main">
      <template v-for="notification in allNotifications" :key="notification.id">
        <div class="notification__container--timestamp">{{ $t(notification.timestamp) }}</div>
        <template v-for="data in notification.data" :key="data.id">
          <NotificationList :data="data" />
        </template>
      </template>
    </div>
    <div class="notification__container--bottom" v-if="modal">
      <div class="notification__container--bottom-inner">
        <router-link :to="`/${$i18n.locale}/notifications`" @click="closeHandler"
          >{{ $t('notification.show_all') }} <ArrowLeftIcon
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { notifications } from '@/dummy.js'
import { vOnClickOutside } from '@vueuse/components'
import NotificationList from '@/components/notification/NotificationList.vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
const allNotifications = ref(notifications)
const emit = defineEmits(['closeHandler'])
const props = defineProps({
  modal: {
    type: Boolean,
    default: false
  },
  main: {
    type: Boolean,
    default: false
  }
})

const closeHandler = () => {
  if (props.modal) {
    setTimeout(() => {
      emit('closeHandler')
    }, 0)
  }
}
</script>

<style lang="scss">
.notification__container {
  background-color: var(--color-white);

  border-radius: 20px;
  @media (max-width: 767px) {
    border-radius: 0;
    padding-bottom: 54px;
  }
  &.modal__container {
    position: absolute;
    top: 80px;
    right: 8px;
    width: 450px;

    z-index: 100;
    box-shadow: 0px 2px 10px var(--box-shadow);
    .notification__container--timestamp {
      padding-top: 12px;
      margin-bottom: 4px;
    }
    .notification__container--main {
      overflow-y: auto;
      max-height: calc(100dvh - 264px);
      min-height: 300px;
      padding: 0 24px;
    }
  }
  &.main__container {
    .notification__container--main {
      padding: 0 24px 24px;
      @media (max-width: 767px) {
        padding: 0 16px 16px;
      }
    }
    .notification__container--timestamp {
      padding-top: 16px;
    }
    .notification__container--top {
      @media (max-width: 767px) {
        padding: 16px;
      }
    }
    .notification__list--avatar {
      max-width: 60px;
      height: 60px;
      @media (max-width: 767px) {
        max-width: 40px;
        height: 40px;
        &.not__read::after {
          left: -12px;
        }
      }
    }
    .notification__list--time {
      margin-left: 72px;
      @media (max-width: 767px) {
        margin-left: 52px;
      }
    }
    .notification__list--content .notification__list--time {
      margin-left: 0;
    }
    .notification__list--actions {
      margin-left: 72px;
    }
    .notification__list--post {
      max-width: 60px;
      height: 60px;

      svg {
        width: 28px;
        height: 28px;
      }
      @media (max-width: 767px) {
        max-width: 40px;
        height: 40px;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
    .notification__container--title {
      font-weight: 700;
    }
    .notification__list--icon svg {
      @media (max-width: 767px) {
        width: 20px;
        height: 20px;
      }
    }
  }
  &--top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 20px;
    gap: 10px;
  }
  &--title {
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
  }
  &--clear {
    cursor: pointer;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: var(--color-hippie-blue);
  }
  &--timestamp {
    border-top: 1px solid var(--color-seashell);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
  }
  &--bottom {
    padding: 0 24px 24px;

    &-inner {
      border-top: 1px solid var(--color-seashell);
      padding-top: 20px;
      display: flex;
      align-self: center;
      justify-content: center;
      a {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-hippie-blue);
        text-decoration: none;
        gap: 8px;
        svg {
          width: 18px;
          height: 18px;
          rotate: 180deg;
          margin-bottom: -2px;
        }
      }
    }
  }
}
</style>
