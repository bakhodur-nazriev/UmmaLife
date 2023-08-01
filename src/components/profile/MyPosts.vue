<template>
  <div class="posts">
    <PublicationForm />
    <ProfileTabs :tabs="tabLabels" @changeTab="(index) => (selectedIndex = index)">
      <ProfilePublications v-if="selectedIndex === 0" />
      <ProfileUmmaShorts v-else-if="selectedIndex === 1" />
      <ProfileUmmaVideo v-else-if="selectedIndex === 2" />
      <ProfileAlboms v-else-if="selectedIndex === 3" />
      <ProfileSavings v-else-if="selectedIndex === 4" />
    </ProfileTabs>
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
    tabLabels () {
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
}
</style>
