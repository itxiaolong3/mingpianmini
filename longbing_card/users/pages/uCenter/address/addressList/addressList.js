var app=getApp();Page({data:{},onLoad:function(t){console.log(this),console.log(t,"options"),wx.hideShareMenu();var a={};t.status&&(a.status=t.status),this.setData({globalData:app.globalData,paramObj:a})},onReady:function(){},onShow:function(){app.util.showLoading(1);this.getAddressList(),wx.hideLoading()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){wx.showNavigationBarLoading(),this.getAddressList()},onReachBottom:function(){},onShareAppMessage:function(){},getAddressList:function(){var o=this;app.util.request({url:"entry/wxapp/shopmyaddress",cachetime:"30",method:"POST",data:{},success:function(t){if(console.log("shopmyaddress ==>",t),!t.data.errno){var a=t.data.data,e=[],s=[];for(var d in a)a[d].is_default=parseInt(a[d].is_default),1==a[d].is_default?e.push(1):0==a[d].is_default&&e.push(0),s.push(a[d].phone.substr(0,3)+"****"+a[d].phone.substr(7,10));o.setData({idList:e,dataList:a,tmpPhone:s})}},fail:function(t){console.log("shopmyaddress ==> fail ==> ",t)}})},setShopAddressDefault:function(e){var t,s=this,d=s.data.dataList,o=s.data.idList;0==d[e].is_default&&(t=1),1==d[e].is_default&&(t=2),app.util.request({url:"entry/wxapp/ShopAddressDefault",cachetime:"30",method:"POST",data:{type:t,id:d[e].id},success:function(t){if(console.log("ShopAddressDefault ==>",t),!t.data.errno){for(var a in d)d[a].is_default=0,o[a]=0;d[e].is_default=1,o[e]=1,wx.showToast({icon:"none",title:"已成功设为默认地址",duration:2e3}),app.globalData.checkAddress=d[e],s.setData({idList:o,dataList:d})}},fail:function(t){console.log("ShopAddressDefault ==> fail ==> ",t)}})},getToAddUpdateAddress:function(t){app.util.request({url:"entry/wxapp/shopAddAddress",cachetime:"30",method:"POST",data:t,success:function(t){console.log("shopAddAddress ==>",t),t.data.errno||wx.showToast({icon:"none",title:"已成功新增地址！",duration:2e3})},fail:function(t){console.log("shopAddAddress ==> fail ==> ",t)}})},getDeleteAddr:function(a){var e=this,s=e.data.dataList,d=e.data.idList;app.util.request({url:"entry/wxapp/shopdeladdress",cachetime:"30",method:"POST",data:{id:s[a].id},success:function(t){console.log("shopdeladdress ==>",t),t.data.errno||(wx.showToast({icon:"none",title:"已成功删除地址！",duration:2e3}),d.splice(a,1),s.splice(a,1),e.setData({dataList:s,idList:d}))},fail:function(t){console.log("shopdeladdress ==> fail ==> ",t)}})},toJump:function(t){var e=this,a=t.currentTarget.dataset.status,s=t.currentTarget.dataset.index;e.data.dataList;if("toAddAddr"==a||"toEditAddr"==a){if("toEditAddr"==a){var d=e.data.dataList[s];e.setData({currEditAddr:d})}app.util.goUrl(t)}else if("toCheckAddr"==a){if("checkaddr"!=e.data.paramObj.status)return!1;var o=e.data.dataList[s];app.globalData.checkAddress_cur=o,setTimeout(function(){wx.navigateBack()},300)}else"toCheckDefaultAddr"==a?e.setShopAddressDefault(s):"toDeleteAddr"==a?wx.showModal({title:"",content:"请确认是否要删除该地址？",success:function(t){t.confirm&&e.getDeleteAddr(s)}}):"toWechatAddr"==a&&wx.authorize({scope:"scope.address",success:function(t){wx.chooseAddress({success:function(t){var a={address:t.provinceName+t.cityName+t.countyName,address_detail:t.detailInfo,province:t.provinceName,city:t.cityName,area:t.countyName,name:t.userName,phone:t.telNumber,sex:""};e.getToAddUpdateAddress(a),e.setData({dataList:[]}),e.getAddressList()}})},fail:function(t){var a=t.errMsg;(-1<a.indexOf("fail auth deny")||-1<a.indexOf("fail:auth deny"))&&e.setData({isSetting:!0})}})}}); 
