<template>
  <div class="income__call--outer" v-show="callState.isCallOpen">
    <div class="income__call">
      <div class="income__call--inner">
        <div class="income__info" v-if="isCallStarted && callState?.isVideoCall">
          <div class="income__info--name">
            {{ userInfo?.callerFullName }}
          </div>
          <div class="income__info--time" v-if="callTimer">{{ callTimer }}</div>
          <div class="income__info--quality" v-if="callTimer">
            <QualityIndicatorIcon :quality="qualityConnection" />
          </div>
        </div>
        <div class="income__profile">
          <div class="income__profile--image">
            <img :src="userInfo?.callerAvatar" :alt="userInfo?.callerFullName" />
          </div>
          <div class="income__profile--content">
            <div class="income__profile--name">{{ userInfo?.callerFullName }}</div>
            <div class="income__profile--status">{{ message }}</div>
            <div class="income__info--time" v-if="callTimer && isCallAccepted">{{ callTimer }}</div>
          </div>
        </div>

        <div class="income__wrapper" v-if="isCallAccepted || callState.isInitiator">
          <button
            class="income__action--btn"
            @click="handleVideoOnOff"
            :class="{ active: isCameraOn }"
            v-if="callState?.isVideoCall"
          >
            <CameraOffIcon v-if="!isCameraOn" />
            <CameraOnIcon v-else />
          </button>
          <button
            class="income__action--btn"
            @click="isSoundOn = !isSoundOn"
            :class="{ active: isSoundOn }"
          >
            <SoundOnIcon v-if="isSoundOn" />
            <SoundOffIcon v-else />
          </button>
          <button class="income__action--btn" @click="handleMic" :class="{ active: isMicOn }">
            <MicOffIcon v-if="!isMicOn" />
            <MicOnIcon v-else />
          </button>
          <button class="income__action--btn reject" @click="rejectCall"><CallEndIcon /></button>
        </div>
        <div class="income__action" v-else>
          <div class="income__action--wrapper">
            <button class="income__action--btn accept" @click="answerCall">
              <PhoneIcon />
            </button>
            <span>Answer</span>
          </div>
          <div class="income__action--wrapper">
            <button class="income__action--btn reject" @click="rejectCall">
              <RejectIcon />
            </button>
            <span>Reject</span>
          </div>
        </div>

        <div class="userVideo">
          <video autoPlay playsinline :muted="!isSoundOn" id="remoteStream"></video>
        </div>
        <div class="myVideo" v-show="this.callState?.isVideoCall && isCallAccepted">
          <video muted autoPlay playsinline id="localStream"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import io from 'socket.io-client'
import { mapGetters, mapMutations, mapState } from 'vuex'

