var _xx_util = require("../../../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util),
    _index = require("../../../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {default: t}
}

var timerOverTime, app = getApp();
Page({
    data: {toWxPayStatus: 0, checkInd: -1}, onLoad: function (t) {
        console.log(t, "options");
        var a = this;
        app.util.showLoading(1), wx.hideShareMenu();
        var e = {};
        t.id && (e.id = t.id), t.status && (e.status = t.status), getApp().getConfigInfo(!0, !0).then(function () {
            a.setData({paramData: e, globalData: app.globalData}), a.getDetailData(), wx.hideLoading()
        })
    }, onReady: function () {
    }, onShow: function () {
    }, onHide: function () {
        clearInterval(timerOverTime), wx.hideLoading()
    }, onUnload: function () {
        clearInterval(timerOverTime), wx.hideLoading()
    }, onPullDownRefresh: function () {
        wx.showNavigationBarLoading(), this.getDetailData()
    }, onReachBottom: function () {
    }, onShareAppMessage: function () {
    }, getDetailData: function () {
        var n = this;
        app.util.request({
            url: "entry/wxapp/shopmyorderdetail",
            cachetime: "30",
            method: "POST",
            data: {id: n.data.paramData.id},
            success: function (t) {
                if (console.log("shopmyorderdetail ==>", t), !t.data.errno) {
                    var a = t.data.data, e = new app.util.date;
                    if (a.create_time_2 = e.dateToStr("yyyy-MM-DD HH:mm:ss", e.longToDate(1e3 * a.create_time)), a.left_time) {
                        var o = a.left_time;
                        timerOverTime = setInterval(function () {
                            a.left_time = a.left_time - 1;
                            var t = parseInt(a.left_time / 24 / 60 / 60);
                            o = (t = 0 < t ? t + "天" : "") + _xx_util2.default.formatTime(1e3 * a.left_time, "h小时m分s秒"), n.setData({tmpOverTimes: o})
                        }, 1e3)
                    }
                    for (var i in a.tmp_is_self = !1, a.goods_info) a.goods_info[i].unit_price = (a.goods_info[i].price / a.goods_info[i].number).toFixed(2), 1 == a.goods_info[i].is_self && (a.tmp_is_self = !0);
                    n.setData({detailData: a})
                }
            },
            fail: function (t) {
                console.log("shopmyorderdetail ==> fail ==> ", t)
            }
        })
    }, checktoConsult: function () {
        var t = this.data.detailData.to_uid, a = "", e = this.data.detailData, o = [];
        if (0 == e.type) e.user_info && (a = e.user_info.name); else for (var i in e.own && o.push(e.own), e.users && o.push(e.users), o) t == o[i].id && (a = o[i].nickName);
        0 == t ? wx.showModal({
            title: "",
            content: "不能与默认客服进行对话哦！",
            confirmText: "知道啦",
            showCancel: !1,
            success: function (t) {
                t.confirm
            }
        }) : t == wx.getStorageSync("userid") ? wx.showModal({
            title: "",
            content: "不能和自己进行对话哦！",
            confirmText: "知道啦",
            showCancel: !1,
            success: function (t) {
                t.confirm
            }
        }) : wx.navigateTo({url: "/longbing_card/chat/userChat/userChat?chat_to_uid=" + t + "&contactUserName=" + a})
    }, getShopcancelorder: function () {
        app.util.request({
            url: "entry/wxapp/shopcancelorder",
            cachetime: "30",
            method: "POST",
            data: {id: this.data.paramData.id},
            success: function (t) {
                console.log("shopcancelorder ==>", t), t.data.errno || wx.showToast({
                    icon: "success",
                    title: "已取消订单",
                    duration: 2e3,
                    success: function () {
                        setTimeout(function () {
                            wx.navigateBack()
                        }, 1e3)
                    }
                })
            },
            fail: function (t) {
                console.log("shopcancelorder ==> fail ==> ", t)
            }
        })
    }, getShopdelorder: function () {
        var e = this;
        app.util.request({
            url: "entry/wxapp/shopdelorder",
            cachetime: "30",
            method: "POST",
            data: {id: e.data.paramData.id},
            success: function (t) {
                if (console.log("shopdelorder ==>", t), !t.data.errno) {
                    var a = "已删除订单";
                    1 == e.data.detailData.type && (a = "已删除拼团"), wx.showToast({
                        icon: "success",
                        title: a,
                        duration: 2e3,
                        success: function () {
                            setTimeout(function () {
                                wx.navigateBack()
                            }, 1e3)
                        }
                    })
                }
            },
            fail: function (t) {
                console.log("shopdelorder ==> fail ==> ", t)
            }
        })
    }, getShopendorder: function () {
        var a = this;
        app.util.request({
            url: "entry/wxapp/shopendorder",
            cachetime: "30",
            method: "POST",
            data: {id: a.data.paramData.id},
            success: function (t) {
                console.log("shopendorder ==>", t), t.data.errno || wx.showToast({
                    icon: "success",
                    title: "已确认收货",
                    duration: 2e3,
                    success: function () {
                        setTimeout(function () {
                            a.setData({"detailData.order_status": 3})
                        }, 1e3)
                    }
                })
            },
            fail: function (t) {
                console.log("shopendorder ==> fail ==> ", t)
            }
        })
    }, getShopAddTrolley: function (t) {
        app.util.request({
            url: "entry/wxapp/ShopAddTrolley",
            cachetime: "30",
            method: "POST",
            data: t,
            success: function (t) {
                console.log("ShopAddTrolley ==>", t), t.data.errno
            },
            fail: function (t) {
                console.log("ShopAddTrolley ==>  fail ==> ", t)
            }
        })
    }, getWxPay: function () {
        var a = this;
        app.util.showLoading(1);
        var e = a.data.detailData;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "30",
            method: "POST",
            data: {order_id: a.data.paramData.id},
            success: function (t) {
                console.log("Pay ==> fail ==>", t), t.data && t.data.data && !t.data.errno && (wx.hideLoading(), wx.requestPayment({
                    timeStamp: t.data.data.timeStamp,
                    nonceStr: t.data.data.nonceStr,
                    package: t.data.data.package,
                    signType: "MD5",
                    paySign: t.data.data.paySign,
                    success: function (t) {
                        wx.showToast({
                            icon: "success",
                            image: "/longbing_card/resource/images/alert.png",
                            title: "支付成功",
                            duration: 2e3,
                            success: function () {
                                e.pay_status = 1, a.setData({detailData: e}), setTimeout(function () {
                                    a.data.toWxPayStatus = 0, wx.hideLoading()
                                }, 1500)
                            }
                        })
                    },
                    fail: function (t) {
                        wx.showToast({
                            icon: "fail",
                            image: "/longbing_card/resource/images/error.png",
                            title: "支付失败",
                            duration: 2e3,
                            success: function () {
                                setTimeout(function () {
                                    a.data.toWxPayStatus = 0, wx.hideLoading()
                                }, 1500)
                            }
                        })
                    },
                    complete: function (t) {
                    }
                }))
            },
            fail: function (t) {
                console.log("Pay ==> fail ==>", t), wx.hideLoading(), wx.showModal({
                    title: "系统提示",
                    content: t.data.message ? "支付失败，" + t.data.message : "支付失败，请重试",
                    showCancel: !1,
                    success: function (t) {
                        t.confirm && a.setData({toWxPayStatus: 0})
                    }
                })
            }
        })
    }, toJump: function (t) {
        var e = this, a = t.currentTarget.dataset.status, o = (t.currentTarget.dataset.id, e.data.detailData);
        if ("toProductDetail" == a || "toCopy" == a || "toCall" == a || "toMoreList" == a || "toCollage" == a) app.util.goUrl(t); else if ("toConsult" == a) e.checktoConsult(); else if ("toCancel" == a) e.getShopcancelorder(); else if ("toWxPay" == a) {
            0 == e.data.toWxPayStatus && e.setData({toWxPayStatus: 1}, function () {
                e.getWxPay()
            })
        } else "toConfirm" == a ? e.getShopendorder() : "toDelete" == a ? e.getShopdelorder() : "toAgain" == a ? 0 == e.data.detailData.type || 1 == e.data.detailData.type && (console.log("再次购买 拼团"), wx.reLaunch({url: "/longbing_card/pages/shop/detail/detail?id=" + o.goods_info[0].id + "&to_uid=" + app.globalData.to_uid})) : "toCheckPassword" == a && _index.staffModel.toGetOrderQr({id: o.id}).then(function (t) {
            _xx_util2.default.hideAll(), console.log("toGetOrderQr ==>", t.data);
            var a = t.data.path;
            e.setData({qr: a, checkInd: 0})
        })
    }
});
