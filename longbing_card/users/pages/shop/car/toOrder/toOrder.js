var _xx_util = require("../../../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util),
    _index = require("../../../../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {default: a}
}

var app = getApp();
Page({
    data: {toWxPayStatus: 0}, onLoad: function (a) {
        console.log(a, "options");
        var t = this;
        app.util.showLoading(1), wx.hideShareMenu();
        var e, o = {};
        if (a.status) {
            var r;
            o.status = a.status;
            var s = wx.getStorageSync("storageToOrder");
            "toOrder" != a.status && "toCarOrder" != a.status || (r = "去结算", o.tmpFailUrl = "/longbing_card/users/pages/uCenter/order/orderList/orderList?currentTab=1", o.tmpSuccessUrl = "/longbing_card/users/pages/uCenter/order/orderList/orderList?currentTab=2"), "toCollage" == a.status && (r = "发布拼团", o.tmpFailUrl = "/longbing_card/users/pages/uCenter/order/collageList/collageList?currentTab=0", o.tmpSuccessUrl = "/longbing_card/users/pages/shop/releaseCollage/releaseCollage?id=" + s.dataList[0].goods_id + "&status=toShare&to_uid=" + app.globalData.to_uid + "&collage_id="), "toJoinCollage" == a.status && (r = "参加拼团", o.tmpFailUrl = "/longbing_card/users/pages/uCenter/order/collageList/collageList?currentTab=0", o.tmpSuccessUrl = "/longbing_card/users/pages/shop/releaseCollage/releaseCollage?id=" + s.tmp_trolley_ids + "&status=toShare&to_uid=" + app.globalData.to_uid + "&collage_id="), wx.setNavigationBarTitle({title: r})
        }
        a.sharestatus && (o.sharestatus = a.sharestatus), wx.getStorageSync("storageToOrder") && (o.orderData = wx.getStorageSync("storageToOrder"));
        var d = 0, i = o.orderData.dataList;
        for (var n in i) e || (e = i[0].goods_id), e == i[n].goods_id && (i[n].toCountFreightPrice = 1), 0 < n && (i[n].goods_id != i[n - 1].goods_id ? (e = i[n].goods_id, i[n].toCountFreightPrice = 1) : i[n].toCountFreightPrice = 0), 1 == i[n].toCountFreightPrice && (d += 1 * i[n].freight);
        o.orderData.freight_price = d, o.orderData.countPayMoney = (1 * o.orderData.count_price + 1 * d).toFixed(2), o.orderData.countPayMoney2 = o.orderData.countPayMoney, getApp().getConfigInfo(!0, !0).then(function () {
            t.setData({paramData: o, globalData: app.globalData}), t.getAddressList(), wx.hideLoading()
        })
    }, onReady: function () {
    }, onShow: function () {
        var a = this, t = app.globalData, e = {};
        t.checkAddress_cur && (e = t.checkAddress_cur, a.setData({checkAddress_cur: e}));
        var o = a.data.paramData;
        t.checkvoucher ? o.orderData.countPayMoney2 = (o.orderData.countPayMoney - t.checkvoucher.reduce).toFixed(2) : o.orderData.countPayMoney2 = o.orderData.countPayMoney, a.setData({
            globalData: t,
            paramData: o
        })
    }, onHide: function () {
        app.globalData.checkvoucher = !1, wx.removeStorageSync("storageToOrder")
    }, onUnload: function () {
        app.globalData.checkvoucher = !1, wx.removeStorageSync("storageToOrder")
    }, onPullDownRefresh: function () {
        wx.showNavigationBarLoading(), this.getAddressList()
    }, onReachBottom: function () {
    }, onShareAppMessage: function () {
    }, getAddressList: function () {
        var o = this;
        app.util.request({
            url: "entry/wxapp/shopmyaddress",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function (a) {
                if (console.log("shopmyaddress ==>", a), !a.data.errno) {
                    var t = a.data.data;
                    for (var e in t) 1 == t[e].is_default && (app.globalData.checkAddress = t[e]);
                    app.globalData.checkAddress && o.setData({checkAddress_cur: app.globalData.checkAddress})
                }
            },
            fail: function (a) {
                console.log("shopmyaddress ==> fail ==> ", a)
            }
        })
    }, getProductOrder: function (a) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/shopplaceorder",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function (a) {
                if (console.log("shopplaceorder ==>", a), !a.data.errno) {
                    var t = o.data.paramData.orderData.dataList;
                    for (var e in t) o.toShopDelTrolley(t[e].id);
                    o.getWxPay(a.data.data.order_id)
                }
            },
            fail: function (a) {
                console.log("shopplaceorder ==> fail ==> ", a), wx.showModal({
                    title: "",
                    content: a.data.message,
                    showCancel: !1,
                    confirmText: "知道啦",
                    success: function (a) {
                        a.confirm && o.setData({toWxPayStatus: 0})
                    }
                })
            }
        })
    }, getOnlyOrder: function (a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/shopplaceorder2",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function (a) {
                console.log("shopplaceorder2 ==>", a), a.data.errno || t.getWxPay(a.data.data.order_id)
            },
            fail: function (a) {
                console.log("shopplaceorder2 ==> fail ==> ", a), wx.showModal({
                    title: "",
                    content: a.data.message,
                    showCancel: !1,
                    confirmText: "知道啦",
                    success: function (a) {
                        a.confirm && t.setData({toWxPayStatus: 0})
                    }
                })
            }
        })
    }, getCollageOrder: function (a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/shopstartcollage",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function (a) {
                console.log("shopstartcollage ==>", a), a.data.errno || t.getWxPay(a.data.data.order_id)
            },
            fail: function (a) {
                console.log("shopstartcollage ==> fail ==> ", a), wx.showModal({
                    title: "",
                    content: a.data.message,
                    showCancel: !1,
                    confirmText: "知道啦",
                    success: function (a) {
                        a.confirm && t.setData({toWxPayStatus: 0})
                    }
                })
            }
        })
    }, getJoinCollageOrder: function (a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/shopjoincollage",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function (a) {
                console.log("shopjoincollage ==>", a), a.data.errno || t.getWxPay(a.data.data.order_id)
            },
            fail: function (a) {
                console.log("shopjoincollage ==> fail ==> ", a), wx.showModal({
                    title: "",
                    content: a.data.message,
                    showCancel: !1,
                    confirmText: "知道啦",
                    success: function (a) {
                        a.confirm && t.setData({toWxPayStatus: 0})
                    }
                })
            }
        })
    }, toShopDelTrolley: function (a) {
        app.util.request({
            url: "entry/wxapp/ShopDelTrolley",
            cachetime: "30",
            method: "POST",
            data: {id: a},
            success: function (a) {
                console.log("ShopDelTrolley ==>", a), a.data.errno
            },
            fail: function (a) {
                console.log("ShopDelTrolley ==> fail ==> ", a)
            }
        })
    }, getWxPay: function (a) {
        var t = this;
        app.util.showLoading(1), app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "30",
            method: "POST",
            data: {order_id: a},
            success: function (a) {
                console.log("Pay ==>", a), a.data && a.data.data && !a.data.errno && (a.data.data.collage_id && t.setData({pay_collage_id: a.data.data.collage_id}), wx.hideLoading(), wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.paySign,
                    success: function (a) {
                        wx.showToast({
                            icon: "none",
                            image: "/longbing_card/resource/images/alert.png",
                            title: "支付成功",
                            duration: 2e3,
                            success: function () {
                                setTimeout(function () {
                                    var a = t.data.paramData.tmpSuccessUrl;
                                    "toCollage" != t.data.paramData.status && "toJoinCollage" != t.data.paramData.status || (a += t.data.pay_collage_id), console.log(a, "tmpURL"), "fromshare" == t.data.paramData.sharestatus ? (a += "&sharestatus=fromshare", wx.reLaunch({url: a})) : wx.redirectTo({url: a}), t.data.toWxPayStatus = 0
                                }, 1500)
                            }
                        })
                    },
                    fail: function (a) {
                        wx.showToast({
                            icon: "none",
                            image: "/longbing_card/resource/images/error.png",
                            title: "支付失败",
                            duration: 2e3,
                            success: function () {
                                setTimeout(function () {
                                    wx.redirectTo({url: t.data.paramData.tmpFailUrl}), t.data.toWxPayStatus = 0
                                }, 1500)
                            }
                        })
                    },
                    complete: function (a) {
                    }
                }))
            },
            fail: function (a) {
                console.log("Pay ==> fail ==>", a), wx.hideLoading(), wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? "支付失败，" + a.data.message : "支付失败，请重试",
                    showCancel: !1,
                    success: function (a) {
                        a.confirm && setTimeout(function () {
                            wx.redirectTo({url: t.data.paramData.tmpFailUrl})
                        }, 1e3)
                    }
                })
            }
        })
    }, toJump: function (a) {
        var r = this, t = a.currentTarget.dataset.status, e = r.data.checkAddress_cur;
        if ("toCheckAddress" != t && 0 == r.data.paramData.orderData.tmp_is_self) {
            if (!e) return wx.showToast({icon: "none", title: "请选择收货地址！", duration: 2e3}), !1;
            var s = e.id;
            if (!s) return wx.showToast({icon: "none", title: "请选择收货地址！", duration: 2e3}), !1
        }
        if ("toCheckAddress" == t || "toProductDetail" == t || "toJumpUrl" == t) console.log("选择地址 || 跳转至产品详情"), app.util.goUrl(a); else if ("toWxPay" == t) {
            0 == r.data.toWxPayStatus && r.setData({toWxPayStatus: 1}, function () {
                var a = {to_uid: app.globalData.to_uid, address_id: -1};
                0 == r.data.paramData.orderData.tmp_is_self && (a.address_id = s);
                var t = r.data.globalData.checkvoucher;
                if ("toOrder" == r.data.paramData.status) {
                    var e = r.data.paramData.orderData.dataList;
                    a.number = e[0].number, a.goods_id = e[0].goods_id, a.spe_price_id = e[0].spe_price_id, t.id && (a.record_id = t.id), r.getOnlyOrder(a)
                }
                if ("toCarOrder" == r.data.paramData.status && (a.trolley_ids = r.data.paramData.orderData.tmp_trolley_ids, t.id && (a.record_id = t.id), r.getProductOrder(a)), "toCollage" == r.data.paramData.status || "toJoinCollage" == r.data.paramData.status) {
                    var o = r.data.paramData.orderData.dataList;
                    a.collage_id = o[0].collage_id, a.number = o[0].number, "toCollage" == r.data.paramData.status && (a.goods_id = o[0].goods_id, r.getCollageOrder(a)), "toJoinCollage" == r.data.paramData.status && (a.goods_id = r.data.paramData.orderData.tmp_trolley_ids, r.getJoinCollageOrder(a))
                }
            })
        }
    }
});
