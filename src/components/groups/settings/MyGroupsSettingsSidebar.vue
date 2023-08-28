<template>
  <div class="profile">
    <div class="profile__inner">
      <div class="profile__cover">
        <img
          :src="coverImage ? coverImage : '/images/message/message-img.jpg'"
          alt="video_example"
          class="profile__cover--img"
        />

        <div class="profile__cover--actions">
          <button class="profile__cover--btn profile__cover--change">
            <EditImageIcon />
            <span>Изменить обложку</span>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              class="profile__cover--input"
              @change="inputHandler($event, 'cover')"
            />
          </button>
          <button class="profile__cover--btn profile__cover--delete">
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div class="profile__box">
        <div class="profile__top">
          <div class="profile__top--img">
            <img
              :src="profileImage ? profileImage : '/images/users/jeff.png'"
              alt="Article_Author"
            />
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              @change="inputHandler($event, 'profile')"
            />
            <CameraIcon :white="true" />
          </div>
          <div class="profile__top--info">
            <div class="profile__top--name">Первый технологичный</div>
            <div class="profile__top--account">@abrahamavich</div>
          </div>
        </div>
        <div class="profile__block profile__info no-border">
          <ul class="profile__top-list">
            <li class="profile__top-list--item">
              <ProfileIcon />
              <span>Доступность:</span>
              <p>Открытая группа</p>
            </li>
            <li class="profile__top-list--item">
              <CalendarIcon />
              <span>Категория:</span>
              <p>Наука и технологии</p>
            </li>
            <li class="profile__top-list--item">
              <GlobalSilverIcon />
              <span>Страна:</span>
              <p>Россия</p>
            </li>
          </ul>
        </div>
        <div class="profile__block profile__about">
          <div class="profile__about--title">О группе</div>
          <div class="profile__about--text">
            Не заходи без шапочки из фольги и пары надежных проксей. Интернет, уязвимости, полезные
            сервисы и IT-безопасность.
          </div>
        </div>
        <div class="profile__stats">
          <a href="#" class="profile__stats--item">
            <p>1032</p>
            <span>Подписки</span>
          </a>
          <a href="#" class="profile__stats--item">
            <p>12</p>
            <span>Подписчики</span>
          </a>
          <a href="#" class="profile__stats--item">
            <p>90</p>
            <span>Публикации</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <ProfilePictureModal
      :img="previewImage"
      :title="imageTitle"
      :className="className"
      v-if="isModalOpen"
      @closeModal="closeModal"
      @acceptImage="acceptImage"
    />
  </teleport>
</template>

