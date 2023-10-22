export const users = [
  {
    id: 1,
    name: 'Jhon Doe',
    image: '/images/users/jhon.png',
    last_seen: 'онлайн',
    online: true,
    typing: false,
    account: '@jhon_doe',
    messages: [
      {
        id: 1,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse id fuga soluta suscipit, numquam dolorem optio ipsum dignissimos aliquid excepturi, iusto non maiores neque veritatis, itaque eius asperiores quam vitae?'
      },
      {
        id: 2,
        state: 'send',
        message: 'Lorem ipsum dolor sit',
        status: 'read'
      },
      {
        id: 3,
        state: 'send',
        message: 'Lorem ipsum dolor sit orem ipsum dolor sit',
        status: 'read'
      },
      {
        id: 4,
        state: 'send',
        message: {
          user_name: 'Jeff Bezos',
          user_message:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse id fuga soluta suscipit, numquam dolorem optio ipsum dignissimos aliquid excepturi, iusto non maiores neque veritatis, itaque eius asperiores quam vitae?',
          text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, voluptas!'
        },
        status: 'read'
      },
      {
        id: 7,
        state: 'recieve',
        message: 'Lorem ipsum dolor.',
        video: {
          src: '/video/video.mp4',
          poster: '/images/message/video-poster.jpg',
          alt: 'message-video.mp4'
        }
      },
      {
        id: 4,
        state: 'send',
        message: {
          user_name: 'Jeff Bezos',
          user_message:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse id fuga soluta suscipit, numquam dolorem optio ipsum dignissimos aliquid excepturi, iusto non maiores neque veritatis, itaque eius asperiores quam vitae?',
          text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, voluptas!'
        },
        status: 'read',
        image: {
          src: '/images/message/message-img.jpg',
          alt: 'message-img'
        }
      }
    ],
    isChecked: false
  },
  {
    id: 2,
    name: 'Jeff Bezos',
    image: '/images/users/jeff.png',
    last_seen: 'печатает...',
    online: true,
    typing: true,
    account: '@jeff_bezos',
    messages: [
      {
        id: 1,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse id fuga soluta suscipit, numquam dolorem optio ipsum dignissimos aliquid excepturi, iusto non maiores neque veritatis, itaque eius asperiores quam vitae?',
        status: 'read'
      },
      {
        id: 2,
        state: 'recieve',
        message: 'Lorem ipsum dolor sit'
      },
      {
        id: 3,
        state: 'send',
        message:
          'Далеко-далеко за словесными горами в стране гласных и согласных, живут рыбные тексты. Заманивший взгляд курсивных маленький ему дал вопроса за даже знаках на берегу подпоясал? Вдали безорфографичный снова ipsum он себя первую своих.',
        status: 'read'
      },
      {
        id: 4,
        state: 'recieve',
        message: 'Далеко-далеко за словесными горами в стране гласных и согласных'
      },
      {
        id: 5,
        state: 'recieve',
        message: 'Далеко-далеко'
      },
      {
        id: 15,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anвмывмывмывы',
        status: 'notread'
      },
      {
        id: 7,
        state: 'recieve',
        message: 'Lorem ipsum dolor. Duis aute irure dolor in'
      }
    ],
    isChecked: false
  },
  {
    id: 3,
    name: 'Josef Kostenko',
    image: '/images/users/jozef.png',
    last_seen: 'Среда',
    online: false,
    typing: false,
    account: '@josef_Kostenko',
    messages: [
      {
        id: 1,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anвмывмывмывы'
      },
      {
        id: 2,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        status: 'read'
      },
      {
        id: 4,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        id: 5,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        id: 6,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anвмывмывмывы'
      },
      {
        id: 7,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        status: 'read'
      },
      {
        id: 7,
        state: 'send',
        message: '',
        status: 'read',
        image: {
          src: '/images/message/message-img.jpg',
          alt: 'message-img'
        }
      }
    ],
    isChecked: false
  },
  {
    id: 4,
    name: 'Josef Kostenko',
    image: '/images/users/jozef1.png',
    last_seen: '15.05.23',
    online: false,
    typing: false,
    account: '@josef_Kostenko',
    messages: [
      {
        id: 1,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse id fuga soluta suscipit, numquam dolorem optio ipsum dignissimos aliquid excepturi, iusto non maiores neque veritatis, itaque eius asperiores quam vitae?',
        status: 'read'
      },
      {
        id: 2,
        state: 'recieve',
        message: 'Lorem ipsum dolor sit'
      },
      {
        id: 3,
        state: 'send',
        message:
          'Далеко-далеко за словесными горами в стране гласных и согласных, живут рыбные тексты. Заманивший взгляд курсивных маленький ему дал вопроса за даже знаках на берегу подпоясал? Вдали безорфографичный снова ipsum он себя первую своих.',
        status: 'read'
      },
      {
        id: 4,
        state: 'recieve',
        message: 'Далеко-далеко за словесными горами в стране гласных и согласных'
      },
      {
        id: 5,
        state: 'recieve',
        message: 'Далеко-далеко'
      },
      {
        id: 6,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anвмывмывмывы',
        status: 'notread'
      }
    ],
    isChecked: false
  },
  {
    id: 5,
    name: 'Josef Kostenko',
    image: '/images/users/jozef2.png',
    last_seen: '20.04.23',
    online: false,
    typing: false,
    account: '@josef_Kostenko',
    messages: [
      {
        id: 1,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anвмывмывмывы'
      },
      {
        id: 2,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        status: 'read'
      },
      {
        id: 4,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        id: 5,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        id: 10,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anвмывмывмывы'
      },
      {
        id: 6,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        status: 'read'
      },
      {
        id: 6,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        status: 'read',
        image: {
          src: '/images/message/message-img.jpg',
          alt: 'message-img'
        }
      },

      {
        id: 7,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ],
    isChecked: false
  },
  {
    id: 6,
    name: 'Josef Kostenko',
    image: '/images/users/jozef3.png',
    last_seen: '10.02.23',
    online: false,
    typing: false,
    account: '@josef_Kostenko',
    messages: [
      {
        id: 1,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anвмывмывмывы'
      },
      {
        id: 2,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        status: 'read'
      },
      {
        id: 4,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        id: 5,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        id: 15,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anвмывмывмывы'
      },
      {
        id: 6,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        status: 'read',
        video: {
          src: '/video/video.mp4',
          poster: '/images/message/video-poster.jpg',
          alt: 'message-video.mp4'
        },
        img: null
      },
      {
        id: 7,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ],
    isChecked: false
  },
  {
    id: 7,
    name: 'Josef Kostenko',
    image: '/images/users/jozef4.png',
    last_seen: '15.12.22',
    online: false,
    typing: false,
    account: '@josef_Kostenko',
    messages: [
      {
        id: 1,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse id fuga soluta suscipit, numquam dolorem optio ipsum dignissimos aliquid excepturi, iusto non maiores neque veritatis, itaque eius asperiores quam vitae?',
        status: 'read'
      },
      {
        id: 2,
        state: 'recieve',
        message: 'Lorem ipsum dolor sit'
      },
      {
        id: 3,
        state: 'send',
        message:
          'Далеко-далеко за словесными горами в стране гласных и согласных, живут рыбные тексты. Заманивший взгляд курсивных маленький ему дал вопроса за даже знаках на берегу подпоясал? Вдали безорфографичный снова ipsum он себя первую своих.',
        status: 'read'
      },
      {
        id: 4,
        state: 'recieve',
        message: 'Далеко-далеко за словесными горами в стране гласных и согласных'
      },
      {
        id: 5,
        state: 'recieve',
        message: 'Далеко-далеко',
        img: null,
        video: null
      },
      {
        id: 15,
        state: 'send',
        message: '',
        status: 'read',
        video: {
          src: '/video/video.mp4',
          poster: '/images/message/video-poster.jpg',
          alt: 'message-video.mp4'
        },
        img: null
      }
    ],
    isChecked: false
  },
  {
    id: 8,
    name: 'Josef Kostenko',
    image: '/images/users/jozef5.png',
    last_seen: '2.08.22',
    online: false,
    typing: false,
    account: '@josef_Kostenko',
    messages: [
      {
        id: 1,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anвмывмывмывы',
        img: null,
        video: null
      },
      {
        id: 2,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        status: 'read',
        img: null,
        video: null
      },
      {
        id: 4,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        img: null,
        video: null
      },
      {
        id: 5,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        img: null,
        video: null
      },
      {
        id: 15,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anвмывмывмывы',
        img: null,
        video: null
      },
      {
        id: 6,
        state: 'send',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        status: 'read'
      },
      {
        id: 7,
        state: 'recieve',
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ],
    isChecked: false
  }
]

export const groups = [
  {
    id: 1,
    title: 'Web-design, UX/UI design, Graphic design',
    users_count: 140781,
    img: '/images/groups/group-1.jpg',
    isSubs: false
  },
  {
    id: 2,
    title: 'Web-design, UX/UI design',
    users_count: 140781,
    img: '/images/groups/group-2.jpg',
    isSubs: true
  },
  {
    id: 3,
    title: 'Web-design',
    users_count: 140781,
    img: '/images/groups/group-3.jpg',
    isSubs: false
  },
  {
    id: 4,
    title: 'UX/UI design, Graphic design',
    users_count: 140781,
    img: '/images/groups/group-4.jpg',
    isSubs: false
  }
]

export const groupsUsers = [
  {
    id: 1,
    name: 'Мухаммад Мухаммадов',
    img: '/images/users/jeff.png',
    desc: 'Описание в профиле пользователя, где он рассказывает о себе, своих достижениях и вообще обо всём чем он хотел всём чем он хотел',
    isSubs: false,
    hasBadge: false,
    isPremiuim: false,
    isVerified: false,
    info: 'Istanbul, 24 года'
  },
  {
    id: 2,
    name: 'Александр Сидоренко',
    img: '/images/users/jhon.png',
    desc: null,
    isSubs: false,
    hasBadge: false,
    isPremiuim: true,
    isVerified: true,
    info: 'Грузия, 27 лет'
  },
  {
    id: 3,
    name: 'Тимур Алиев',
    img: '/images/users/jozef.png',
    desc: 'Описание в профиле пользователя, где он рассказывает о себе, своих достижениях и вообще обо всём чем он хотел всём чем он хотел',
    isSubs: false,
    hasBadge: true,
    isPremiuim: true,
    isVerified: true,
    info: 'Мадрид, 28 лет'
  },
  {
    id: 3,
    name: 'muvahhid',
    img: '/images/users/jozef1.png',
    desc: null,
    isSubs: false,
    hasBadge: true,
    isPremiuim: false,
    isVerified: true,
    info: 'Istanbul, 24 года'
  }
]

export const audios = [
  {
    id: 1,
    source: '/audio/audio1.mp3',
    title: 'Marshmallow',
    artist: 'Lukrembo',
    isLiked: false,
    isPlaying: false
  },
  {
    id: 2,
    source: '/audio/audio2.mp3',
    title: 'Travel',
    artist: 'Lukrembo',
    isLiked: false,
    isPlaying: false
  },
  {
    id: 3,
    source: '/audio/audio3.mp3',
    title: 'Donut',
    artist: 'Lukrembo',
    isLiked: false,
    isPlaying: false
  }
]

export const audios2 = [
  {
    id: 1,
    source: '/audio/audio1.mp3',
    title: 'Marshmallow',
    artist: 'Lukrembo',
    isLiked: false,
    isPlaying: false
  },
  {
    id: 2,
    source: '/audio/audio2.mp3',
    title: 'Travel',
    artist: 'Lukrembo',
    isLiked: false,
    isPlaying: false
  },
  {
    id: 3,
    source: '/audio/audio3.mp3',
    title: 'Donut',
    artist: 'Lukrembo',
    isLiked: false,
    isPlaying: false
  }
]

export const profileShorts = [
  {
    id: 1,
    src: '/images/shorts/shorts1.png',
    name: 'Shorts 1',
    seen: 17800
  },
  {
    id: 2,
    src: '/images/shorts/shorts2.png',
    name: 'Shorts 2',
    seen: 1300
  },
  {
    id: 3,
    src: '/images/shorts/shorts3.png',
    name: 'Shorts 3',
    seen: 1301231
  },
  {
    id: 7,
    src: '/images/shorts/shorts1.png',
    name: 'Shorts 1',
    seen: 17800
  },
  {
    id: 8,
    src: '/images/shorts/shorts2.png',
    name: 'Shorts 2',
    seen: 1300
  },
  {
    id: 9,
    src: '/images/shorts/shorts3.png',
    name: 'Shorts 3',
    seen: 100
  },
  {
    id: 4,
    src: '/images/shorts/shorts1.png',
    name: 'Shorts 1',
    seen: 17800
  },
  {
    id: 5,
    src: '/images/shorts/shorts2.png',
    name: 'Shorts 2',
    seen: 1300
  },
  {
    id: 6,
    src: '/images/shorts/shorts3.png',
    name: 'Shorts 3',
    seen: 100
  }
]

export const muvies = [
  {
    id: 1,
    title: 'Some description for this description description description',
    seen: 101900,
    img: '/images/muvies/muvi1.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  },
  {
    id: 2,
    title: 'Some description for this description description description',
    seen: 712,
    img: '/images/muvies/muvi2.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  },
  {
    id: 3,
    title: 'Some description for this description description description',
    seen: 2100000,
    img: '/images/muvies/muvi3.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  },
  {
    id: 4,
    title: 'Some description for this description description description',
    seen: 475600,
    img: '/images/muvies/muvi4.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  },
  {
    id: 5,
    title: 'Some description for this description description description',
    seen: 41800,
    img: '/images/muvies/muvi5.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  },
  {
    id: 6,
    title: 'Some description for this description description description',
    seen: 9300,
    img: '/images/muvies/muvi6.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  },
  {
    id: 7,
    title: 'Some description for this description description description',
    seen: 101900,
    img: '/images/muvies/muvi7.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  },
  {
    id: 8,
    title: 'Some description for this description description description',
    seen: 712,
    img: '/images/muvies/muvi8.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  },
  {
    id: 9,
    title: 'Some description for this description description description',
    seen: 210000,
    img: '/images/muvies/muvi9.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  },
  {
    id: 10,
    title: 'Some description for this description description description',
    seen: 475600,
    img: '/images/muvies/muvi10.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  },
  {
    id: 11,
    title: 'Some description for this description description description',
    seen: 41800,
    img: '/images/muvies/muvi11.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  },
  {
    id: 12,
    title: 'Some description for this description description description',
    seen: 9300,
    img: '/images/muvies/muvi12.jpg',
    user: {
      img: '/images/users/jeff.png',
      name: 'alexaliev'
    }
  }
]

export const sources = [
  {
    src: '/video/short-1.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  },
  {
    src: '/video/short-2.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  },
  {
    src: '/video/video.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  },
  {
    src: '/video/short-1.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  },
  {
    src: '/video/short-2.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  },
  {
    src: '/video/video.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  },
  {
    src: '/video/short-1.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  },
  {
    src: '/video/short-2.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  },
  {
    src: '/video/video.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  },
  {
    src: '/video/short-1.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  },
  {
    src: '/video/short-2.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  },
  {
    src: '/video/video.mp4',
    type: 'video/mp4',
    isCommentOpen: false,
    isShareOpen: false,
    isMenuOpen: false
  }
]

export const books = [
  {
    id: 1,
    name: 'Мухаммад Фатих',
    category: 'Исторические',
    author: 'Хэйтем Али',
    img: '/images/books/book1.jpg',
    desc: 'История того, как армия под предводительством султана Мухаммада захватила Константинопль. Мухаммад-Фатих великий мусульманский полководец, открыватель Стамбула,также говорят Исламбул (бывший Константинополь). Мух...',
    rating: '4.9',
    isLiked: false,
    epubSrc: '/epub/epub1.epub'
  },
  {
    id: 2,
    name: 'Мухаммад Фатих',
    category: 'Исторические',
    author: 'Хэйтем Али',
    img: '/images/books/book2.jpg',
    desc: 'История того, как армия под предводительством султана Мухаммада захватила Константинопль. Мухаммад-Фатих великий мусульманский полководец, открыватель Стамбула,также говорят Исламбул (бывший Константинополь). Мух...',
    rating: '4.9',
    isLiked: false,
    epubSrc: '/epub/epub2.epub'
  },
  {
    id: 3,
    name: 'Мухаммад Фатих',
    category: 'Исторические',
    author: 'Хэйтем Али',
    img: '/images/books/book3.jpg',
    desc: 'История того, как армия под предводительством султана Мухаммада захватила Константинопль. Мухаммад-Фатих великий мусульманский полководец, открыватель Стамбула,также говорят Исламбул (бывший Константинополь). Мух...',
    rating: '4.9',
    isLiked: false,
    epubSrc: '/epub/epub3.epub'
  },
  {
    id: 4,
    name: 'Мухаммад Фатих',
    category: 'Исторические',
    author: 'Хэйтем Али',
    img: '/images/books/book4.jpg',
    desc: 'История того, как армия под предводительством султана Мухаммада захватила Константинопль. Мухаммад-Фатих великий мусульманский полководец, открыватель Стамбула,также говорят Исламбул (бывший Константинополь). Мух...',
    rating: '4.9',
    isLiked: false,
    epubSrc: '/epub/epub4.epub'
  },
  {
    id: 5,
    name: 'Мухаммад Фатих',
    category: 'Исторические',
    author: 'Хэйтем Али',
    img: '/images/books/book1.jpg',
    desc: 'История того, как армия под предводительством султана Мухаммада захватила Константинопль. Мухаммад-Фатих великий мусульманский полководец, открыватель Стамбула,также говорят Исламбул (бывший Константинополь). Мух...',
    rating: '4.9',
    isLiked: false,
    epubSrc: '/epub/epub1.epub'
  },
  {
    id: 6,
    name: 'Мухаммад Фатих',
    category: 'Исторические',
    author: 'Хэйтем Али',
    img: '/images/books/book2.jpg',
    desc: 'История того, как армия под предводительством султана Мухаммада захватила Константинопль. Мухаммад-Фатих великий мусульманский полководец, открыватель Стамбула,также говорят Исламбул (бывший Константинополь). Мух...',
    rating: '4.9',
    isLiked: false,
    epubSrc: '/epub/epub2.epub'
  },
  {
    id: 7,
    name: 'Мухаммад Фатих',
    category: 'Исторические',
    author: 'Хэйтем Али',
    img: '/images/books/book3.jpg',
    desc: 'История того, как армия под предводительством султана Мухаммада захватила Константинопль. Мухаммад-Фатих великий мусульманский полководец, открыватель Стамбула,также говорят Исламбул (бывший Константинополь). Мух...',
    rating: '4.9',
    isLiked: false,
    epubSrc: '/epub/epub3.epub'
  },
  {
    id: 8,
    name: 'Мухаммад Фатих',
    category: 'Исторические',
    author: 'Хэйтем Али',
    img: '/images/books/book4.jpg',
    desc: 'История того, как армия под предводительством султана Мухаммада захватила Константинопль. Мухаммад-Фатих великий мусульманский полководец, открыватель Стамбула,также говорят Исламбул (бывший Константинополь). Мух...',
    rating: '4.9',
    isLiked: false,
    epubSrc: '/epub/epub4.epub'
  }
]

export const selectCategories = [
  {
    name: 'Ислам',
    isSubOpen: false,
    subcategories: [
      { name: 'Коран' },
      { name: 'Вероубеждение' },
      { name: 'Тафсир' },
      { name: 'Арабский язык' },
      { name: 'Хадисы' },
      { name: 'Истории' }
    ]
  },
  {
    name: 'Исламское право',
    isSubOpen: false,
    subcategories: [
      { name: 'Коран' },
      { name: 'Вероубеждение' },
      { name: 'Тафсир' },
      { name: 'Арабский язык' },
      { name: 'Хадисы' },
      { name: 'Истории' }
    ]
  },
  {
    name: 'Детям',
    isSubOpen: false,
    subcategories: [
      { name: 'Коран' },
      { name: 'Вероубеждение' },
      { name: 'Тафсир' },
      { name: 'Арабский язык' },
      { name: 'Хадисы' },
      { name: 'Истории' }
    ]
  },
  {
    name: 'Здоровье',
    isSubOpen: false,
    subcategories: [
      { name: 'Коран' },
      { name: 'Вероубеждение' },
      { name: 'Тафсир' },
      { name: 'Арабский язык' },
      { name: 'Хадисы' },
      { name: 'Истории' }
    ]
  },
  {
    name: 'Художественная литература',
    isSubOpen: false,
    subcategories: [
      { name: 'Коран' },
      { name: 'Вероубеждение' },
      { name: 'Тафсир' },
      { name: 'Арабский язык' },
      { name: 'Хадисы' },
      { name: 'Истории' }
    ]
  },
  {
    name: 'Научная литература',
    isSubOpen: false,
    subcategories: []
  },
  {
    name: 'Экономика и бизнес',
    isSubOpen: false,
    subcategories: []
  }
]
