var _that=void 0,_baseModel=void 0,_util=void 0;function getAppGlobalData(a,t,e){var r=3<arguments.length&&void 0!==arguments[3]&&arguments[3];_that=a,_baseModel=t,_util=e,getApp().globalData.userid=wx.getStorageSync("userid"),_baseModel.getConfigV2().then(function(a){_util.hideAll();var t=a.data,e=t.my_company,l=t.tabBar;if(e&&43<e.addr.length&&(getApp().globalData.my_company.addrMore=e.addr.slice(0,43)+"..."),1==r){var u=getApp().globalData.tabBarList;for(var o in l.menu_name)l.menu_url_out[o]&&(0==l.menu_url_jump_way[o]&&(u[o].jump="toOutUrl"),1==l.menu_url_jump_way[o]&&(u[o].jump="toMiniApp",u[o].toMiniApp=l.menu_url_out[o].split("；"))),1==l.menu_is_hide[o]&&(u[o].showTab=1),u[o].text=l.menu_name[o],-1<l.menu_url[o].indexOf("currentTabBar=")&&(u[o].type=l.menu_url[o].split("currentTabBar=")[1]),u[o].url=l.menu_url[o],l.menu_url_out[o]&&(u[o].url=l.menu_url_out[o]);getApp().globalData.tabBarList=u}getApp().globalData.configInfo=t,_that.setData({globalData:getApp().globalData})})}module.exports={getAppGlobalData:getAppGlobalData};