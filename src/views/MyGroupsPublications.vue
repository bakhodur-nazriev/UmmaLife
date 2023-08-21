<template>
  <div class="posts__wrapper">
    <div class="posts">
      <PublicationForm />
      <ProfilePublications />
    </div>
  </div>
</template>

<script>
import PublicationForm from '@/components/forms/PublicationForm.vue'
import ProfilePublications from '@/components/profile/tabs/ProfilePublications.vue'

export default {
  components: { PublicationForm, ProfilePublications }
}
</script>

<style scoped lang="scss">
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
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
