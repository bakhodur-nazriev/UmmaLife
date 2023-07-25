<template>
  <li class="list">
    <div class="list__img">
      <img src="@/assets/images/Article_Author.png" alt="author">
    </div>
    <div class="list__info">
      <div class="list__info--top">
        <div class="list__info--name">Josef Kostenko</div>
        <div class="list__info--date">15 минут назад</div>
      </div>
      <div class="list__info--text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dconsectetur adipiscing elit
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.list{
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  min-height: 104px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover,
  &.active {
    background-color: var(--color-gallery-first);
  }
  &:first-child{
    border-top: 1px solid var(--color-gallery-first);
  }
  border-bottom: 1px solid var(--color-gallery-first);
  &__img{
    width: 72px;
    height: 72px;
    overflow: hidden;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  &__info{
    width: calc(100% - 88px);
    &--top{
      display: flex;
      gap: 10px;
      margin-bottom: 8px;
    }
    &--name{
      width: calc(100% - 112px);
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
    &--date{
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: right;
      color: var(--color-silver-chalice);
    }
    &--text{
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 21px */
      letter-spacing: 0.35px;
      color: var(--color-mine-shaft);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
