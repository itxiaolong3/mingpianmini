var _index = require("../../resource/apis/index.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txmoney:0,
    zfbname:'',
    zfbnum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  moneyinput:function(e){
    this.setData({
      txmoney: e.detail.value
    })
  },
  zfbnuminput:function(e){
    this.setData({
      zfbnum: e.detail.value
    })
  },
  zfbnameinput:function(e){
    this.setData({
      zfbname: e.detail.value
    })
  },
  dopost:function(){
    if(this.data.txmoney==0){
      wx.showToast({
        title: '请输入金额',
        image: '../../resource/icon/fail.png',
        duration: 2000
      })
      return false;
    }
    let uid = wx.getStorageSync("userid");
    let parmdata = {
      uid: uid,
      money: this.data.txmoney,
      zfbnum: this.data.zfbnum,
      zfbname: this.data.zfbname,
    }
    _index.baseModel.TX(parmdata).then((e) => {
      if (e.errno == 0) {
        wx.showToast({
          title: e.message,
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
         wx.navigateBack({
           delta:1
         })
        }, 600)
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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