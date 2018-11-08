export const state = () => ({
    token: '',
    lang: {}
})
export const mutations = {
    SET_LANG: function(state, lang) {
        // language en/zh
        state.lang = lang || 'en'
    },
    SET_TOKEN: function(state, token) {
        state.token = token
    }
}

export const actions = {
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    async nuxtServerInit({ commit }, { req, res }) {
        let _COOKIE = {}
        req.headers.cookie &&
            req.headers.cookie.split(';').forEach(Cookie => {
                var parts = Cookie.split('=')
                _COOKIE[parts[0].trim()] = (parts[1] || '').trim()
            })

        commit('SET_LANG', _COOKIE['lang'])
        commit('SET_TOKEN', _COOKIE['token'])
    }
}
