<template>
    <section class="container">
        <div class="card-box">
            <div>
                <h3>{{$L.login.MerchantLogin}}</h3>
                <div class="p">
                    <Input v-model="account" :placeholder="$L.login.account" />
                </div>
                <div class="p">
                    <Input v-model="password" :placeholder="$L.login.password" type="password" />
                </div>
                <Tooltip max-width="200" placement="bottom-end" :content="$L.login.contact_way">
                    <div class="forgetPwd p">
                        <a href="#">{{$L.login.forgetPwd}}?</a>
                    </div>
                </Tooltip>
                <div class="p">
                    <Button type="primary" @click="toLogin" class="button">{{$L.login.login}}</Button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { setCookie } from '~/functions/utils'
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
                    title: this.$L.login.failure,
                    content: this.$L.login.cannot_be_empty
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
                            setCookie('token', res.data.data)
                            window.location.href =
                                this.$route.query.pre || '/mchant/'
                            setCookie('username', this.account)
                        } else {
                            this.$Modal.error({
                                title: this.$L.login.failure,
                                content: this.$L.login.re_enter
                            })
                        }
                    })
            }
        }
    },
    head() {
        return {
            title: this.$L.login.login
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
    border: 1px solid #ccc;
    border-radius: 5px;
}
.card-box h3 {
    height: 30px;
    font-size: 22px;
    margin-top: 20px;
}
.card-box .p {
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
