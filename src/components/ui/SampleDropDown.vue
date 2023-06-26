<template>
  <div>
    <button class="dropdown__button" type="button" @click="toggleDropDown">
      <span>{{ `${ $t(dropDownTitle) }` }} (255)</span>
      <div>
        <Transition name="rotate">
          <dropdown-icon :class="[ 'rotating-box', { 'rotate': isDropdownOpen }]"/>
        </Transition>
      </div>
    </button>

    <Transition name="fade">
      <div v-if="isDropdownOpen" class="dropdown">
        <ul class="list__group">
          <li
            v-for="(option, i) in options"
            :key="i"
            class="list__item"
          >
           {{ option.title }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>

</template>

<script>
import DropdownIcon from '@/components/icons/DropdownIcon.vue'

export default {
  props: {
    dropDownTitle: {
      type: String,
      required: true
    }
  },
  components: {
    DropdownIcon
  },
  data () {
    return {
      isDropdownOpen: false,
      options: [
        { id: 1, title: 'option 1' },
        { id: 2, title: 'option 2' },
        { id: 3, title: 'option 3' },
        { id: 4, title: 'option 4' }
      ]
    }
  },
  methods: {
    toggleDropDown () {
      this.isDropdownOpen = !this.isDropdownOpen
    }
  }
}
</script>

<style scoped>
.rotating-box {
  transition: transform 0.5s ease;
  transform: rotate(0);
}

.rotate {
  transition: transform 0.3s ease;
  transform: rotate(180deg);
}

.list__group {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown__button {
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
}
</style>
