export default {
  setEmail(state, email) {
    state.email = email
  },
  setPhoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber
  },
  setAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
  setSelectedTheme(state, selectedTheme) {
    state.selectedTheme = selectedTheme
  },
  setPublicationTabs(state, selectedTab) {
    state.publicationTab = selectedTab
  },
  setChangeTabStyle(state, shouldChangeStyle) {
    state.shouldChangeTabStyle = shouldChangeStyle
  },
  setPlayerMargin(state, margin) {
    state.playerMargin = margin
  },
  setShareOpen(state, isShareOpen) {
    state.isShareOpen = isShareOpen
  },
  setIsProfileTabsOpen(state, isProfileTabsOpen) {
    state.isProfileTabsOpen = isProfileTabsOpen
  },
  setIsSavedTabsOpen(state, isSavedTabsOpen) {
    state.isSavedTabsOpen = isSavedTabsOpen
  },
  setAccessToken(state, token) {
    state.accessToken = token
  },
  setLanguage(state, language) {
    state.selectedLanguage = language
  },
  setCallState(state, callState) {
    state.callState = callState
  },
  setCallerId(state, callerId) {
    state.callerId = callerId
  }
}
