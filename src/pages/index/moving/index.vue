<template>
    <div class="page">
        <div>
            <div class="split-t-gray pl20 pr20" v-for="(item, index) in arrGoodsList" :key="index">
                <div class="text more">
                    占位
                </div>
                <div><span class="tag tag-o-primary  text-ellipsis" style="max-width:60%;"
                        :style="{'color':item.Color}">{{item.Title}}</span><span
                        class="fr text-lighter mt10 text-x-small">{{item.DateModify}}</span></div>

                <div class="con-font text-xx-large mt15 mb40">

                    <div class="content">
                        <div class="text">
                            <div :class="{'retract': item.status}" :style="{'max-height':item.status ? textHeight: ''}"
                                class="textContainer">
                                <span v-html="item.TrendContent" class="text-large"></span>
                            </div>
                            <div class="text-primary text-large">
                                <p v-if="item.status" @click="item.status = false">展开</p>
                                <p v-if="item.status == false" @click="item.status = true">收起</p>
                            </div>
                            <div class="dis-flex dis-img">
                                <!-- <div class="per30 mt20" v-for="(item1,index1) in item.MediaContent">
                                <img mode="widthFix" :src="item1">
                            </div> -->
                                <span v-for="(item1,index1) in item.MediaContent" :key="index1" class="per30 mt20 "
                                    v-if="item.MediaType==1&& index1<9" @click="clickProp(index1,item.MediaContent)">
                                    <img mode="widthFix" lazy-load="true" :src="item1">
                                </span>

                                <video :src="item.MediaContent" autoplay="true" v-if="item.MediaType==2"></video>
                            </div>
                            <div class="text-small mt20 text-lighter dis-flex flex-sb">
                                <div>{{item.RealDownload+item.VirtualDownload}}人下载</div>
                                <div> <button class="btn btn-primary" @click="download(item)">下载发圈</button></div>
                            </div>
                            <div class="pt30 mt30 border-top-light" v-if="item.LinkToolUrl&&item.LinkToolUrl!=''">
                                <button class="btn text-primary" @click="linkNavigate(item.LinkToolUrl)">查看详情></button>
                                <!-- <navigator class="btn btn-default mt20" target="miniProgram" open-type="navigate"
                                app-id="wx8f4ec1c40a1ec3dd" extra-data="" version="release">查看详情></navigator> -->
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="popupImg" v-if="isImgPopup" @click="isImgPopup=false">
            <div class="popupImgContent">
                <swiper :current="curIndex" class="swiper" indicator-dots="true" indicator-color="rgba(51,102,255,.3)"
                    indicator-active-color="#3366ff">
                    <block v-for="(item,index) in arrImgs" :key="index">
                        <swiper-item>
                            <img :src="item" mode="widthFix" class="slide-image" />
                        </swiper-item>
                    </block>
                </swiper>
            </div>
        </div>
        <popup :show.sync="isShowPopup">
            <div class="row-item border-bottom-light text-lighter text-center">
                <i class="iconfont iconwancheng text-primary"></i> 文案已复制，{{curItemType==1?'图片':'视频'}}已保存到相册
            </div>
            <div class="row-item con-popup">
                <div class="text-xxx-large text-bold">群发给会员</div>
                <div class="dis-flex con-flex">
                    <div class="con-icon"> <i class="iconfont iconshuzi-1"></i></div>
                    <div class="con-size text-xx-small">
                        <p>打开</p>
                        <p>微信</p>
                    </div>
                </div>
                <div class="dis-flex con-flex">
                    <div class="con-icon"> <i class="iconfont iconshuzi-2"></i></div>
                    <div class="con-size text-xx-small">
                        <p>搜索并打开</p>
                        <p>「群发助手」</p>
                    </div>
                </div>
                <div class="dis-flex con-flex">
                    <div class="con-icon"> <i class="iconfont iconshuzi-3"></i></div>
                    <div class="con-size text-xx-small">
                        <p>选择会员好友</p>
                        <p>为群发对象</p>
                    </div>
                </div>
                <div class="dis-flex con-flex">
                    <div class="con-icon"> <i class="iconfont iconshuzi-4"></i></div>
                    <div class="con-size text-xx-small">
                        <p>粘贴文案/选</p>
                        <p>择发送图片</p>
                    </div>
                </div>
            </div>
            <div class="row-item con-popup">
                <div class="text-xxx-large text-bold">发送到朋友圈</div>
                <div class="dis-flex con-flex">
                    <div class="con-icon"> <i class="iconfont iconshuzi-1"></i></div>
                    <div class="con-size text-xx-small">
                        <p>打开</p>
                        <p>微信</p>
                    </div>
                </div>
                <div class="dis-flex con-flex">
                    <div class="con-icon"> <i class="iconfont iconshuzi-2"></i></div>
                    <div class="con-size text-xx-small">
                        <p>粘贴文案/</p>
                        <p>上传图片</p>
                    </div>
                </div>
                <div class="dis-flex con-flex">
                    <div class="con-icon"> <i class="iconfont iconshuzi-3"></i></div>
                    <div class="con-size text-xx-small">
                        <p>发布</p>
                        <p>朋友圈</p>
                    </div>
                </div>

            </div>
            <div class="border-top-light mt20">
                <button class="btn  btn-default btn-full block" @click="isShowPopup=false">取消</button>
            </div>
        </popup>
    </div>
