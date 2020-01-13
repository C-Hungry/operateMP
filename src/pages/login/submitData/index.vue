<template>
  <div class="page bg-gray ">
    <div class="page-footer" :class="isIPX?'isIPX':''">
      <div class="page-footer-inner dis-flex">
        <span class="btn item btn btn-primary btn-full text-large" @click="save">提交认证</span>
      </div>
    </div>
    <div class="bg bg-warning ml15" v-if="isShowTips">
      平台不会已任何形式泄露您的信息，请放心填写
      <i class="iconfont iconerror text-muted" @click="isShowTips=false"></i>
    </div>
    <div class="row-item page-content">

      <div class="bg-white pl20 pr20 br10">
        <div class="dis-flex p20 flex-space">
          <div class="item">
            <span class="required-mark"></span> 姓名
          </div>
          <div class="text-right item">
            <input type="text" v-model="objData.RealName" placeholder="请填写您的真实姓名" placeholder-style="color:#ccc"
              maxlength="20">
          </div>
        </div>
        <div class="dis-flex p20 flex-space border-top-light">
          <div>
            <span class="required-mark"></span> 身份证号
          </div>
          <div class="text-right w70p">
            <input type="idcard" v-model="objData.IDCardNumber" placeholder="请输入身份证号" placeholder-style="color:#ccc">
          </div>
        </div>
        <!-- <div class="dis-flex p20 flex-space border-top-light">
          <div class="text">
            性别
          </div>
          <div class="text-right">

            <radio-group class="radio-group" @change="selectPicker($event,5)">
              <label class="checkbox">
                <input type="radio" value="男" :checked="objData.Sex=='男'" />
                <i class="icon"></i>男
              </label>
              <label class="checkbox" style="margin-left:40rpx">
                <radio value="女" :checked="objData.Sex=='女'" />
                <i class="icon"></i>女
              </label>
            </radio-group>
          </div>
        </div>
        <div class="dis-flex p20 flex-space border-top-light">
          <div>
            身份证是否长期有效
          </div>
          <div class="text-right">
            <switch style="zoom:0.8" color="#3366FF" :checked="objData.IDCardIsPermanentValidity"
              @change="selectPicker($event,1)" />
          </div>
        </div>
        <div class="dis-flex p20 flex-space border-top-light" v-if="!objData.IDCardIsPermanentValidity">
          <div>
            身份证有效期
          </div>
          <div class="text-right">
            <picker mode="date" end="2099-12-31" @change="selectPicker($event,2)">
              <div v-if="objData.IDCardEndDateTime==''" class="text-lighter">年/月/日</div>
              <div v-else>{{objData.IDCardEndDateTime}}</div>
            </picker>
          </div>
        </div>
        <div class="border-top-light p20">
          <div>身份证头像照片
            <p class="text-lighter text-x-small mb15">身份证信息会加密处理，不会泄漏您的信息</p>
          </div>
          <div class="dis-flex flex-space">
            <div class="item">
              <div class="upload-box mr15" v-if="objData.IDCardZImage==''" @click="upload(1)">
                <p class="text-lighter text-center text-middle">点击上传头像照片</p>
              </div>
              <div class="upload-img-list" v-else>
                <img :src="objData.IDCardZImage" alt="">
                <i class="icon-del" @click="delImg('IDCardZImage')"></i>
              </div>

            </div>
            <div class="item">
              <div class="upload-img-list ml15">
                <div class="r-tag"><img mode="widthFix" src="/static/images/shili.png" alt=""></div>
                <img src="https://hmm.jdhui.com/new/dist/images/sfz_tx.jpg" alt="">
              </div>
            </div>
          </div>
          <div class="dis-flex flex-space mt30">
            <div class="item">
              <div class="upload-box mr15" v-if="objData.IDCardFImage==''" @click="upload(0)">
                <p class="text-lighter text-center text-middle">点击上传国徽照片</p>
              </div>
              <div class="upload-img-list" v-else>
                <img :src="objData.IDCardFImage" alt="">
                <i class="icon-del" @click="delImg('IDCardFImage')"></i>
              </div>
            </div>
            <div class="item">
              <div class="upload-img-list ml15">
                <div class="r-tag"><img mode="widthFix" src="/static/images/shili.png" alt=""></div>
                <img src="https://hmm.jdhui.com/new/dist/images/sfz_gh.jpg" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="dis-flex p20 border-top-light flex-space">
          <div class="item">职业</div>
          <div class="item">
            <div class="anchor-row text-right">
              <picker @change="selectPicker($event,4)" :range="objOccupation">
                <div v-if="objData.Occupation==''" class="text-lighter">
                  请选择职业
                </div>
                <div v-else>
                  {{objData.Occupation}}
                </div>
              </picker>
            </div>
          </div>
        </div> -->
        <div class="dis-flex p20 border-top-light flex-space">
          <div class=""> <span class="required-mark"></span>地区</div>
          <div class="w80p">
            <div class="anchor-row text-right" @click="selectPicker($event,3)">
              <div v-if="AreaMergerName!=''">{{AreaMergerName}}
              </div>
              <div v-else class="text-lighter">请选择地区</div>

            </div>
          </div>
        </div>
        <div class="dis-flex p20 flex-space border-top-light">
          <div>
            <span class="required-mark"></span>详细地址
          </div>
          <div class="text-right w80p">
            <input type="text" v-model="objData.AddressDetails" placeholder="请输入详细地址" placeholder-style="color:#ccc">
          </div>
        </div>
      </div>
    </div>
    <area-select-picker :show.sync="isShowPicker" @picked="onPicked"></area-select-picker>
  </div>
