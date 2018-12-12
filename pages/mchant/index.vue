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
                            <Col span="4" v-if="merchantInfoDto.contactPhone">{{merchantInfoDto.contactPhone.split(' ')[1]}}</Col>
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
                                        <Option v-for="item in countryList" :value="item.country" :key="item.country" v-if="item.id != 8 && item.id != 1">{{ item.name}} &nbsp;&nbsp;+{{item.phonePrefix}}</Option>
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
                                        <Button type="primary" size="small" @click="sendVerification" :disabled="canSend">
                                            <span v-show="canSend && canSendTime != 0">({{canSendTime}}s) </span> {{$L.account.send_verification}}</Button>
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
                                    <Input v-model="password" type="password" :placeholder="$L.account.enter_dealPassword" class="w200" />
                                    </Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="6"> {{$L.account.confirm_dealPassword}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12">
                                    <Input v-model="repassword" type="password" :placeholder="$L.account.enter_confirm_dealPassword" class="w200" />
                                    </Col>
                                </Row>
                                <div slot="footer">
                                    <Button @click="cancel('showPasswordModal')">{{$L.account.cancel}}</Button>
                                    <Button type="primary" @click="toUpdataPassword('set',password,repassword,'')">{{$L.account.okay}}</Button>
                                </div>
                            </Modal>
                            <Modal :title="$L.account.change_password" v-model="showRePasswordModal" width="500">
                                <Row class="mb15 lh32">
                                    <Col span="7">{{$L.account.original_dealpassword}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12">
                                    <Input v-model="password" type="password" :placeholder="$L.account.enter_original_dealPassword" class="w200" />
                                    </Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="7"> {{$L.account.new_assword}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12">
                                    <Input v-model="newPassword" type="password" :placeholder="$L.account.enter_new_dealPassword" class="w200" />
                                    </Col>
                                </Row>
                                <Row class="mb15 lh32">
                                    <Col span="7"> {{$L.account.confirm_new_dealPassword}}
                                    <span class="required">*</span>
                                    </Col>
                                    <Col span="12">
                                    <Input v-model="repassword" type="password" :placeholder="$L.account.enter_confirm_dealPassword" class="w200" />
                                    </Col>
                                </Row>
                                <div slot="footer">
                                    <Button @click="cancel('showRePasswordModal')">{{$L.account.cancel}}</Button>
                                    <Button type="primary" @click="toUpdataPassword('change',password,repassword,newPassword,password)">{{$L.account.okay}}</Button>
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
                                    <Option v-for="item in countryList" :value="item.country" :key="item.value" v-if="item.id != 1">{{ item.name }}</Option>
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
                                <span> {{$L.record.trading_time_start}}</span>
                                <DatePicker v-model="dateRecord_start" format="yyyy年MM月dd" type="daterange" placement="bottom-start" :placeholder="$L.record.start_end_dates" class="w240 mr15"></DatePicker>
                                <span> {{$L.record.trading_time_end}}</span>
                                <DatePicker v-model="dateRecord_end" format="yyyy年MM月dd" type="daterange" placement="bottom-start" :placeholder="$L.record.start_end_dates" class="w240"></DatePicker>
                                <Button type="primary" class="ml15" @click="searchOrder(currentType)">{{$L.record.search}}</Button>
                                <Button @click="downloadTableData(1)">{{$L.record.download}}</Button>
                            </div>
                            <Table border :columns="columns1" :data="tableData1" :stripe="true" ref="table"></Table>
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
                                    <InputNumber :max="refundObj.amount" :min="0.1" :step="0.1" v-model="refundAmount" class="w100"></InputNumber>
                                    </Col>
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
                                    <Option v-for="item in countryList" :value="item.country" :key="item.value" v-if="item.id != 1">{{ item.name }}</Option>
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
                                <Button @click="downloadTableData(2)">{{$L.refund.download}}</Button>
                            </div>
                            <Table border :columns="columns2" :data="tableData2" :stripe="true"></Table>
                            <Page :total="tableDataAll2.length" :current="pageIndex2" :page-size="pageSize2" :transfer="true" show-sizer show-elevator :page-size-opts="pageSizeOpts" @on-change="pageIndex2 = $event " @on-page-size-change="pageSize2 = $event" class="pageStyle" />
                        </div>
                        <div v-show="currentType==3">
                            <div class="mb15">{{$L.summary.select_time}}
                                <Button :type="range == '1'? 'primary':'default'" @click="range='1'" class="btn">{{$L.summary.nearly_week}}</Button>
                                <Button :type="range == '2' ? 'primary':'default'" @click="range='2'" class="btn">{{$L.summary.nearly_month}}</Button>
                                <Button :type="range == '3' ? 'primary':'default'" @click="range='3'" class="btn">{{$L.summary.nearly_three_months}}</Button>
                                <DatePicker v-model="dateCollect" format="yyyy年MM月dd" type="daterange" placement="bottom-start" :placeholder="$L.summary.start_end_dates" class="w240"></DatePicker>
                            </div>
                            <div class="mb15">
                                {{$L.summary.country}}
                                <Select v-model="country3" class="mr15 w160" :placeholder="$L.summary.select_country">
                                    <Option v-for="item in countryList" :value="item.country" :key="item.value" v-if="item.id != 1">{{ item.name }}</Option>
                                </Select>
                                <Button type="primary" class="search" @click="searchOrder(currentType)">{{$L.summary.search}}</Button>
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
                    label: this.$L.record.notpay
                },
                {
                    value: '2',
                    label: this.$L.record.paying
                },
                {
                    value: '3',
                    label: this.$L.record.success
                },
                {
                    value: '4',
                    label: this.$L.record.fail
                },
                {
                    value: '5',
                    label: this.$L.record.refunded
                }
            ],
            refundStautsList: [
                {
                    value: '1',
                    label: this.$L.refund.notrefund
                },
                {
                    value: '2',
                    label: this.$L.refund.processing
                },
                {
                    value: '4',
                    label: this.$L.refund.fail
                },
                {
                    value: '5',
                    label: this.$L.refund.success
                },
                {
                    value: '6',
                    label: this.$L.refund.closed
                },
                {
                    value: '11',
                    label: this.$L.refund.audit_fail
                }
            ],
            orderTypeList: [
                {
                    label: this.$L.refund.col_platform_number,
                    value: 1
                },
                {
                    label: this.$L.refund.col_merchan_number,
                    value: 2
                }
            ],
            refundTypeList: [
                {
                    label: this.$L.refund.ewallet,
                    value: 'EWALLET'
                },
                {
                    label: this.$L.refund.original,
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
            dateRecord_start: [],
            dateRecord_end: [],
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
                    title: this.$L.record.col_trading_time_start,
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: this.$L.record.col_trading_time_end,
                    align: 'center',
                    key: 'payEndTime'
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
                    title: this.$L.summary.col_currency,
                    align: 'center',
                    key: 'currency'
                },
                {
                    title: this.$L.summary.col_paid_amount,
                    align: 'center',
                    key: 'successAmount'
                },
                {
                    title: this.$L.summary.col_paid_number,
                    align: 'center',
                    key: 'successCount'
                },
                {
                    title: this.$L.summary.col_refund_amount,
                    align: 'center',
                    width: 180,
                    key: 'refundAmount'
                },
                {
                    title: this.$L.summary.col_refund_number,
                    align: 'center',
                    key: 'refundCount'
                },
                {
                    title: this.$L.summary.col_net_trading_amount,
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
            repassword: '',
            canSend: false,
            canSendTime: 60,
            currencySymbol: ''
        }
    },
    mounted() {
        let token = getCookie('token')
        this.$axios.setHeader('X-Star-Token', token)
        let getCountryToken =
            'eyJhbGciOiJIUzUxMiJ9.eyJhcHAiOjIsInVpZCI6OTE1MjQyNSwiY2NvZGUiOiJORyIsInJvbGUiOjEsImNyZWF0ZWQiOjE1NDMyMjEzNTk5MTYsImV4cCI6MjA0MjQyMTM1OSwiY2lkIjoyfQ.lfLIxjI86KGl06KTU55KY0gSeRpkABdllX-P-5KQtSL2iytd2PvWazRu7yURb0XWcn3-xKyBTlcz--pDjtPBzg'
        this.$axios.setHeader('token', getCountryToken)

        this.getMerchantInfoDto()
        this.getMerchantAppInfoDto()

        // 昨日成功交易汇总
        this.$axios
            .post('/payment/mc/v2/merchantinfomc/queryStaticOrderBillResponse')
            .then(res => {
                if (res.data.length > 0) {
                    this.tradeTotelYesterday = res.data
                }
            })
        // 获取国家
        this.$axios.get('/cms/vup/v2/areas?versionCode=5500').then(res => {
            if (res.data.length > 0) {
                this.countryList = res.data
                this.country3 = this.countryList[1].country
            }
        })

        this.searchOrder(this.currentType)
    },
    methods: {
        // 获取商户
        getMerchantInfoDto() {
            this.$axios
                .post('/payment/mc/v2/merchantinfomc/query')
                .then(res => {
                    if (res.data) {
                        this.merchantInfoDto = res.data
                    }
                })
        },
        // 获取商户应用列表
        getMerchantAppInfoDto() {
            this.$axios
                .post('/payment/mc/v2/merchantappMc/queryall')
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
                        `/payment/mc/v2/merchantinfomc/modifyEmail?email=${
                            this.email
                        }`
                    )
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$Modal.success({
                                title: this.$L.account.success
                            })
                            this.cancel('showEmailModal')
                            this.getMerchantInfoDto()
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
            let reg = /^\d{6,}$/
            if (this.phoneNum == '') {
                this.$Modal.warning({
                    title: this.$L.account.enter_phone_number
                })
            } else if (!reg.test(this.phoneNum)) {
                this.$Modal.warning({
                    title: this.$L.account.phone_least_six_digits
                })
            } else if (this.verification == '') {
                this.$Modal.warning({
                    title: this.$L.account.enter_verification
                })
            } else {
                // 验证手机验证码
                this.$axios
                    .get(
                        `payment/mc/v2/merchantinfomc/check-verify-code?phone=${
                            this.phoneNum
                        }&verifyCode=${this.verification}`
                    )
                    .then(res => {
                        if (res.data.code == 0) {
                            let countryPhone =
                                this.countryPrefix.toUpperCase() +
                                '+' +
                                this.phoneNum
                            this.$axios
                                .put(
                                    `/payment/mc/v2/merchantinfomc/modifyPhone?phone=${countryPhone}`
                                )
                                .then(res => {
                                    if (res.data.code == 0) {
                                        this.$Modal.success({
                                            title: this.$L.account.success
                                        })
                                        this.cancel('showPhoneModal')
                                        this.getMerchantInfoDto()
                                    }
                                })
                        } else {
                            this.$Modal.warning({
                                title: this.$L.account.verification_incorrect,
                                onOk: () => {
                                    this.verification = ''
                                }
                            })
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
                        `/payment/mc/v2/merchantappMc/add?name=${
                            this.appName
                        }&ewalletNo=${this.ewalletNo}&payNotifyUrl=${
                            this.payNotifyUrl
                        }&refundNotifyUrl=${this.refundNotifyUrl}`
                    )
                    .then(res => {
                        this.cancel('showAppModal')
                        this.getMerchantAppInfoDto()
                    })
            }
        },
        // 修改密码逻辑
        toUpdataPassword(type, pwd, rePwd, newPwd, oldPwd) {
            let reg = /^\d{6}$/
            if (type == 'set') {
                if (pwd == '') {
                    this.$Modal.warning({
                        title: this.$L.account.enter_dealPassword
                    })
                    return
                } else if (!reg.test(pwd)) {
                    this.$Modal.warning({
                        title: this.$L.account.password_6_digits
                    })
                    return
                } else if (rePwd == '') {
                    this.$Modal.warning({
                        title: this.$L.account.enter_confirm_dealPassword
                    })
                    return
                } else if (!reg.test(rePwd)) {
                    this.$Modal.warning({
                        title: this.$L.account.password_6_digits
                    })
                    return
                } else if (pwd != rePwd) {
                    this.$Modal.warning({
                        title: this.$L.account.password_not_match
                    })
                    return
                }
            } else if (type == 'change') {
                if (pwd == '') {
                    this.$Modal.warning({
                        title: this.$L.account.enter_original_dealPassword
                    })
                    return
                } else if (!reg.test(pwd)) {
                    this.$Modal.warning({
                        title: this.$L.account.password_6_digits
                    })
                    return
                } else if (newPwd == '') {
                    this.$Modal.warning({
                        title: this.$L.account.enter_new_dealPassword
                    })
                    return
                } else if (!reg.test(newPwd)) {
                    this.$Modal.warning({
                        title: this.$L.account.password_6_digits
                    })
                    return
                } else if (rePwd == '') {
                    this.$Modal.warning({
                        title: this.$L.account.enter_confirm_dealPassword
                    })
                    return
                } else if (newPwd != rePwd) {
                    this.$Modal.warning({
                        title: this.$L.account.password_not_match
                    })
                    return
                }
            }
            let merchantAppId = this.merchantAppInfoDto[this.appIndex].id
            this.$axios
                .put(
                    `/payment/mc/v2/merchantappMc/modifyDealPassword?merchantAppId=${merchantAppId}&oldDealPassword=${oldPwd}&dealPassword=${rePwd}`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.getMerchantAppInfoDto()
                        this.cancel('showPasswordModal')
                        this.cancel('showRePasswordModal')
                    } else if (res.data.code == 500) {
                        this.$Modal.warning({
                            title: res.data.message
                        })
                    }
                })
        },
        // 发生手机验证码
        sendVerification() {
            if (this.phoneNum == '') {
                this.$Modal.warning({
                    title: this.$L.account.enter_phone_number
                })
            }
            this.$axios
                .post(
                    `payment/mc/v2/merchantinfomc/send-verify-code?phone=${
                        this.phoneNum
                    }`
                )
                .then(res => {
                    if (res.data.code == 0) {
                        this.canSend = true
                        this.$Modal.success({
                            title: this.$L.account.later_reapply
                        })
                        let timer = setInterval(() => {
                            if (this.canSendTime <= 0) {
                                clearInterval(timer)
                                this.canSend = false
                                return
                            }
                            this.canSendTime--
                        }, 1000)
                    }
                })
        },
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
        // 修改商户应用apiKey
        createApiKey(appId, index) {
            this.$axios
                .put(`/payment/mc/v2/merchantappMc/modifyApiKey?id=${appId}`)
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
                    this.dateRecord_start[0] != ''
                        ? this.formatDate(this.dateRecord_start[0])
                        : ''
                let createTimeTo =
                    this.dateRecord_start[1] != ''
                        ? this.formatDate(this.dateRecord_start[1])
                        : ''
                let payEndTimeFrom =
                    this.dateRecord_end[0] != ''
                        ? this.formatDate(this.dateRecord_end[0])
                        : ''
                let payEndTimeTo =
                    this.dateRecord_end[1] != ''
                        ? this.formatDate(this.dateRecord_end[1])
                        : ''
                this.$axios
                    .post(
                        `payment/mc/v2/order-pay-bills?country=${upperCounteyCode}&state=${
                            this.orderStauts1
                        }&txNo=${this.txNo1}&payToken=${
                            this.payToken1
                        }&createTimeFrom=${createTimeFrom}&createTimeTo=${createTimeTo}&payEndTimeFrom=${payEndTimeFrom}&payEndTimeTo=${payEndTimeTo}`
                    )
                    .then(res => {
                        if (res.data.resultCode == 'SUCCESS') {
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
                        if (res.data.resultCode == 'SUCCESS') {
                            this.tableDataAll2 = res.data.refundBills
                        }
                    })
            } else if (currentType == 3) {
                //交易汇总查询
                this.tableData3 = []
                // let upperCounteyCode = 'TZ' // test 数据
                let upperCounteyCode =
                    this.country3 == ''
                        ? this.countryList[1].country.toUpperCase()
                        : this.country3.toUpperCase()
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
                            res.data.currency = res.data.currency
                                ? res.data.currency
                                : this.currencySymbol
                            this.tableData3.push(res.data)
                        }
                    })
            }
        },
        // 申请退款接口
        toRefund() {
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
                    title: this.$L.record.refundable_amount
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
                        this.cancel('showRefundModal')
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
        },
        // 下载
        downloadTableData(type) {
            if (type == 1) {
                if (this.tableDataAll1.length > 0) {
                    this.$refs.table.exportCsv({
                        filename: 'record',
                        columns: this.columns1,
                        data: this.tableDataAll1
                    })
                } else {
                    this.$Modal.warning({
                        title: this.$L.record.no_entries_for_download
                    })
                }
            } else if (type == 2) {
                if (this.tableDataAll2.length > 0) {
                    this.$refs.table.exportCsv({
                        filename: 'refund',
                        columns: this.columns2,
                        data: this.tableDataAll2
                    })
                } else {
                    this.$Modal.warning({
                        title: this.$L.record.no_entries_for_download
                    })
                }
            }
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
        },
        country3(val) {
            this.countryList.forEach(ele => {
                if (ele.country == val) {
                    this.currencySymbol = ele.currencySymbol
                }
            })
        }
    },
    computed: {
        tableData1() {
            this.tableDataAll1.forEach(ele => {
                switch (ele.state) {
                    case '1':
                        ele.stateShow = this.$L.record.notpay
                        break
                    case '2':
                        ele.stateShow = this.$L.record.paying
                        break
                    case '3':
                        ele.stateShow = this.$L.record.success
                        break
                    case '4':
                        ele.stateShow = this.$L.record.fail
                        break
                    case '5':
                        ele.stateShow = this.$L.record.refunded
                        break
                }
            })
            let tmp = this.tableDataAll1.slice(
                (this.pageIndex1 - 1) * this.pageSize1,
                this.pageIndex1 * this.pageSize1
            )
            return tmp
        },
        tableData2() {
            this.tableDataAll2.forEach(ele => {
                switch (ele.state) {
                    case '1':
                        ele.state = this.$L.refund.notrefund
                        break
                    case '2':
                        ele.state = this.$L.refund.processing
                        break
                    case '4':
                        ele.state = this.$L.refund.fail
                        break
                    case '5':
                        ele.state = this.$L.refund.success
                        break
                    case '6':
                        ele.state = this.$L.refund.closed
                        break
                    case '11':
                        ele.state = this.$L.refund.audit_fail
                        break
                }
            })
            let tmp = this.tableDataAll2.slice(
                (this.pageIndex2 - 1) * this.pageSize2,
                this.pageIndex2 * this.pageSize2
            )
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
</style>
