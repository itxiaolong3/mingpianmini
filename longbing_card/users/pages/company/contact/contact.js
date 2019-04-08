var _xx_util = require("../../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util),
    _index = require("../../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {default: t}
}

var app = getApp(), getAppGlobalData = require("../../../../templates/copyright/copyright.js");
Page({
    data: {globalData: {}, refreshCompany: !1}, onLoad: function (t) {
        console.log(t, "options"), app.util.showLoading(1);
        var a = this, e = {};
        t.type && (e.type = t.type), t.name && (e.name = t.name, wx.setNavigationBarTitle({title: t.name})), t.identification && (e.identification = t.identification), t.fromshare && (e.fromshare = t.fromshare), t.to_uid && (e.to_uid = t.to_uid, app.globalData.to_uid = t.to_uid), t.from_id && (e.from_id = t.from_id, app.globalData.from_id = t.from_id), getApp().getConfigInfo(!0, !1).then(function () {
            a.setData({paramData: e, globalData: app.globalData}, function () {
                app.globalData.to_uid != wx.getStorageSync("userid") && getApp().getCardAfter(), a.getModular(), wx.hideLoading()
            })
        })
    }, onReady: function () {
    }, onShow: function () {
    }, onHide: function () {
    }, onUnload: function () {
    }, onPageScroll: function (t) {
        var a = this.data.companyData;
        for (var e in a) 8 == a[e].type && (a[e].showTextArea = !1);
        this.setData({companyData: a})
    }, onPullDownRefresh: function () {
        var t = this;
        app.globalData.configInfo = !1, getApp().getConfigInfo(!0, !1).then(function () {
            t.setData({globalData: app.globalData, refreshCompany: !0}, function () {
                wx.showNavigationBarLoading(), t.getModular()
            })
        })
    }, onReachBottom: function () {
    }, onShareAppMessage: function (t) {
        var a = this;
        return "button" === t.from || console.log("来自右上角转发菜单", a.data.paramData.name), {
            title: a.data.paramData.name,
            path: "/longbing_card/users/pages/company/contact/contact?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&type=" + a.data.paramData.type + "&name=" + a.data.paramData.name + "&identification=" + a.data.paramData.identification + "&fromshare=true",
            imageUrl: ""
        }
    }, getModular: function () {
        var s = this, t = s.data, c = t.refreshCompany, f = t.paramData;
        c || _xx_util2.default.showLoading();
        var a = {to_uid: f.to_uid};
        _index.userModel.getModular(a).then(function (t) {
            _xx_util2.default.hideAll(), console.log("getModular ==>", t.data);
            var a = t.data.company_modular, e = [], o = !(c = !1);
            for (var i in a) a[i].id == f.identification && a[i].type == f.type && (e.push(a[i]), 4 == a[i].type && (o = !1, a[i].info.markers = [{
                iconPath: "https://retail.xiaochengxucms.com/images/12/2018/11/A33zQycihMM33y337LH23myTqTl3tl.png",
                id: 1,
                callout: {
                    content: a[i].info.address,
                    fontSize: 14,
                    bgColor: "#ffffff",
                    padding: 4,
                    display: "ALWAYS",
                    textAlign: "center",
                    borderRadius: 2
                },
                latitude: a[i].info.latitude,
                longitude: a[i].info.longitude,
                width: 28,
                height: 28
            }]), 8 == a[i].type && (o = !1, a[i].showTextArea = !1));
            if (1 == o) {
                var n = s.data.paramData, r = n.fromshare, u = n.to_uid, d = n.from_id;
                d || (d = wx.getStorageSync("userid"));
                var l = "确定";
                "true" == r && (l = "返回首页"), wx.showModal({
                    title: "提示",
                    content: "该内容不存在或已删除",
                    confirmText: l,
                    showCancel: !1,
                    success: function (t) {
                        t.confirm && "true" == r && wx.reLaunch({url: "/longbing_card/pages/index/index?to_uid=" + u + "&from_id=" + d + "&currentTabBar=toCompany"})
                    }
                })
            }
            s.setData({companyData: e, refreshCompany: c})
        })
    }, getModularForm: function (t, a, e, o) {
        var i = {modular_id: this.data.companyData[o].id, name: t, phone: a, content: e};
        _index.userModel.getModularForm(i).then(function (t) {
            _xx_util2.default.hideAll(), wx.showModal({
                title: "",
                content: "留言成功，请等待管理员处理",
                showCancel: !1,
                confrimText: "知道啦"
            })
        })
    }, toOnBlur: function (t) {
        var a = _xx_util2.default.getData(t).index, e = this.data.companyData;
        e[a].showTextArea = !1, this.setData({companyData: e})
    }, getTextAreaVal: function (t) {
        var a = _xx_util2.default.getData(t).index, e = this.data.companyData;
        e[a].textVal = t.detail.value, this.setData({companyData: e})
    }, toJump: function (i) {
        var e = this, t = i.currentTarget.dataset.status, n = i.currentTarget.dataset.content;
        i.currentTarget.dataset.index;
        if ("toCopyright" == t) app.util.goUrl(i); else if ("toCall" == t) {
            if (!n || "暂未填写" == n) return !1;
            wx.makePhoneCall({
                phoneNumber: n, success: function (t) {
                }
            })
        } else "toCompanyMap" == t && wx.authorize({
            scope: "scope.userLocation", success: function (t) {
                wx.getLocation({
                    type: "gcj02", success: function (t) {
                        var a = _xx_util2.default.getData(i), e = a.latitude, o = a.longitude;
                        wx.openLocation({latitude: parseFloat(e), longitude: parseFloat(o), name: n, scale: 28})
                    }
                })
            }, fail: function (t) {
                var a = t.errMsg;
                (-1 < a.indexOf("fail auth deny") || -1 < a.indexOf("fail:auth deny")) && e.setData({isSetting: !0})
            }
        })
    }, formTmpSubmit: function (t) {
        var a = t.detail.formId, e = _xx_util2.default.getFromData(t), o = e.status, i = e.index, n = t.detail.value,
            r = n.name, u = n.phone, d = n.content;
        if ("toFormSubmit" == o) {
            if (!r) return wx.showModal({title: "", content: "请填写您的名字！"}), !1;
            if (!u) return wx.showModal({title: "", content: "请填写您的联系电话！"}), !1;
            if (!d) return wx.showModal({title: "", content: "请填写您想说的话！"}), !1;
            this.getModularForm(r, u, d, i)
        }
        this.toSaveFormIds(a)
    }, formSubmit: function (t) {
        var a = t.detail.formId, e = (t.detail.target.dataset.index, t.detail.target.dataset.status);
        this.toSaveFormIds(a), "toHome" == e && wx.reLaunch({url: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + app.globalData.from_id + "&currentTabBar=toCard"})
    }, toSaveFormIds: function (t) {
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
            method: "POST",
            data: {formId: t},
            success: function (t) {
                t.data.errno
            },
            fail: function (t) {
                console.log("fail ==> ", t)
            }
        })
    }
});
