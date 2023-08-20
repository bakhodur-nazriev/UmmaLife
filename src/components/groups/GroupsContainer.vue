<template>
  <div class="groups__container">
    <GroupsNav :links="links" @clickNavHandler="clickNavHandler" />
    <div class="groups__wrapper">
      <GroupsContent :links="links" />
      <GroupsSidebar />
    </div>
  </div>
</template>

<script>
import GroupsNav from '@/components/groups/GroupsNav.vue'
import GroupsContent from '@/components/groups/GroupsContent.vue'
import GroupsSidebar from '@/components/groups/GroupsSidebar.vue'

export default {
  components: { GroupsNav, GroupsContent, GroupsSidebar },
  data() {
    return {
      links: [
        {
          name: 'Мои группы',
          isActive: true
        },
        {
          name: 'Рекомендации',
          isActive: false
        },
        {
          name: 'Заявки',
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
  }
}
</script>

<style lang="scss" scoped>
.groups__wrapper {
  display: grid;
  grid-template-columns: 1fr 411px;
  gap: 20px;
  padding: 24px 45px;
}
</style>
