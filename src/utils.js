import nacl from 'tweetnacl'
import { decodeUTF8, decodeBase64, encodeBase64 } from 'tweetnacl-util'

export const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export const getFormData = (options) => {
  const formData = new FormData()
  for (const key in options) {
    formData.append(key, options[key])
  }

  return formData
}

export function extractHashtagsAndText(inputText) {
  const regex = /#\[([0-9]+)\]/g
  const hashtagsArray = []
  let match
  let textWithoutHashtags = inputText

  while ((match = regex.exec(inputText)) !== null) {
    hashtagsArray.push(match[1])
    textWithoutHashtags = textWithoutHashtags.replace(match[0], '') // Remove the matched hashtag from text
  }

  return {
    hashtags: hashtagsArray,
    textWithoutHashtags: textWithoutHashtags.trim() // Trim the resulting text
  }
}

export function extractNumericKeys(obj) {
  const numericKeys = []

  for (const key in obj) {
    if (!isNaN(key)) {
      numericKeys.push({
        icon_id: key,
        reaction_count: obj[key]
      })
    }
  }

  return numericKeys
}

export function validateVideoFile(file) {
  // Check if the file is a video
  const allowedVideoTypes = ['video/mp4']
  if (!allowedVideoTypes.includes(file.type)) {
    return {
      status: 404,
      message: 'add_muvi.errors.invalid_type'
    }
  }

  // Check video size (in megabytes)
  const maxSizeMB = 50
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      status: 404,
      message: 'add_muvi.errors.size_error'
    }
  }

  // Check video duration (in seconds)
  const maxDurationSeconds = 300 // 5 minutes
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = function () {
      const duration = video.duration
      if (duration > maxDurationSeconds) {
        // eslint-disable-next-line
        reject({
          status: 404,
          message: 'add_muvi.errors.duration'
        })
      } else {
        resolve({
          status: 200,
          message: 'add_muvi.success'
        })
      }
    }

    video.onerror = function () {
      // eslint-disable-next-line
      reject({
        status: 200,
        message: 'add_muvi.errors.loading_error'
      })
    }

    video.src = URL.createObjectURL(file)
  })
}

export const copyClipboard = async (link) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(link)
      return 'links.link_copied'
    } catch (error) {
      console.error('Error sharing link:', error)
      return 'links.link_copy_error'
    }
  }
  return 'links.link_copy_error'
}
export const convertDate = (inputDateString) => {
  const inputDate = new Date(inputDateString)

  // Extract components of the date
  const day = inputDate.getUTCDate()
  const month = inputDate.getUTCMonth() + 1 // Months are zero-based, so add 1
  const year = inputDate.getUTCFullYear()
  const hours = inputDate.getUTCHours()
  const minutes = inputDate.getUTCMinutes()
  const seconds = inputDate.getUTCSeconds()

  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}T${String(
    hours
  ).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function addLinksToTaggedUsers(text, taggedUsers = [], lang = 'ru') {
  // Create a regular expression to match any tagged username
  const regex = /@\w+/g

  // Replace each tagged username with an HTML link
  const newText = text.replace(regex, (match) => {
    const username = match.substring(1) // Remove "@" symbol

    // Find the user object in the array based on the username
    const user = taggedUsers.find((user) => user.username === username)

    if (user) {
      // Replace the username with an HTML link using user properties
      return `<router-link to="/${lang}/${user?.user_id}">@${user?.username}</router-link>`
    } else {
      return match // If the username is not in the array, keep it unchanged
    }
  })

  return newText
}

export function encryptPrivateKey(privateKey) {
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength)
  const key = nacl.randomBytes(nacl.secretbox.keyLength)

  const messageUint8 = new TextEncoder().encode(privateKey)

  const box = nacl.secretbox(messageUint8, nonce, key)
  const fullMessage = new Uint8Array(nonce.length + box.length)
  fullMessage.set(nonce)
  fullMessage.set(box, nonce.length)
  return encodeBase64(fullMessage)
}

export function decryptPrivateKey(encryptedPrivateKey, key) {
  const uint8Array = decodeBase64(encryptedPrivateKey)
  const nonce = uint8Array.slice(0, nacl.secretbox.nonceLength)
  const message = uint8Array.slice(nacl.secretbox.nonceLength)

  const decrypted = nacl.secretbox.open(message, nonce, key)
  if (!decrypted) {
    throw new Error('Could not decrypt private key')
  }
  return decodeUTF8(decrypted)
}

export function convertAndCompareFileSize(fileSizeInBytes) {
  const fileSizeInKB = fileSizeInBytes / 1024
  const fileSizeInMB = fileSizeInKB / 1024

  if (fileSizeInMB >= 1) {
    return {
      sizeCategory: 'MB',
      size: fileSizeInMB.toFixed(2)
    }
  } else if (fileSizeInKB >= 1) {
    return {
      sizeCategory: 'KB',
      size: fileSizeInKB.toFixed(2)
    }
  } else {
    return {
      sizeCategory: 'Bytes',
      size: fileSizeInBytes.toFixed(2)
    }
  }
}
