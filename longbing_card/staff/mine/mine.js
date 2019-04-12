var _xx_util = require("../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util),
    _index = require("../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {default: a}
}

var app = getApp();
Page({
    data: {staffInfo: {}, StaffCard: {}, globalData: {}, cardIndexData: {}, notRead: "", noticeNum: "", qrImg: ""},
    onLoad: function (a) {
        var i = this;
        app.util.showLoading(1), wx.hideShareMenu(), getApp().getConfigInfo(!0, !1).then(function () {
            var a = app.globalData, t = a.platform, e = a.configInfo.config, n = e.android_pay, o = e.ios_pay, r = !0;
            -1 < t.indexOf("android") && 0 == n && (r = !1), -1 < t.indexOf("ios") && 0 == o && (r = !1), i.setData({
                tmp_showPrice: r,
                globalData: app.globalData,
                uniacid: app.siteInfo.uniacid
            }, function () {
                i.getStaffCard()
            })
        }), wx.hideLoading()
    },
    onReady: function () {
    },
    onShow: function () {
        var a = this;
        a.getFormIds(), a.getStaffInfo(), a.getCardIndexData()
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
        var a = this;
        getApp().getConfigInfo(!0, !1).then(function () {
            a.setData({globalData: app.globalData}, function () {
                wx.showNavigationBarLoading(), a.getStaffCard(), a.getCardIndexData()
            })
        })
    },
    onReachBottom: function () {
    },
    onPageScroll: function (a) {
    },
    onShareAppMessage: function (a) {
        var t = this.data.cardIndexData;
        a.from;
        var e = t.share_img;
        return e && "cardType1" != t.info.card_type && "cardType4" != t.info.card_type || (e = t.info.avatar_2), {
            title: t.info.share_text,
            path: "/longbing_card/pages/index/index?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard",
            imageUrl: e
        }
    },
    getFormIds: function () {
        var t = this;
        app.util.request({
            url: "entry/wxapp/FormIds", cachetime: "30", method: "POST", data: {}, success: function (a) {
                a.data.errno || t.setData({noticeNum: a.data.data.count})
            }, fail: function (a) {
            }
        })
    },
    getStaffInfo: function () {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Staff", cachetime: "30", method: "POST", data: {}, success: function (a) {
                a.data.errno || t.setData({staffInfo: a.data.data}, function () {
                    t.getStaffUnread()
                })
            }, fail: function (a) {
            }
        })
    },
    getStaffCard: function () {
        var t = this;
        app.util.request({
            url: "entry/wxapp/StaffCard",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function (a) {
                a.data.errno || t.setData({StaffCard: a.data.data.count})
            },
            fail: function (a) {
            }
        })
    },
    getStaffUnread: function () {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Unread", cachetime: "30", method: "POST", data: {}, success: function (a) {
                a.data.errno || t.setData({notRead: a.data.data.count})
            }, fail: function (a) {
            }
        })
    },
    getCardIndexData: function () {
        var e = this;
        _xx_util2.default.showLoading();
        var a = {to_uid: wx.getStorageSync("userid")};
        _index.userModel.getCardShow(a).then(function (a) {
            _xx_util2.default.hideAll();
            var t = a.data;
            console.log(t,'用户信息')
            e.setData({cardIndexData: t})
        })
    },
    toJump: function (a) {
        var t = a.currentTarget.dataset.status;
        "toCopyright" != t && "toPoster" != t || app.util.goUrl(a), "toEdit" == t ? wx.navigateTo({url: "/longbing_card/staffs/pages/mine/editInfo/editInfo"}) : "toChat" == t ? wx.switchTab({url: "/longbing_card/staff/message/message"}) : "toEwm" == t && wx.navigateTo({url: "/longbing_card/users/pages/card/share/share"})
    },
    formSubmit: function (a) {
        var t = a.detail.formId, e = a.detail.target.dataset.status;
        this.toSaveFormIds(t), "toCardIndex" == e ? wx.navigateTo({url: "/longbing_card/pages/index/index?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard"}) : "toPoster" == e || "toAddPage" == e || "toVoucher" == e ? app.util.goUrl(a, !0) : "toCode" == e ? wx.navigateTo({url: "/longbing_card/staffs/pages/spread/news/news?status=code"}) : "toHome" == e ? wx.reLaunch({url: "/longbing_card/pages/index/index?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard"}) : "toAddNotice" == e || "toNotice" == e && app.util.goUrl(a, !0)
    },
    toSaveFormIds: function (a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
            method: "POST",
            data: {formId: a},
            success: function (a) {
                a.data.errno || t.getFormIds()
            },
            fail: function (a) {
            }
        })
    }
});
