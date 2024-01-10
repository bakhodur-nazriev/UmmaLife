<template>
  <li class="muvi__add--list" @click="isMapOpen = !isMapOpen">
    <div class="muvi__add--list-parent">
      <p><AddLocationIcon /> {{ $t('add_muvi.add_location') }}</p>
      <div class="muvi__add--selected" v-if="selectedValues.length > 0">
        {{ selectedValues[0].formatted_address }}
      </div>
    </div>
  </li>
  <teleport to="body">
    <div class="muvi__location--inner" v-show="isMapOpen">
      <div class="muvi__mobile--nav white">
        <button @click="isMapOpen = false" class="muvi__mobile--nav-btn">
          <ArrowLeftIcon />
        </button>
        <div class="muvi__mobile--nav-title">{{ $t('add_muvi.add_location') }}</div>
        <div class="left"></div>
      </div>
      <div class="muvi__location" v-on-click-outside="() => (isMapOpen = false)">
        <div class="muvi__location--title">{{ $t('add_muvi.add_location') }}</div>
        <div class="muvi__location--search">
          <LoupeIcon />
          <GoogleAutocomplete
            v-if="isRendered"
            v-model="inputValue"
            @set="getPayload($event)"
            :api-key="apiKey"
            :isFullPayload="true"
            type="search"
            :placeholder="$t('add_muvi.search')"
          />
        </div>
        <div class="muvi__location--map">
          <GoogleMap
            :api-key="apiKey"
            style="width: 100%; height: 100%"
            :libraries="['places']"
            :center="center"
            :zoom="12"
            :zoom-control="false"
            :map-type-control="false"
            :scale-control="false"
            :rotate-control="false"
            :fullscreen-control="false"
            :street-view-control="false"
          >
            <Marker :options="{ position: center }"></Marker>
          </GoogleMap>
        </div>
        <div class="muvi__location--middle">
          <button class="muvi__location--current" @click="getCoordinates">
            <AddLocationIcon /> <span>{{ $t('add_muvi.current_location') }}</span>
          </button>
          <ul class="muvi__location--menu" v-if="selectedValues.length > 0">
            <li
              class="muvi__location--list"
              v-for="(location, index) in selectedValues"
              :key="`${location.name}_${index}`"
              @click="getPayload(location, 'no-push')"
            >
              <div class="muvi__location--icon">
                <AddLocationIcon />
              </div>
              <div class="muvi__location--info">
                <div class="muvi__location--name">{{ location.name }}</div>
                <div class="muvi__location--address">
                  {{ location.formatted_address }}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="selected__option--action">
          <SampleButton
            :size="14"
            width="100%"
            :title="`${$t('add_muvi.done')}`"
            type="button"
            @click="isMapOpen = false"
          />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import { GoogleAutocomplete } from 'vue3-google-autocomplete'
import { vOnClickOutside } from '@vueuse/components'

import AddLocationIcon from '@/components/icons/shorts/AddLocationIcon.vue'
import LoupeIcon from '@/components/icons/LoupeIcon.vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

const apiKey = import.meta.env.VITE_GAPI_KEY
const center = ref({ lat: 41.015137, lng: 28.97953 })
const isRendered = ref(false)
const isMapOpen = ref(false)

const inputValue = ref('')
const selectedValues = ref([])

const emit = defineEmits(['passLocationDetails'])

const getPayload = (value, state = 'push') => {
  state === 'push' && selectedValues.value.unshift(value)
  center.value = { lat: value.geometry.location.lat(), lng: value.geometry.location.lng() }
  inputValue.value = ''

  emit('passLocationDetails', {
    location_name: value?.address_components[1]?.long_name,
    latitude: center.value.lat,
    longitude: center.value.lng
  })
}

const getCoordinates = () => {
  const succeed = async (pos) => {
    center.value = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }

    const map = new google.maps.Map(document.querySelector('.mapdiv map'))
    const marker = new google.maps.Marker({ position: center.value, map })
    const latLng = marker.getPosition()
    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({ latLng }, (results) => {
      try {
        if (results && results.length > 0) {
          selectedValues.value.unshift({
            ...results[0],
            name:
              results[0].address_components[1].long_name ||
              results[0].address_components[0].long_name
          })
        }
      } catch (err) {
        console.log(err)
      }
    })
  }
  const failure = (err) => {
    console.log(err)
  }
  const options = {
    enableHightAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
  navigator.geolocation.getCurrentPosition(succeed, failure, options)
}

onMounted(() => {
  setTimeout(() => (isRendered.value = true), 200)
})
</script>

<style lang="scss" scoped>
$black: var(--color-mine-shaft);
.muvi__location {
  max-width: 600px;
  width: 100%;
  border-radius: 20px;
  padding: 32px;
  background-color: var(--color-white);
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    max-width: 100%;
    height: 100dvh;
    border-radius: 0;
    padding: 84px 16px 20px;
  }
  &--inner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #1f1f1f, $alpha: 0.7);
    z-index: 100;
    .muvi__mobile--nav {
      display: none;
      .muvi__mobile--nav-btn {
        color: var(--color-mine-shaft);
      }
      @media (max-width: 767px) {
        display: flex;
      }
    }
    .selected__option--action {
      display: none;
      @media (max-width: 767px) {
        display: block;
      }
    }
  }
  &--title {
    font-size: 20px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    text-align: center;
    color: var(--color-mine-shaft);
    margin-bottom: 20px;
    @media (max-width: 767px) {
      display: none;
    }
  }
  &--middle {
    flex-grow: 1;
    flex-shrink: 1;
  }
  &--search {
    width: 100%;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    background-color: var(--color-seashell);
    margin-bottom: 12px;
    input {
      width: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
      &::placeholder {
        color: var(--color-secondary);
      }
    }
  }
  &--map {
    width: 100%;
    height: 281px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
    @media (max-width: 767px) {
      height: 180px;
      border-radius: 10px;
    }
  }
  &--current {
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-hippie-blue);
    cursor: pointer;
    margin-bottom: 20px;
    svg {
      width: 24px;
      height: 24px;
    }
    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
  &--menu {
    max-height: 220px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &--list {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }
  &--icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: var(--color-seashell);
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 20px;
      height: 20px;
      color: var(--color-secondary);
    }
  }
  &--name {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 6px;
  }
  &--address {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
    opacity: 0.5;
  }
}
.muvi__add {
  &--selected {
    margin-top: 8px;
    padding-left: 28px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-secondary);
  }
}
</style>
