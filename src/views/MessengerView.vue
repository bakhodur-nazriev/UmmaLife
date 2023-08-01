<template>
  <main-layout>
    <div class="messanger">
      <div class="messanger__wrapper">
        <MessangerNavigation :users="users" @clickUserHandler="clickUserHandler" />
        <ChatRooms :user="user" @submitHandler="submitHandler" />
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout.vue'
import MessangerNavigation from '@/components/messanger/MessangerNavigation.vue'
import ChatRooms from '@/components/messanger/ChatRooms.vue'
import { users } from '@/dummy.js'

export default {
  components: { MainLayout, MessangerNavigation, ChatRooms },
  data () {
    return {
      users,
      user: null
    }
  },
  methods: {
    clickUserHandler (user) {
      this.user = user
    },
    submitHandler ({ value, user }, type) {
      const index = this.users.findIndex((u) => u.id === user.id)
      if (type.state === 'noedit') {
        this.users[index].messages.push({ id: Date.now(), message: value, state: 'send' })
      }
      if (type.state === 'edit') {
        const messageIndex = this.users[index].messages.findIndex(
          (message) => message.id === type.data.id
        )

        this.users[index].messages[messageIndex].message = value
      }
      if (type.state === 'share') {
        this.users[index].messages.push({
          id: Date.now(),
          message: {
            user_name: type.data.user_name,
            user_message:
              typeof type.data.user_message === 'string'
                ? type.data.user_message
                : type.data.user_message.text,
            text: value
          },
          state: 'send'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.messanger {
  max-width: 1651px;
  width: 100%;
  padding: 16px;
  height: 100%;
  &__wrapper {
    display: grid;
    gap: 16px;
    grid-template-columns: 480px 1fr;
    height: 100%;
  }
}
</style>
