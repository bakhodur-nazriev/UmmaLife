<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <ConfidentialIcon />
      </template>
      <template #title> Конфиденциальность </template>
      <template #text>
        В разделе "Конфиденциальность" вы можете установить настройки приватности для вашего
        профиля. Здесь вы можете ограничить действия других пользователей с вашим профилем,
        настроить уведомления, ограничить доступ к определенной информации и так далее. Настройте
        эти параметры в соответствии с вашими предпочтениями и желаемым уровнем конфиденциальности.
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="settings__form--text">
          Вы можете выбрать информацию, которую хотите показывать у себя на странице, а так же
          запрещать или ограничивать доступ к своей странице
        </div>
        <div class="create__group--form">
          <div class="create__group--label">Кто может подписаться на меня?</div>
          <BaseCustomSelect
            :options="['Доступно всем', 'Только друзья']"
            :default="'Доступно всем'"
            @input="handleSelect"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">Кто может отправлять мне сообщения?</div>
          <BaseCustomSelect
            :options="['Доступно всем', 'Только друзья']"
            :default="'Доступно всем'"
            @input="handleSelect"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">Кто может видеть моих друзей?</div>
          <BaseCustomSelect
            :options="['Доступно всем', 'Только друзья']"
            :default="'Доступно всем'"
            @input="handleSelect"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">Кто может оставлять записи на моей стене?</div>
          <BaseCustomSelect
            :options="['Доступно всем', 'Только друзья']"
            :default="'Доступно всем'"
            @input="handleSelect"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">Кто может видеть мой день рождения?</div>
          <BaseCustomSelect
            :options="['Доступно всем', 'Только друзья']"
            :default="'Доступно всем'"
            @input="handleSelect"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">Принимать запрос на подписку?</div>
          <BaseCustomSelect
            :options="['Доступно всем', 'Только друзья']"
            :default="'Доступно всем'"
            @input="handleSelect"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">Кто может добавлять меня в группу?</div>
          <BaseCustomSelect :options="['Да', 'Нет']" :default="'Да'" @input="handleSelect" />
        </div>
        <div class="create__group--form create__group--form-text">
          <div class="create__group--label">
            Отправлять пользователям уведомления, когда я посещаю их профили?
          </div>
          <div>
            <BaseCustomSelect
              :options="['Доступно всем', 'Только друзья']"
              :default="'Доступно всем'"
              @input="handleSelect"
            />
            <div class="settings__form--text mt-12">
              Если отключить это уведомление, вы не будете получать уведомления о том кто посещал
              ваш профиль.
            </div>
          </div>
        </div>
        <div class="create__group--form">
          <div class="create__group--label">Показывать ваши действия?</div>
          <BaseCustomSelect :options="['Да', 'Нет']" :default="'Да'" @input="handleSelect" />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">Показывать ваше местоположение другим?</div>
          <BaseCustomSelect :options="['Да', 'Нет']" :default="'Да'" @input="handleSelect" />
        </div>
        <div class="create__group--form create__group--form-text">
          <div class="create__group--label">Сохранение и копирование материалов</div>
          <div>
            <div class="settings__toggle">
              <span>Запретить копирование</span>
              <BaseToggle v-model:isChecked="isChecked" />
            </div>
            <div class="settings__form--text mt-12">
              Вы можете выбрать информацию, которую хотите показывать у себя на странице, а так же
              запрещать или ограничивать доступ к своей странице
            </div>
          </div>
        </div>
      </div>
      <div class="create__group--actions">
        <button type="submit" class="create__group--btn submit">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import ConfidentialIcon from '@/components/icons/settings/ConfidentialIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
import BaseToggle from '@/components/ui/BaseToggle.vue'
const isChecked = ref(false)

const handleSelect = (event) => {
  // TODO
}
</script>

<style lang="scss">
.settings__form {
  &--text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    color: var(--color-secondary);
  }
}
.settings__toggle {
  border-radius: 10px;
  background-color: var(--color-seashell);
  padding: 13px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mt-12 {
  margin-top: 12px;
}
</style>
