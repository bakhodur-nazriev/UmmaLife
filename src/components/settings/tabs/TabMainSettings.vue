<template>
  <div class="tab">
    <div class="settings__header">
      <div class="settings__header--back" @click="emit('handleSelectNav', 'main')">
        <SettingsBackIcon />
      </div>
      <div class="settings__header--text">{{ $t('settings.nav.main') }}</div>
      <div class="settings__header--ready">{{ $t('settings.accaunt.ready') }}</div>
    </div>
    <SettingsInfo>
      <template #icon>
        <MainSettingsIcon />
      </template>
      <template #title>{{ $t('settings.main.info_title') }}</template>
      <template #text>
        {{ $t('settings.main.info_text') }}
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="settings__login create__group--form">
          <label for="login" class="create__group--label">{{ $t('settings.main.login') }}</label>
          <input
            type="text"
            name="login"
            class="create__group--input"
            :placeholder="$t('settings.main.login')"
            value="ibragimumma"
          />
        </div>
        <div class="settings__show">
          <BaseCheckbox :label="$t('settings.main.show_in_profile')" />
          <div class="settings__show--text">{{ $t('settings.main.show_in_profile_text') }}</div>
        </div>
        <div class="create__group--form">
          <label for="phone" class="create__group--label">{{ $t('settings.main.phone') }}</label>
          <div class="create__group--input-wrapper">
            <SampleSelectedCountry class="settings__phone" />
            <input
              type="text"
              name="phone"
              class="create__group--input"
              :placeholder="$t('settings.main.phone_placeholder')"
            />
          </div>
        </div>
        <div class="create__group--form">
          <label for="email" class="create__group--label">{{ $t('settings.main.email') }}</label>
          <input
            type="email"
            name="email"
            class="create__group--input"
            :placeholder="$t('settings.main.email_placeholder')"
            value="ummalife@umma.ru"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">{{ $t('settings.main.country') }}</div>
          <BaseCustomSelect
            :options="['Турция', 'Россия']"
            :default="'Турция'"
            @input="handleSelect"
            :title="$t('settings.main.country')"
          />
        </div>
        <div class="create__group--form">
          <label for="address" class="create__group--label">{{
            $t('settings.main.address')
          }}</label>
          <input
            type="text"
            name="address"
            class="create__group--input"
            :placeholder="$t('settings.main.address_placeholder')"
          />
        </div>
        <div class="settings__categories">
          <div class="create__group--label">{{ $t('settings.main.categorie_title') }}</div>
          <div class="settings__categories--wrapper">
            <BaseCheckbox v-for="category in categories" :key="category" :label="category" />
          </div>
        </div>
      </div>
      <div class="create__group--actions">
        <button type="submit" class="create__group--btn submit">{{ $t('buttons.save') }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
/* eslint-disable */
import MainSettingsIcon from '@/components/icons/settings/MainSettingsIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import SampleSelectedCountry from '@/components/ui/SampleSelectedCountry.vue'
import SettingsBackIcon from '@/components/icons/settings/SettingsBackIcon.vue'
const emit = defineEmits(['handleSelectNav'])
const handleSelect = (event) => {
  // TODO
}
</script>

<script>
export default {
  computed: {
    categories() {
      return [
        this.$t('settings.main.categories.religion'),
        this.$t('settings.main.categories.psixologiya'),
        this.$t('settings.main.categories.familiy'),
        this.$t('settings.main.categories.health'),
        this.$t('settings.main.categories.work'),
        this.$t('settings.main.categories.education'),
        this.$t('settings.main.categories.travel'),
        this.$t('settings.main.categories.books'),
        this.$t('settings.main.categories.sience'),
        this.$t('settings.main.categories.sport'),
        this.$t('settings.main.categories.art'),
        this.$t('settings.main.categories.auto'),
        this.$t('settings.main.categories.food'),
        this.$t('settings.main.categories.positive'),
        this.$t('settings.main.categories.fitness'),
        this.$t('settings.main.categories.history'),
        this.$t('settings.main.categories.fashion'),
        this.$t('settings.main.categories.architectory'),
        this.$t('settings.main.categories.beauty'),
        this.$t('settings.main.categories.parenting'),
        this.$t('settings.main.categories.nature')
      ]
    }
  }
}
</script>

<style lang="scss">
.settings {
  &__form {
    .create__group--form {
      grid-template-columns: 282px 1fr;
      gap: 28px;
    }
    .create__group--label {
      font-weight: 550;
    }
    .create__group--input-wrapper {
      @media (max-width: 767px) {
        width: 100%;
      }
    }
  }
  &__phone {
    margin-right: 20px;
    .country-select-button {
      padding: 0 !important;
      background: transparent !important;
    }
  }
  &__login {
    padding: 0 !important;
    border-bottom: none !important;
    margin-bottom: 19px;
    .create__group--input {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
      padding: 0;
    }
  }
  &__show {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--color-gallery-first);
    @media (max-width: 767px) {
      margin-bottom: 24px;
    }

    &--text {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 130%;
      color: var(--color-secondary);
    }
  }
  &__categories {
    padding-top: 24px;
    &--wrapper {
      margin-top: 24px;
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
