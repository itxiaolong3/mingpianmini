// longbing_card/pages/mypage/vippay.js
var _index = require("../../resource/apis/index.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iswxpay:'',
    ischeck:0,
    yqcode:'',
      yearpice:0
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
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      ischeck: e.detail.value
    })
  },
  topay:function(){
    let checktype=this.data.ischeck;
    if (checktype){
      if(checktype==1){
          console.log('选择了微信支付')
        let pid=wx.getStorageSync("pid");
        let uid=wx.getStorageSync("userid");
        let parmdata={
          uid:uid,
          pid:pid,
        }
        _index.baseModel.WXpay(parmdata).then((e) => {
          console.log(e,'支付信息');
          if (e.errno==0){
            //微信支付
            wx.requestPayment({
              timeStamp: e.data.timeStamp,
              nonceStr: e.data.nonceStr,
              package: e.data.package,
              paySign: e.data.paySign,
              signType: 'MD5',
              success(res) {
                wx.showToast({
                  title: '升级成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.setStorageSync('ispass',0)
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/longbing_card/pages/index/index'
                  })
                },600)
              },
              fail(res) {
                console.log(res,'支付失败')
              }
            })
          }else{
            wx.showToast({
              title: e.message,
              image: '../../resource/icon/fail.png',
              duration: 2000
            })
          }
        })
      }else if(checktype==2){
        if (this.data.yqcode==''){
          wx.showToast({
            title: '请填邀请码',
            image: '../../resource/icon/fail.png',
            duration: 2000
          })
        }else{
          let getyqcode=this.data.yqcode;
          let pid=wx.getStorageSync("pid");
          let uid=wx.getStorageSync("userid");
          let parmdata={
            uid:uid,
            pid:pid,
            yqcode:getyqcode
          }
          _index.baseModel.YQcode(parmdata).then((e) => {
            if (e.errno==0){
              wx.showToast({
                title: e.message,
                icon: 'success',
                duration: 2000
              })
              wx.setStorageSync('ispass',0)
              setTimeout(function () {
                wx.redirectTo({
                  url: '/longbing_card/pages/index/index'
                })
              },600)
            }else{
              wx.showToast({
                title: e.message,
                image: '../../resource/icon/fail.png',
                duration: 2000
              })
            }
          })


        }
      }
    }else{
      wx.showToast({
        title: '请选择支付方式',
        image: '../../resource/icon/fail.png',
        duration: 2000
      })
    }
    
  },
  bindKeyInput:function(e){
    console.log(e.detail.value,'输入的值')
    this.setData({
      yqcode:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      _index.baseModel.getVipprice().then((d) => {
        this.setData({
            yearpice:d.data
        })
          console.log(d.data,'获取数据')
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