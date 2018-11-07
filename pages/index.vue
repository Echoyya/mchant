<template>
    <section class="container">
        <Card class="card-box">
            <div>
                <h3> </h3>
                <p><Input v-model="account" placeholder="请输入账号" /></p>
                <p><Input v-model="password" placeholder="请输入密码" /></p>
                <p class="forgetPwd"><a href="#">忘记密码?</a></p>
                <p><Button type="primary" to="completeInformation" class="button">登录</Button></p>
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
}
.card-box .button {
    width: 100%;
}
</style>
