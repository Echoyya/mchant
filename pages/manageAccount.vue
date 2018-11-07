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
                            <Col span="4"> <Button type="primary" size="small">绑定</Button> </Col>
                        </Row>
                        <Row class="row">
                            <Col span="2"> 商户名称： </Col>
                            <Col span="5"> 某某股份有限公司 </Col>
                            <Col span="2">邮箱： </Col>
                            <Col span="4">未绑定 </Col>
                            <Col span="4"> <Button type="primary" size="small">绑定</Button> </Col>
                        </Row>
                    </Card>
                    <Card :bordered="false" :dis-hover="true" class="mCard mb15">
                        <h3>昨日成功交易汇总（按国家）</h3>
                        <Row class="row mb15 fontbold">
                            <Col span="8"> 尼日利亚 </Col>
                            <Col span="8"> 坦桑尼亚 </Col>
                            <Col span="8"> 肯尼亚 </Col>
                        </Row>
                        <Row class="row">
                            <Col span="2"> 订单总金额： </Col>
                            <Col span="6"> 8000.00 </Col>
                            <Col span="2"> 订单总金额： </Col>
                            <Col span="6"> 5000.00 </Col>
                            <Col span="2">订单总金额： </Col>
                            <Col span="6"> 0.00 </Col>
                        </Row>
                        <Row class="row">
                            <Col span="2"> 货币符号： </Col>
                            <Col span="6"> ₦ </Col>
                            <Col span="2">货币符号： </Col>
                            <Col span="6"> TSh </Col>
                            <Col span="2">货币符号： </Col>
                            <Col span="6"> KSh </Col>
                        </Row>
                        <Row class="row">
                            <Col span="2"> 成功笔数： </Col>
                            <Col span="6"> 10 笔 </Col>
                            <Col span="2"> 成功笔数： </Col>
                            <Col span="6"> 10 笔 </Col>
                            <Col span="2"> 成功笔数： </Col>
                            <Col span="6"> 0 笔 </Col>
                        </Row>
                    </Card>
                    <Card :bordered="false" :dis-hover="true" class="mCard mb15">
                        <h3>应用密钥及交易密码管理</h3>
                        <Button type="primary" class="mb15" @click="addApp"> 添加应用 </Button>
                        <Modal title="添加应用" v-model="showAppModal" @on-ok="ok" @on-cancel="cancel" ok-text="确定" cancel-text="取消" width="400">
                            <p class="mb15">应用名称： <Input v-model="appName" placeholder="请输入应用名称" class="w240" /> </p>
                            <p class="mb15">备注信息： <Input v-model="appRemark" type="textarea" placeholder="请输入备注信息" class="w240" /></p>
                        </Modal>
                        <p class="mb15 fontbold">应用列表</p>
                        <Row class="mb15">
                            <Col span="8">
                            <p> 应用1： <Button type="primary" @click="createKey"> 生成密钥 </Button></p>
                            <p> 密钥：</p>
                            <p> <a href="#">设置交易密码</a></p>
                            <p> 交易密码:
                                <span v-show="tradingPwd==''">无</span>
                                <span v-show="tradingPwd!=''">{{tradingPwd}}</span> </p>
                            </Col>
                        </Row>
                    </Card>
                </TabPane>
                <TabPane label="交易查询">
                    <Card :bordered="false" :dis-hover="true" class="mCard mb15">
                        <p>业务类型：
                            <Button :type="currentType == 1 ? 'primary':''" @click="currentType=1" class="btn">交易记录</Button>
                            <Button :type="currentType == 2 ? 'primary':''" @click="currentType=2" class="btn">退款记录</Button>
                            <Button :type="currentType == 3 ? 'primary':''" @click="currentType=3" class="btn">交易汇总</Button>
                        </p>
                        <div v-show="currentType!=3">
                            <p>
                            国家：
                            <Select v-model="country" class="mr15 w160" placeholder="选择国家">
                                <Option v-for="item in countryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            订单状态：
                            <Select v-model="orderStauts" class="mr15 w160" placeholder="请选择">
                                <Option v-for="item in orderStautsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Select v-model="orderType" class="mr15 w160" placeholder="请选择">
                                <Option v-for="item in orderTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                             <Input v-model="orderNum" placeholder="请输入订单号" class="w160" />
                            </p>
                            <p>
                                交易时间：
                                <DatePicker :value="dateValue" format="yyyy年MM月dd" type="daterange" placement="bottom-start" placeholder="请选择起始日期" class="w240"></DatePicker>
                                <Button type="primary" class="search">搜索</Button>
                                <Button>下载</Button>
                            </p>
                        </div>
                        <div v-show="currentType==3">
                            <p>时间选择：
                                <Button :type="dateSelect == 'week'? 'primary':''" @click="dateSelect='week'" class="btn">近一周</Button>
                                <Button :type="dateSelect == 'month' ? 'primary':''" @click="dateSelect='month'" class="btn">近一个月</Button>
                                <Button :type="dateSelect == 'months' ? 'primary':''" @click="dateSelect='months'" class="btn">近三个月</Button>
                                <DatePicker :value="dateValue" format="yyyy年MM月dd" type="daterange" placement="bottom-start" placeholder="请选择起始日期" class="w240"></DatePicker>
                            </p>
                            <p>
                                 国家：
                                <Select v-model="country" class="mr15 w160" placeholder="选择国家">
                                    <Option v-for="item in countryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Button type="primary" class="search">搜索</Button>
                            </p>
                        </div>
                         <Table border :columns="columns" :data="tableData" :stripe="true" ></Table>
                         <Page :total="tableData.length" :current="1" :transfer="true" show-sizer  show-elevator :page-size-opts="pageSizeOpts" class="pageStyle" />
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
            countryList: [
                {
                    value: 'Nigeria',
                    label: 'Nigeria'
                },
                {
                    value: 'Tanzania',
                    label: 'Tanzania'
                },
                {
                    value: 'Uganda',
                    label: 'Uganda'
                },
                {
                    value: 'Rwanda',
                    label: 'Rwanda'
                },
                {
                    value: 'Kenya',
                    label: 'Kenya'
                }
            ],
            orderStautsList: [
                {
                    value: 'succeed',
                    label: '支付成功'
                },
                {
                    value: 'failed',
                    label: '支付失败'
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
            country: '',
            orderStauts: '',
            orderType: 1,
            orderNum: '',
            dateValue: [],
            columns: [
                {
                    title: '国家',
                    align: 'center',
                    key: 'country'
                },
                {
                    title: '交易时间',
                    align: 'center',
                    key: 'tradingHours'
                },
                {
                    title: '商户订单号',
                    align: 'center',
                    key: 'merchantOrderNum'
                },
                {
                    title: '支付平台订单号',
                    align: 'center',
                    width: 180,
                    key: 'payPlatformOrderNum'
                },
                {
                    title: '交易金额',
                    align: 'center',
                    key: 'tradingAmount'
                },
                {
                    title: '货币符号',
                    align: 'center',
                    key: 'currency'
                },
                {
                    title: '交易描述',
                    align: 'center',
                    key: 'tradingDescription'
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
            tableData: [
                {
                    country: 'Nigeria',
                    tradingHours: '2018-01-01  08:30:00',
                    merchantOrderNum: '20180101083000123',
                    payPlatformOrderNum: 'ST20180101083000123',
                    tradingAmount: '100.00',
                    currency: '₦',
                    tradingDescription: '业务续订',
                    tradingStatus: '支付成功'
                },
                {
                    country: 'Nigeria',
                    tradingHours: '2018-01-01  08:30:00',
                    merchantOrderNum: '20180101083000123',
                    payPlatformOrderNum: 'ST20180101083000123',
                    tradingAmount: '100.00',
                    currency: '₦',
                    tradingDescription: '业务续订',
                    tradingStatus: '支付成功'
                },
                {
                    country: 'Nigeria',
                    tradingHours: '2018-01-01  08:30:00',
                    merchantOrderNum: '20180101083000123',
                    payPlatformOrderNum: 'ST20180101083000123',
                    tradingAmount: '100.00',
                    currency: '₦',
                    tradingDescription: '业务续订',
                    tradingStatus: '支付成功'
                },
                {
                    country: 'Nigeria',
                    tradingHours: '2018-01-01  08:30:00',
                    merchantOrderNum: '20180101083000123',
                    payPlatformOrderNum: 'ST20180101083000123',
                    tradingAmount: '100.00',
                    currency: '₦',
                    tradingDescription: '业务续订',
                    tradingStatus: '支付成功'
                }
            ],
            pageSizeOpts: [10, 20, 30, 40, 50],
            tradingPwd: '',
            showAppModal: false,
            appRemark: '',
            appName: '',
            currentType: 1,
            dateSelect: 'week'
        }
    },
    mounted() {
        let token = localStorage.getItem('token')
        this.$axios.setHeader('token', token)

        // TODO AJAX
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
        createKey() {}
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
</style>
