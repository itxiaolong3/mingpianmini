var _xx_util=require("../../../../../resource/js/xx_util.js"),_xx_util2=_interopRequireDefault(_xx_util),_index=require("../../../../../resource/apis/index.js");function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}var app=getApp();Page({data:{tabList:[{name:"全部",status:"toOrder"},{name:"待付款",status:"toOrder"},{name:"待发货",status:"toOrder"},{name:"待收货",status:"toOrder"},{name:"已完成",status:"toOrder"}],currentIndex:0,dataList:[],globalData:{},page:1,more:!0,loading:!1,isEmpty:!1,show:!1,toShowWxPayStatus:!1,toWxPayStatus:0,checkInd:-1},onLoad:function(t){console.log(t,"options");wx.hideShareMenu(),t.currentTab&&this.setData({currentIndex:t.currentTab,toShowWxPayStatus:!1,globalData:app.globalData})},onReady:function(){},onShow:function(){var t=this;0==t.data.toShowWxPayStatus&&(app.util.showLoading(1),t.setData({dataList:[],page:1,more:!0,loading:!1,isEmpty:!1,show:!1}),t.getListData(),wx.hideLoading())},onHide:function(){wx.hideLoading()},onUnload:function(){wx.hideLoading()},onPullDownRefresh:function(){app.util.showLoading(1);this.setData({dataList:[],page:1,more:!0,loading:!1,isEmpty:!1,show:!1}),this.getListData(),wx.showNavigationBarLoading(),wx.stopPullDownRefresh(),wx.hideLoading()},onReachBottom:function(){app.util.showLoading(1);var t=this;t.setData({show:!0}),0==t.data.isEmpty&&(t.setData({page:t.data.page+1}),t.getListData()),wx.hideLoading()},onShareAppMessage:function(){},getListData:function(){var n=this;app.util.request({url:"entry/wxapp/shopmyorder",cachetime:"30",method:"POST",data:{type:n.data.currentIndex,page:n.data.page},success:function(t){if(console.log("shopmyorder ==>",t),!t.data.errno){var a=t.data.data.list;if(0==a.length||n.data.page>t.data.data.total_page)return n.setData({more:!1,loading:!1,isEmpty:!0,show:!0}),!1;var e=n.data.dataList;for(var o in a){if(a[o].left_time=_xx_util2.default.formatTime(1e3*a[o].left_time,"h小时m分"),a[o].tmp_is_self=!1,a[o].goods_info)for(var s in a[o].total_count_number=0,a[o].goods_info)a[o].total_count_number+=parseInt(a[o].goods_info[s].number),a[o].goods_info[s].unit_price=(a[o].goods_info[s].price/a[o].goods_info[s].number).toFixed(2),1==a[o].goods_info[s].is_self&&(a[o].tmp_is_self=!0);e.push(a[o])}n.setData({dataList:e,loading:!0})}},fail:function(t){console.log("shopmyorder ==> fail ==> ",t)}})},getShopcancelorder:function(t,e){var o=this,s=o.data.dataList;app.util.request({url:"entry/wxapp/shopcancelorder",cachetime:"30",method:"POST",data:{id:t},success:function(t){if(console.log("shopcancelorder ==>",t),!t.data.errno){var a=o.data.currentIndex;0==a&&wx.showToast({icon:"success",title:"已取消订单",duration:2e3,success:function(){setTimeout(function(){s[e].order_status=1,o.setData({dataList:s})},1e3)}}),1==a&&wx.showToast({icon:"success",title:"已取消订单",duration:2e3,success:function(){setTimeout(function(){s.splice(e,1),o.setData({dataList:s})},1e3)}})}},fail:function(t){console.log("shopcancelorder ==> fail ==> ",t)}})},getShopendorder:function(t,a){var e=this,o=e.data.dataList;app.util.request({url:"entry/wxapp/shopendorder",cachetime:"30",method:"POST",data:{id:t},success:function(t){console.log("shopendorder ==>",t),t.data.errno||wx.showToast({icon:"success",title:"已确认收货",duration:2e3,success:function(){setTimeout(function(){var t=e.data.currentIndex;0!=t&&o.splice(a,1),0==t&&(o[a].order_status=3),e.setData({dataList:o})},1e3)}})},fail:function(t){console.log("shopendorder ==> fail ==> ",t)}})},getRefund:function(t,a){var e=this,o=e.data.dataList;app.util.request({url:"entry/wxapp/Refund",cachetime:"30",method:"POST",data:{order_id:t},success:function(t){console.log("Refund ==>",t),t.data.errno||wx.showToast({icon:"success",title:"已申请退款",duration:2e3,success:function(){setTimeout(function(){o[a].pay_status=2,e.setData({dataList:o})},1e3)}})},fail:function(t){console.log("Refund ==> fail ==> ",t)}})},getWxPay:function(t,a){var e=this;app.util.showLoading(1);e.data.dataList;app.util.request({url:"entry/wxapp/Pay",cachetime:"30",method:"POST",data:{order_id:t},success:function(t){console.log("Pay ==> ",t),t.data&&t.data.data&&!t.data.errno&&(wx.hideLoading(),wx.requestPayment({timeStamp:t.data.data.timeStamp,nonceStr:t.data.data.nonceStr,package:t.data.data.package,signType:"MD5",paySign:t.data.data.paySign,success:function(t){wx.showToast({icon:"success",image:"/longbing_card/resource/images/alert.png",title:"支付成功",duration:2e3,success:function(){setTimeout(function(){wx.hideLoading(),e.setData({currentIndex:2,toWxPayStatus:0,dataList:[],page:1,more:!0,loading:!1,isEmpty:!1,show:!1},function(){app.util.showLoading(1),e.getListData(),wx.hideLoading()})},1e3)}})},fail:function(t){wx.showToast({icon:"fail",image:"/longbing_card/resource/images/error.png",title:"支付失败",duration:2e3,success:function(){setTimeout(function(){e.setData({toWxPayStatus:0,toShowWxPayStatus:!0}),wx.hideLoading()},1500)}})},complete:function(t){}}))},fail:function(t){console.log("Pay ==> fail ==>",t),wx.hideLoading(),wx.showModal({title:"系统提示",content:t.data.message?"支付失败，"+t.data.message:"支付失败，请重试",showCancel:!1,success:function(t){t.confirm&&e.setData({toWxPayStatus:0,toShowWxPayStatus:!0})}})}})},checktoConsult:function(t){console.log(app.globalData.to_uid,wx.getStorageSync("userid"),app.globalData.nickName,"checktoConsult *********  showModal"),0==t?wx.showModal({title:"",content:"不能与默认客服进行对话哦！",confirmText:"知道啦",showCancel:!1,success:function(t){t.confirm}}):t==wx.getStorageSync("userid")?wx.showModal({title:"",content:"不能和自己进行对话哦！",confirmText:"知道啦",showCancel:!1,success:function(t){t.confirm}}):wx.navigateTo({url:"/longbing_card/chat/userChat/userChat?chat_to_uid="+t+"&contactUserName= "})},toJump:function(t){var e=this,a=t.currentTarget.dataset.status,o=t.currentTarget.dataset.index,s=e.data.dataList;if("toProductDetail"==a||"toOrderDetail"==a)app.util.goUrl(t);else if("toConsult"==a)e.checktoConsult(s[o].to_uid);else if("toCancel"==a)e.getShopcancelorder(s[o].id,o);else if("toRefund"==a)e.getRefund(s[o].id,o);else if("toWxPay"==a){0==e.data.toWxPayStatus&&e.setData({toWxPayStatus:1},function(){e.getWxPay(s[o].id,o)})}else"toConfirm"==a?e.getShopendorder(s[o].id,o):"toCheckPassword"==a&&_index.staffModel.toGetOrderQr({id:s[o].id}).then(function(t){_xx_util2.default.hideAll(),console.log("toGetOrderQr ==>",t.data);var a=t.data.path;e.setData({qr:a,checkInd:o})})},formSubmit:function(t){var a=t.detail.formId,e=t.detail.target.dataset.index,o=t.detail.target.dataset.status;this.toSaveFormIds(a),"toOrder"==o&&(this.setData({currentIndex:e,toWxPayStatus:0,page:1,isEmpty:!1,dataList:[]}),this.getListData())},toSaveFormIds:function(t){app.util.request({url:"entry/wxapp/formid",cachetime:"30",method:"POST",data:{formId:t},success:function(t){t.data.errno},fail:function(t){}})}}); 