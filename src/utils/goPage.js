// import goUrl from "./goUrl";
//import showTips from './showTips';

function goPage(link, mode = 1) { // 后期需要不定期变更，还不知道页面具体地址
  let rLink = link.replace(/LinkTool:\/\//gi, ''); // 删除掉协议标识
  let type = rLink && parseInt(/type=(\d*)/i.exec(rLink)[1]);
  let pageUrl = ''; // 跳转页面地址
  let callback = null;
  if (type === 2) {
    mode = 3
  }
  // console.log(type);
  switch (type) {
    case 1: { // 商品详情
      pageUrl = '/pages/goods/goodsDetail/goodsDetailMain';
      break;
    }
    case 2: { // 栏目分类
      pageUrl = '/pages/goods/goodsCategory/goodsCategoryMain';
      break;
    }
    case 3: { // 商品搜索
      pageUrl = '/pages/goods/goodsList/goodsListMain';
      break;
    }
    case 4: { // 慧闪批
      pageUrl = '/pages/huishanpi/huishanpiMain';
      break;
    }
    case 5: { // 慧闪批详情（商品详情，同1）
      pageUrl = '/pages/goods/goodsDetail/goodsDetailMain';
      break;
    }
    case 6: { // 严选，这里没有
      pageUrl = '';
      break;
    }
    case 7: { // 严选详情，这里没有
      pageUrl = '';
      break;
    }
    case 8: { // 加盟代理，这里没有
      pageUrl = '';
      break;
    }
    case 9: { // 加盟代理详情，这里没有
      pageUrl = '';
      break;
    }
    case 10: { // 家电头条列表
      pageUrl = '/pages/toutiao/toutiaoList/toutiaoListMain';
      break;
    }
    case 11: { // 家电头条详情页
      pageUrl = '/pages/toutiao/toutiaoDetail/toutiaoDetailMain';
      break;
    }
    case 12: { // 店铺详情页，这里没有
      pageUrl = '';
      break;
    }
    case 13: { // 买家求购栏目，这里没有
      pageUrl = '';
      break;
    }
    case 14: { // 领券中心栏目，这里没有
      pageUrl = '/pages/mine/coupon/couponMain';
      break;
    }
    case 15: { // 超链接URL，暂时未设置
      pageUrl = '/pages/webview/webviewMain';
      break;
    }
    case 16: { // 超链接URL，我的收藏
      pageUrl = '/pages/mine/collection/collectionMain';
      break;
    }
    case 17: { //专题活动、多品宣传页
      pageUrl = '/pages/webview/webviewMain';
      break;
    }
    case 18: { // 关键字搜索
      pageUrl = '/pages/goods/goodsList/goodsListMain';
      break;
    }
    case 19: { // 栏目列表
      pageUrl = '/pages/webview/webviewMain?url=http://tsthmmapp.jdhui.com.cn/#/introCrowd';
      break;
    }
    default: {
      pageUrl = '';
      break;
    }
  }

  return (pageUrl + '?' + rLink) // 组合跳转
}

export default goPage;