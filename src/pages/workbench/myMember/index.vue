<template>
  <div>
    <div class="search-bar dis-flex ml30 mr30">
      <div class="dis-flex input-box">
        <icon class="icon-search mt5" type="search" size="16" />
        <input type="text" class="text-small input" placeholder="请输入姓名、手机号、企业名称" v-model="objDataOut.key"
          placeholder-style="color:#8E8E93" confirm-type="search">
      </div>
      <div class="text-right text-x-large mt5 ml20 text-bold mt10" @click="searchBtn">
        搜索
      </div>
    </div>
    <div class="filter-bar flex-sb m30">
      <div class="item text-bold" :class="tabIndex === 0 ?'active':''" @click="onTab(0)">
        注册时间
        <span class="sort" :class="sortDesc0"></span>
      </div>
      <div class="item text-bold" :class="tabIndex === 0 ?'active':''" @click="onTab(1)">
        最近访问
        <span class="sort" :class="sortDesc1"></span>
      </div>
      <div class="item text-bold" :class="tabIndex === 0 ?'active':''" @click="onTab(2)">
        最近下单
        <span class="sort" :class="sortDesc2"></span>
      </div>
      <div class="item text-bold" :class="tabIndex === 0 ?'active':''" @click="onTab(3)">
        筛选
        <span class="triggle" :class="filter"></span>
      </div>
    </div>
    <div class="filter-content" v-if="isShowfilterBtn">
      <div class="filter-btn-group">
        <div class="pt30 pl20">
          账户状态
        </div>
        <div class="dis-flex text-center pl10 pr10">
          <div class="col4 filter-btn" :class="item.checked?'active':''" v-for="(item,index) in acoItems" :key="index"
            @click="checkChange(item)">
            {{item.name}}
          </div>
        </div>
        <div class="pt30 pl20">
          即将过期时间
        </div>
        <div class="dis-flex text-center pl10 pr10">
          <div class="col4 filter-btn" :class="item.checked?'active':''" v-for="(item,index) in gqdate" :key="index"
            @click="radioChange(item)">{{item.value}}
          </div>
        </div>
        <div class="pt30 pl20">
          注册时间
        </div>
        <div class="dis-flex text-center pl10 pr10">
          <div class="filter-btn" style="width: 42%;">
            <picker mode="date" start="2010-01-01" @change="bindDateChange($event,0)">
              {{searchStartDate}}
            </picker>
          </div>
          -
          <div class="filter-btn" style="width: 42%;">
            <picker mode="date" start="2010-01-01" @change="bindDateChange($event,1)">
              {{searchEndDate}}
            </picker>
          </div>
        </div>
        <div class="pt30 pl20">
          地区
        </div>
        <div class="dis-flex text-center pl10 pr10">
          <div class="filter-btn" style="width: 100%;">
            <area-picker :show.sync="isShowPicker" @picked="onAreaPick">
              <div v-if="areaMargeName==''">请选择</div>
              <div v-else>
                {{areaMargeName}}
              </div>
            </area-picker>
          </div>
        </div>
        <div class="dis-flex mt20">
          <btn class="item border-top-light btn btn-default btn-full" @click="reset">重置</btn>
          <btn class="item border-top-light btn btn-primary btn-full" @click="searchBtn">确定</btn>
        </div>
      </div>
    </div>
    <div class=" split-t-gray"></div>
    <div class="user-list row-item border-bottom-light" v-for="(item,index) in arrGoodsList" :key="index"
      @click="goUrl('/pages/workbench/myMember/myMemberDetail/myMemberDetailMain?UserId='+item.UserSN)">
      <div class="item">
        <div class="img-box">
          <img mode="widthFix" :src="item.UserImage ? item.UserImage :'/static/images/headImg.jpg'" alt="">
          <span class="img-label label-primary">
            {{item.StatusDesc}}
          </span>
        </div>
        <div class="info">
          <div class="title">{{item.RealName?item.RealName:item.UserName}} <span
              class="tag tag-o-danger ml10">{{item.InvitaSourceDesc}}</span><span
              class="fr text-x-small text-lighter text-normal">服务经理</span></div>
          <div class="goods-desc">
            <span class="fr text-ellipsis">{{item.PusherRealName}}</span>
            <div class="text-ellipsis w60p">
              <span v-if="item.EnterpriseType==3">个人</span>
              <span v-else-if="item.EnterpriseType==2">个体户</span>
              <span v-else>{{item.EnterpriseName}}</span>
              <!-- {{item.EnterpriseType==3?'个人':item.EnterpriseName}}</div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="dis-flex mt10">
        <div class="item text-center">
          <div class="text-lighter text-x-small">注册时间</div>
          <div class="text-small">{{item.CreateTime}}</div>
        </div>
        <div class="item text-center">
          <div class="text-lighter text-x-small">最近访问时间</div>
          <div class="text-small">{{item.LastVisitTime?item.LastVisitTime:'无'}}</div>
        </div>
        <div class="item text-center">
          <div class="text-lighter text-x-small">最近下单时间</div>
          <div class="text-small">{{item.LastOrderTime?item.LastOrderTime:'无'}}</div>
        </div>
      </div>
      <div class="dis-flex mt10">
        <div class="item text-center">
          <div class="text-lighter text-x-small">慧买卖到期时间</div>
          <div class="text-small" v-if="item.IsOpenHmm == 1">{{item.HmmServiceEndTime}}</div>
          <div class="text-small" v-else>未开通</div>
        </div>
        <div class="item text-center">
          <div class="text-lighter text-x-small">家电汇到期时间</div>
          <div class="text-small" v-if="item.IsOpenJdh == 1">{{item.JdhServiceEndTime}}</div>
          <div class="text-small" v-else>未开通</div>
        </div>
        <div class="item text-center">
          <div class="text-lighter text-x-small">所属地区</div>
          <div class="text-small">{{item.AreaName1 ? item.AreaName1 + item.AreaName2 : '无'}}</div>
        </div>
      </div>
    </div>
    <div class="text-light  row-item text-center" style="padding-top:40%" v-if="arrGoodsList.length==0">暂无相关数据
    </div>

  </div>
