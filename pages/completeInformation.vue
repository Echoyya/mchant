<template>
    <section class="container">
        <div class="card-box" v-show="isNewUser">
            <p class="submitFaild">&nbsp;
                <span v-show="isNewUser&&submitOk == 1">
                    商户审核失败：**字段有问题。审核无法通过（内容由支付平台后台反馈）
                </span>
            </p>
            <Card class="mCard" >
                <p slot="title">联系人</p>
                <Row class="mtb15">
                    <Col span="3" offset="6">联系人姓名： <span class="required">*</span></Col>
                    <Col span="15"><Input v-model="linkman" placeholder="请输入联系人姓名" class="w300"/>
                        <p class="hint">请填写商户支付业务联系人的真实姓名，我们会在支付平台签约时进行实名认证</p>
                    </Col>
                </Row>
                <Row class="mtb15">
                    <Col span="3" offset="6">手机号码： <span class="required">*</span></Col>
                    <Col span="9"><Input v-model="phoneNumber" placeholder="请输入手机号码" class="w300" />
                        <p class="hint">用于接收支付平台支付的重要管理信息及日常操作验证码</p>
                    </Col>
                </Row>
                <Row class="mtb15">
                    <Col span="3" offset="6">验证码： <span class="required">*</span></Col>
                    <Col span="9"><Input v-model="verificationCode" class="w300" />
                        <p class="hint">请填写收到的验证码</p>
                    </Col>
                </Row>
                <Row class="mtb15">
                    <Col span="3" offset="6">常用邮箱： </Col>
                    <Col span="9"><Input v-model="email" class="w300" />
                        <p class="hint">用于接收支付平台的一些重要信息及账号密码等</p>
                    </Col>
                </Row>
            </Card>
            <Card class="mCard">
                <p slot="title">商户信息</p>
                <Row class="mtb15">
                    <Col span="3" offset="6">商户姓名： <span class="required">*</span></Col>
                    <Col span="9"><Input v-model="linkman" placeholder="请输入商名称"  class="w300" /></Col>
                </Row>
                <Row class="mtb15">
                    <Col span="3" offset="6">注册地址： <span class="required">*</span></Col>
                    <Col span="9"><Input v-model="phoneNumber" placeholder="请输入注册地址" class="w300" /></Col>
                </Row>
            </Card>
                <Button type="primary" class="button">确认提交</Button>
        </div>
        <div class="card-box submitOk" v-show="submitOk  == 2">
            <div>
                <img class="logo" src="~assets/img/submitOk.png" />
                <span>提交资料成功!</span>
                <p>我们会在1~3个工作日内完成审核，并通过短信、邮件向你通知审核结果。</p>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    layout: 'login',
    data() {
        return {
            isNewUser: true,
            submitOk: 0, // 未提交   1 提交失败  2 提交成功
            linkman: '',
            phoneNumber: '',
            verificationCode: '',
            email: ''
        }
    }
}
</script>
<style>
.container {
    min-height: 100vh;
    position: relative;
}
.w300 {
    width: 300px;
}
.mtb15 {
    margin: 15px 0;
}
.card-box {
    width: 80%;
    margin: 50px auto;
    border: 1px solid transparent;
    box-shadow: 0px 0px 2px 2px rgba(210, 210, 210, 0.5);
}
.mCard {
    width: 80%;
    margin: 0px auto 50px;
}
.mCard .hint {
    color: #999999;
    margin-top: 3px;
}
.mCard .required {
    color: #f00;
}
.card-box .button {
    display: block;
    margin: 0 auto 40px;
}
.submitOk {
    text-align: center;
    position: relative;
    height: 70vh;
    font-size: 18px;
    width: 60% !important;
}
.submitOk div {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 100px;
}
.submitOk span {
    font-weight: bold;
}
.submitOk p {
    margin-top: 20px;
}
.submitFaild {
    color: #f00;
    font-size: 20px;
    width: 80%;
    margin: 25px auto 5px;
}
</style>
