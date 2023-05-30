<template>
  <div class="input-with-eye">
    <sample-input
      name="password"
      :type="isPasswordVisible ? 'text' : 'password'"
      v-model="inputValue"
      class="input-field"
      :placeholder="placeholder"
    />

    <button type="button" class="eye-button" @click="togglePasswordVisibility">
      <eye-slash-icon v-if="isPasswordVisible"></eye-slash-icon>
      <eye-icon v-else></eye-icon>
    </button>
  </div>
</template>

<script>
import SampleInput from '@/components/ui/SampleInput.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'

export default {
  components: { EyeSlashIcon, EyeIcon, SampleInput },
  props: ['placeholder'],
  data () {
    return {
      inputValue: '',
      isPasswordVisible: false
    }
  },
  methods: {
    togglePasswordVisibility () {
      this.isPasswordVisible = !this.isPasswordVisible
    }
  }
}
</script>

<style scoped>
.input-with-eye {
  position: relative;
  display: flex;
  z-index: 1;
}

.input-field {
  padding-right: 45px;
  width: 100%;
}

.eye-button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.eye-button svg {
  color: #B0B0B0;
}
</style>
