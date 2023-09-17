<template>
  <div class="posts__wrapper">
    <div class="posts">
      <PublicationForm />
      <div class="users">
        <div class="users__title">
          <span>Участники</span>
          1032
        </div>
        <div class="users__wrapper">
          <UserCard v-for="user in groupsUsers" :user="user" :key="user.id" />
          <UserCard v-for="user in groupsUsers" :user="user" :key="user.id" />
          <UserCard v-for="user in groupsUsers" :user="user" :key="user.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublicationForm from '@/components/forms/PublicationForm.vue'
import UserCard from '@/components/groups/details/UserCard.vue'

import { groupsUsers } from '@/dummy.js'
export default {
  components: {
    PublicationForm,
    UserCard
  },
  data() {
    return {
      groupsUsers
    }
  }
}
</script>

<style lang="scss">
.posts {
  display: flex;
  flex-direction: column;
  gap: 7px;
  max-width: 700px;
  width: 100%;
  margin-left: 145px;
  @media (max-width: 1635px) {
    margin-left: 50px;
  }
  @media (max-width: 1535px) {
    margin-left: 0;
  }
  @media (max-width: 1377px) {
    max-width: 100%;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.users {
  background: var(--color-white);
  border-radius: 20px;
  padding: 24px;
  &__title {
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: 150%; /* 27px */
    padding-bottom: 24px;
    border-bottom: 1px solid var(--color-gallery-first);
    margin-bottom: 24px;
    color: var(--color-silver-chalice);
    span {
      color: var(--color-mine-shaft);
    }
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
