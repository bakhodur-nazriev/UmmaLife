<template>
  <div class="posts__wrapper">
    <div class="posts">
      <PublicationForm />
      <ProfileTabs :tabs="tabLabels" @changeTab="(index) => (selectedIndex = index)">
        <ProfilePublications v-show="selectedIndex === 0" />
        <ProfileUmmaShorts v-show="selectedIndex === 1" />
        <ProfileUmmaVideo v-show="selectedIndex === 2" />
        <ProfileAlboms v-show="selectedIndex === 3" />
        <ProfileSavings v-show="selectedIndex === 4" />
      </ProfileTabs>
    </div>
  </div>
</template>

<script>
import PublicationForm from '@/components/forms/PublicationForm.vue'
import ProfileTabs from '@/components/profile/ProfileTabs.vue'
// Tabs Components
import ProfilePublications from '@/components/profile/tabs/ProfilePublications.vue'
import ProfileAlboms from '@/components/profile/tabs/ProfileAlboms.vue'
import ProfileSavings from '@/components/profile/tabs/ProfileSavings.vue'
import ProfileUmmaShorts from '@/components/profile/tabs/ProfileUmmaShorts.vue'
import ProfileUmmaVideo from '@/components/profile/tabs/ProfileUmmaVideo.vue'
export default {
  components: {
    PublicationForm,
    ProfileTabs,
    ProfilePublications,
    ProfileAlboms,
    ProfileSavings,
    ProfileUmmaShorts,
    ProfileUmmaVideo
  },
  data: () => ({
    selectedIndex: 0
  }),
  computed: {
    tabLabels() {
      return [
        this.$t('tabs.my_page.publications'),
        this.$t('tabs.my_page.umma_shorts'),
        this.$t('tabs.my_page.umma_video'),
        this.$t('tabs.my_page.alboms'),
        this.$t('tabs.my_page.saved')
      ]
    }
  }
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
