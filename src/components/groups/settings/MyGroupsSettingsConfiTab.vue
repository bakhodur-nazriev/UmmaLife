<template>
  <form class="create__group">
    <div class="create__group--block">
      <div class="create__group--form off-padding">
        <div class="create__group--label">Тип группы</div>
        <BaseCustomSelect
          :options="['Открытая группа', 'Закрытая группа']"
          :default="'Открытая группа'"
          @input="handleSelect"
        />
      </div>
      <div class="create__group--form">
        <div class="create__group--label">Подтверждать запросы на вступление в группу</div>
        <BaseCustomSelect :options="['Да', 'Нет']" :default="'Нет'" @input="handleSelect" />
      </div>
      <div class="create__group--form">
        <div class="create__group--label">Кто может создавать публикации в группе?</div>
        <BaseCustomSelect
          :options="['Доступно всем', 'Только владелец']"
          :default="'Доступно всем'"
          @input="handleSelect"
        />
      </div>
    </div>
    <div class="create__group--actions">
      <button type="submit" class="create__group--btn submit">Сохранить</button>
      <button type="button" class="create__group--btn" @click="$emit('closeCreate')">
        Отменить
      </button>
    </div>
  </form>
</template>

<script>
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
export default {
  emits: ['closeCreate'],
  components: { BaseCustomSelect }
}
</script>
