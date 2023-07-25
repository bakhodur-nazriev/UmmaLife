<template>
  <div class="room">
    <div class="room__top">
      <div class="room__profile">
        <img src="@/assets/images/Article_Author.png" alt="Article_Author" class="room__profile--img">
        <div class="room__profile--info">
          <div class="room__profile--name">Josef Kostenko</div>
          <div class="room__profile--account">@josef_Kostenko</div>
        </div>
      </div>
      <div class="room__details">
        <menu-details-icon />
      </div>
    </div>
    <div class="room__messages">
      <ChatMessage v-for="i in 25" :state="i % 2 == 0 ? 'send' : 'recieve'" :key="i" />
    </div>
    <ChatRoomForm />
  </div>
</template>

<script>
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import ChatRoomForm from '@/components/messanger/ChatRoomForm.vue'
import ChatMessage from '@/components/messanger/ChatMessage.vue'
export default {
  components: { MenuDetailsIcon, ChatRoomForm, ChatMessage }
}
</script>

<style lang="scss" scoped>
.room{
  border: 2px solid var(--color-white);
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &__top {
    z-index: 10;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    padding: 16px 56px 16px 16px;
    border-radius: 16px 16px 0 0;
    background-color: var(--color-white);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__profile{
    display: flex;
    align-items: center;
    gap: 16px;
    &--img{
      width: 56px;
      height: 56px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      object-position: center;
    }
    &--name{
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 7px;
    }
    &--account{
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-silver-chalice);
    }
  }
  &__details{
    cursor: pointer;
    display: grid;
    place-items: center;
  }
  &__messages{
    padding: 16px 16px 0;
    flex-grow: 1;
  }
}
</style>
