let auth_ignore = [
    /^\/mchant\/login/
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
export default function({ route, store, redirect }) {
    if (!inIgnore(route.path)) {
        if (store.state.token) {
            return true
        } else {
            return redirect('/mchant/login')
        }
    } else {
        return true
    }
}
