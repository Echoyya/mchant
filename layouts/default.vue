<template>
    <div class="layout">
        <Layout>
            <Header class="mheader">
                <h1 class="title">{{$L.head_footer.title}}</h1>
                <div class="user">
                    <span>你好,张三</span>
                    <span>
                        <Select v-model="language" size="small" style="width:100px" @on-change="changeLang($event)">
                            <Option v-for="item in languageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </span>
                    <span class="logout" @click="logout">{{$L.head_footer.logout}}</span>
                </div>
            </Header>
            <nuxt/>
            <Footer class="mfooter">
                <p>{{$L.head_footer.cooperative}}中国银行&nbsp;&nbsp;农业银行&nbsp;&nbsp;工商银行&nbsp;&nbsp;建设银行</p>
                <p>{{$L.head_footer.blogroll_startimes}}</p>
                <p>{{$L.head_footer.customer_hotline}}010-53013618&nbsp;&nbsp;|&nbsp;&nbsp;{{$L.head_footer.service_mailbox}}kefu@startimes.com.cn</p>
                <p>{{$L.head_footer.startimes}}&nbsp;&nbsp;|&nbsp;&nbsp;{{$L.head_footer.about}}&nbsp;&nbsp;|&nbsp;&nbsp;{{$L.head_footer.inviting_talents}}&nbsp;&nbsp;|&nbsp;&nbsp;{{$L.head_footer.contact_us}}&nbsp;&nbsp;|&nbsp;&nbsp;{{$L.head_footer.open_platform}}</p>
                <p>Copyright © 2018 StarTimes All Rights Reserve</p>
            </Footer>
        </Layout>
    </div>
</template>
<script>
import { delCookie, setCookie } from '~/functions/utils'

export default {
    data() {
        return {
            languageList: [
                {
                    value: 'zh',
                    label: '简体中文'
                },
                {
                    value: 'en',
                    label: 'English'
                }
            ],
            language: this.$store.state.lang
        }
    },
    created() {
        let token = this.$store.state.token
        if (token) {
            this.$axios.setHeader('X-Star-Token', this.$store.state.token)
        } else {
            this.$router.push('/mchant/login')
        }
    },
    methods: {
        logout() {
            setCookie('token', '')
            this.$router.push('/mchant/login')
        },
        changeLang(lang) {
            setCookie('lang', lang)
            window.location.reload()
        }
    }
}
</script>
<style scoped>
.mheader {
    background: rgb(0, 102, 153);
    position: relative;
}
.mheader .title {
    color: #fff;
    font-size: 30px;
    font-weight: 500;
}
.mheader .user {
    color: #fff;
    height: 22px;
    position: absolute;
    right: 0;
    top: 20px;
    line-height: 22px;
}
.mheader .user span {
    display: inline-block;
    padding: 0 20px;
}
.mheader .user span + span {
    border-left: 2px solid #ffffff;
}
.mheader .logout {
    color: #ffffff;
    cursor: pointer;
}
.mfooter {
    color: #ffffff;
}
.mfooter {
    background: rgb(0, 102, 153);
}
.mfooter p {
    margin: 15px 0;
}
</style>
