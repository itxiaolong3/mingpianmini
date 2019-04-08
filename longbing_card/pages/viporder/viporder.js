var _index = require("../../resource/apis/index.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alldata: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    _index.baseModel.Getteamorder(parmdata).then((e) => {
      if (e.errno == 0) {
        console.log(e.data, '提现订单数据');
        this.setData({
          alldata: e.data
        })
      } else {
        wx.showToast({
          title: e.message,
          image: '../../resource/icon/fail.png',
          duration: 1500
        })
      }
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