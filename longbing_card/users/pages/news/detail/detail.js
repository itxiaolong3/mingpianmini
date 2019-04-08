var _xx_util = require("../../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util),
    _index = require("../../../../resource/apis/index.js"), _user = require("../../../../resource/apis/user.js"),
    _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {default: a}
}

var timer, app = getApp(), auth = require("../../../../templates/auth/auth.js"),
    getAppGlobalData = require("../../../../templates/copyright/copyright.js");
Page({
    data: {id: "", to_uid: "", from_id: "", isStaffAdd: !1, globalData: {}, detailData: [], staffCard: []},
    onLoad: function (a) {
        var e = this;
        console.log(a, "options"), app.util.showLoading(1), wx.showShareMenu({
            withShareTicket: !0,
            success: function (a) {
            },
            fail: function (a) {
            }
        });
        var o = {};
        a.id && (o.id = a.id), a.shareimg && (o.status = a.status, o.name = a.name, o.src = a.src, o.shareimg = a.shareimg, wx.setNavigationBarTitle({title: a.name})), a.fromshare && (o.fromshare = a.fromshare), a.to_uid && (o.to_uid = a.to_uid, app.globalData.to_uid = a.to_uid), a.from_id && (o.from_id = a.from_id, app.globalData.from_id = a.from_id), a.nickName && (app.globalData.nickName = a.nickName), a.companyName && (o.companyName = a.companyName), getApp().getConfigInfo(!0, !0).then(function () {
            e.setData({paramData: o, globalData: app.globalData}, function () {
                if ("toPlayVideo" == o.status) {
                    var a = e.data.paramData, t = {
                        to_uid: a.to_uid,
                        sign: "view",
                        type: 8,
                        target: a.report_id,
                        scene: app.globalData.loginParam.scene,
                        uniacid: app.siteInfo.uniacid
                    };
                    app.globalData.to_uid != wx.getStorageSync("userid") && (getApp().getCardAfter(), e.toGetReport(t))
                } else app.globalData.to_uid != wx.getStorageSync("userid") && getApp().getCardAfter(), o.to_uid && (e.getStaffCard(), e.getCardIndexData());
                e.getDetailData()
            })
        }), a.from_id && 3 == a.type && e.data.paramData.to_uid != wx.getStorageSync("userid") && 1044 == app.globalData.loginParam.scene && (timer = setInterval(function () {
            app.globalData.encryptedData && e.toGetShareInfo()
        }, 1e3)), wx.hideLoading()
    },
    onReady: function () {
    },
    onShow: function () {
        auth.checkAuth(this, _index.baseModel, _xx_util2.default)
    },
    onHide: function () {
    },
    onUnload: function () {
        clearInterval(timer)
    },
    onPullDownRefresh: function () {
        var a = this;
        wx.showNavigationBarLoading(), getApp().getConfigInfo(!0, !1).then(function () {
            a.setData({globalData: app.globalData}, function () {
                a.data.paramData.to_uid && a.getStaffCard(), a.getDetailData()
            })
        }), auth.checkAuth(a, _index.baseModel, _xx_util2.default)
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function (a) {
        var t = this;
        "button" === a.from ? console.log("来自页面内转发按钮") : console.log("来自右上角转发菜单"), t.data.paramData.to_uid != wx.getStorageSync("userid") && t.toForwardRecord();
        var e = t.data.paramData, o = e.id, i = e.status, r = e.to_uid, n = e.name;
        if ("toPlayVideo" == i) {
            var d = t.data.detailData, u = d.content, l = d.cover, s = encodeURIComponent(l), c = encodeURIComponent(u);
            return {
                title: n,
                path: "/longbing_card/users/pages/news/detail/detail?to_uid=" + r + "&from_id=" + wx.getStorageSync("userid") + "&status=toPlayVideo&name=" + n + "&src=" + c + "&id=" + o + "&fromshare=true&shareimg=" + s,
                imageUrl: decodeURIComponent(s)
            }
        }
        var p = "/longbing_card/users/pages/news/detail/detail?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&id=" + t.data.paramData.id + "&fromshare=true&type=3";
        return t.data.paramData.companyName && (p = p + "&companyName=" + t.data.paramData.companyName), {
            title: t.data.detailData.title,
            path: p,
            imageUrl: ""
        }
    },
    getStaffCard: function () {
        var o = this;
        _xx_util2.default.showLoading();
        var a = {to_uid: o.data.paramData.to_uid};
        _index.userModel.getCardShow(a).then(function (a) {
            _xx_util2.default.hideAll(), console.log("getCardShow ==>", a.data);
            var t = a.data, e = !1;
            1 == t.info.is_staff && (e = !0), o.setData({staffCard: t, isStaffAdd: e})
        })
    },
    getCardIndexData: function () {
        var i = this, a = {to_uid: i.data.paramData.to_uid};
        _index.userModel.getCardShow(a).then(function (a) {
            if (_xx_util2.default.hideAll(), 0 == a.errno) {
                console.log("getCardShow==>", a.data);
                var t = a.data, e = t.to_uid, o = t.from_id;
                app.globalData.to_uid = e, app.globalData.from_id = o, app.globalData.nickName = t.info.name, app.globalData.avatarUrl = t.info.avatar, app.globalData.job_name = t.info.job_name, i.setData({cardIndexData: t})
            }
        })
    },
    getAuthPhoneNumber: function (a) {
        auth.getAuthPhoneNumber(a), console.log("auth.getAuthPhoneNumber(e)  *******************", a)
    },
    getUserInfo: function (a) {
        auth.getUserInfo(a), console.log("auth.getUserInfo(e)  *******************", a)
    },
    getDetailData: function () {
        var c = this, a = c.data.paramData, t = {id: a.id, to_uid: a.to_uid};
        _index.userModel.getTimeLineDetail(t).then(function (a) {
            var t = a.data, e = t.cover, o = t.create_time;
            if (e) for (var i in e) e[i] || t.cover.splice(i, 1);
            var r = new app.util.date;
            if (t.create_time = r.dateToStr("MM月DD日", r.longToDate(1e3 * o)), c.setData({detailData: t}), -2 == a.errno) {
                var n = c.data.paramData, d = n.fromshare, u = n.to_uid, l = n.from_id;
                l || (l = wx.getStorageSync("userid"));
                var s = "确定";
                "true" == d && (s = "返回首页"), wx.showModal({
                    title: "提示",
                    content: a.message,
                    confirmText: s,
                    showCancel: !1,
                    success: function (a) {
                        a.confirm && "true" == d && wx.reLaunch({url: "/longbing_card/pages/index/index?to_uid=" + u + "&from_id=" + l + "&currentTabBar=toNews"})
                    }
                })
            }
        })
    },
    toGetReport: function (a) {
        _index.baseModel.getReport(a).then(function (a) {
            _xx_util2.default.hideAll()
        })
    },
    toForwardRecord: function () {
        var a = {type: 3, to_uid: app.globalData.to_uid, target_id: this.data.paramData.id};
        console.log("entry/wxapp/Forward ==> paramObj", a), app.util.request({
            url: "entry/wxapp/Forward",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function (a) {
                a.data.errno
            },
            fail: function (a) {
                console.log("fail ==> ", a)
            }
        })
    },
    toGetShareInfo: function () {
        var e = this;
        wx.login({
            success: function (a) {
                var t = {
                    encryptedData: app.globalData.encryptedData,
                    iv: app.globalData.iv,
                    type: 4,
                    code: a.code,
                    to_uid: e.data.paramData.to_uid,
                    target_id: e.data.paramData.id
                };
                app.util.request({
                    url: "entry/wxapp/getShare",
                    cachetime: "30",
                    method: "POST",
                    data: t,
                    success: function (a) {
                        a.data.errno || clearInterval(timer)
                    },
                    fail: function (a) {
                    }
                })
            }, fail: function (a) {
            }
        })
    },
    toPreviewImg: function (a) {
        var t = this.data.detailData.cover;
        if (0 < t.length) {
            var e = a.target.dataset.src;
            wx.previewImage({current: e, urls: t})
        }
    },
    toJump: function (a) {
        "toCopyright" == a.currentTarget.dataset.status && app.util.goUrl(a)
    },
    formSubmit: function (a) {
        var t = a.detail.formId, e = (a.detail.target.dataset.index, a.detail.target.dataset.status);
        this.toSaveFormIds(t), "toSeeCard" == e ? wx.navigateTo({url: "/longbing_card/pages/index/index?to_uid=" + this.data.paramData.to_uid + "&from_id=" + this.data.paramData.from_id + "&currentTabBar=toCard"}) : "toHome" == e && wx.reLaunch({url: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + app.globalData.from_id + "&currentTabBar=toCard"})
    },
    toSaveFormIds: function (a) {
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
            method: "POST",
            data: {formId: a},
            success: function (a) {
                a.data.errno
            },
            fail: function (a) {
            }
        })
    }
});
