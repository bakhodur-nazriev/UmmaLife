<template>
  <div class="navigation">
    <div class="navigation__top">
      <search-input :placeholder="$t('placeholders.search_input')" class="navigation__search" />
      <button class="navigation__add">
        <add-user-icon />
      </button>
    </div>
    <ul class="navigation__menu">
      <ChatUser v-for="i in 12" :key="i" />
    </ul>
  </div>
</template>

<script>
import SearchInput from '@/components/ui/SearchInput.vue'
import AddUserIcon from '@/components/icons/AddUserIcon.vue'
import ChatUser from '@/components/messanger/ChatUser.vue'
export default {
  components: { SearchInput, AddUserIcon, ChatUser }
}
</script>

<style scoped lang="scss">
.navigation{
  border-radius: 20px;
  background: var(--color-white);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &__top{
    width: 100%;
    padding: 16px;
    display: flex;
    gap: 16px;
    position: sticky;
    top: 0 ;
    left: 0;
    background-color: var(--color-white);
    border-radius: 20px 20px 0 0;
  }
  &__add{
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
    padding: 0;
    border: none;
    outline: none;
  }
  &__menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
