import Vue from 'vue'
import iView from 'iview'
import en from 'iview/dist/locale/en-US'
import zh from 'iview/dist/locale/zh-CN'
import 'iview/dist/styles/iview.css'
import en_map from '~/language/en.json'
import zh_map from '~/language/zh.json'

export default ({ app, store }) => {
    if (store.state.lang == 'zh') {
        Vue.use(iView, { locale: zh })
        Vue.prototype.$L = zh_map
    } else {
        Vue.use(iView, { locale: en })
        Vue.prototype.$L = en_map
    }
}
