import { getCookie } from '~/functions/utils'
let auth_ignore = [
    /^\/login/
    // /^\/hybrid\/account\/logout/,
]
function inIgnore(url) {
    let result = false
    auth_ignore.forEach(item => {
        if (item.test(url)) {
            result = true
        }
    })
    return result
}
export default ({ app: { router }, store }) => {
    var token = getCookie('token')
    router.beforeEach((to, from, next) => {
        console.log(to.path)
        if (!inIgnore(to.path)) {
            if (token) {
                next()
            } else {
                next('/login?pre=' + encodeURIComponent(to.fullPath))
            }
        } else {
            next()
        }
    })
}