<script>
import ProfileIcon from '@/components/icons/profile/ProfileIcon.vue'
import CalendarIcon from '@/components/icons/profile/CalendarIcon.vue'
import GlobalSilverIcon from '@/components/icons/profile/GlobalSilverIcon.vue'
import DeleteIcon from '@/components/icons/message/DeleteIcon.vue'
import EditImageIcon from '@/components/icons/EditImageIcon.vue'
import CameraIcon from '@/components/icons/CameraIcon.vue'
import ProfilePictureModal from '@/components/groups/settings/ProfilePictureModal.vue'
export default {
  components: {
    ProfileIcon,
    CalendarIcon,
    GlobalSilverIcon,
    DeleteIcon,
    EditImageIcon,
    CameraIcon,
    ProfilePictureModal
  },
  data() {
    return {
      coverImage: '',
      profileImage: '',
      isModalOpen: false,
      className: '',
      previewImage: '',
      imageTitle: '',
      file: null
    }
  },
  computed: {
    recommendedGroups() {
      return [
        { name: 'Мы Мусульмане', members: 4560 + ' ' + this.$t('labels.members.plural') },
        { name: 'Big Kahuna BuLtd.', members: 21260 + ' ' + this.$t('labels.members.plural') },
        { name: 'Binford Ltd.', members: 33241 + ' ' + this.$t('labels.members.plural') },
        { name: 'Biffco EnterpriLtd.', members: 445100 + ' ' + this.$t('labels.members.plural') },
        { name: 'Acme Co.', members: 987654 + ' ' + this.$t('labels.members.plural') }
      ]
    }
  },
  methods: {
    inputHandler(event, type) {
      this.file = event.target.files[0]
      if (!this.file) return
      this.isModalOpen = true
      const image = URL.createObjectURL(this.file)
      if (type === 'cover') {
        this.previewImage = image
        this.className = ''
        this.imageTitle = 'Обложка группы'
      } else {
        this.previewImage = image
        this.className = 'long'
        this.imageTitle = 'Фото группы'
      }
    },
    acceptImage(img, className) {
      if (className === 'long') {
        this.profileImage = img
      } else {
        this.coverImage = img
      }

      this.isModalOpen = false
      this.className = ''
      this.previewImage = ''
      this.imageTitle = ''
    },
    closeModal() {
      this.isModalOpen = false
      URL.revokeObjectURL(this.file)
      this.className = ''
      this.previewImage = ''
      this.imageTitle = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  &__box {
    margin-bottom: 8px;
    padding: 16px;
    border-radius: 0 0 20px 20px;
    background-color: var(--color-white);
    height: fit-content;
  }
  &__cover {
    width: 100%;
    height: 120px;
    border-radius: 20px 20px 0 0;
    overflow: hidden;
    position: relative;
    &:hover {
      .profile__cover--actions {
        opacity: 1;
      }
    }
    &--img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      object-position: center;
    }
    &--input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      border: none;
      background: transparent;
      appearance: none;
      &::-webkit-file-upload-button {
        cursor: pointer;
      }
    }
    &--actions {
      position: absolute;
      top: 8px;
      right: 5px;
      display: flex;
      gap: 5px;
      opacity: 0;
      transition: all 0.3s;
    }
    &--btn {
      border: none;
      border-radius: 10px;
      background: rgba(45, 45, 45, 0.5);
      backdrop-filter: blur(10px);
      color: var(--color-white);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 9px;
      cursor: pointer;
      position: relative;
      svg {
        width: 20px;
        height: 20px;
      }
      span {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
  &__top {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: -32px;
    margin-bottom: 20px;
    &--img {
      width: 97px;
      height: 97px;
      position: relative;
      border: 3px solid var(--color-white);
      border-radius: 50%;
      overflow: hidden;
      &:hover svg {
        opacity: 1;
      }
      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: all 0.3s;
      }
      input[type='file'] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
        z-index: 10;
        &::-webkit-file-upload-button {
          cursor: pointer;
        }
      }
      & > img {
        width: 100%;
        height: 100%;
        display: block;

        overflow: hidden;
        object-fit: cover;
        object-position: center;
      }
    }
    &--camera {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 40px;
      height: 40px;
      border: 1px solid var(--color-seashell);
      background: var(--color-white);
      border-radius: 50%;
      outline: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      img {
        width: 18px;
        height: 18px;
      }
    }
    &--info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    &--name {
      color: var(--color-mine-shaft);
      font-size: 24px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
    }
    &--account {
      color: var(--color-deep-cerulean);
      font-size: 14px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
    }

    &-list {
      list-style: none;
      margin: 0;
      padding: 0;
      &--item {
        display: flex;
        align-items: center;
        gap: 8px;
        &:not(:last-child) {
          margin-bottom: 16px;
        }
        svg {
          width: 13px;
          height: 13px;
          display: block;
        }
        span,
        p,
        a {
          margin: 0;
          padding: 0;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          color: var(--color-mine-shaft);
        }
        span {
          color: var(--color-silver-chalice);
        }
      }
    }
  }
  &__edit {
    width: 100%;
    color: var(--color-white);
    padding: 14px 14px 12px;
    border-radius: 10px;
    background-color: var(--color-green);
    cursor: pointer;
    border: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
  }
  &__block {
    border-top: 1px solid var(--color-seashell);
    padding: 16px 0;
    .no-border {
      border-top: none;
    }
  }
  &__about {
    border-bottom: 1px solid var(--color-seashell);
    &--title {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-silver-chalice);
      margin-bottom: 16px;
    }
    &--text {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      color: var(--color-mine-shaft);
    }
  }
  &__stats {
    list-style: none;
    padding: 16px 0 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-decoration: none;
      padding: 0 25px;
      align-items: center;
      span {
        width: 100px;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-silver-chalice);
        text-align: center;
      }
      p {
        margin: 0 auto;
        padding: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
    }
  }
}
</style>
