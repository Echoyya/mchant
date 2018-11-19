<template>
    <section class="container">
        <div class="tab-box">
            <Tabs :animated="false">
                <TabPane label="账户管理">
                    <Card :bordered="false" :dis-hover="true" class="mCard mb15">
                        <h3>账户信息</h3>
                        <Row class="row mb15">
                            <Col span="2"> 商户号： </Col>
                            <Col span="5"> M0123456789876543210 </Col>
                            <Col span="2">手机号： </Col>
                            <Col span="4">未绑定 </Col>
                            <Col span="4">
                            <Button type="primary" size="small">绑定</Button>
                            </Col>
                        </Row>
                        <Row class="row">
                            <Col span="2"> 商户名称： </Col>
                            <Col span="5"> 某某股份有限公司 </Col>
                            <Col span="2">邮箱： </Col>
                            <Col span="4">未绑定 </Col>
                            <Col span="4">
                            <Button type="primary" size="small">绑定</Button>
                            </Col>
                        </Row>
                    </Card>
                    <Card :bordered="false" :dis-hover="true" class="mCard mb15">
                        <h3>昨日成功交易汇总（按国家）</h3>
                        <Row>
                            <Col span="8" v-for="(item, index) in tradeTotelYesterday" :key="index">
                            <p class="row mb15 fontbold">{{item.country}}</p>
                            <p class="row">订单总金额：{{item.successAmount}}</p>
                            <p class="row">货币符号：{{item.currency}}</p>
                            <p class="row">成功笔数：{{item.successCount}} 笔</p>
                            </Col>
                        </Row>

                    </Card>
                    <Card :bordered="false" :dis-hover="true" class="mCard mb15">
                        <h3>应用密钥及交易密码管理</h3>
                        <Button type="primary" class="mb15" @click="addApp"> 添加应用 </Button>
                        <Modal title="添加应用" v-model="showAppModal" @on-ok="ok" @on-cancel="cancel" ok-text="确定" cancel-text="取消" width="400">
                            <Row class="mb15 lh32">
                                 <Col span="6">
                                    应用名称：<span class="required">*</span>
                                </Col>
                                <Col span="12"><Input v-model="appName" placeholder="请输入应用名称" class="w240" /></Col>
                            </Row>
                            <Row class="mb15 lh32">
                                <Col span="6"> 钱包账号：</Col>
                                <Col span="12"><Input v-model="appName" placeholder="请输入钱包账号" class="w240" /></Col>
                            </Row>
                            <Row class="mb15 lh32">
                                <Col span="6"> 支付通知Url：</Col>
                                <Col span="12"><Input v-model="appName" placeholder="请输入支付通知Url" class="w240" /></Col>
                            </Row>
                            <Row class="mb15 lh32">
                                <Col span="6"> 退款通知Url：</Col>
                                 <Col span="12"><Input v-model="appName" placeholder="请输入退款通知Url" class="w240" /></Col>
                            </Row>
                        </Modal>
                        <p class="mb15 fontbold">应用列表</p>
                        <Row class="mb15">
                            <Col span="8">
                            <p> 应用1：
                                <Button type="primary" @click="createKey"> 生成密钥 </Button>
                            </p>
                            <p> 密钥：</p>
                            <p>
                                <a href="#">设置交易密码</a>
                            </p>
                            <p> 交易密码:
                                <span v-show="tradingPwd==''">无</span>
                                <span v-show="tradingPwd!=''">{{tradingPwd}}</span>
                            </p>
                            </Col>
                        </Row>
                    </Card>
                </TabPane>
                <TabPane label="交易查询">
                    <Card :bordered="false" :dis-hover="true" class="mCard mb15">
                        <p>业务类型：
                            <Button :type="currentType == 1 ? 'primary':'default'" @click="changeCurrType(1)" class="btn">交易记录</Button>
                            <Button :type="currentType == 2 ? 'primary':'default'" @click="changeCurrType(2)" class="btn">退款记录</Button>
                            <Button :type="currentType == 3 ? 'primary':'default'" @click="changeCurrType(3)" class="btn">交易汇总</Button>
                        </p>
                        <div v-show="currentType==1">
                            <div>
                                <span> 国家：</span>
                                <Select v-model="country1" class="mr15 w160" placeholder="选择国家">
                                    <Option v-for="item in countryList" :value="item.country" :key="item.value">{{ item.name }}</Option>
                                </Select>
                                 <span> 订单状态：</span>
                                <Select v-model="orderStauts1" class="mr15 w160" placeholder="请选择">
                                    <Option v-for="item in orderStautsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Select v-model="orderType1" class="mr15 w160" placeholder="请选择">
                                    <Option v-for="item in orderTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="orderNum1" placeholder="请输入订单号" class="w160" />
                            </div>
                            <div>
                                <span> 交易时间：</span>
                                <DatePicker v-model="dateRecord" format="yyyy年MM月dd" type="daterange" placement="bottom-start" placeholder="请选择起始日期" class="w240"></DatePicker>
                                <Button type="primary" class="search" @click="searchOrder(currentType)">搜索</Button>
                                <Button>下载</Button>
                            </div>
                            <Table border :columns="columns1" :data="tableData1" :stripe="true"></Table>
                            <Page :total="tableData1.length" :current="1" :transfer="true" show-sizer show-elevator :page-size-opts="pageSizeOpts" class="pageStyle" />
                        </div>
                        <div v-show="currentType==2">
                            <div>
                                <span> 国家：</span>
                                <Select v-model="country2" class="mr15 w160" placeholder="选择国家">
                                    <Option v-for="item in countryList" :value="item.country" :key="item.value">{{ item.name }}</Option>
                                </Select>
                                订单状态：
                                <Select v-model="orderStauts2" class="mr15 w160" placeholder="请选择">
                                    <Option v-for="item in refundStautsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Select v-model="orderType2" class="mr15 w160" placeholder="请选择">
                                    <Option v-for="item in orderTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="orderNum2" placeholder="请输入订单号" class="w160" />
                            </div>
                            <div>
                                申请退款时间：
                                <DatePicker v-model="dateRefund" format="yyyy年MM月dd" type="daterange" placement="bottom-start" placeholder="请选择起始日期" class="w240"></DatePicker>
                                <Button type="primary" class="search" @click="searchOrder(currentType)">搜索</Button>
                                <Button>下载</Button>
                            </div>
                            <Table border :columns="columns2" :data="tableData2" :stripe="true"></Table>
                            <Page :total="tableData2.length" :current="1" :transfer="true" show-sizer show-elevator :page-size-opts="pageSizeOpts" class="pageStyle" />
                        </div>
                        <div v-show="currentType==3">
                            <div>时间选择：
                                <Button :type="range == '1'? 'primary':'default'" @click="range='1'" class="btn">近一周</Button>
                                <Button :type="range == '2' ? 'primary':'default'" @click="range='2'" class="btn">近一个月</Button>
                                <Button :type="range == '3' ? 'primary':'default'" @click="range='3'" class="btn">近三个月</Button>
                                <DatePicker v-model="dateCollect" format="yyyy年MM月dd" type="daterange" placement="bottom-start" placeholder="请选择起始日期" class="w240"></DatePicker>
                            </div>
                            <div>
                                国家：
                                <Select v-model="country3" class="mr15 w160" placeholder="选择国家">
                                    <Option v-for="item in countryList" :value="item.country" :key="item.value">{{ item.name }}</Option>
                                </Select>
                                <Button type="primary" class="search">搜索</Button>
                            </div>
                            <Table border :columns="columns3" :data="tableData3" :stripe="true"></Table>
                        </div>
                    </Card>
                </TabPane>
            </Tabs>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            countryList: [],
            orderStautsList: [
                {
                    value: '1',
                    label: '未付款'
                },
                {
                    value: '2',
                    label: '付款中'
                },
                {
                    value: '3',
                    label: '已付款'
                },
                {
                    value: '4',
                    label: '付款失败'
                },
                {
                    value: '5',
                    label: '退款'
                }
            ],
            refundStautsList: [
                {
                    value: '1',
                    label: '未退款'
                },
                {
                    value: '2',
                    label: '付款中'
                },
                {
                    value: '4',
                    label: '退款失败'
                },
                {
                    value: '5',
                    label: '已退款'
                },
                {
                    value: '6',
                    label: '退款关闭'
                },
                {
                    value: '11',
                    label: '审核失败'
                }
            ],
            orderTypeList: [
                {
                    label: '支付平台订单号',
                    value: 1
                },
                {
                    label: '商户订单号',
                    value: 2
                }
            ],
            country1: '',
            country2: '',
            country3: '',
            orderStauts1: 0,
            orderStauts2: 0,
            orderType1: 1,
            orderType2: 1,
            orderNum1: '',
            orderNum2: '',
            txNo1: '', //商户订单号
            txNo2: '',
            payToken1: '', //支付平台订单号
            payToken2: '',
            dateRecord: [],
            dateRefund: [],
            dateCollect: [],
            columns1: [
                {
                    title: '国家',
                    align: 'center',
                    key: 'country'
                },
                {
                    title: '交易时间',
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: '商户订单号',
                    align: 'center',
                    key: 'txNo'
                },
                {
                    title: '支付平台订单号',
                    align: 'center',
                    width: 180,
                    key: 'payToken'
                },
                {
                    title: '交易金额',
                    align: 'center',
                    key: 'amount'
                },
                {
                    title: '货币符号',
                    align: 'center',
                    key: 'currency'
                },
                {
                    title: '交易描述',
                    align: 'center',
                    key: 'paySubject'
                },
                {
                    title: '状态',
                    align: 'center',
                    key: 'tradingStatus'
                },
                {
                    title: '操作',
                    key: 'operation',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'a',
                                {
                                    style: {
                                        color: 'rbg(0, 102, 153)'
                                    },
                                    on: {
                                        click: () => {
                                            alert(params.index)
                                        }
                                    }
                                },
                                '申请退款'
                            )
                        ])
                    }
                }
            ],
            columns2: [
                {
                    title: '国家',
                    align: 'center',
                    key: 'country'
                },
                {
                    title: '商户订单号',
                    align: 'center',
                    key: 'txNo'
                },
                {
                    title: '支付平台订单号',
                    align: 'center',
                    width: 180,
                    key: 'payToken'
                },
                {
                    title: '交易金额',
                    align: 'center',
                    key: 'payAmount'
                },
                {
                    title: '退款金额',
                    align: 'center',
                    key: 'refundAmount'
                },
                {
                    title: '货币符号',
                    align: 'center',
                    key: 'currency'
                },
                {
                    title: '申请退款日期',
                    align: 'center',
                    key: 'applyRefundTime'
                },
                {
                    title: '完成退款日期',
                    align: 'center',
                    key: 'refundTime'
                },
                {
                    title: '退款备注',
                    align: 'center',
                    key: 'refundNote'
                },
                {
                    title: '状态',
                    align: 'center',
                    key: 'state'
                }
            ],
            columns3: [
                {
                    title: '货币符号',
                    align: 'center',
                    key: 'currency'
                },
                {
                    title: '支付成功金额',
                    align: 'center',
                    key: 'successAmount'
                },
                {
                    title: '支付成功笔数',
                    align: 'center',
                    key: 'successCount'
                },
                {
                    title: '退款金额',
                    align: 'center',
                    width: 180,
                    key: 'refundAmount'
                },
                {
                    title: '退款笔数',
                    align: 'center',
                    key: 'refundCount'
                },
                {
                    title: '净交易金额',
                    align: 'center',
                    key: 'netAmount'
                }
            ],
            tableData1: [],
            tableData2: [],
            tableData3: [],
            pageSizeOpts: [10, 20, 30, 40, 50],
            tradingPwd: '',
            showAppModal: false,
            appRemark: '',
            appName: '',
            currentType: 1,
            range: '1',
            tradeTotelYesterday: []
        }
    },
    mounted() {
        let token = localStorage.getItem('token')
        this.$axios.setHeader('X-Star-Token', token)
        let getCountryToken =
            'eyJhbGciOiJIUzUxMiJ9.eyJhcHAiOjEsInVpZCI6OTE1MDg3MiwiY2NvZGUiOiJORyIsInJvbGUiOjAsImRldiI6IkEwMDAyIiwiY3JlYXRlZCI6MTU0MTU4MDc3NDU0OCwiZXhwIjoxNTQyMTg1NTc0LCJjaWQiOjJ9.9anQQh-7WveW8IhJsDkdU9kmcpWFmDgvrhaHqErv5SzxsfdlA5GPuHdzH8fiZlkclFOOV7TJ2e4RbhKA7WwvVA'
        this.$axios.setHeader('token', getCountryToken)

        // 获取商户信息
        // this.$axios
        //     .post('/payment/mc/v2/merchant-operator/queryMerchantInfo')
        //     .then(res => {
        //         console.log(res.data)
        //     })

        // 昨日成功交易汇总
        this.$axios
            .post(
                '/payment/mc/v2/merchant-operator/queryStaticOrderBillResponse'
            )
            .then(res => {
                if (res.data.length > 0) {
                    this.tradeTotelYesterday = res.data
                }
            })
        // 获取国家
        this.$axios.get('/cms/vup/v2/areas?versionCode=5500').then(res => {
            if (res.data.length > 0) {
                this.countryList = res.data
            }
        })

        this.searchOrder(this.currentType)
    },
    methods: {
        addApp() {
            this.showAppModal = true
        },
        ok() {
            this.$Message.info('Clicked ok')
        },
        cancel() {
            this.$Message.info('Clicked cancel')
        },
        createKey() {},
        searchOrder(currentType) {
            if (currentType == 1) {
                //支付交易记录
                let upperCounteyCode = this.country1.toUpperCase()
                let createTimeFrom =
                    this.dateRecord[0] != ''
                        ? this.formatDate(this.dateRecord[0])
                        : ''
                let createTimeTo =
                    this.dateRecord[1] != ''
                        ? this.formatDate(this.dateRecord[1])
                        : ''
                this.$axios
                    .post(
                        `payment/mc/v2/order-pay-bills?country=${upperCounteyCode}&state=${
                            this.orderStauts1
                        }&txNo=${this.txNo1}&payToken=${
                            this.payToken1
                        }&createTimeFrom=${createTimeFrom}&createTimeTo=${createTimeTo}`
                    )
                    .then(res => {
                        if (res.resultCode == 'SUCCESS') {
                            this.tableData1 = res.orderPayBills
                        }
                    })
            } else if (currentType == 2) {
                //退款记录查询
                let upperCounteyCode = this.country2.toUpperCase()
                let applyRefundTimeFrom =
                    this.dateRefund[0] != ''
                        ? this.formatDate(this.dateRefund[0])
                        : ''
                let applyRefundTimeTo =
                    this.dateRefund[1] != ''
                        ? this.formatDate(this.dateRefund[1])
                        : ''
                this.$axios
                    .post(
                        `/payment/mc/v2/refund/find-refund-bill?country=${upperCounteyCode}&state=${
                            this.orderStauts2
                        }&txNo=${this.txNo2}&payToken=${
                            this.payToken2
                        }&applyRefundTimeFrom=${applyRefundTimeFrom}&applyRefundTimeTo=${applyRefundTimeTo}`
                    )
                    .then(res => {
                        if (res.data) {
                        }
                    })
            } else if (currentType == 3) {
                //交易汇总查询
                let createTimeFrom =
                    this.dateCollect[0] != ''
                        ? this.formatDate(this.dateCollect[0])
                        : ''
                let createTimeTo =
                    this.dateCollect[1] != ''
                        ? this.formatDate(this.dateCollect[1])
                        : ''
                this.$axios
                    .post(
                        `/payment/mc/v2/static-order-pay-bills?country=${
                            this.country3
                        }&range=${
                            this.range
                        }&createTimeFrom=${createTimeFrom}&createTimeTo=${createTimeTo}`
                    )
                    .then(res => {
                        if (res.data.resultCode == 'SUCCESS') {
                            this.tableData3.push(res.data)
                        }
                    })
            }
        },
        changeCurrType(Type) {
            this.currentType = Type
            this.searchOrder(this.currentType)
        },
        formatDate(date) {
            let tmpDate = new Date(date)
            let year = tmpDate.getFullYear()
            let month =
                tmpDate.getMonth() + 1 > 10
                    ? tmpDate.getMonth() + 1
                    : '0' + (tmpDate.getMonth() + 1)
            let day =
                tmpDate.getDate() > 10
                    ? tmpDate.getDate()
                    : '0' + tmpDate.getDate()
            return year + '-' + month + '-' + day
        }
    },
    watch: {
        orderNum1() {
            if (this.orderType1 == 1) {
                this.payToken1 = this.orderNum1
                this.txNo1 = ''
            } else {
                this.txNo1 = this.orderNum1
                this.payToken1 = ''
            }
        },
        orderNum2() {
            if (this.orderType2 == 1) {
                this.payToken2 = this.orderNum2
                this.txNo2 = ''
            } else {
                this.txNo2 = this.orderNum2
                this.payToken2 = ''
            }
        },
        orderType1() {
            this.orderNum1 = ''
        },
        orderType2() {
            this.orderNum2 = ''
        }
    }
}
</script>
<style scoped>
.container {
    min-height: 80vh;
    position: relative;
}
.ivu-select-selection {
    margin-right: 5px;
}
.mr15 {
    margin-right: 15px;
}
.mt20 {
    margin-top: 20px;
}
.mb15 {
    margin-bottom: 15px;
}
.lh32 {
    line-height: 32px;
}
.w160 {
    width: 160px;
}
.w240 {
    width: 240px;
}
.fontbold {
    font-weight: bold;
}
.tab-box {
    width: 80%;
    margin: 20px auto;
    height: 100%;
}
.mCard {
    background: #eee;
    padding: 20px;
}
.mCard p {
    margin-bottom: 15px;
}
.mCard p .search {
    margin-left: 385px;
}
.mCard h3 {
    border-left: 3px solid #888484;
    padding-left: 5px;
    margin-bottom: 20px;
}
.mCard .btn {
    margin: 0 20px;
}
.row {
    padding-left: 10px;
}
.pageStyle {
    text-align: center;
    margin-top: 20px;
}
.required {
    color: #f00;
}
</style>