</template>

<script>
  import goUrl from "@/utils/goUrl";
  import areaPicker from "@/components/areaPicker";
  export default {
    data() {
      return {
        arrGoodsList: [],
        totalPages: 0,
        searchStartDate: "开始时间",
        searchEndDate: "结束时间",
        areaMargeName: "",
        objDataOut: {
          sortType: 1,
          IsDesc: 1,
          dtime: "",
          AreaCode: "",
          key: "",
          status: "",
          TimeOutDay: "",
          RegistStartTime: "",
          RegistEndTime: "",
          PageIndex: 1,
          PageSize: 15
        },
        acoItems: [{
            name: '待缴费',
            value: -1,
            checked: false
          },
          {
            name: '待提交',
            value: 0,
            checked: false
          },
          {
            name: '待审核',
            value: 2,
            checked: false
          },
          {
            name: '审核失败',
            value: 4,
            checked: false
          },
          {
            name: '已过期',
            value: 11,
            checked: false
          },
          {
            name: '已冻结',
            value: 10,
            checked: false
          }
        ],
        gqdate: [{
            value: '15天',
            key: '15',
            checked: false
          },
          {
            value: '1个月',
            key: '30',
            checked: false
          },
          {
            value: '2个月',
            key: '60',
            checked: false
          },
          {
            value: '3个月',
            key: '91',
            checked: false
          },
          {
            value: '6个月',
            key: '182',
            checked: false
          },
          {
            value: '12个月',
            key: '365',
            checked: false
          },
        ],
        checkedVal: [],
        tempSort: "", //上一次选中的索引
        sortDesc0: "desc",
        sortDesc1: "",
        sortDesc2: "",
        isShowfilterBtn: false,
        isShowPicker: true,
      };
    },
    components: {
      areaPicker
    },
    methods: {
      goUrl,
      bindDateChange(e, index) {
        if (index == 0) {
          this.searchStartDate = this.objDataOut.RegistStartTime = e.mp.detail.value;
        } else {
          this.searchEndDate = this.objDataOut.RegistEndTime = e.mp.detail.value;
        }
      },
      onAreaPick(e) {
        this.objDataOut.AreaCode = e.AreaCode
        this.areaMargeName = e.AreaName
      },
      onTab(index) {
        this.tabIndex = index;
        this.objDataOut.PageIndex = 1;
        // 价格升序降序，这里有三种状态，升序，降序与不参与排序，后面筛选要保持前面的状态，所以做了三种
        // this.sortDesc0 = "desc";
        // this.sortDesc1 = "desc";
        // this.sortDesc2 = "desc";
        if (index === 3) {
          this.isShowfilterBtn = !this.isShowfilterBtn;
        } else {
          this.isShowfilterBtn = false;
          this.objDataOut.PageIndex = 1;
          this.objDataOut.sortType = index + 1;
          if (index === this.tempSort) {
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
          this.getGoodslist();
        }
      },
      checkChange(item) {
        this.acoItems.forEach(dt => {
          dt.checked = false;
        })
        item.checked = true;
        this.objDataOut.status = item.value;
      },
      getGoodslist() {
        let para = this.objDataOut;
        mpvue.fetchData({
          API: 'api/Push/PusherGetMyRetalierList',
          para,
          callback: (data) => {
            this.totalPages = data.TotalPages;
            data.Data.Reta.forEach(lg => {
              lg.CreateTime = mpvue.datetime(lg.CreateTime).date;
              lg.LastVisitTime = mpvue.datetime(lg.LastVisitTime).date;
              lg.LastOrderTime = mpvue.datetime(lg.LastOrderTime).date;
              lg.HmmServiceEndTime = mpvue.datetime(lg.HmmServiceEndTime).date;
              lg.JdhServiceEndTime = mpvue.datetime(lg.JdhServiceEndTime).date;
            });
            let tmpData = data.Data.Reta;

            if (this.objDataOut.PageIndex === 1) {
              this.arrGoodsList = tmpData;
            } else {
              this.arrGoodsList = [...this.arrGoodsList, ...tmpData];
            }
            if (this.arrGoodsList && this.arrGoodsList.length == 0) {
              this.isShowfilterBtn = false;
            }
          }
        })
      },
      radioChange(item) {
        this.gqdate.forEach(dt => {
          dt.checked = false;
        })
        item.checked = true;
        this.objDataOut.TimeOutDay = item.key;
      },
      searchBtn() {
        this.isShowfilterBtn = false;
        this.objDataOut.PageIndex = 1;
        this.getGoodslist();
      },
      reset() {
        this.objDataOut = {
            sortType: 1,
            dtime: "",
            AreaCode: "",
            key: "",
            status: "",
            TimeOutDay: "",
            RegistStartTime: "",
            RegistEndTime: "",
          },
          this.searchStartDate = "开始时间";
        this.searchEndDate = "结束时间";
        this.areaMargeName = "";
        this.gqdate.forEach(dt => {
          dt.checked = false;
        });
        this.acoItems.forEach(dt => {
          dt.checked = false;
        });
        this.isShowfilterBtn = false;
        this.arrGoodsList = [];
        this.getGoodslist();
      }
    },

    watch: {
      key() {

      }
    },
    onLoad() {
      Object.assign(this.$data, this.$options.data());
      this.onTab(0);
      mpvue.setNavigationBarTitle({
        title: "我的会员"
      });

    },
    onShow() {

    },
    onReachBottom() {
      console.log("load more data");
      if (this.totalPages > this.objDataOut.PageIndex) {
        this.objDataOut.PageIndex += 1;
        this.getGoodslist();
      }
    },
    onUnload() {

    },
    onShareAppMessage() {

    }
  };
</script>

<style lang="scss" scoped>

</style>