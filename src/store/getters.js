/* eslint-disable */
import {useWindowSize} from '@vueuse/core'

export default {
	getEmail: (state) => state.email,
	getPhoneNumber: (state) => state.phoneNumber,
	getSelectedTheme: (state) => state.selectedTheme,
	isAuthenticated: (state) => state.isAuthenticated,
	getAuthenticated: (state) => state.isAuthenticated,
	getPublicationTab: (state) => state.publicationTab,
	shouldChangeTabStyle: (state) => state.shouldChangeTabStyle,
	screenWidth: () => {
		const {width} = useWindowSize()
		return width.value
	},
	getAccessToken: (state) => state.accessToken
}
