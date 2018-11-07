<template>
    <section class="container">
        <Card class="card-box">
            <div>
                <h3> </h3>
                <p><Input v-model="account" placeholder="请输入账号" /></p>
                <p><Input v-model="password" placeholder="请输入密码" type="password"/></p>
                <Tooltip max-width="200" placement="bottom-end" content="如果忘记密码，请联系管理员电话：010-53013618 邮箱：kefu@startimes.com.cn">
                    <p class="forgetPwd"><a href="#">忘记密码?</a></p>
                </Tooltip>
                <p><Button type="primary" @click="toLogin" class="button">登录</Button></p>
            </div>
        </Card>
    </section>
</template>
<script>
export default {
    layout: 'login',
    data() {
        return {
            account: '',
            password: ''
        }
    },
    methods: {
        toLogin() {
            if (this.account == '' || this.password == '') {
                this.$Modal.error({
                    title: '登录失败',
                    content: '用户名/密码不能为空'
                })
                return
            } else {
                this.$axios
                    .post(
                        `/payment/mc/v2/merchant-operator/login?loginName=${
                            this.account
                        }&loginPassword=${this.password}`
                    )
                    .then(res => {
                        if (res.data.code == 0) {
                            localStorage.setItem('token', res.data.message)
                            this.$router.push('/manageAccount')
                        } else {
                            this.$Modal.error({
                                title: '登录失败',
                                content: '用户名/密码错误，请重新输入'
                            })
                        }
                    })
            }
        }
    }
}
</script>
<style scoped>
.container {
    min-height: 100vh;
    position: relative;
}
.card-box {
    width: 30%;
    margin: auto;
    height: 300px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.card-box p {
    margin: 20px auto;
    width: 300px;
}
.card-box .forgetPwd {
    text-align: right;
    margin-bottom: 0;
}
.card-box .button {
    width: 100%;
}
</style>
