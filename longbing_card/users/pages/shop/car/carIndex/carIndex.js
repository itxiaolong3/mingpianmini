var _xx_util=require("../../../../../resource/js/xx_util.js"),_xx_util2=_interopRequireDefault(_xx_util),_index3=require("../../../../../resource/apis/index.js");function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}var app=getApp();Page({data:{globalData:{},dataList:[],manageStatus:0,idList:{},isAll:!1,icon_car_empty:"http://retail.xiaochengxucms.com/images/12/2018/11/uAsB6O4AbAC6cs3IU4OZZaa64cBu3Z.png"},onLoad:function(t){console.log(this);wx.hideShareMenu(),this.setData({globalData:app.globalData})},onReady:function(){},onShow:function(){app.util.showLoading(1);var t=this;t.setData({isAll:!1},function(){t.getShopMyTrolley()}),wx.hideLoading()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){wx.showNavigationBarLoading(),this.getShopMyTrolley()},onReachBottom:function(){},onShareAppMessage:function(){},getShopMyTrolley:function(){var o=this;app.util.request({url:"entry/wxapp/ShopMyTrolley",cachetime:"30",method:"POST",data:{},success:function(t){if(console.log("ShopMyTrolley ==>",t),!t.data.errno){var e=t.data.data,a=[];for(var i in e.list)a.push(0);o.setData({dataList:e,idList:a})}},fail:function(t){console.log("ShopMyTrolley ==> fail ==> ",t)}})},toShopUpdateTrolley:function(t){var e=this;app.util.request({url:"entry/wxapp/ShopUpdateTrolley",cachetime:"30",method:"POST",data:t,success:function(t){console.log("ShopUpdateTrolley ==>",t),t.data.errno||e.toCountPrice()},fail:function(t){console.log("ShopUpdateTrolley ==> fail ==> ",t)}})},toShopDelTrolley:function(t,i){var o=this;app.util.request({url:"entry/wxapp/ShopDelTrolley",cachetime:"30",method:"POST",data:t,success:function(t){if(console.log("ShopDelTrolley ==>",t),!t.data.errno&&"delete"!=i){var e=o.data.dataList,a=o.data.idList;a.splice(i,1),e.list.splice(i,1),o.setData({idList:a,dataList:e}),o.toCountPrice()}},fail:function(t){console.log("ShopDelTrolley ==> fail ==> ",t)}})},RemoveAddNum:function(t){var a=this,e=t.currentTarget.dataset.status,i=t.currentTarget.dataset.index,o=a.data.dataList,l=o.list[i].stock,s=1;"remove"==e&&(s=2);var n={id:o.list[i].id,type:s,number:1};if("remove"==e&&(console.log("购物车-1",i),1==o.list[i].number?wx.showModal({title:"",content:"是否确认删除本条数据",success:function(t){if(t.confirm){var e={id:o.list[i].id};a.toShopDelTrolley(e,i)}else t.cancel}}):(o.list[i].number=1*o.list[i].number-1,o.list[i].price=o.list[i].number*o.list[i].price2,a.toShopUpdateTrolley(n))),"add"==e){if(console.log("购物车+1",i),o.list[i].number>l-1)return wx.showModal({title:"",content:"库存不足，不能再添加了",confirmText:"知道啦",showCancel:!1,success:function(t){t.confirm}}),!1;o.list[i].number=1*o.list[i].number+1,o.list[i].price=o.list[i].number*o.list[i].price2,a.toShopUpdateTrolley(n)}a.setData({dataList:o}),a.toCountPrice()},toCountPrice:function(){var t=this.data.dataList,e=this.data.idList,a=0,i="",o=!1,l=[];for(var s in t.list)1==e[s]&&(a+=1*t.list[s].price,l.push(t.list[s]),i+=t.list[s].id+",",1==t.list[s].is_self&&(o=!0));i=i.slice(0,-1);var n={count_price:a.toFixed(2),tmp_trolley_ids:i,tmp_is_self:o,dataList:l};this.setData({dataList:t,countPrice:a.toFixed(2),tmpCarList:n,tmp_is_self:o,trolley_ids:i})},checkIsAll:function(){var t=this.data.isAll,e=this.data.idList,a=!0;for(var i in e)0==e[i]&&(a=!1);t=a,this.setData({isAll:t})},toJump:function(t){var i=this,e=t.currentTarget.dataset.status,a=t.currentTarget.dataset.index,o=i.data.dataList.list;if("toProductDetail"==e)app.util.goUrl(t);else if("toManage"==e){var l;console.log("管理商品"),0==a&&(l=1),1==a&&(l=0),i.setData({manageStatus:l})}else if("toDelete"==e)console.log("删除本条数据"),wx.showModal({title:"",content:"是否确认删除本条数据",success:function(t){if(t.confirm){app.util.showLoading(2);var e={id:o[a].id};i.toShopDelTrolley(e,a),wx.hideLoading()}else t.cancel}});else if("toCheck"==e){console.log("选择产品");var s=i.data.idList;s[a]?(s[a]=0,i.isAll=!1,i.setData({isAll:!1})):s[a]=1,i.setData({idList:s}),i.toCountPrice(),i.checkIsAll()}else if("toChooseAll"==e){console.log("全选");var n=(i=this).data.isAll,r=i.data.idList;if(n=!n,i.isAll=n,i.setData({isAll:n}),n)for(var c in r)r[c]=1;else for(var d in r)r[d]=0;i.setData({idList:r}),i.toCountPrice()}else if("toOrderPay"==e){var u=i.data.manageStatus,p=(r=i.data.idList,i.data.dataList.list);if(1==u){console.log("批量删除");var f=!1,h=0;for(var g in r)1==r[g]&&(f=!0,h++);if(0==f)return _xx_util2.default.showFail("请选择要进行删除的商品！"),!1;var m="是否要进行删除操作？";1<h&&(m="是否要进行批量删除？"),wx.showModal({title:"",content:m,success:function(t){if(t.confirm){for(var e in app.util.showLoading(2),r)if(1==r[e]){var a={id:p[e].id};i.toShopDelTrolley(a,"delete")}setTimeout(function(){i.getShopMyTrolley(),wx.hideLoading()},500)}else t.cancel}})}else if(0==u){if(console.log("去结算"),!i.data.trolley_ids)return wx.showToast({icon:"none",title:"暂未选择任何商品哦",duration:2e3}),!1;wx.setStorageSync("storageToOrder",i.data.tmpCarList),wx.navigateTo({url:"/longbing_card/users/pages/shop/car/toOrder/toOrder?status=toCarOrder"})}}}}); 
