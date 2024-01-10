<template>
  <component :is="listType" :data="data" />
</template>

<script>
/* eslint-disable */
/**
 * @types
 * *photo-liked
 * *user-subscribe
 * *group-new_post
 * *muvie-liked
 * *post-liked
 * *post-commented
 * *comment-tagged
 * *post-viewed
 * *video-posted
 * *login-notification
 * *friend-request
 */

import PhotoLiked from '@/components/notification/lists/PhotoLiked.vue'
import UserSubscribe from '@/components/notification/lists/UserSubscribe.vue'
import GroupNewPost from '@/components/notification/lists/GroupNewPost.vue'
import MuvieLiked from '@/components/notification/lists/MuvieLiked.vue'
import PostLiked from '@/components/notification/lists/PostLiked.vue'
import PostCommented from '@/components/notification/lists/PostCommented.vue'
import CommentTagged from '@/components/notification/lists/CommentTagged.vue'
import PostViewed from '@/components/notification/lists/PostViewed.vue'
import VideoPosted from '@/components/notification/lists/VideoPosted.vue'
import LoginNotification from '@/components/notification/lists/LoginNotification.vue'
import FriendRequest from '@/components/notification/lists/FriendRequest.vue'
export default {
  props: {
    data: Object
  },
  components: {
    PhotoLiked,
    UserSubscribe,
    GroupNewPost,
    MuvieLiked,
    PostLiked,
    PostCommented,
    CommentTagged,
    PostViewed,
    VideoPosted,
    LoginNotification,
    FriendRequest
  },
  computed: {
    listType() {
      return this.data.type
    }
  }
}
</script>
<style lang="scss">
.notification__list {
  padding: 8px 0;
  &:last-child {
    padding-bottom: 12px;
  }
  &--wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    position: relative;
  }
  &--tag {
    color: var(--color-deep-cerulean) !important;
  }
  &--avatar {
    max-width: 40px;
    width: 100%;
    height: 40px;

    &.not__read::after {
      content: '';
      position: absolute;
      top: 50%;
      left: -16px;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--color-hippie-blue);
      display: block;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      object-position: center;
    }
  }
  &--icon {
    background-color: var(--color-seashell);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-mine-shaft);
    border-radius: 50%;
    svg {
      width: 30px;
      height: 30px;
    }
  }
  &--post {
    max-width: 40px;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--color-seashell);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-secondary);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  &--content {
    width: 100%;
    display: flex;
    flex-direction: column;
    .notification__list--time {
      margin-left: 0;
    }
  }
  &--text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    color: var(--color-mine-shaft);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    a {
      color: var(--color-mine-shaft);
      font-weight: 550;
      text-decoration: none;
    }
  }
  &--time {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-secondary);
    margin-left: 52px;
  }
  &--actions {
    display: flex;
    align-items: center;
    margin-left: 50px;
    margin-top: 10px;
    gap: 8px;
  }
}
</style>
