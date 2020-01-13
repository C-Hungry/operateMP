<template>
    <div class="page bg-gray">
        <div class="tabs text-center bg-white dis-flex">
            <div class="item" :class="{on:index==curTabIndex}" @click="swtichTab(index)" v-for="(item,index) in arrTabs"
                :key="index">
                {{item.name}}
            </div>
        </div>
        <div class="row-item">
            <div v-if="curTabIndex==0">
                <div class="coupon-item dis-flex  mt10" v-for="(item,index) in arrDataList" :key="index">
                    <div class="coupon-price">￥<span class="coupon-priceSize">{{item.DiscountMoney}}</span></div>
                    <div class="coupon-attr  " style="width: 50%;">
                        <div class="text-x-large text-ellipsis">{{item.Name}}</div>
                        <div class="text-small mt10">
                            <span class="tag tag-primary br10 mr15">
                                <span v-if="item.CouponType==1">通用券</span>
                                <span v-if="item.CouponType==2">品类券</span>
                                <span v-if="item.CouponType==3">商品券</span>
                            </span>适用自营商品</div>
                        <div class="text-lighter text-x-small mt30">{{item.Start}}至{{item.End}}</div>
                    </div>
                    <div class="coupon-duihuan" @click="showPopup(item.CId)">
                        立即兑换
                    </div>
                </div>
                <div class="text-light row-item text-center" style="padding-top:40%" v-if="arrDataList.length==0">暂无相关数据
                </div>
            </div>
            <div v-if="curTabIndex==1" class="bg-white">
                <div class="pt40 pb40 ml20 mr20 dis-flex flex-sb border-top-light" v-for="(item,index) in arrRecordList"
                    :key="index">
                    <div class="w70p">
                        <div>优惠码：{{item.PromoCode}}
                        </div>
                        <div class="text-small text-lighter">
                            <p class="mt10">面额：{{item.DiscountMoney}}元 <span class="tag tag-primary">
                                    <span v-if="item.CouponType==1">通用券</span>
                                    <span v-if="item.CouponType==2">品类券</span>
                                    <span v-if="item.CouponType==3">商品券</span>
                                </span></p>
                            <p class="mt10">有效期：{{item.Start}}至{{item.End}}</p>
                            <p class="mt10">兑换时间：{{item.ExChangeTime}}</p>
                        </div>
                    </div>
                    <div>
                        <span class="tag-copy" v-if="item.Status==0" @click="copyCode(item.PromoCode)">复制</span>
                        <span class="iconfont iconyishixiao text-lighter" v-else>
                        </span>
                    </div>
                </div>

            </div>
        </div>
        <popup :show.sync="isShowPopup" title="操作提示" btnOKText="确定" close-after-click="true" @after-ok="duihuan()">
            <div class="text-large">
                你确定要兑换优惠码吗？
            </div>
        </popup>
    </div>
</template>
<script>
    import popup from "@/components/confirm";
    export default {
        data() {
            return {
                isShowPopup: false,
                curTabIndex: 0,
                curId: "",
                arrDataList: [],
                arrRecordList: [],
                dataOut: {
                    Status: "",
                    PageIndex: 1,
                    PageSize: 15,
                },
                arrTabs: [{
                        name: "优惠券兑换"
                    },
                    {
                        name: "兑换记录"
                    }
                ]
            }
        },
        components: {
            popup
        },
        methods: {
            swtichTab(index) {
                this.curTabIndex = index;
                if (index == 0) {
                    this.initData();
                } else {
                    this.recordList()
                }
            },
            initData() {
                mpvue.fetchData({
                    API: 'api/Push/CityPusherGetCanReceiveHmmCouponList',
                    callback: (data) => {
                        data.Data.forEach(el => {
                            el.Start = mpvue.datetime(el.Start).date;
                            el.End = mpvue.datetime(el.End).date;
                        })
                        this.arrDataList = data.Data;
                    }
                })
            },
            copyCode(item) {
                wx.setClipboardData({
                    data: item,
                    success(res) {

                    }
                })
            },
            recordList() {
                let para = this.dataOut;
                mpvue.fetchData({
                    API: 'api/Push/CityPusherGetHmmCouponList',
                    para,
                    callback: (data) => {
                        data.Data.forEach(el => {
                            el.Start = mpvue.datetime(el.Start).date;
                            el.End = mpvue.datetime(el.End).date;
                        })
                        let tmpData = data.Data;

                        if (this.dataOut.PageIndex === 1) {
                            this.arrRecordList = tmpData;
                        } else {
                            this.arrRecordList = [...this.arrRecordList, ...tmpData];
                        }
                    }
                })
            },
            showPopup(item) {
                this.isShowPopup = true;
                this.curId = item;
            },
            duihuan() {
                mpvue.fetchData({
                    API: 'api/Push/CityPusherExchangeCoupon',
                    para: {
                        CId: this.curId
                    },
                    callback: (data) => {
                        mpvue.showTips('兑换成功，你可进入兑换记录查看')
                        setTimeout((() => {
                            this.initData();
                        }), 1000)
                    }
                })
            }
        },
        onLoad() {
            mpvue.setNavigationBarTitle({
                title: "转优惠码"
            });
            this.initData();
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/SCSS/base/_variables.scss';
    $coupon-height:200rpx;

    .iconyishixiao {
        font-size: 140rpx;

    }

    .coupon-item {
        background-size: 100%;
        background-image: url(#{$bgDomain}/dist/images/op-coupon.png);
        height: $coupon-height;
        text-align: center;

        >.coupon-price {
            width: 270rpx;
            color: #fff;
            line-height: $coupon-height;

            >.coupon-priceSize {
                font-size: 52rpx;
            }
        }

        >.coupon-attr {
            text-align: left;
            margin-top: 20rpx;
        }

        >.coupon-duihuan {
            width: 40rpx;
            margin: 20rpx;
            line-height: 1.5;
            color: $color-primary;
        }


    }

    .tag-copy {
        border: 1px solid #ddd;
        color: #666;
        padding: 10rpx 20rpx;
        border-radius: 10rpx;
    }
</style>