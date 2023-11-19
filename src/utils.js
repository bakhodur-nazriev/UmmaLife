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
