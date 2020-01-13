<template>
  <div class="page row-item">
    <p>
      <span><span>根据</span></span><span>2019年公司发展城市拍档运营模式，现对城市拍档佣金返利结算流程及结算方式做如下补充规定：</span>
    </p>
    <p style="line-height:150%">
      一、佣金收益说明：
    </p>
    <p style="line-height:150%">
      <span>1.客户开发佣金：会员店完成注册且通过审核后，由系统结算相应奖励金额至城市拍档佣金钱包；</span>
    </p>
    <p style="line-height:150%">
      <span>2.销售佣金：单笔订单完成后，由系统结算相应佣金金额至城市拍档系统佣金钱包体现</span>
    </p>
    <p style="line-height:150%">
      二、佣金结算方式：
    </p>
    <p style="line-height:150%">
      <span>1.平台线上提现流程：</span>
    </p>
    <p style="line-height:150%">
      <span>2.&nbsp;</span><span><span>平台兑换现金券流程：</span></span>
    </p>
    <p style="line-height:150%">
      <span>3.线下兑换现金流程：</span>
    </p>
    <p style="line-height:150%">
      <span>1.填写钱包余额提现授权证明书，系统下载填写需签字盖章（手印）（详见附件一）；</span>
    </p>
    <p style="line-height:150%">
      <span>2.需</span><span><span>提供</span>6%的服务费增值税专票；</span>
    </p>
    <p style="line-height:150%">
      <span>3.开票内容：服务费、劳务服务费；</span>
    </p>
    <p style="line-height:150%">
      <span>4.每月5号前城市拍档需把授权书及发票邮寄我司；</span>
    </p>
    <p style="line-height:150%">
      <span>5.每月12号前由渠道发展中心汇总和收集的发票提交财务部；</span>
    </p>
    <p style="line-height:150%">
      <span>6.兑现到账日期：每月15日</span><span><span>（遇法定节假日顺延）将相应金额发放至城市拍档指定账户。</span></span>
    </p>
    <p style="line-height:150%">
      <span>7.邮寄地址：联系区域分总</span>
    </p>
    <p style="line-height: 150%">
      <strong><span><span>开票抬头信息：</span></span></strong>
    </p>
    <p style="line-height: 150%">
      <span><span>公司名称：慧聪云商（佛山）网络科技有限公司</span></span>
    </p>
    <p style="line-height: 150%">
      <span><span>纳税人识别号：</span>91440606MA4WD53B7K</span>
    </p>
    <p style="line-height: 150%">
      <span><span>注册地址：佛山市顺德区北滘镇广教社区居民委员会广教路</span>1号慧聪家电城7座4078</span>
    </p>
    <p style="line-height: 150%">
      <span><span>注册电话：</span>0757-22103717</span>
    </p>
    <p style="line-height: 150%">
      <span><span>开户银行名称：广东顺德农村商业银行股份有限公司北滘支行</span></span>
    </p>
    <p style="line-height: 150%">
      <span><span>开户银行账号：</span>801101000896371163</span>
    </p>
    <div class="mt20">
      <a href="" class="highlight" @click="downLoadPage">
        《附件一：钱包余额提现授权证明书》
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      downLoadPage() {
        wx.downloadFile({
          url: 'https://hmm.jdhui.com/new/dist/files/file.docx',
          success(res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            console.log(res);
            if (res.statusCode === 200) {
              const filePath = res.tempFilePath
              wx.openDocument({
                filePath: filePath,
                success: function (res) {
                  console.log('打开文档成功')
                }
              })
              // wx.saveFile({
              //   tempFilePath: filePath,
              //   success(res1) {
              //     const savedFilePath = res1.savedFilePath;
              //     console.log(res1);
              //     mpvue.showTips("已保存到本地，请查收")
              //   }
              // })
            }
          }
        })
      }
    },
    onLoad() {
      mpvue.setNavigationBarTitle({
        title: "线下开票提现"
      });
    }
  }

</script>
