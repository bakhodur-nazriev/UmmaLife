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
  }
}
