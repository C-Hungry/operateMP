<template>
  <div>
    <div class="search-bar dis-flex ml30 mr30">
      <div class="dis-flex input-box">
        <icon class="icon-search mt5" type="search" size="16" />
        <input type="text" class="text-small input" placeholder="请输入姓名、手机号" v-model="objDataOut.key"
          placeholder-style="color:#8E8E93" confirm-type="search" @confirm="switchStatus()">
      </div>
      <div class="text-right text-x-large mt5 ml20 text-bold mt10" @click="switchStatus()">
        搜索
      </div>

    </div>
    <div class="tabs">
      <div class="item" :class="{on:objDataOut.pusherRoleType==item.k}" @click="switchStatus(item.k)"
        v-for="(item,index) in arrStatus" :key="index">
        {{item.v}}
      </div>
    </div>
    <div class="filter-bar flex-sb split-t-gray p30">
      <div class="item text-bold" :class="tabIndex === 0 ?'active':''" @click="onTab(1)">
        注册时间
        <span class="sort" :class="sortDesc1"></span>
      </div>
      <div class="item text-bold" :class="tabIndex === 0 ?'active':''" @click="onTab(2)">
        团队会员数
        <span class="sort" :class="sortDesc2"></span>
      </div>
      <div class="item text-bold" :class="tabIndex === 0 ?'active':''" @click="onTab(3)">
        累计收益
        <span class="sort" :class="sortDesc3"></span>
      </div>
    </div>
    <div class="user-list row-item border-bottom-light border-top-light" v-for="(item,index) in arrGoodsList"
      :key="index"
      @click="goUrl('/pages/workbench/myOperation/myOperationDetail/myOperationDetailMain?UserId='+item.UserSN+'&StarsLevel='+item.StarsLevel+'&TeamRetailerCount='+item.TeamCount)">
      <div class="item">
        <div class="img-box">
          <img mode="widthFix" :src="item.UserImage ? item.UserImage :'/static/images/headImg.jpg'" alt="">
          <span class="img-label label-primary"> {{item.StatusDesc}}</span>
        </div>
        <div class="info">
          <div class="title">{{item.RealName ? item.RealName:item.UserName}} <span class="tag-label"><i
                class="iconfont iconxing"></i>{{item.StarsLevel}}</span><span
              class="fr text-x-small text-lighter text-normal">服务经理</span>
          </div>
          <div class="goods-desc">
            <span class="fr">{{item.PusherRealName}}</span>
            <div class="text-ellipsis w60p">
              <span v-if="item.EnterpriseType==3">个人</span>
              <span v-else-if="item.EnterpriseType==2">个体户</span>
              <span v-else>{{item.EnterpriseName}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dis-flex mt30">
        <div class="item text-center">
          <div class="text-lighter text-x-small">注册时间</div>
          <div class="text-small">{{item.CreateTime}}</div>
        </div>
        <div class="item text-center">
          <div class="text-lighter text-x-small">团队会员数</div>
          <div class="text-small">{{item.TeamCount}}</div>
        </div>
        <div class="item text-center">
          <div class="text-lighter text-x-small">累计收益</div>
          <div class="text-small">￥{{item.PersonToltalInCome}}</div>
        </div>
      </div>
    </div>
    <div class="text-light  row-item text-center" style="padding-top:40%" v-if="arrGoodsList.length==0">暂无相关数据
    </div>
  </div>
</template>

<script>
  import goUrl from "@/utils/goUrl";
  export default {
    data() {
      return {
        arrGoodsList: [],
        totalPages: 0,
        objDataOut: {
          key: "",
          pusherRoleType: "",
          sortType: 1,
          IsDesc: 1,
          pageIndex: 1,
          pageSize: 15
        },
        tempSort: 1, //上一次选中的索引
        curStatus: 0,
        arrStatus: [{
            k: 0,
            v: '全部'
          }, {
            k: 4,
            v: '城市拍档'
          },
          {
            k: 3,
            v: '城市经理'
          },
          {
            k: 2,
            v: '区域分总'
          },
        ],
        sortDesc1: "desc",
        sortDesc2: "",
        sortDesc3: "",
        isShowfilterBtn: false,
      };
    },
    components: {},
    methods: {
      goUrl,
      switchStatus(status) {
        this.objDataOut.pusherRoleType = status;
        this.arrGoodsList = [];
        this.objDataOut.pageIndex = 1;
        this.initData();
      },
      onTab(index) {

        this.tabIndex = index;
        this.objDataOut.sortType = index;
        this.objDataOut.pageIndex = 1;
        if (index == this.tempSort) {
          if (this["sortDesc" + index] === "asc") {
            this["sortDesc" + index] = "desc";
            this.objDataOut.IsDesc = 1;
          } else if (this["sortDesc" + index] === "desc") {
            this["sortDesc" + index] = "asc";
            this.objDataOut.IsDesc = 0;
          }
        } else {
          this["sortDesc" + this.tempSort] = "";
          this["sortDesc" + index] = "desc";
          this.objDataOut.IsDesc = 1;
        }
        this.tempSort = index;
        this.arrGoodsList = [];
        this.initData();
      },
      checkChange(item) {
        console.log(item)
        item.checked = !item.checked;
      },
      radioChange(item) {
        this.gqdate.forEach(dt => {
          dt.checked = false;
        })
        item.checked = true;
        this.objDataOut.dtime = item.value;
      },
      reset() {
        this.objDataOut.dtime = "";
        this.gqdate.forEach(dt => {
          dt.checked = false;
        })
      },
      initData() {
        let para = this.objDataOut;
        mpvue.fetchData({
          API: 'api/Push/PusherGetMyTeamList',
          para,
          callback: (data) => {
            this.totalPages = data.TotalPages;
            data.Data.Reta.forEach(lg => {
              lg.CreateTime = mpvue.datetime(lg.CreateTime).date;
              lg.LastVisitTime = mpvue.datetime(lg.LastVisitTime).date;
              lg.LastOrderTime = mpvue.datetime(lg.LastOrderTime).date;
            });
            let tmpData = data.Data.Reta;

            if (this.objDataOut.pageIndex === 1) {
              this.arrGoodsList = tmpData;
            } else {
              this.arrGoodsList = [...this.arrGoodsList, ...tmpData];
            }
            if (this.arrGoodsList && this.arrGoodsList.length == 0) {
              this.isShowfilterBtn = false;
            }

          }
        })
      }
    },

    watch: {
      key() {

      }
    },
    onLoad() {
      //   Object.assign(this.$data, this.$options.data());
      this.initData();
      mpvue.setNavigationBarTitle({
        title: "我的团队"
      });
    },
    onShow() {},
    onReachBottom() {
      console.log("load more data");
      if (this.totalPages > this.objDataOut.pageIndex) {
        this.objDataOut.pageIndex += 1;
        this.initData();
      }

    },
    onUnload() {

    },
    onShareAppMessage() {

    }
  };
</script>