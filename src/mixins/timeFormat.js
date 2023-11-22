import momentTimezone from 'moment-timezone'

export const timeFormat = {
  methods: {
    multiFormatDateString(dateString = '') {
      const targetTimeZone = momentTimezone.tz.guess()

      const formattedDateString = dateString.replace(
        /(\d{2})\.(\d{2})\.(\d{4})T(\d{2}:\d{2}:\d{2})/,
        '$3-$2-$1T$4'
      )

      // Parse the formatted date string in UTC
      const inputDateUTC = new Date(formattedDateString + 'Z')

      // Convert UTC date to the target time zone
      const inputDate = new Date(inputDateUTC.toLocaleString('en-US', { timeZone: targetTimeZone }))

      // Get the current time in the target time zone
      const now = new Date().toLocaleString('en-US', { timeZone: targetTimeZone })

      // Calculate the time difference in milliseconds
      const timeDifference = new Date(now) - inputDate

      // Convert the time difference to seconds
      const seconds = Math.floor(timeDifference / 1000)

      // Define time intervals in seconds
      const minute = 60
      const hour = 60 * minute
      const day = 24 * hour
      const week = 7 * day

      // Calculate the time ago
      if (seconds < minute) {
        return this.$t('time.just_now')
      } else if (seconds < hour) {
        const minutes = Math.floor(seconds / minute)
        if (minutes > 1) {
          return `${minutes} ${this.$t('time.minutes_ago')}`
        } else {
          return `${minutes} ${this.$t('time.minute_ago')}`
        }
      } else if (seconds < day) {
        const hours = Math.floor(seconds / hour)
        if (hours > 1) {
          return `${hours} ${this.$t('time.hours_ago')}`
        } else {
          return `${hours} ${this.$t('time.hour_ago')}`
        }
      } else if (seconds < week) {
        const days = Math.floor(seconds / day)
        if (days > 1) {
          return `${days} ${this.$t('time.days_ago')}`
        } else {
          return `${days} ${this.$t('time.day_ago')}`
        }
      } else {
        return inputDate.toLocaleString('ru-RU', { timeZone: targetTimeZone })
      }
    }
  }
}
