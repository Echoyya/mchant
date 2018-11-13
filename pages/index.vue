<template>
    <section class="container">
        <div class="tab-box">
            <Tabs :animated="false">
                <TabPane :label="$L.account.account_management">
                    <div class="mCard mb15">
                        <h2 class="mb15">{{$L.account.account_information}}</h2>
                        <Row class="row mb15">
                            <Col span="2"> {{$L.account.merchant_No}} </Col>
                            <Col span="5"> {{merchantInfoDto.id}} </Col>
                            <Col span="2">{{$L.account.phone}} </Col>
                            <Col span="4" v-if="merchantInfoDto.contactPhone">{{merchantInfoDto.contactPhone}}</Col>
                            <Col span="4" v-else>{{$L.account.not_bound}}</Col>
                            <Col span="4">
                            <Button type="primary" size="small" v-if="merchantInfoDto.contactPhone" @click="showPhoneModal=true">{{$L.account.change}}</Button>
                            <Button type="primary" size="small" v-else @click="showPhoneModal=true">{{$L.account.binding}}</Button>
                            <Modal :title="$L.account.phone_binding" v-model="showPhoneModal" width="500">
                                <Row class="mb15 lh32">
                                    <Col span="6"> {{$L.account.region}}
                                    </Col>
                                    <Col span="12">
                                    <Select v-model="countryPrefix" class="mr15 w200" :placeholder="$L.account.choose_country">
                                        <Option v-for="item in countryList" :value="item.country" :key="item.country" v-if="item.id != 8">{{ item.name}} &nbsp;&nbsp;+{{item.phonePrefix}}</Option>
                                    </Select>
                                    </Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="6"> {{$L.account.phone}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12">
                                    <Input v-model="phoneNum" :placeholder="$L.account.enter_phone_number" class="w200" />
                                    </Col>
                                    <Col span="6">
                                    <div>
                                        <Button type="primary" size="small" @click="sendVerification">{{$L.account.send_verification}}</Button>
                                    </div>
                                    </Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="6"> {{$L.account.verification}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12">
                                    <Input v-model="verification" :placeholder="$L.account.enter_verification" class="w200" />
                                    </Col>
                                </Row>
                                <div slot="footer">
                                    <Button @click="cancel('showPhoneModal')">{{$L.account.cancel}}</Button>
                                    <Button type="primary" @click="toBindPhone">{{$L.account.okay}}</Button>
                                </div>
                            </Modal>
                            </Col>
                        </Row>
                        <Row class="row">
                            <Col span="2">{{$L.account.merchant_name}} </Col>
                            <Col span="5"> {{merchantInfoDto.name}} </Col>
                            <Col span="2">{{$L.account.email}}</Col>
                            <Col span="4" v-if="merchantInfoDto.contactEmail">{{merchantInfoDto.contactEmail}} </Col>
                            <Col span="4" v-else>{{$L.account.not_bound}}</Col>
                            <Col span="4">
                            <Button type="primary" size="small" v-if="merchantInfoDto.contactEmail" @click="showEmailModal=true">{{$L.account.change}}</Button>
                            <Button type="primary" size="small" v-else @click="showEmailModal=true">{{$L.account.binding}}</Button>
                            <Modal :title="$L.account.email_address" v-model="showEmailModal" width="400">
                                <Row class="mb15 lh32">
                                    <Col span="18" offset="4"> {{$L.account.enter_email}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="18" offset="4">
                                    <Input v-model="email" :placeholder="$L.account.enter_email" class="w240" />
                                    </Col>
                                </Row>
                                <div slot="footer">
                                    <Button @click="cancel('showEmailModal')">{{$L.account.cancel}}</Button>
                                    <Button type="primary" @click="toBindEmail">{{$L.account.okay}}</Button>
                                </div>
                            </Modal>
                            </Col>
                        </Row>
                    </div>
                    <div class="mCard mb15">
                        <h2>{{$L.account.yesterday_summary}}</h2>
                        <Row>
                            <Col span="8" v-for="(item, index) in tradeTotelYesterday" :key="index">
                            <p class="row mb15 fontbold">{{item.country}}</p>
                            <p class="row">{{$L.account.order_tota}}{{item.successAmount}}</p>
                            <p class="row">{{$L.account.currency}}{{item.currency}}</p>
                            <p class="row">{{$L.account.success_frequency}}{{item.successCount}} 笔</p>
                            </Col>
                        </Row>

                    </div>
                    <div class="mCard mb15">
                        <h2 class="mb15">{{$L.account.key_transaction}}</h2>
                        <Button type="primary" class="mb15" @click="showAppModal=true"> {{$L.account.add_application}} </Button>
                        <Modal :title="$L.account.add_application" v-model="showAppModal" width="400">
                            <Row class="mb15 lh32">
                                <Col span="6"> {{$L.account.application_name}}
                                <span class="required">*</span>
                                </Col>
                                <Col span="12">
                                <Input v-model="appName" :placeholder="$L.account.enter_application_name" class="w240" />
                                </Col>
                            </Row>
                            <Row class="mb15 lh32">
                                <Col span="6"> {{$L.account.wallet_account}}</Col>
                                <Col span="12">
                                <Input v-model="ewalletNo" :placeholder="$L.account.enter_wallet_account" class="w240" />
                                </Col>
                            </Row>
                            <Row class="mb15 lh32">
                                <Col span="6"> {{$L.account.payment_notice}}</Col>
                                <Col span="12">
                                <Input v-model="payNotifyUrl" :placeholder="$L.account.enter_payment_notice" class="w240" />
                                </Col>
                            </Row>
                            <Row class="mb15 lh32">
                                <Col span="6"> {{$L.account.refund_notice}}</Col>
                                <Col span="12">
                                <Input v-model="refundNotifyUrl" :placeholder="$L.account.enter_refund_notice" class="w240" />
                                </Col>
                            </Row>
                            <div slot="footer">
                                <Button @click="cancel('showAppModal')">{{$L.account.cancel}}</Button>
                                <Button type="primary" @click="toAddApp">{{$L.account.okay}}</Button>
                            </div>
                        </Modal>
                        <h3 class="fontbold ml15">{{$L.account.application_list}}</h3>
                        <Row>
                            <Col span="8" class="appBorder mt15" v-for="(item, index) in merchantAppInfoDto" :key="index">
                            <p class="row mb15 fontbold">{{$L.account.application_name}}{{item.name}}
                                <Button type="primary" @click="createApiKey(item.id,index)" class="ml15" size="small"> 生成密钥 </Button>
                            </p>
                            <p class="row mb15">{{$L.account.apiKey}}{{item.apiKey}}</p>
                            <p class="row mb15">{{$L.account.wallet_account}}{{item.ewalletAccountNo}}</p>
                            <p class="row mb15">{{$L.account.payment_notice}}{{item.payNotifyUrl}}</p>
                            <p class="row mb15">{{$L.account.refund_notice}}{{item.refundNotifyUrl}}</p>
                            <p class="row mb15 fontStyle" v-if="!item.dealPassword" @click="showPasswordModal=true ; appIndex = index ">{{$L.account.set_password}}</p>
                            <p class="row mb15 fontStyle" v-else @click="showRePasswordModal=true ; appIndex = index ">{{$L.account.change_password}}</p>
                            <p class="row mb15" v-if="!item.dealPassword">{{$L.account.dealPassword}}{{$L.account.not_have}}</p>
                            <p class="row mb15" v-else>{{$L.account.dealPassword}} ******</p>
                            </Col>
                            <Modal :title="$L.account.set_password" v-model="showPasswordModal" width="500">
                                <Row class="mb15 lh32">
                                    <Col span="6">{{$L.account.dealPassword}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12">
                                    <Input v-model="password" :placeholder="$L.account.enter_dealPassword" class="w200" />
                                    </Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="6"> {{$L.account.confirm_dealPassword}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12">
                                    <Input v-model="repassword" :placeholder="$L.account.enter_confirm_dealPassword" class="w200" />
                                    </Col>
                                </Row>
                                <div slot="footer">
                                    <Button @click="cancel('showPasswordModal')">{{$L.account.cancel}}</Button>
                                    <Button type="primary" @click="toUpdataPassword(merchantAppInfoDto[appIndex].dealPassword,password,'')">{{$L.account.okay}}</Button>
                                </div>
                            </Modal>
                            <Modal :title="$L.account.change_password" v-model="showRePasswordModal" width="500">
                                <Row class="mb15 lh32">
                                    <Col span="7">{{$L.account.original_dealpassword}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12">
                                    <Input v-model="password" :placeholder="$L.account.enter_original_dealPassword" class="w200" />
                                    </Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="7"> {{$L.account.new_assword}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12">
                                    <Input v-model="repassword" :placeholder="$L.account.enter_new_dealPassword" class="w200" />
                                    </Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="7"> {{$L.account.confirm_new_dealPassword}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12">
                                    <Input v-model="repassword" :placeholder="$L.account.enter_confirm_dealPassword" class="w200" />
                                    </Col>
                                </Row>
                                <div slot="footer">
                                    <Button @click="cancel('showRePasswordModal')">{{$L.account.cancel}}</Button>
                                    <Button type="primary" @click="toUpdataPassword(merchantAppInfoDto[appIndex].dealPassword,repassword,password)">{{$L.account.okay}}</Button>
                                </div>
                            </Modal>
                        </Row>
                    </div>
                </TabPane>
                <TabPane :label="$L.record.transaction_query">
                    <div :bordered="false" :dis-hover="true" class="mCard mb15">
                        <p class="mb15">{{$L.record.business_type}}
                            <Button :type="currentType == 1 ? 'primary':'default'" @click="changeCurrType(1)" class="btn">{{$L.record.trading_record}}</Button>
                            <Button :type="currentType == 2 ? 'primary':'default'" @click="changeCurrType(2)" class="btn">{{$L.record.refund_record}}</Button>
                            <Button :type="currentType == 3 ? 'primary':'default'" @click="changeCurrType(3)" class="btn">{{$L.record.trading_summary}}</Button>
                        </p>
                        <div v-show="currentType==1">
                            <div class="mb15">
                                <span> {{$L.record.country}}</span>
                                <Select v-model="country1" class="mr15 w160" :placeholder="$L.record.select_country">
                                    <Option v-for="item in countryList" :value="item.country" :key="item.value">{{ item.name }}</Option>
                                </Select>
                                <span> {{$L.record.order_status}}</span>
                                <Select v-model="orderStauts1" class="mr15 w160" :placeholder="$L.record.please_select">
                                    <Option v-for="item in orderStautsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Select v-model="orderType1" class="mr15 w160" :placeholder="$L.record.please_select">
                                    <Option v-for="item in orderTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="orderNum1" :placeholder="$L.record.enter_order_number" class="w160" />
                            </div>
                            <div class="mb15">
                                <span> {{$L.record.trading_time}}</span>
                                <DatePicker v-model="dateRecord" format="yyyy年MM月dd" type="daterange" placement="bottom-start" :placeholder="$L.record.start_end_dates" class="w240"></DatePicker>
                                <Button type="primary" class="search" @click="searchOrder(currentType)">{{$L.record.search}}</Button>
                                <Button>download</Button>
                            </div>
                            <Table border :columns="columns1" :data="tableData1" :stripe="true"></Table>
                            <Modal :title="$L.record.refund" v-model="showRefundModal" width="700">
                                <Row class="mb15 lh32">
                                    <Col span="6" class="tright"> {{$L.record.order_number}}</Col>
                                    <Col span="12" offset="1">{{ refundObj.txNo}}</Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="6" class="tright"> {{$L.record.trading_time}}</Col>
                                    <Col span="12" offset="1">{{ refundObj.createTime}}</Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="6" class="tright"> {{$L.record.can_refund_amount}}</Col>
                                    <Col span="12" offset="1">{{ refundObj.amount}}</Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="6" class="tright"> {{$L.record.refund_amount}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12" offset="1">
                                    <InputNumber :max="refundObj.amount" :min="0.1" :step="0.1" v-model="refundAmount" class="w100"></InputNumber> </Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="6" class="tright"> {{$L.record.refund_type}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12" offset="1">
                                    <Select v-model="refundType" class="w240">
                                        <Option v-for="item in refundTypeList" :value="item.value" :key="item.value" :disabled="item.value=='ORIGINAL'">{{ item.label }}</Option>
                                    </Select>
                                    </Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="6" class="tright"> {{$L.record.order_password}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12" offset="1">
                                    <Input v-model="dealPassword" class="w240" />
                                    </Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="6" class="tright"> {{$L.record.refund_remarks}}</Col>
                                    <Col span="12" offset="1">
                                    <Input v-model="refundNote" type="textarea" :rows="4" :placeholder="$L.record.enter_refund_remarks" class="w240" />
                                    </Col>
                                </Row>
                                <div slot="footer">
                                    <Button @click="cancel('showRefundModal')">{{$L.record.cancel}}</Button>
                                    <Button type="primary" @click="toRefund">{{$L.record.okay}}</Button>
                                </div>
                            </Modal>
                            <Page :total="tableDataAll1.length" :current="pageIndex1" :page-size="pageSize1" :transfer="true" show-sizer show-elevator :page-size-opts="pageSizeOpts" @on-change="pageIndex1 = $event " @on-page-size-change="pageSize1 = $event" class="pageStyle" />
                        </div>
                        <div v-show="currentType==2">
                            <div class="mb15">
                                <span> {{$L.refund.country}}</span>
                                <Select v-model="country2" class="mr15 w160" :placeholder="$L.refund.select_country">
                                    <Option v-for="item in countryList" :value="item.country" :key="item.value">{{ item.name }}</Option>
                                </Select>
                                {{$L.refund.order_status}}
                                <Select v-model="orderStauts2" class="mr15 w160" :placeholder="$L.refund.please_select">
                                    <Option v-for="item in refundStautsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Select v-model="orderType2" class="mr15 w160" :placeholder="$L.refund.please_select">
                                    <Option v-for="item in orderTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="orderNum2" :placeholder="$L.refund.enter_order_number" class="w160" />
                            </div>
                            <div class="mb15">
                                {{$L.refund.refund_time}}
                                <DatePicker v-model="dateRefund" format="yyyy年MM月dd" type="daterange" placement="bottom-start" :placeholder="$L.refund.start_end_dates" class="w240"></DatePicker>
                                <Button type="primary" class="search" @click="searchOrder(currentType)">{{$L.refund.search}}</Button>
                                <Button>{{$L.refund.download}}</Button>
                            </div>
                            <Table border :columns="columns2" :data="tableData2" :stripe="true"></Table>
                            <Page :total="tableDataAll2.length" :current="pageIndex2" :page-size="pageSize2" :transfer="true" show-sizer show-elevator :page-size-opts="pageSizeOpts" @on-change="pageIndex2 = $event " @on-page-size-change="pageSize2 = $event" class="pageStyle" />
                        </div>
                        <div v-show="currentType==3">
                            <div class="mb15">时间选择：
                                <Button :type="range == '1'? 'primary':'default'" @click="range='1'" class="btn">近一周</Button>
                                <Button :type="range == '2' ? 'primary':'default'" @click="range='2'" class="btn">近一个月</Button>
                                <Button :type="range == '3' ? 'primary':'default'" @click="range='3'" class="btn">近三个月</Button>
                                <DatePicker v-model="dateCollect" format="yyyy年MM月dd" type="daterange" placement="bottom-start" placeholder="请选择起始日期" class="w240"></DatePicker>
                            </div>
                            <div class="mb15">
                                国家：
                                <Select v-model="country3" class="mr15 w160" placeholder="选择国家">
                                    <Option v-for="item in countryList" :value="item.country" :key="item.value">{{ item.name }}</Option>
                                </Select>
                                <Button type="primary" class="search" @click="searchOrder(currentType)">搜索</Button>
                            </div>
                            <Table border :columns="columns3" :data="tableData3" :stripe="true"></Table>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    </section>
</template>
<script>
import { getCookie } from '~/functions/utils'
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
            refundTypeList: [
                {
                    label: '退款到钱包',
                    value: 'EWALLET'
                },
                {
                    label: '原路退回',
                    value: 'ORIGINAL'
                }
            ],
            range: '1',
            currentType: 1,
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
            refundAmount: 0,
            refundNote: '',
            refundType: 'EWALLET',
            dealPassword: '',
            refundObj: {},
            columns1: [
                {
                    title: this.$L.record.col_country,
                    align: 'center',
                    key: 'country'
                },
                {
                    title: this.$L.record.col_trading_time,
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: this.$L.record.col_merchan_number,
                    align: 'center',
                    key: 'txNo'
                },
                {
                    title: this.$L.record.col_platform_number,
                    align: 'center',
                    width: 180,
                    key: 'payToken'
                },
                {
                    title: this.$L.record.col_trading_number,
                    align: 'center',
                    key: 'amount'
                },
                {
                    title: this.$L.record.col_currency,
                    align: 'center',
                    key: 'currency'
                },
                {
                    title: this.$L.record.col_trading_description,
                    align: 'center',
                    key: 'paySubject'
                },
                {
                    title: this.$L.record.col_state,
                    align: 'center',
                    key: 'stateShow'
                },
                {
                    title: this.$L.record.col_operation,
                    key: 'operation',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.state == '3') {
                            return h('div', [
                                h(
                                    'a',
                                    {
                                        style: {
                                            color: 'rbg(0, 102, 153)'
                                        },
                                        on: {
                                            click: () => {
                                                this.refundObj = params.row
                                                this.showRefundModal = true
                                            }
                                        }
                                    },
                                    this.$L.record.refund
                                )
                            ])
                        } else {
                            return h('div', [
                                h(
                                    'span',
                                    {
                                        style: {
                                            color: '#999'
                                        }
                                    },
                                    this.$L.record.nonrefundable
                                )
                            ])
                        }
                    }
                }
            ],
            columns2: [
                {
                    title: this.$L.refund.col_country,
                    align: 'center',
                    key: 'country'
                },
                {
                    title: this.$L.refund.col_merchan_number,
                    align: 'center',
                    key: 'txNo'
                },
                {
                    title: this.$L.refund.col_platform_number,
                    align: 'center',
                    width: 180,
                    key: 'payToken'
                },
                {
                    title: this.$L.refund.col_trading_number,
                    align: 'center',
                    key: 'payAmount'
                },
                {
                    title: this.$L.refund.col_refund_amount,
                    align: 'center',
                    key: 'refundAmount'
                },
                {
                    title: this.$L.refund.col_currency,
                    align: 'center',
                    key: 'currency'
                },
                {
                    title: this.$L.refund.col_refund_time,
                    align: 'center',
                    key: 'applyRefundTime'
                },
                {
                    title: this.$L.refund.col_done_time,
                    align: 'center',
                    key: 'refundTime'
                },
                {
                    title: this.$L.refund.col_refund_remarks,
                    align: 'center',
                    key: 'refundNote'
                },
                {
                    title: this.$L.refund.col_state,
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
            tableDataAll1: [],
            tableDataAll2: [],
            tableData3: [],
            tradeTotelYesterday: [], //昨日交易
            merchantInfoDto: {}, //商户
            merchantAppInfoDto: [], //商户应用列表
            showAppModal: false,
            showRefundModal: false,
            showPhoneModal: false,
            showEmailModal: false,
            showPasswordModal: false,
            showRePasswordModal: false,
            appName: '',
            ewalletNo: '',
            payNotifyUrl: '',
            refundNotifyUrl: '',
            pageSizeOpts: [10, 20, 30, 40, 50],
            pageIndex1: 1,
            pageIndex2: 1,
            pageSize1: 10,
            pageSize2: 10,
            countryPrefix: '',
            verification: '',
            phoneNum: '',
            email: '',
            appIndex: '',
            password: '',
            newPassword: '',
            repassword: ''
        }
    },
    mounted() {
        // let token = localStorage.getItem('token')
        let token = getCookie('token')
        this.$axios.setHeader('X-Star-Token', token)
        let getCountryToken =
            'eyJhbGciOiJIUzUxMiJ9.eyJhcHAiOjEsInVpZCI6OTE1MDg3MiwiY2NvZGUiOiJORyIsInJvbGUiOjAsImRldiI6IkEwMDAyIiwiY3JlYXRlZCI6MTU0MTU4MDc3NDU0OCwiZXhwIjoxNTQyMTg1NTc0LCJjaWQiOjJ9.9anQQh-7WveW8IhJsDkdU9kmcpWFmDgvrhaHqErv5SzxsfdlA5GPuHdzH8fiZlkclFOOV7TJ2e4RbhKA7WwvVA'
        this.$axios.setHeader('token', getCountryToken)

        this.getMerchantInfoDto()
        this.getMerchantAppInfoDto()

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
        // 获取商户
        getMerchantInfoDto() {
            this.$axios
                .post('/payment/mc/v2/merchant-operator/queryMerchantInfo')
                .then(res => {
                    if (res.data) {
                        this.merchantInfoDto = res.data
                    }
                })
        },
        // 获取商户应用列表
        getMerchantAppInfoDto() {
            this.$axios
                .post('/payment/mc/v2/merchant-operator/queryMerchantAppList')
                .then(res => {
                    if (res.data.length > 0) {
                        this.merchantAppInfoDto = res.data
                    }
                })
        },
        //绑定和更改邮箱
        toBindEmail() {
            let reg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/
            if (!reg.test(this.email)) {
                this.$Modal.warning({
                    title: this.$L.account.correct_mailbox
                })
                return
            } else {
                this.$axios
                    .put(
                        `/payment/mc/v2/merchant-operator/modifyMerchantInfoEmail?email=${
                            this.email
                        }`
                    )
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$Modal.success({
                                title: this.$L.account.success
                            })
                            this.showEmailModal = false
                        } else {
                            this.$Modal.success({
                                title: res.data.meassage
                            })
                        }
                    })
            }
        },
        //绑定和更改手机号
        toBindPhone() {
            if (this.phoneNum == '') {
                this.$Modal.warning({
                    title: this.$L.account.enter_phone_number
                })
            } else if (this.verification == '') {
                this.$Modal.warning({
                    title: this.$L.account.enter_verification
                })
            } else {
                let countryPhone =
                    this.countryPrefix.toUpperCase() + '+' + this.phoneNum
                this.$axios
                    .put(
                        `/payment/mc/v2/merchant-operator/modifyMerchantInfoPhone?phone=${countryPhone}`
                    )
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$Modal.success({
                                title: this.$L.account.success
                            })
                            this.showPhoneModal = false
                        }
                    })
            }
        },
        // 添加商户应用
        toAddApp() {
            if (this.appName == '') {
                this.$Modal.warning({
                    title: this.$L.account.enter_application_name
                })
            } else {
                this.$axios
                    .put(
                        `/payment/mc/v2/merchant-operator/addMerchantApp?name=${
                            this.appName
                        }&ewalletNo=${this.ewalletNo}&payNotifyUrl=${
                            this.payNotifyUrl
                        }&refundNotifyUrl=${this.refundNotifyUrl}`
                    )
                    .then(res => {
                        this.showAppModal = false
                    })
            }
        },
        toUpdataPassword(orgPwd, newPwd, oldPwd) {
            // TODO 修改密码逻辑
            let reg = /^\d{n}$/
            if (orgPwd && oldPwd == '') {
                this.$Modal.warning({
                    title: this.$L.account.enter_original_dealPassword
                })
                return
            }
            if (newPwd == '') {
                this.$Modal.warning({
                    title: this.$L.account.enter_new_dealPassword
                })
                return
            } else if (reg.test(newPwd)) {
                this.$Modal.warning({
                    title: this.$L.account.password_6_digits
                })
                return
            } else if (newPwd != this.repassword) {
                this.$Modal.warning({
                    title: this.$L.account.password_not_match
                })
                return
            } else {
                let merchantAppId = this.merchantAppInfoDto[this.appIndex].id
                this.$axios
                    .put(
                        `/payment/mc/v2/merchant-operator/modifyMerchantAppDealPassword?merchantAppId=${merchantAppId}&oldDealPassword=${oldPwd}&dealPassword=${newPwd}`
                    )
                    .then(res => {
                        console.log(res)
                        if (res.data.code == 0) {
                            this.getMerchantAppInfoDto()
                            this.showPasswordModal = false
                            this.showRePasswordModal = false
                            this.password = ''
                            this.repassword = ''
                            this.newPassword = ''
                        } else if (res.data.code == 500) {
                            this.$Modal.warning({
                                title: res.data.message
                            })
                        }
                    })
            }
        },
        sendVerification() {},
        cancel(model) {
            switch (model) {
                case 'showPhoneModal':
                    this.showPhoneModal = false
                    this.countryPrefix = ''
                    this.verification = ''
                    this.phoneNum = ''
                    break
                case 'showEmailModal':
                    this.showEmailModal = false
                    this.email = ''
                    break
                case 'showAppModal':
                    this.showAppModal = false
                    this.appName = ''
                    this.ewalletNo = ''
                    this.payNotifyUrl = ''
                    this.refundNotifyUrl = ''
                    break
                case 'showRefundModal':
                    this.showRefundModal = false
                    this.refundAmount = ''
                    this.refundNote = ''
                    this.dealPassword = ''
                    break
                case 'showPasswordModal':
                    this.showPasswordModal = false
                    this.password = ''
                    this.repassword = ''
                    break
                case 'showRePasswordModal':
                    this.showRePasswordModal = false
                    this.password = ''
                    this.repassword = ''
                    this.newPassword = ''
                    break
            }
        },
        createApiKey(appId, index) {
            // 修改商户应用apiKey
            this.$axios
                .put(
                    `/payment/mc/v2/merchant-operator/modifyMerchantAppApiKey?id=${appId}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.getMerchantAppInfoDto()
                    } else {
                        this.$Modal.warning({
                            title: this.$L.account.build_failed
                        })
                    }
                })
        },
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
                        if (
                            res.data.resultCode == 'SUCCESS' &&
                            res.data.orderPayBills.length > 0
                        ) {
                            this.tableDataAll1 = res.data.orderPayBills
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
                        if (
                            res.data.resultCode == 'SUCCESS' &&
                            res.data.refundBills.length > 0
                        ) {
                            this.tableDataAll2 = res.data.refundBills
                        }
                    })
            } else if (currentType == 3) {
                //交易汇总查询
                this.tableData3 = []
                let upperCounteyCode = 'TZ' // test 数据
                // let upperCounteyCode =
                //     this.country3 == ''
                //         ? this.countryList[0].country.toUpperCase()
                //         : this.country3.toUpperCase()
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
                        `/payment/mc/v2/static-order-pay-bills?country=${upperCounteyCode}&range=${
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
        toRefund() {
            // 申请退款接口
            if (this.refundAmount == '') {
                this.$Modal.warning({
                    title: this.$L.record.amount_required
                })
                return
            } else if (this.dealPassword == '') {
                this.$Modal.warning({
                    title: this.$L.record.password_required
                })
                return
            } else if (this.refundObj.amount < this.refundAmount) {
                this.$Modal.warning({
                    title: ccc
                })
                return
            } else {
                this.$axios
                    .post(
                        `/payment/mc/v2/refund/${
                            this.refundObj.payToken
                        }/applyRefund?amount=${this.refundAmount}&refundNote=${
                            this.refundNote
                        }&refundType=${this.refundType}&dealPassword=${
                            this.dealPassword
                        }`
                    )
                    .then(res => {
                        if (res.data.resultCode == 'SUCCESS') {
                            this.$Modal.success({
                                title: this.$L.record.success_refund
                            })
                        }
                        this.showRefundModal = false
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
        },
        dateCollect(val) {
            if (val[0] != '' && val[1] != '') {
                this.range = '0'
            } else {
                this.range = '1'
            }
        }
    },
    computed: {
        tableData1() {
            let tmp = this.tableDataAll1.slice(
                (this.pageIndex1 - 1) * this.pageSize1,
                this.pageIndex1 * this.pageSize1
            )
            tmp.forEach(ele => {
                switch (ele.state) {
                    case '1':
                        ele.stateShow = '未付款'
                        break
                    case '2':
                        ele.stateShow = '付款中'
                        break
                    case '3':
                        ele.stateShow = '已付款'
                        break
                    case '4':
                        ele.stateShow = '付款失败'
                        break
                    case '5':
                        ele.stateShow = '退款'
                        break
                }
            })
            return tmp
        },
        tableData2() {
            let tmp = this.tableDataAll2.slice(
                (this.pageIndex2 - 1) * this.pageSize2,
                this.pageIndex2 * this.pageSize2
            )
            tmp.forEach(ele => {
                switch (ele.state) {
                    case '1':
                        ele.state = '未退款'
                        break
                    case '2':
                        ele.state = '处理中'
                        break
                    case '4':
                        ele.state = '退款失败'
                        break
                    case '5':
                        ele.state = '已退款'
                        break
                    case '6':
                        ele.state = '付款关闭'
                        break
                    case '11':
                        ele.state = '审核失败'
                        break
                }
            })
            return tmp
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
.ml15 {
    margin-left: 15px;
}
.mt15 {
    margin-top: 15px;
}
.mb15 {
    margin-bottom: 15px;
}
.pl15 {
    padding-left: 15px;
}
.lh32 {
    line-height: 32px;
}
.w100 {
    width: 100px;
}
.w160 {
    width: 160px;
}
.w200 {
    width: 200px;
}
.w240 {
    width: 240px;
}
.tleft {
    text-align: left;
}
.tright {
    text-align: right;
}
.fontbold {
    font-weight: bold;
}
.fontStyle {
    color: #2d8cf0;
    cursor: pointer;
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
.mCard .search {
    margin-left: 385px;
}
.mCard h2 {
    border-left: 3px solid #888484;
    padding-left: 5px;
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
.appBorder {
    border-bottom: 1px solid #ccc;
}
/* .appBorder:last-child {
    border-bottom: none !important;
} */
</style>