</template>
<script>
    import DownloadSaveFile from "@/utils/downloadSaveFile";
    import popup from '@/components/popupTemplate.vue';
    import goPage from "@/utils/goPage";
    let data_module = {
        isShowPopup: false,
        isImgPopup: false,
        oneHeight: "",
        curItemType: "",
        txtDom: [],
        arrImgs: [],
        curIndex: 0,
        totalPages: 0,
        dataOut: {
            key: '',
            beginDate: "",
            endDate: "",
            pageIndex: 1,
            pageSize: 15
        },
        arrGoodsList: [],
        textHeight: null
    }
    export default {
        data() {
            return data_module
        },
        components: {
            popup
        },
        methods: {
            goPage,
            DownloadSaveFile,
            initPage() {
                let para = this.dataOut;
                mpvue.fetchData({
                    API: 'api/Trend/TrendList',
                    para,
                    callback: (data) => {
                        this.totalPages = data.TotalPages;
                        let tmpData = data.Data;
                        tmpData.forEach((ele, index) => {
                            ele.TrendContent = ele.TrendContent.replace(/\n/g, "<br/>");
                            ele.MediaContent = ele.MediaContent.split(",")
                            ele.status = null;
                        })
                        if (this.dataOut.pageIndex === 1) {
                            this.arrGoodsList = tmpData;
                        } else {
                            this.arrGoodsList = [...this.arrGoodsList, ...tmpData];
                        }
                        // DOM 加载完执行
                        setTimeout(() => {
                            this.$nextTick(() => {
                                this.calculateText()
                            })
                        }, 100)
                    }
                })
            },
            linkNavigate(item) {
                let url = this.goPage(item);
                wx.navigateToMiniProgram({
                    appId: 'wx8f4ec1c40a1ec3dd',
                    path: url,
                    envVersion: 'trial',
                    success(res) {
                        // 打开成功
                    }
                })
            },
            calculateText() {
                //  获取一行文字的height 计算当前文字比较列表文字
                let me = this;
                let oneHeight = new Promise(function (resolve) {
                    wx.createSelectorQuery().selectAll('.more').boundingClientRect().exec(res => {
                        let oneHeight = res[0][0].height
                        resolve(oneHeight);
                    })
                })
                let txtDom = new Promise(function resolve(resolve) {
                    wx.createSelectorQuery().selectAll('.textContainer').boundingClientRect().exec(res => {
                        resolve(res);
                    })
                })
                Promise.all([oneHeight, txtDom]).then(function (result) {
                    let oneHeight = result[0];
                    let threeHeight = oneHeight * 3 || 40
                    me.textHeight = `${threeHeight}px`
                    let txtDom = result[1][0];
                    for (let i = 0; i < txtDom.length; i++) {
                        let curHeight = txtDom[i].height;
                        if (curHeight > threeHeight) {
                            me.$set(me.arrGoodsList, i, Object.assign({}, me.arrGoodsList[i], {
                                status: true
                            }))
                        } else {
                            me.$set(me.arrGoodsList, i, Object.assign({}, me.arrGoodsList[i], {
                                status: null
                            }))
                        }
                    }
                })
            },
            download(item) {
                this.isShowPopup = true;
                item.TrendContent = item.TrendContent.replace(/<br\s*\/?>/gi, "\r\n");
                this.curItemType = item.MediaType;
                wx.setClipboardData({
                    data: item.TrendContent,
                    success(res) {
                        if (item.MediaType == 2) {
                            DownloadSaveFile.downloadFile('video', item.MediaContent[0]);
                        } else if (item.MediaType == 1) {
                            DownloadSaveFile.downloadFiles('image', item.MediaContent);
                        }
                    }
                })
                mpvue.fetchData({
                    API: 'api/Trend/TrendRealDownloadUpdate',
                    para: {
                        Id: item.Id
                    },
                    callback: (data) => {
                        this.initPage();
                    }
                })
            },
            clickProp(index, item) {
                this.isImgPopup = true;
                this.arrImgs = item;
                this.curIndex = index;
            }
        },
        onLoad() {
            this.initPage();
            this.isImgPopup = false;
            mpvue.setNavigationBarTitle({
                title: "动态"
            });
        },
        onReachBottom() {
            console.log("load more data");
            if (this.totalPages > this.dataOut.dataOut) {
                this.dataOut.dataOut += 1;
                this.initPage();
            }
        },
    }
</script>
<style lang="scss" scoped>
    .posfixed {
        position: fixed;

    }

    .tag {
        padding: 8rpx 16rpx
    }

    .more {
        color: #666;
        visibility: hidden;
    }

    .content {
        display: flex;
    }

    .text {
        position: relative;
        line-height: 40rpx;
        color: #666666;
        width: 100%;

    }

    .retract {
        position: relative;
        overflow: hidden;

        &:after {
            content: '...';
            position: absolute;
            bottom: 0;
            right: 2px;
            width: 25px;
            padding-left: 0;
            background: #fff;
        }
    }

    .dis-img {
        flex-wrap: wrap;
        justify-content: space-between;

        .per30 {
            height: 210rpx;
            width: 32%;
            border: 2rpx solid #F8F8F7;

            img {
                width: 100%;
                max-height: 210rpx;
            }
        }
    }

    .con-popup {

        .con-flex {
            width: 25%;
            float: left;
            margin-top: 30rpx;

            .con-icon {
                color: #C1D1FF;
            }

            .con-size {
                line-height: 1.2;
                color: #666;
            }
        }

    }

    .popupImg {

        width: 100%;
        height: 100%;
        z-index: 100;
        background: #000;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 100;
        text-align: center;

        .popupTitle {
            color: #fff;
            text-aligh: center;
            font-size: 17px;

        }

        /* .popupImgContent {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
        } */

    }

    .swiper {
        width: 100%;
        height: 100vh;
        overflow: hidden;

        ._swiper-item {
            overflow: scroll;

            .slide-image {
                width: 100%;
                overflow: auto;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                position: absolute;
            }
        }


    }
</style>