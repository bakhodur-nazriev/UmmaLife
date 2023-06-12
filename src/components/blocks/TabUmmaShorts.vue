<template>
  <div class="umma__shorts--main--container">
    <div class="umma__shorts--block" v-for="i in 7" :key="i">
      <div class="umma__shorts--title__section">
        <img src="../../assets/images/UmmaShorts.png" alt="">
        <h3 class="title umma__shorts--title">#history #muslim #desert и все об исламе #history #muslim #desert и все об
          исламе</h3>
        <div class="subtitle">
          <div>
            <date>20.08.2022</date>
            <small>-</small> <small>1 тыс. просмотров</small>
          </div>
          <div>
            <small>255 реакций</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.umma__shorts--main--container {
  display: grid;
  grid-template-columns: repeat(3, 237px);
  gap: 16px;
}

.umma__shorts--title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.subtitle small {
  color: var(--color-gray-4);
}

@media (min-width: 1280px) {
  .umma__shorts--inside--block img {
    border-radius: 15px;
  }

  .umma__shorts--main--container {
    grid-template-columns: repeat(4, 237px);
  }
}

@media (min-width: 1920px) {
  .umma__shorts--main--container {
    grid-template-columns: repeat(6, 237px);

  }
}
</style>
