var _xx_util=require("../../../../resource/js/xx_util.js"),_xx_util2=_interopRequireDefault(_xx_util),_index=require("../../../../resource/apis/index.js");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _toConsumableArray(a){if(Array.isArray(a)){for(var t=0,e=Array(a.length);t<a.length;t++)e[t]=a[t];return e}return Array.from(a)}var app=getApp();Page({data:{globalData:{},paramShop:{page:1,type_id:0},refreshShop:!1,loadingShop:!0,shop_all:{page:1,total_page:"",list:[]},showMoreStatus:""},onLoad:function(a){var n=this;console.log(a,"options"),wx.hideShareMenu(),_xx_util2.default.showLoading();var s={},p=n.data.paramShop,t=wx.getStorageSync("navTypes");if(a.keyword&&(s.keyword=a.keyword),a.all_categoryid&&(s.all_categoryid=a.all_categoryid),"all"==a.status)s.categoryid=a.all_categoryid,p.type_id=a.all_categoryid,s.activeIndex="100000101";else if("nav"==a.status)for(var e in s.categoryid=a.id,p.type_id=a.id,t.sec)a.id==t.sec[e].id&&(s.activeIndex=e);t&&(s.navTypes=t),getApp().getConfigInfo(!0,!0).then(function(){var a=app.globalData,t=a.platform,e=a.configInfo.config,o=e.android_pay,r=e.ios_pay,i=!0;-1<t.indexOf("android")&&0==o&&(i=!1),-1<t.indexOf("ios")&&0==r&&(i=!1),n.setData({tmpData:s,paramShop:p,tmp_showPrice:i,globalData:app.globalData,scrollNav:"scrollNav"+s.categoryid}),n.data.tmpData.keyword?n.getShopSearch():n.getShopList();var l=app.globalData.tabBarList[1].text;l||(l="商城"),wx.setNavigationBarTitle({title:l})})},onReady:function(){},onShow:function(){},onHide:function(){wx.removeStorageSync("navTypes")},onUnload:function(){wx.removeStorageSync("navTypes")},onPullDownRefresh:function(){var a=this;a.setData({"paramShop.page":1,refreshShop:!0,loadingShop:!0},function(){wx.showNavigationBarLoading(),a.data.tmpData.keyword?a.getShopSearch():a.getShopList()})},onReachBottom:function(){var a=this;a.setData({refreshShop:!1});var t=a.data.loadingShop,e=a.data.shop_all,o=e.page;o==e.total_page||t||(a.setData({"paramShop.page":parseInt(o)+1,refreshShop:!1,loadingShop:!0}),a.data.tmpData.keyword?a.getShopSearch():a.getShopList())},onShareAppMessage:function(){},onPageScroll:function(a){},getShopSearch:function(){var r=this,a={keyword:r.data.tmpData.keyword};_index.userModel.getShopSearch(a).then(function(a){_xx_util2.default.hideAll(),console.log("getShopSearch ==>",a.data),console.log(a.data);var t={page:1,total_page:1,list:a.data},e=t.list;for(var o in e)e[o].shop_price=(e[o].price/1e4).toFixed(2);r.setData({shop_all:t,loadingShop:!1,refreshShop:!1})})},getShopList:function(){var i=this,a=i.data,l=a.refreshShop,t=a.paramShop,n=a.shop_all;l&&_xx_util2.default.showLoading(),_index.userModel.getShopList(t).then(function(a){console.log("getShopList ==>",a.data),_xx_util2.default.hideAll();var t=n,e=a.data;l||(e.list=[].concat(_toConsumableArray(t.list),_toConsumableArray(e.list)));var o=e.list;for(var r in o)o[r].shop_price=(o[r].price/1e4).toFixed(2);i.setData({shop_all:e,loadingShop:!1,refreshShop:!1})})},toJump:function(a){var t=a.currentTarget.dataset.status,e=a.currentTarget.dataset.type,o=(a.currentTarget.dataset.id,a.currentTarget.dataset.index),r=a.currentTarget.dataset.categoryid;if("toCopyright"==t&&app.util.goUrl(a),"toShowMore"==t){var i=this.data.showMoreStatus;0==e?i=1:1==e&&(i=0),this.setData({showMoreStatus:i})}else if("toTabClickMore"==t||"toTabClick"==t){var l=o,n=r=a.currentTarget.dataset.categoryid;"toTabClickMore"==t&&(l="100000101",n="All"),this.setData({"tmpData.activeIndex":l,"tmpData.categoryid":r,scrollNav:"scrollNav"+n,shop_all:[],showMoreStatus:0,"paramShop.page":1,"paramShop.type_id":r,refreshShop:!0}),this.getShopList()}else"toShopDetail"==t&&app.util.goUrl(a)}}); 
