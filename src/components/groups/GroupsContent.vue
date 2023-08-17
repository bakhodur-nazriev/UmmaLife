<template>
  <div class="groups__content">
    <div class="groups__content--inner">
      <GroupsSearch />
      <MyGroupsTab v-if="links[0].isActive" />
      <RecommendationsTab v-else-if="links[1].isActive" />
      <ApplicationsTab v-else-if="links[2].isActive" />
    </div>
  </div>
</template>

<script>
import ApplicationsTab from '@/components/groups/tabs/ApplicationsTab.vue'
import MyGroupsTab from '@/components/groups/tabs/MyGroupsTab.vue'
import RecommendationsTab from '@/components/groups/tabs/RecommendationsTab.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'

export default {
  components: { MyGroupsTab, RecommendationsTab, ApplicationsTab, GroupsSearch },
  props: {
    links: Array
  }
}
</script>

<style lang="scss">
.groups__content {
  display: flex;
  flex-direction: column;
  align-items: center;

  &--inner {
    width: 700px;
    margin-left: 145px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (max-width: 1635px) {
      margin-left: 50px;
    }
    @media (max-width: 1535px) {
      margin-left: 0;
    }
  }
}
</style>
