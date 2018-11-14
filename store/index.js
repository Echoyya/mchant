import Vue from 'vue'
import en_map from '~/language/en.json'
import zh_map from '~/language/zh.json'
export const state = () => ({
    token: '',
    lang: 'zh'
})
export const mutations = {
    SET_LANG: function(state, lang) {
        // language en/zh
        state.lang = lang || 'zh'
        if (lang == 'zh') {
            Vue.prototype.$L = zh_map
        } else {
            Vue.prototype.$L = en_map
        }
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
