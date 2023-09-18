<template>
  <div class="groups__container">
    <GroupsNav :links="links" @clickNavHandler="clickNavHandler" class="groups__settings--nav" />
    <div class="groups__wrapper">
      <MyGroupsSettingsTabs :links="links" />
      <MyGroupsSettingsSidebar />
    </div>
  </div>
</template>

<script>
import StickySidebar from 'sticky-sidebar-v2'
import MyGroupsSettingsTabs from '@/components/groups/settings/MyGroupsSettingsTabs.vue'
import MyGroupsSettingsSidebar from '@/components/groups/settings/MyGroupsSettingsSidebar.vue'
import GroupsNav from '@/components/groups/GroupsNav.vue'

export default {
  components: { MyGroupsSettingsTabs, MyGroupsSettingsSidebar, GroupsNav },
  data() {
    return {
      links: [
        {
          name: 'Основные',
          isActive: true
        },
        {
          name: 'Конфиденциальность',
          isActive: false
        },
        {
          name: 'Участники',
          isActive: false
        },
        {
          name: 'Аналитика',
          isActive: false
        }
      ]
    }
  },
  methods: {
    clickNavHandler(index) {
      this.links.forEach((link) => (link.isActive = false))
      this.links[index].isActive = true
    }
  },
  mounted() {
    /* eslint-disable */
    new StickySidebar('.profile', {
      topSpacing: 20,
      bottomSpacing: 20,
      containerSelector: '.groups__wrapper',
      innerWrapperSelector: '.profile__inner',
      scrollContainer: '.main__content'
    })
  }
}
</script>

<style lang="scss" scoped>
.groups__wrapper {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 20px;
  padding: 24px 45px;
}
</style>
