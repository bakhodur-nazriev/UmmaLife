<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_2981_39673)">
      <path
        d="M10 0.3125C4.65626 0.3125 0.3125 4.65626 0.3125 10C0.3125 15.3437 4.65626 19.6875 10 19.6875C15.3437 19.6875 19.6875 15.3437 19.6875 10C19.6875 4.65626 15.3437 0.3125 10 0.3125ZM10 17.8125C5.69374 17.8125 2.1875 14.3063 2.1875 10C2.1875 5.69374 5.69374 2.1875 10 2.1875C14.3063 2.1875 17.8125 5.69374 17.8125 10C17.8125 14.3063 14.3063 17.8125 10 17.8125Z"
        :fill="isChecked ? '#49A399' : '#9D9D9D'"
      />
      <path
        d="M9.85855 4C9.38347 4 9 4.37467 9 4.83877V15.1612C9 15.6254 9.38347 16 9.85855 16C13.2469 16 16 13.3103 16 10C16 6.68965 13.2469 4 9.85855 4Z"
        :fill="isChecked ? '#49A399' : '#9D9D9D'"
      />
    </g>
    <defs>
      <clipPath id="clip0_2981_39673">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>
