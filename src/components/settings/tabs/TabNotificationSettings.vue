<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <NotificationSettingsIcon />
      </template>
      <template #title>{{ $t('settings.notifications.info_title') }}</template>
      <template #text>
        {{ $t('settings.notifications.info_text') }}
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="settings__categories">
          <div class="create__group--label">{{ $t('settings.notifications.system_notifs') }}</div>
          <div class="settings__categories--wrapper">
            <BaseCheckbox
              v-for="notification in systemNotifications"
              :key="notification"
              :label="notification"
            />
          </div>
        </div>
        <div class="settings__categories">
          <div class="create__group--label">{{ $t('settings.notifications.email_notifs') }}</div>
          <div class="settings__categories--wrapper">
            <BaseCheckbox
              v-for="notification in systemNotifications"
              :key="notification"
              :label="notification"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import NotificationSettingsIcon from '@/components/icons/settings/NotificationSettingsIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'

export default {
  components: {
    NotificationSettingsIcon,
    SettingsInfo,
    BaseCheckbox
  },
  computed: {
    systemNotifications() {
      return [
        this.$t('settings.notifications.like_my_notes'),
        this.$t('settings.notifications.comment_my_notes'),
        this.$t('settings.notifications.share_my_notes'),
        this.$t('settings.notifications.subed_me'),
        this.$t('settings.notifications.like_my_page'),
        this.$t('settings.notifications.mentioned_me'),
        this.$t('settings.notifications.join_my_group'),
        this.$t('settings.notifications.accept_me'),
        this.$t('settings.notifications.post_profile')
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.settings__categories--wrapper {
  grid-template-columns: 1fr;
}
.settings__categories {
  padding-top: 0 !important;
  &:not(:last-child) {
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--color-gallery-first);
  }
}
</style>
