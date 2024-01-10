<template>
  <GroupsCardContainer>
    <GroupsCard v-for="group in groups" :key="group.id" :group="group" :application="true" />
    <GroupsCard v-for="group in groups" :key="group.id" :group="group" :application="true" />
    <GroupsCard v-for="group in groups" :key="group.id" :group="group" :application="true" />
  </GroupsCardContainer>
</template>

<script>
import GroupsCardContainer from '@/components/groups/ui/GroupsCardContainer.vue'
import GroupsCard from '@/components/groups/ui/GroupsCard.vue'

import { groups } from '@/dummy.js'

export default {
  components: { GroupsCardContainer, GroupsCard },
  data() {
    return {
      groups
    }
  }
}
</script>
