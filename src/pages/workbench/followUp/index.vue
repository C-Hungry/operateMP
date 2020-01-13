<template>
    <div class="page bg-gray ">
        <div class="bg-white row-item">
            <div class="dis-flex p20 flex-space">
                <div class="item">记录类型</div>
                <div class="item">
                    <div class="anchor-row text-right">
                        <picker @change="selectPicker($event,1)" value="0" :range="objType">
                            <div v-if="objData.typeDesc==''">
                                {{objType[0]}}
                            </div>
                            <div v-else>
                                {{objData.typeDesc}}
                            </div>
                        </picker>
                    </div>
                </div>
            </div>
            <div class="dis-flex p20 flex-space border-top-light">
                <div>
                    下次联系时间
                </div>
                <div class="text-right anchor-row">
                    <picker mode="date" end="2099-12-31" @change="selectPicker($event,2)">
                        <div v-if="objData.nextFollowTime==''" class="text-lighter">年/月/日</div>
                        <div v-else>{{objData.nextFollowTime}}</div>
                    </picker>
                </div>
            </div>
            <div class="p20 flex-space border-top-light">
                <div class="bg-gray p15">

                    <textarea placeholder="请输入跟进内容" v-model="objData.content" maxlength="500"
                        placeholder-style="color:#ccc"></textarea>
                    <div class="text-right mr15 text-lighter">
                        已输入{{objData.content.length}}/500
                    </div>
                    <div>
                        <div class="upload-s-box" @click="upload">
                        </div>
                        <span class="upload-s-list ml20 dis-inline-block" v-for="(item,index) in uploadImg"
                            :key="index">
                            <img :src="item" alt="">
                            <span class="delImg" @click="delImg(index)">
                                <i class="iconfont iconerror"></i>
                            </span>

                        </span>
                    </div>
                    <div class="text-right mr15 text-lighter">
                        已上传{{uploadImg.length}}/3
                    </div>
                </div>
            </div>
        </div>
        <div class="page-footer">
            <div class="page-footer-inner dis-flex">
                <span class="btn item btn btn-primary btn-full text-large" @click="save">提交</span>
            </div>
        </div>
    </div>
</template>
<script>
    import areaSelectPicker from "@/components/areaSelectPicker";
    export default {
        data() {
            return {
                UserId: "",
                objType: [
                    '打电话',
                    '发微信',
                    '发短信',
                    '面访',
                    '活动',
                    '其他'
                ],
                uploadImg: [],
                objData: {
                    type: "1",
                    typeDesc: "打电话",
                    images: "",
                    nextFollowTime: "",
                    content: "",
                    Files: ""
                }
            }
        },
        components: {
            areaSelectPicker
        },
        methods: {
            selectPicker(e, index) { //  1：是否长期有效 2：日期  3:地区   4职业
                if (index == 1) {
                    let o_index = e.mp.detail.value;
                    this.objData.type = parseInt(o_index) + 1;
                    this.objData.typeDesc = this.objType[o_index];
                } else if (index == 2) {
                    this.objData.nextFollowTime = e.mp.detail.value
                }
            },
            wordLimit() {
                let textVal = this.objData.content;
                let maxLength = 20;
                let length;
                arrlength = parseInt(maxLength) - parseInt(textVal.length);
            },
            upload() {
                let me = this;
                if (this.uploadImg.length > 2) {
                    mpvue.showTips("最多上传3张图片");
                    return;
                }
                wx.chooseImage({
                    count: 1,
                    success(res) {
                        const tempFilePaths = res.tempFilePaths
                        wx.uploadFile({
                            url: mpvue.UPLOADSERVER, // 使用正式环境上传接口
                            filePath: tempFilePaths[0],
                            name: 'file',
                            formData: {},
                            success(res) {
                                let data = JSON.parse(res.data);
                                me.uploadImg.push(data.Data);
                                //  me.objData.image = data.Data;
                            }
                        })

                    }
                })
            },
            delImg(index) {
                this.uploadImg.splice(index, 1)
            },
            save() {
                let para = this.objData;
                para.images = this.uploadImg.join(",");
                para.UserSN = this.UserId;

                mpvue.fetchData({
                    API: 'api/RegMng/FollowRecordAdd',
                    para,
                    callback: (data) => {
                        // wx.navigateTo({
                        //     url: `/pages/workbench/myMember/myMemberDetail/myMemberDetailMain?UserId=${this.UserId}`
                        // })
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                })
            }
        },
        onLoad() {
            Object.assign(this.$data, this.$options.data());
            this.UserId = this.$root.$mp.query.UserId;

        }
    }
</script>
<style lang="scss" scoped>
    textarea {
        height: 120rpx;
    }
</style>