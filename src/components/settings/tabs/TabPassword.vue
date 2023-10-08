<template>
  <div class="tab">
    <div class="settings__header">
      <div class="settings__header--back" @click="emit('handleSelectNav', 'main')">
        <SettingsBackIcon />
      </div>
      <div class="settings__header--text">{{ $t('settings.nav.password') }}</div>
      <div class="settings__header--ready">{{ $t('settings.accaunt.ready') }}</div>
    </div>
    <SettingsInfo>
      <template #icon>
        <PasswordIcon />
      </template>
      <template #title>{{ $t('settings.password.info_title') }}</template>
      <template #text>
        {{ $t('settings.password.info_text') }}
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="create__group--form create__group--form-text pt-0">
          <label class="create__group--label">{{ $t('settings.password.your_password') }}</label>
          <input
            type="password"
            class="create__group--input pt-0"
            :placeholder="$t('settings.password.password_placeholder')"
          />
        </div>
        <div class="create__group--form">
          <label class="create__group--label">{{ $t('settings.password.new_password') }}</label>
          <input
            type="password"
            class="create__group--input"
            :placeholder="$t('settings.password.password_placeholder')"
          />
        </div>
        <div class="create__group--form">
          <label class="create__group--label">{{
            $t('settings.password.repeat_new_password')
          }}</label>
          <input
            type="password"
            class="create__group--input"
            :placeholder="$t('settings.password.password_placeholder')"
          />
        </div>
        <div class="create__group--form pb-0">
          <div class="create__group--label">{{ $t('settings.password.auth2') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.password.off'), $t('settings.password.on')]"
            :default="$t('settings.password.off')"
            @input="handleSelect($event, 'auth')"
            :title="$t('settings.password.auth2')"
          />
        </div>
      </div>
      <div class="create__group--actions">
        <button type="submit" class="create__group--btn submit">{{ $t('buttons.save') }}</button>
      </div>
    </form>
  </div>
  <teleport to="body">
    <BaseModal
      v-show="isAuth2ModalOpen"
      @closeModal="isAuth2ModalOpen = false"
      :isOpen="isAuth2ModalOpen"
    >
      <template #title> {{ $t('settings.password.auth2') }} </template>
      <template #text> {{ $t('settings.password.auth2_text') }} </template>
      <div class="modal__tel">
        <label class="modal__tel--label">{{ $t('settings.main.phone') }}</label>
        <div class="modal__tel--select">
          <vue-tel-input
            :mode="'international'"
            :dropdownOptions="{
              showDialCodeInSelection: true,
              showDialCodeInList: true,
              showFlags: true
            }"
            :inputOptions="{
              placeholder: $t('settings.main.phone_placeholder')
            }"
            v-model="phone"
            @validate="validate"
          />
        </div>
      </div>
      <div class="modal__tel--acition">
        <SampleButton
          padding="13px"
          width="100%"
          color="default"
          :title="$t('buttons.cancel')"
          @click="isAuth2ModalOpen = false"
        />
        <SampleButton
          padding="13px"
          width="100%"
          :title="$t('buttons.submit')"
          @click="verifyPhone"
          :class="{ disabled: !isValid }"
        />
      </div>
    </BaseModal>
    <BaseModal
      v-show="isVerifyCodeOpen"
      @closeModal="isVerifyCodeOpen = false"
      :isOpen="isVerifyCodeOpen"
    >
      <template #title> {{ $t('settings.password.auth2') }} </template>
      <template #text> {{ $t('settings.password.auth2_text') }} </template>
      <div class="modal__tel">
        <label class="modal__tel--label">{{ $t('login.code_from_sms') }}</label>
        <CodeInput
          :fields="6"
          :fieldWidth="52"
          :fieldHeight="52"
          :required="true"
          @complete="complete"
        />
      </div>
      <div class="modal__tel--acition">
        <SampleButton
          padding="13px"
          width="100%"
          color="default"
          :title="$t('buttons.prev')"
          @click="handleBack"
        />
        <SampleButton
          padding="13px"
          width="100%"
          :title="$t('buttons.accept')"
          @click="verifyPhone"
          :class="{ disabled: !isComplete }"
        />
      </div>
    </BaseModal>
  </teleport>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import PasswordIcon from '@/components/icons/settings/PasswordIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
import SettingsBackIcon from '@/components/icons/settings/SettingsBackIcon.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import CodeInput from '@/components/ui/CodeInput.vue'
const emit = defineEmits(['handleSelectNav'])
const isAuth2ModalOpen = ref(false)
const isVerifyCodeOpen = ref(false)
const isComplete = ref(false)
const phone = ref('')
const isValid = ref()

const validate = (options) => {
  isValid.value = options.valid
}

const handleSelect = (event, type) => {
  if (type === 'auth') {
    if (event === 'Enabled' || event === 'Включена') {
      isAuth2ModalOpen.value = true
    }
  }
}

const verifyPhone = () => {
  if (isValid.value) {
    isAuth2ModalOpen.value = false
    isVerifyCodeOpen.value = true
  }
}

const handleBack = () => {
  isAuth2ModalOpen.value = true
  isVerifyCodeOpen.value = false
}

const complete = (value) => {
  isComplete.value = value
}
</script>

<style lang="scss">
.modal__tel {
  margin-bottom: 32px;
  &--label {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 12px;
    display: block;
  }
  &--select {
    display: flex;
    align-items: center;

    .vue-tel-input {
      flex-grow: 1;
      border: none;
      outline: none;
      border-radius: 10px;
      &:focus-within {
        box-shadow: none;
      }
      .vti__dropdown {
        background-color: var(--color-seashell);
        border-radius: 10px 0 0 10px;
        .vti__country-code {
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          color: var(--color-mine-shaft);
        }
      }
      .vti__input {
        padding: 19px 19px 19px 0 !important;
        border: none;
        outline: none;
        background-color: var(--color-seashell);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
        border-radius: 0 10px 10px 0;
        &::placeholder {
          color: var(--color-silver-chalice);
        }
      }
    }
  }
  &--acition {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
