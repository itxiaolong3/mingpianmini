var _xx_util=require("../../../../resource/js/xx_util.js"),_xx_util2=_interopRequireDefault(_xx_util),_index=require("../../../../resource/apis/index.js");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _toConsumableArray(a){if(Array.isArray(a)){for(var t=0,e=Array(a.length);t<a.length;t++)e[t]=a[t];return e}return Array.from(a)}var app=getApp(),getAppGlobalData=require("../../../../templates/copyright/copyright.js");Page({data:{dataList:{page:1,total_page:"",list:[]},globalData:{}},onLoad:function(a){console.log(a,"options");app.util.showLoading(1),wx.hideShareMenu();var t={};a.type&&(t.type=a.type),a.name&&(t.name=a.name,wx.setNavigationBarTitle({title:a.name})),a.table_name&&(t.table_name=a.table_name),a.identification&&(t.identification=a.identification),a.to_uid&&(t.to_uid=a.to_uid,app.globalData.to_uid=a.to_uid),a.from_id&&(t.from_id=a.from_id,app.globalData.from_id=a.from_id),this.setData({paramData:t,globalData:app.globalData}),this.getListData(),wx.hideLoading()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){var a=this;getApp().getConfigInfo(!0,!1).then(function(){a.setData({globalData:app.globalData,"dataList.refresh":!0,"dataList.page":1},function(){wx.showNavigationBarLoading(),a.getListData()})})},onReachBottom:function(){var a=this,t=a.data.dataList;t.page==t.total_page||t.loading||a.setData({"dataList.page":parseInt(t.page)+1,"dataList.loading":!1},function(){a.getListData()})},onShareAppMessage:function(a){},getListData:function(){var r=this,a=r.data,t=a.paramData,s=a.dataList,e={page:s.page,identification:t.identification};s.refresh||_xx_util2.default.showLoading(),_index.userModel.getModularList(e).then(function(a){_xx_util2.default.hideAll(),console.log("getModularList ==>",a.data);var t=s,e=a.data;s.refresh||(e.list=[].concat(_toConsumableArray(t.list),_toConsumableArray(e.list)));var i=e.list,n=new app.util.date;for(var o in i)i[o].create_time&&(i[o].create_time2=n.dateToStr("yyyy-MM-DD",n.longToDate(1e3*i[o].create_time)));r.setData({dataList:e,"viewList.page":s.page,"viewList.refresh":!1})})},toJump:function(a){var t=this,e=a.currentTarget.dataset.id,i=a.currentTarget.dataset.status,n=a.currentTarget.dataset.content,o=a.currentTarget.dataset.shareimg;if("toCopyright"==i&&app.util.goUrl(a),5==t.data.paramData.type)return!1;7==t.data.paramData.type?(n=n+"&shareimg="+encodeURIComponent(o),wx.navigateTo({url:n})):wx.navigateTo({url:"/longbing_card/users/pages/company/detail/detail?table_name="+t.data.paramData.table_name+"&type="+t.data.paramData.type+"&id="+e+"&name="+t.data.paramData.name})}}); 