</template>
<script>
  import areaSelectPicker from "@/components/areaSelectPicker";
  export default {
    data() {
      return {
        isShowTips: true,
        objData: {
          Name: "",
          Sex: "男",
          IDCardNumber: "",
          AreaCode: "",
          Occupation: "",
          IDCardZImage: "",
          IDCardFImage: "",
          IDCardEndDateTime: "",
          AddressDetails: "",
          IDCardIsPermanentValidity: 0
        },
        AreaMergerName: "",
        UserSN: "",
        loginType: "",
        isIPX: "",
        job: "请选择职业",
        isShowPicker: false,
        objOccupation: [
          "事业单位员工",
          "企业高管",
          "私营业主",
          "公司员工",
          "商业服务人员",
          "自由职业者",
          "其他"
        ],
      }
    },
    components: {
      areaSelectPicker
    },
    methods: {
      initPageData() {

        mpvue.fetchData({
          API: "/api/Push/CityPusherGetMyRegInfo",
          para: {
            UserSN: this.UserSN
          },
          hideOkTips: true,
          callback: data => {
            data.IDCardIsPermanentValidity == !!data.IDCardIsPermanentValidity;
            data.IDCardEndDateTime = mpvue.datetime(data.IDCardEndDateTime).date;
            this.objData = JSON.parse(JSON.stringify(this.objData));
            setTimeout(() => {
              this.objData = data;
              this.objData.AreaCode = this.objData.AreaCode4;
              if (data.AreaName1) {
                this.isAreaOk = true;
                this.AreaMergerName =
                  data.AreaName1 +
                  "," +
                  data.AreaName2 +
                  "," +
                  data.AreaName3 +
                  "," +
                  data.AreaName4;
              } else {
                //this.objData.Sex = "男";
              }


            });
          }
        });

      },
      selectPicker(e, index) { //  1：是否长期有效 2：日期  3:地区   4职业 5性别
        if (index == 1) {
          this.objData.IDCardIsPermanentValidity = e.mp.detail.value - 0
        } else if (index == 2) {
          this.objData.IDCardEndDateTime = e.mp.detail.value
        } else if (index == 3) {
          this.isShowPicker = true;
        } else if (index == 5) {
          this.objData.Sex = e.mp.detail.value
        } else {
          let o_index = e.mp.detail.value;
          this.objData.Occupation = this.objOccupation[o_index];
        }
      },
      onPicked(obj) {

        this.AreaMergerName = obj.Area;
        this.objData.AreaCode = obj.Code;
        console.log(this.objData)
      },

      upload(index) {
        let me = this;
        let isAbove = index
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
                console.log(data);
                if (index == 1) {
                  me.objData.IDCardZImage = data.Data;
                } else {
                  me.objData.IDCardFImage = data.Data;
                }
              }
            })

          }
        })
      },
      delImg(item) {
        this.objData[item] = ""
      },
      save() {
        console.log(/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(this.objData.IDCardNumber));
        if (this.objData.Name == '') {
          mpvue.showTips("请输入真实姓名");
          return;
        } else if (this.objData.IDCardNumber == '' || !/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(this.objData.IDCardNumber)) {
          mpvue.showTips("请输入正确的身份证号");
          return;
        } else if (this.objData.AreaCode == '') {
          mpvue.showTips("请选择地区");
          return;
        } else if (this.objData.AddressDetails == '') {
          mpvue.showTips("请输入详细地址");
          return;
        }
        let para = JSON.parse(JSON.stringify(this.objData));
        para.UserSN = this.UserSN;
        console.log(para);
        mpvue.fetchData({
          API: "/api/RegMng/CityRegPusherStep2",
          para,
          hideOkTips: true,
          callback: data => {
            wx.navigateTo({
              url: '/pages/login/auth/authMain'
            })
          }
        });
      }
    },
    onLoad() {
      Object.assign(this.$data, this.$options.data());
      this.UserSN = wx.getStorageSync("UserSN") || this.$root.$mp.query.UserSN || '';
      this.loginType = this.$root.$mp.query.loginType || '';
      mpvue.setNavigationBarTitle({
        title: "提交资料"
      });
      this.initPageData();
      let isIPX = ""
      mpvue.getSystemInfo({
        success: function (res) {
          if (res.model.indexOf("iPhone X") >= 0 || res.model == "iPhone XR") {
            isIPX = 1;
          }
        }
      })
      this.isIPX = isIPX;
    }
  }

</script>
<style lang="scss" scoped>
  .upload-box {
    &:before {
      top: 40%;
    }
  }

</style>
