var _index = require("../../resource/apis/index.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userinfos:[] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toupdate:function(){
    wx.navigateTo({
      url: '/longbing_card/pages/mypage/vippay',
    })
  },
  //团队统计
  teamcount:function(){
    wx.navigateTo({
      url: '/longbing_card/pages/teamcount/teamcount',
    })
  },
  //会员订单
  viporder:function(){
    wx.navigateTo({
      url: '/longbing_card/pages/viporder/viporder',
    })
  },
  //提现列表
  tixianlist:function(){
    wx.navigateTo({
      url: '/longbing_card/pages/tixianlist/tixianlist',
    })
  },
  //去提现
  gototixian:function(){
    wx.navigateTo({
      url: '/longbing_card/pages/tixian/tixian',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let uid = wx.getStorageSync("userid");
    let parmdata = {
      uid: uid
    }
    _index.baseModel.Userinfo(parmdata).then((d) => {
      this.setData({
        userinfos: d.data
      })
      console.log(d.data, '分销页面的数据')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let uid = wx.getStorageSync("userid");
    let parmdata = {
      uid: uid
    }
    _index.baseModel.Userinfo(parmdata).then((d) => {
      this.setData({
        userinfos: d.data
      })
      console.log(d.data, '分销页面的数据')
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})