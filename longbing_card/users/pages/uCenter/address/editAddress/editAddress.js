var app=getApp();Page({data:{sexItems:[{name:"先生",value:"先生",checked:!0},{name:"女士",value:"女士",checked:!1}],sexVal:"",address:"",editAddress:[]},onLoad:function(a){console.log(a,"options"),app.util.showLoading(1),wx.hideShareMenu();var e,t=this,s={},d="先生";if(a.status)if(s.status=a.status,"toEdit"==a.status){e="编辑地址";var n=getCurrentPages(),o=n[n.length-2].__viewData__;s.editAddress=o.currEditAddr;var i=t.data.sexItems;"先生"==s.editAddress.sex&&(d="先生",i[0].checked=!0),"女士"==s.editAddress.sex&&(d="女士",i[1].checked=!0);var r={};r.address=s.editAddress.address,r.address_detail=s.editAddress.address_detail,t.setData({checkAddress:r})}else if("toAdd"==a.status){d="先生",(i=t.data.sexItems)[0].checked=!0,e="新增地址"}wx.setNavigationBarTitle({title:e}),t.setData({sexVal:d,sexItems:i,paramData:s,globalData:app.globalData}),wx.hideLoading()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){wx.showNavigationBarLoading()},onReachBottom:function(){},onShareAppMessage:function(){},radioChange:function(a){this.sexVal=a.detail.value,this.setData({sexVal:a.detail.value})},getToAddUpdateAddress:function(a){var t=this;app.util.request({url:"entry/wxapp/shopAddAddress",cachetime:"30",method:"POST",data:a,success:function(a){var e;(console.log("shopAddAddress ==>",a),a.data.errno)||("toAdd"==t.data.paramData.status&&(e="已成功新增地址！"),"toEdit"==t.data.paramData.status&&(e="已成功编辑地址！"),wx.showToast({icon:"none",title:e,duration:2e3,success:function(){setTimeout(function(){wx.hideToast(),wx.navigateBack()},1e3)}}))},fail:function(a){console.log("shopAddAddress ==> fail ==> ",a)}})},chooseLocation:function(a){var o=this;wx.authorize({scope:"scope.userLocation",success:function(a){wx.chooseLocation({success:function(s){var d=/^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/,a=[],e={REGION_PROVINCE:null,REGION_COUNTRY:null,REGION_CITY:null,ADDRESS:null};function t(a,e){var t=(d=/^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g).exec(a);e.REGION_CITY=t[1],e.REGION_COUNTRY=t[2],e.ADDRESS=t[3]+"("+s.name+")"}(a=d.exec(s.address))?(e.REGION_PROVINCE=a[1],t(s.address,e)):(a=(d=/^(.*?(省|自治区))(.*?)$/).exec(s.address),e.REGION_PROVINCE=a[1],t(a[3],e));var n={};n.address=e.REGION_PROVINCE+e.REGION_CITY+e.REGION_COUNTRY,n.address_detail=e.ADDRESS,o.setData({addressBean:e,checkAddress:n})}})},fail:function(a){var e=a.errMsg;(-1<e.indexOf("fail auth deny")||-1<e.indexOf("fail:auth deny"))&&o.setData({isSetting:!0})}})},toEditAddress:function(a){var e=this,t=a.detail.value;if(!t.name)return wx.showToast({icon:"none",title:"请填写联系人！",duration:2e3,success:function(){setTimeout(function(){wx.hideToast()},1e3)}}),!1;if(!t.phone)return wx.showToast({icon:"none",title:"请填写手机号！",duration:2e3,success:function(){setTimeout(function(){wx.hideToast()},1e3)}}),!1;if("toAdd"==e.data.paramData.status){if(console.log("新增"),!e.data.addressBean)return wx.showToast({icon:"none",title:"请选择地址！",duration:2e3,success:function(){setTimeout(function(){wx.hideToast()},1e3)}}),!1;t.province=e.data.addressBean.REGION_PROVINCE,t.city=e.data.addressBean.REGION_CITY,t.area=e.data.addressBean.REGION_COUNTRY}else"toEdit"==e.data.paramData.status&&(console.log("编辑"),t.id=e.data.paramData.editAddress.id,e.data.addressBean?(t.province=e.data.addressBean.REGION_PROVINCE,t.city=e.data.addressBean.REGION_CITY,t.area=e.data.addressBean.REGION_COUNTRY):(t.province=e.data.paramData.editAddress.province,t.city=e.data.paramData.editAddress.city,t.area=e.data.paramData.editAddress.area));if(!t.address_detail)return wx.showToast({icon:"none",title:"请填写详细地址！",duration:2e3,success:function(){setTimeout(function(){wx.hideToast()},1e3)}}),!1;e.getToAddUpdateAddress(t)}}); 