import PhoneIcon from '@/components/icons/RTCCall/PhoneIcon.vue'
import RejectIcon from '@/components/icons/RTCCall/RejectIcon.vue'
import CameraOffIcon from '@/components/icons/RTCCall/CameraOffIcon.vue'
import CameraOnIcon from '@/components/icons/RTCCall/CameraOnIcon.vue'
import SoundOnIcon from '@/components/icons/RTCCall/SoundOnIcon.vue'
import SoundOffIcon from '@/components/icons/RTCCall/SoundOffIcon.vue'
import MicOffIcon from '@/components/icons/RTCCall/MicOffIcon.vue'
import MicOnIcon from '@/components/icons/RTCCall/MicOnIcon.vue'
import CallEndIcon from '@/components/icons/RTCCall/CallEndIcon.vue'
import QualityIndicatorIcon from '@/components/icons/RTCCall/QualityIndicatorIcon.vue'

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`, {
  query: { hash: localStorage.getItem('hash') }
})

// Socket on event listeners
socket.emit('join', { user_id: localStorage.getItem('access_token') })

socket.on('connect', () => {
  console.log('Connected to the server')
})

export default {
  components: {
    PhoneIcon,
    RejectIcon,
    CameraOffIcon,
    CameraOnIcon,
    SoundOnIcon,
    SoundOffIcon,
    MicOffIcon,
    MicOnIcon,
    CallEndIcon,
    QualityIndicatorIcon
  },
  data() {
    return {
      userInfo: {
        callerAvatar: null,
        callerFullName: null
      },
      configuration: {
        iceServers: [
          {
            urls: 'stun:ulm.ummalife.com',
            username: 'test',
            credential: 'test'
          },
          {
            urls: [
              'turn:65.21.93.216:3478?transport=udp',
              'turn:65.21.93.216:3478?transport=tcp',
              'turn:65.21.93.216:3478',
              'turn:65.21.93.216:3479',
              'turn:65.21.93.216:8888'
            ],
            username: 'test',
            credential: 'test'
          }
        ]
      },
      localStream: null,
      remoteStream: null,
      dataChannel: null,
      currentCallerId: localStorage.getItem('user_id'),
      currentReceiverId: null,
      peerConnectionWebRTC: null,
      pendingCandidates: [],
      callId: null,
      localStreamRef: null,
      remoteStreamRef: null,
      isCallAccepted: false,
      isCameraOn: true,
      isSoundOn: true,
      isMicOn: true,
      callTimer: null,
      interval: null,
      isCallStarted: false,
      message: '',
      qualityConnection: 1,
      qualityInterval: null
    }
  },
  computed: {
    ...mapGetters('messenger', ['getSingleChat']),
    ...mapState(['callState'])
  },
  methods: {
    ...mapMutations(['setCallState']),
    handleMic() {
      this.isMicOn = !this.isMicOn
      if (this.remoteStream) {
        const audioTracks = this.remoteStream.getAudioTracks()
        audioTracks.forEach((track) => (track.enabled = this.isMicOn))
        console.log('Remote microphone audio playback enabled')
      } else {
        console.error('Remote stream is not defined')
      }
    },
    handleVideoOnOff() {
      this.isCameraOn = !this.isCameraOn

      if (this.localStream) {
        const videoTracks = this.localStream.getVideoTracks()
        if (videoTracks.length > 0) {
          const isCameraActive = videoTracks[0].enabled
          videoTracks.forEach((track) => (track.enabled = !isCameraActive))
          if (this.dataChannel.readyState === 'open') {
            console.log(this.dataChannel.readyState, isCameraActive)
            this.dataChannel.send(
              JSON.stringify({
                isShowLocalVideo: !isCameraActive
              })
            )
          }

          console.log(`Local video stream ${isCameraActive ? 'disabled' : 'enabled'}`)
        }
      }
    },
    stopCallTimer() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
        this.callTimer = 0
      }
    },
    updateCallTimerDisplay(time) {
      const elapsedTime = Date.now() - time
      const seconds = Math.floor(elapsedTime / 1000) % 60
      const minutes = Math.floor(elapsedTime / 60000)
      const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      this.callTimer = timeStr
    },
    async initCall() {
      this.currentReceiverId = this.getSingleChat?.chatId
      this.message = 'Setting up a connection...'
      await this.getLocalStream()
      await this.startCall(this.$route.params.id)
    },
    async answerCall() {
      await this.getLocalStream()
      await this.acceptCall()
    },
    rejectCall() {
      socket.emit('webrtc-call-ended', {
        callStatus: 'ended',
        callerId: this.currentCallerId,
        receiverId: this.currentReceiverId,
        callId: this.callId
      })

      this.clearCall()
      console.log('Call rejected')
    },
    clearCall() {
      this.setCallState({ isCallOpen: false, isVideoCall: false, isInitiator: false })

      this.isCallAccepted = false
      this.isCallStarted = false
      this.stopCallTimer()

      if (this.localStream) {
        this.localStream.getTracks().forEach((track) => track.stop())
        this.localStream = null
      }

      if (this.remoteStream) {
        this.remoteStream.getTracks().forEach((track) => track.stop())
        this.remoteStream = null
      }

      if (this.peerConnectionWebRTC) {
        this.peerConnectionWebRTC.close()
        this.peerConnectionWebRTC = null
      }

      // Обновите DOM соответствующим образом
      this.localStreamRef.srcObject = null
      this.remoteStreamRef.srcObject = null
      this.message = ''
      this.isCallAccepted = false
      this.isCameraOn = true
      this.isSoundOn = true
      this.isMicOn = true
    },

    async getLocalStream() {
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: this.callState?.isVideoCall,
          audio: true
        })

        if (!this.peerConnectionWebRTC) {
          this.createPeerConnection()
        }
        this.localStreamRef.srcObject = this.localStream

        this.localStream.getTracks().forEach((track) => {
          this.peerConnectionWebRTC.addTrack(track, this.localStream)
        })
      } catch (error) {
        console.error('Error accessing media devices.', error)
      }
    },
    createPeerConnection() {
      this.peerConnectionWebRTC = new RTCPeerConnection(this.configuration)

      // Создание Data Channel
      this.dataChannel = this.peerConnectionWebRTC.createDataChannel('videoControlChannel')
      this.dataChannel.onopen = () => {
        console.log('Data channel is open')
        socket.emit('webrtc-datachannel-state', {
          callId: this.callId,
          state: 'open'
        })
      }
      this.dataChannel.onclose = () => {
        console.log('Data channel is closed')
        socket.emit('webrtc-datachannel-state', {
          callId: this.callId,
          state: 'closed'
        })
      }
      this.dataChannel.onerror = (error) => {
        socket.emit('webrtc-datachannel-state', {
          callId: this.callId,
          state: 'error'
        })
        console.error('DataChannel error:', error)
      }
      this.dataChannel.onmessage = (event) => {
        console.log(event)
        this.handleDataChannelMessage(event.data)
      }

      this.peerConnectionWebRTC.ondatachannel = (event) => {
        this.dataChannel = event.channel
        this.dataChannel.onmessage = (event) => {
          this.handleDataChannelMessage(event.data)
          console.log('Received message on remote:', event.data)
        }
        this.dataChannel.onopen = () => {
          console.log('Data channel is open')
        }
        this.dataChannel.onclose = () => {
          console.log('Data channel is closed')
        }
        this.dataChannel.onerror = (error) => {
          console.error('DataChannel error:', error)
        }
      }

      // Добавление накопленных кандидатов после установки удаленного описания
      this.peerConnectionWebRTC.oniceconnectionstatechange = () => {
        const state = this.peerConnectionWebRTC.iceConnectionState
        socket.emit('webrtc-connection-state-change', {
          callId: this.callId,
          state: state
        })
        console.log(`ICE ConnectionState: ${state}`)
        if (state === 'new' || state === 'checking') {
          this.pendingCandidates.forEach((candidate) => {
            this.peerConnectionWebRTC.addIceCandidate(candidate)
          })
          this.pendingCandidates = []
        }
      }

      this.peerConnectionWebRTC.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('Отправил CANDIDATE')

          socket.emit('webrtc-candidate', {
            candidate: event.candidate,
            receiverId: this.callState.isInitiator ? this.currentReceiverId : this.currentCallerId,
            callId: this.callId
          })
        }
      }

      this.peerConnectionWebRTC.ontrack = (event) => {
        if (!this.remoteStream) {
          this.remoteStream = new MediaStream()
        }
        this.remoteStream.addTrack(event.track)
        this.remoteStreamRef = document.getElementById('remoteStream')
        this.remoteStreamRef.srcObject = this.remoteStream
      }

      console.log('PeerConnection created')
      console.log(`Initial SignalingState: ${this.peerConnectionWebRTC.signalingState}`)
      console.log(`Initial ConnectionState: ${this.peerConnectionWebRTC.connectionState}`)
    },
    async startCall(userId) {
      this.currentReceiverId = userId
      if (!this.peerConnectionWebRTC) this.createPeerConnection()
      try {
        const offer = await this.peerConnectionWebRTC.createOffer()

        console.log('Отправил OFFER')

        await this.peerConnectionWebRTC.setLocalDescription(offer)

        socket.emit(
          'webrtc-call-initiate',
          {
            receiverId: userId,
            callerId: localStorage.getItem('access_token'), // токен пользователя
            isVideoCall: this.callState?.isVideoCall,
            offer: offer
          },
          (response) => {
            this.callId = response.callId
          }
        )
        socket.emit('webrtc-offer', {
          offer,
          receiverId: userId
        })
        if (this.callState?.isInitiator) {
          this.message = `Outgoing ${this.callState?.isVideoCall ? 'video' : 'audio'} call`
        }
        // console.log('Call started with offer');
      } catch (error) {
        console.error('Error during start call:', error)
      }
    },
    async acceptCall() {
      if (!this.peerConnectionWebRTC) {
        console.error('PeerConnection is not initialized')
        return
      }

      this.isCallAccepted = true

      try {
        if (
          this.peerConnectionWebRTC.remoteDescription &&
          this.peerConnectionWebRTC.remoteDescription.type === 'offer'
        ) {
          const answer = await this.peerConnectionWebRTC.createAnswer()
          await this.peerConnectionWebRTC.setLocalDescription(answer)

          socket.emit('webrtc-answer', {
            answer,
            callerId: this.currentCallerId,
            callId: this.callId
          })
          console.log('Отправил ANSWER')
        } else {
          console.error('Remote description is not set or not an offer')
        }
      } catch (error) {
        console.error('Error during accepting call:', error)
      }
    },
    handleDataChannelMessage(message) {
      console.log('handleDataChannelMessage', message)
    },
    evaluateConnectionQuality(stats) {
      let quality = 0 // Предполагаем, что качество изначально низкое
      let jitterValue = 0
      let hasJitterValue = false

      stats.forEach((report) => {
        if (report.type === 'inbound-rtp' && !report.isRemote) {
          if (report.jitter !== undefined) {
            jitterValue = report.jitter
            hasJitterValue = true
          }
        }
      })

      if (hasJitterValue) {
        // Определение качества связи на основе jitter
        if (jitterValue < 0.005) quality = 4 // Отличное качество
        else if (jitterValue < 0.01) quality = 3 // Хорошее качество
        else if (jitterValue < 0.015) quality = 2 // Удовлетворительное качество
        else quality = 1 // Плохое качество
      }

      this.qualityConnection = quality
    }
  },
  watch: {
    callState: {
      async handler(callState) {
        if (callState.isInitiator) {
          this.userInfo = {
            callerAvatar: this.getSingleChat?.chatImage,
            callerFullName: this.getSingleChat?.chatName
          }
          await this.initCall()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.localStreamRef = document.getElementById('localStream')
    this.remoteStreamRef = document.getElementById('remoteStream')

    this.remoteStreamRef.onloadedmetadata = async () => {
      try {
        console.log('Remote video metadata loaded, attempting to play...')
        await this.remoteStreamRef.play()
        this.isCallStarted = true
        const callStartTime = Date.now()
        this.interval = setInterval(() => this.updateCallTimerDisplay(callStartTime), 1000)
      } catch (e) {
        console.error('Error starting remote video playback:', e)
      }
    }
    this.remoteStreamRef.onplay = () => {
      console.log('Remote video started playing')
    }

    socket.on('webrtc-call-initiate', async (data) => {
      console.log('ON: webrtc-call-initiate:', data)
      this.setCallState({ isCallOpen: true, isInitiator: false, isVideoCall: data?.isVideoCall })
      this.message = `Incoming ${data?.isVideoCall ? 'video' : 'audio'} call`
      this.userInfo = {
        callerAvatar: data?.callerAvatar,
        callerFullName: data?.callerFullName
      }
      this.callId = data.callId
      this.currentCallerId = data.callerId
      this.currentReceiverId = data?.receiverId

      console.log('Incoming call from', data.callerId)
    })

    socket.on('webrtc-call-ended', (data) => {
      console.log('Call ended with status:', data.callStatus)

      this.clearCall()
    })

    socket.on('webrtc-offer', async (data) => {
      this.currentReceiverId = data?.receiverId
      if (!this.peerConnectionWebRTC) this.createPeerConnection()

      try {
        console.log('Получил OFFER')
        await this.peerConnectionWebRTC.setRemoteDescription(new RTCSessionDescription(data.offer))
        // console.log('Offer set as remote description');
      } catch (error) {
        console.error('Error handling webrtc-offer:', error)
      }
    })

    socket.on('webrtc-answer', async (data) => {
      try {
        console.log('Получил ANSWER')
        if (!this.peerConnectionWebRTC) this.createPeerConnection()
        this.isCallAccepted = true

        await this.peerConnectionWebRTC.setRemoteDescription(new RTCSessionDescription(data.answer))
        // console.log('Answer set as remote description');
        // Когда удаленное описание установлено, добавляем все накопленные кандидаты
        while (this.pendingCandidates.length > 0) {
          const candidate = this.pendingCandidates.shift()
          await this.peerConnectionWebRTC.addIceCandidate(candidate)
          // console.log('ICE candidate added after answer');

          // $('#callBtn').trigger('click'); // Временный обход для автоподключения
        }
      } catch (error) {
        console.error('Error setting remote description from answer:', error)
      }
    })

    socket.on('webrtc-candidate', async (data) => {
      // console.log('Получил CANDIDATE: ', data);
      try {
        const candidateRegex = /raddr (\d+\.\d+\.\d+\.\d+)/
        const match = data.candidate.candidate.match(candidateRegex)
        if (match && match[1]) {
          console.log('Получил CANDIDATE' + match[1])
        }
        if (this.peerConnectionWebRTC.remoteDescription) {
          await this.peerConnectionWebRTC.addIceCandidate(data.candidate)
        } else {
          this.pendingCandidates.push(data.candidate)
        }
      } catch (error) {
        console.error('Error adding received ice candidate:', error)
      }
    })

    this.qualityInterval = setInterval(async () => {
      try {
        if (this.peerConnectionWebRTC) {
          const stats = await this.peerConnectionWebRTC.getStats(null)
          this.evaluateConnectionQuality(stats)
        }
      } catch (err) {
        console.error('Error getting stats:', err)
      }
    }, 5000)
  },
  beforeDestroy() {
    socket.disconnect()
    clearInterval(this.qualityInterval)
  }
}
</script>

<style lang="scss" scoped>
.income {
  &__call {
    max-width: 65vw;
    min-width: 500px;
    width: 100%;
    background-color: #1f1f1f;
    border-radius: 20px;
    border: 0.5px solid #f1f1f1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    max-height: 80vh;
    min-height: 80vh;
    @media (max-width: 1140px) {
      max-width: 80vw;
    }
    @media (max-width: 991px) {
      max-width: 90vw;
    }
    @media (max-width: 767px) {
      max-width: 100%;
      min-width: 100%;
      max-height: 100dvh;
      min-height: 100dvh;
      border-radius: 0;
      border: none;
    }
    &--inner {
      padding: 3% 50px 50px;
      position: relative;
      min-height: 80vh;
      max-height: 80vh;
      @media (max-width: 767px) {
        max-height: 100dvh;
        min-height: 100dvh;
        padding: 20px;
      }
    }
    &--outer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.7);
      z-index: 300;
    }
  }
  &__profile {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    gap: 18px;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -30%);

    &--image {
      width: 246px;
      height: 246px;
      outline: 10px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: block;
      border: 10px solid #6f6f6f;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
      }
      @media (max-width: 767px) {
        width: 120px;
        height: 120px;
        outline: 5px solid rgba(255, 255, 255, 0.2);
        border: 5px solid #6f6f6f;
      }
    }
    &--name {
      font-size: 24px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-stable-white);
      margin-bottom: 8px;
      @media (max-width: 767px) {
        font-size: 18px;
      }
    }
    &--status {
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-stable-white);
      margin-bottom: 8px;
      @media (max-width: 767px) {
        font-size: 14px;
      }
    }
  }
  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
    z-index: 50;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 50px;
    &--wrapper {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 12px;
      span {
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-stable-white);
      }
    }
    &--btn {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--color-stable-white);
      cursor: pointer;
      border: none;
      outline: none;
      background-color: rgba(255, 255, 255, 0.2);
      transition: all 0.3s;

      &:hover {
        scale: 1.1;
      }
      &.active {
        background-color: var(--color-stable-white);
        color: var(--color-secondary);
      }
      &.accept {
        background-color: #44db56;
      }
      &.reject {
        background-color: #ef2423;
      }
      svg {
        display: block;
        width: 32px;
        height: 32px;
      }
      @media (max-width: 767px) {
        width: 45px;
        height: 45px;
        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
  &__wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;
    position: absolute;
    z-index: 70;
    left: 50%;
    transform: translate(-50%);
    bottom: 50px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 60;
    @media (max-width: 767px) {
      transform: translateX(40%);
      left: 0;
      flex-direction: row-reverse;
      gap: 10px;
    }
    &--name {
      text-align: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-stable-white);
      margin-bottom: 8px;
      @media (max-width: 767px) {
        font-size: 14px;
        margin-bottom: 0;
        display: none;
      }
    }
    &--time {
      text-align: center;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      padding: 9px 12px;
      color: var(--color-stable-white);
      width: fit-content;
      margin: 0 auto 8px;
      @media (max-width: 767px) {
        margin: 0 auto;
        font-size: 14px;
        border-radius: 5px;
        padding: 4px 6px;
      }
    }
    &--quality {
      svg {
        display: block;
      }
    }
  }
}
</style>

<style lang="scss">
.myVideo {
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 200px;
  height: 140px;
  border-radius: 10px;
  border: 1px solid #f1f1f1;
  overflow: hidden;
  z-index: 50;

  video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  @media (max-width: 767px) {
    bottom: unset;
    top: 12px;
    right: 12px;
    width: 150px;
    height: 230px;
  }
}
.userVideo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
