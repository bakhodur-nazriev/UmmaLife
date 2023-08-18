<template>
  <div class="groups__wrapper">
    <MyGroupsDetailsContent />
    <MyGroupsDetailsInfo />
  </div>
</template>

<script>
import MyGroupsDetailsContent from '@/components/groups/details/MyGroupsDetailsContent.vue'
import MyGroupsDetailsInfo from '@/components/groups/details/MyGroupsDetailsInfo.vue'

export default { components: { MyGroupsDetailsContent, MyGroupsDetailsInfo } }
</script>

<style lang="scss" scoped>
.groups__wrapper {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 20px;
  padding: 24px 45px;
}
</style>
