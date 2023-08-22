<template>
  <div class="groups__content">
    <div class="groups__content--inner">
      <MyGroupsSettingsMainTab v-if="links[0].isActive" />
      <MyGroupsSettingsConfiTab v-else-if="links[1].isActive" />
      <MyGroupsSettingsUsersTab v-else-if="links[2].isActive" />
      <MyGroupsSettingsAnaliticsTab v-else-if="links[3].isActive" />
    </div>
  </div>
</template>

<script>
import MyGroupsSettingsMainTab from '@/components/groups/settings/MyGroupsSettingsMainTab.vue'
import MyGroupsSettingsConfiTab from '@/components/groups/settings/MyGroupsSettingsConfiTab.vue'
import MyGroupsSettingsUsersTab from '@/components/groups/settings/MyGroupsSettingsUsersTab.vue'
import MyGroupsSettingsAnaliticsTab from '@/components/groups/settings/MyGroupsSettingsAnaliticsTab.vue'

export default {
  props: {
    links: Array
  },
  components: {
    MyGroupsSettingsMainTab,
    MyGroupsSettingsConfiTab,
    MyGroupsSettingsUsersTab,
    MyGroupsSettingsAnaliticsTab
  }
}
</script>

<style lang="scss" scoped>
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
