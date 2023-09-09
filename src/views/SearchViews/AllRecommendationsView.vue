<template>
  <MainLayout>
    <div class="all-recommendations-block">
      <!--      <AllRecommendations />-->
      <!--      <PeopleView />-->
      <!--      <GroupsView />-->
      <!--      <MUVIView />-->
      <!--      <HashtagsView/>-->
      <!--      <ArticlesView/>-->
      <!--      <VideoView/>-->
            <AudioView/>

      <SearchNavbar :is-sidebar-active="isSidebarActive"></SearchNavbar>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout.vue'
// import ArticlesView from '@/views/SearchViews/ArticleView.vue'
// import VideoView from '@/views/SearchViews/VideoView.vue'
import SearchNavbar from '@/components/layouts/SearchComponents/SearchNavbar.vue'
import AudioView from '@/views/SearchViews/AudioView.vue'
// import HashtagsView from '@/views/SearchViews/HashtagsView.vue'
// import GroupsView from '@/views/SearchViews/GroupsView.vue'
// import MUVIView from '@/views/SearchViews/MUVIView.vue'
// import AllRecommendations from '@/components/SearchTabs/AllRecommendations.vue'
// import PeopleView from '@/views/SearchViews/PeopleView.vue'

export default {
  components: {
    SearchNavbar,
    // ArticlesView,
    // VideoView,
    AudioView,
    // HashtagsView,
    // MUVIView,
    // GroupsView,
    // PeopleView,
    // AllRecommendations,
    MainLayout
  },
  data() {
    return {
      isSidebarActive: false
    }
  }
}
</script>

<style scoped lang="scss">
.all-recommendations-block {
  margin: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
}
</style>
