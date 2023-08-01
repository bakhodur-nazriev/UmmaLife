export default {
  toggleTheme ({ commit, state }) {
    const newTheme = state.selectedTheme === 'light' ? 'dark' : 'light'
    commit('setSelectedTheme', newTheme)
  },
  login({ commit }) {
    // Логика для аутентификации пользователя
    // Установка isAuthenticated в true при успешной аутентификации
    commit('setAuthenticated', true)
  },
  logout({ commit }) {
    // Логика для выхода пользователя
    // Установка isAuthenticated в false при выходе
    commit('setAuthenticated', false)
  }
}
