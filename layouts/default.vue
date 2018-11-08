<template>
    <div class="layout">
        <Layout>
            <Header class="mheader">
                <h1 class="title">商户管理后台</h1>
                <div class="user">
                    <span>你好,张三</span>
                    <span>
                        <Select v-model="language" size="small" style="width:100px">
                            <Option v-for="item in languageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </span>
                    <span><a href="#" class="logout">安全退出</a></span>
                </div>
            </Header>
            <nuxt />
            <Footer class="mfooter">
                <p>合作银行：中国银行&nbsp;&nbsp;农业银行&nbsp;&nbsp;工商银行&nbsp;&nbsp;建设银行</p>
                <p>友情链接：四达时代</p>
                <p>客服热线：010-53013618&nbsp;&nbsp;|&nbsp;&nbsp;客服邮箱:kefu@startimes.com.cn</p>
                <p>北京四达时代软件技术股份有限公司&nbsp;&nbsp;|&nbsp;&nbsp;关于四达&nbsp;&nbsp;|&nbsp;&nbsp;诚征英才&nbsp;&nbsp;|&nbsp;&nbsp;联系我们&nbsp;&nbsp;|&nbsp;&nbsp;开放平台</p>
                <p>Copyright © 2018 StarTimes All Rights Reserve</p>
            </Footer>
        </Layout>
    </div>
</template>
<script>
export default {
    data() {
        return {
            languageList: [
                {
                    value: 'Chinese',
                    label: '简体中文'
                },
                {
                    value: 'English',
                    label: 'English'
                }
            ],
            language: 'Chinese'
        }
    },
    created() {
        let token = this.$store.state.token
        if (token) {
            this.$axios.setHeader('X-Star-Token', this.$store.state.token)
        } else {
            this.$router.push('/login')
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
