var app=getApp();Page({data:{globalData:{},activeIndex:100000101,showMoreStatus:0,keyword:""},onLoad:function(o){wx.hideShareMenu(),this.setData({globalData:app.globalData})},onReady:function(){},onShow:function(){app.util.showLoading(1),this.getShopSearchRecord(),wx.hideLoading()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){wx.showNavigationBarLoading(),this.getShopSearchRecord()},onReachBottom:function(){},onShareAppMessage:function(){},getShopSearchRecord:function(){var t=this;app.util.request({url:"entry/wxapp/ShopSearchRecord",cachetime:"30",method:"POST",data:{},success:function(o){console.log("ShopSearchRecord ==>",o),o.data.errno||t.setData({Record:o.data.data})},fail:function(o){console.log("ShopSearchRecord ==> fail ==> ",o)}})},bindinput:function(o){this.setData({keyword:o.detail.value})},toSearchBtn:function(){if(!this.data.keyword)return wx.showToast({icon:"none",title:"请输入关键词！",duration:2e3}),!1;wx.navigateTo({url:"/longbing_card/users/pages/shop/list/list?keyword="+this.data.keyword})},toJump:function(o){var t=o.currentTarget.dataset.status;if("toSearchKeyWord"==t){if(!this.data.keyword)return wx.showToast({icon:"none",title:"请输入关键词！",duration:2e3}),!1;app.util.goUrl(o)}else"toSearch"==t&&app.util.goUrl(o)}}); 
