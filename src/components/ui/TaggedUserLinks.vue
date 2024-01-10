<template>
  <template v-if="taggedUsers && taggedUsers.length > 0">
    <template v-for="(word, index) in words" :key="index">
      <router-link
        v-if="isTaggedUser(word)"
        :to="getUserLink(word)"
        :key="index"
        class="user__link"
      >
        {{ getUsernameFromWord(word) }}
      </router-link>
      <template v-else>{{ word }}</template>
    </template>
  </template>
  <template v-else>
    {{ text }}
  </template>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    taggedUsers: {
      type: [Array, null],
      default: () => []
    }
  },
  computed: {
    words() {
      // Split the text into an array of words
      return this.text.split(/(\S+|\b@)/)
    }
  },
  methods: {
    isTaggedUser(word) {
      return (
        word.startsWith('@') && this.taggedUsers.some((user) => user.username === word.substring(1))
      )
    },
    getUserLink(word) {
      const username = word.substring(1) // Remove "@" symbol
      const user = this.taggedUsers.find((user) => user.username === username)
      return `/${this.$i18n.locale}/${user.username}`
    },
    getUsernameFromWord(word) {
      return this.isTaggedUser(word) ? `@${word.substring(1)}` : word
    }
  }
}
</script>

<style lang="scss" scoped>
.user__link {
  color: var(--color-hippie-blue);
  text-decoration: none;
  font-weight: 500;
}
</style>
