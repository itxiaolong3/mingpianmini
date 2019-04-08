var timerRead, _index = require("longbing_card/resource/apis/index.js"),
    util = require("longbing_card/resource/js/util.js"), appUniacid = require("siteinfo.js");
App({
    onLaunch: function (a) {
        var e = this;
        console.log("版本：2019年02月28日1930", appUniacid.uniacid);
        var t = wx.getStorageSync("userid"),pid = wx.getStorageSync("pid"), o = wx.getStorageSync("user");
        wx.clearStorageSync(), wx.setStorageSync("userid", t), pid?wx.setStorageSync("pid", pid):'', wx.setStorageSync("user", o);
        var n = e.siteInfo.siteroot;
        n = util.getHostname(n), e.globalData.noticeUrl = n, e.globalData.wssUrl = "wss://" + n + "/wss", e.globalData.bossUrl = "https://" + n + "/addons/longbing_card/dist?uniacid=" + appUniacid.uniacid + "&id="
    },
    onShow: function (a) {
        var n = this;
        if (wx.getSystemInfo({
                success: function (a) {
                    console.log("手机信息   res：" + a.platform + " || " + a.model);
                    var e = a.platform, t = a.model;
                    n.globalData.platform = e, -1 != t.search("iPhone X") && (n.globalData.isIphoneX = !0)
                }
            }), a.query.to_uid && (n.globalData.to_uid = a.query.to_uid), a.query.from_id && (n.globalData.loginParam.is_qr = 0, n.globalData.from_id = a.query.from_id), a.scene) {
            var e = 0;
            1044 == a.scene && (e = 1), n.globalData.loginParam.scene = a.scene, n.globalData.loginParam.is_group = e
        }
        if (a.query.is_qr && (n.globalData.loginParam.is_qr = a.query.is_qr, !a.query.from_id && a.query.to_uid && (n.globalData.from_id = a.query.to_uid)), a.query.custom && (n.globalData.loginParam.type = 1, n.globalData.loginParam.target_id = a.query.custom), a.query.type) {
            n.globalData.loginParam.type = a.query.type;
            var t = 0;
            a.query.id && (t = a.query.id), n.globalData.loginParam.target_id = t
        }
        var o = n.globalData, r = o.to_uid, i = o.from_id;
        i || (i = r), i?wx.setStorageSync("pid", i):'', 1044 == a.scene ? wx.getShareInfo({
            shareTicket: a.shareTicket,
            complete: function (a) {
                n.globalData.encryptedData = a.encryptedData, n.globalData.iv = a.iv
            }
        }) : console.log("res.scene != 1044"), n.getToLogin(), timerRead = setInterval(function () {
            var a = {to_uid: n.globalData.to_uid};
            _index.baseModel.getClientUnread(a).then(function (a) {
                if (a.data) {
                    var e = a.data.count, t = e.staff_count, o = e.user_count;
                    t && (n.globalData.badgeNum = t, n._createBadgeTimer()), o && (n.globalData.clientUnread < o && (n.globalData.clientUnreadImg = !0, setTimeout(function () {
                        n.globalData.clientUnreadImg = !1
                    }, 5e3)), n.globalData.clientUnread = o)
                }
            })
        }, 12e3)
    },
    onHide: function () {
    },
    onError: function (a) {
        console.log(a)
    },
    _clearBadgeTimer: function () {
        var a = this;
        a.globalData._setTabBarBadgeTimer && (clearInterval(a.globalData._setTabBarBadgeTimer), a.globalData._setTabBarBadgeTimer = null)
    },
    _createBadgeTimer: function () {
        var a = this;
        a.globalData._setTabBarBadgeTimer || (a.globalData._setTabBarBadgeTimer = setInterval(function () {
            a.setMsgBadge(a.globalData.badgeNum)
        }, 300))
    },
    setMsgBadge: function (a) {
        var e = this;
        0 != a ? wx.setTabBarBadge({
            index: 1, text: String(a), success: function () {
                e._clearBadgeTimer()
            }, fail: function () {
                e._createBadgeTimer()
            }
        }) : wx.removeTabBarBadge({
            index: 1, success: function () {
                e._clearBadgeTimer()
            }, fail: function () {
                e._createBadgeTimer()
            }
        })
    },
    getConfigInfo: function () {
        var t = 0 < arguments.length && void 0 !== arguments[0] && arguments[0],
            g = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], l = this, o = l.globalData.configInfo;
        return new Promise(function (s, a) {
            if (o && !t) {
                var e = Object.assign({}, o);
                s(e)
            } else _index.baseModel.getConfigV2().then(function (a) {
                var e = a.data, t = e.my_company, o = e.tabBar;
                if (t && 23 < t.addr.length && (t.addrMore = t.addr.slice(0, 23) + "..."), 1 == g) {
                    var n = l.globalData.tabBarList;
                    for (var r in o.menu_name) o.menu_url_out[r] ? (0 == o.menu_url_jump_way[r] && (n[r].jump = "toOutUrl"), 1 == o.menu_url_jump_way[r] && (n[r].jump = "toMiniApp", n[r].toMiniApp = o.menu_url_out[r].split("；"))) : n[r].jump = "toPageUrl", 1 == o.menu_is_hide[r] ? n[r].showTab = 1 : n[r].showTab = 0, n[r].text = o.menu_name[r], -1 < o.menu_url[r].indexOf("currentTabBar=") && (n[r].type = o.menu_url[r].split("currentTabBar=")[1]), n[r].url = o.menu_url[r], o.menu_url_out[r] && (n[r].url = o.menu_url_out[r]);
                    l.globalData.tabBarList = n
                }
                l.globalData.configInfo = e;
                var i = Object.assign({}, e);
                s(i)
            })
        }).then(function (a) {
            return a
        })
    },
    getToLogin: function () {
        var m = this;
        wx.login({
            success: function (a) {
                var e = m.globalData.loginParam, t = e.scene, o = e.is_qr, n = e.is_group, r = e.type, i = e.target_id,
                    s = m.globalData, g = s.to_uid, l = s.from_id, c = s.encryptedData, u = s.iv;
                l || (l = g);
                var d = {code: a.code, scene: t, is_qr: o, is_group: n, from_id: l};
                r && (d.type = r), i && (d.target_id = i), c && (d.encryptedData = c), u && (d.iv = u), wx.setStorageSync("loginParamObj", d), l?wx.setStorageSync("pid", l):'', _index.baseModel.getBind({from_id: l}).then(function (a) {
                }), _index.baseModel.getLogin(d).then(function (a) {
                    var e = a.data, t = e.user_id, o = e.user;
                    m.globalData.userid = t, wx.setStorageSync("userid", t), o && (m.globalData.openGId_2 = o.openGId_2, o.phone && (m.globalData.hasClientPhone = !0), wx.setStorageSync("user", o))
                })
            }
        })
    },
    getCardAfter: function () {
        var a = this.globalData, e = a.to_uid, t = a.from_id, o = a.openGId_2, n = this.globalData.loginParam;
        t || (t = e);
        var r = {to_uid: e, is_qr: n.is_qr, is_group: n.is_group, type: n.type, target_id: n.target_id, from_id: t};
        o && (r.openGId = o), _index.userModel.getCardAfter(r).then(function (a) {
        })
    },
    util: util,
    userInfo: {sessionid: null},
    siteInfo: require("siteinfo.js"),
    globalData: {
        isIphoneX: !1,
        isShowCard: "/",
        userid: "",
        openGId_2: "",
        to_uid: 0,
        from_id: 0,
        nickName: "",
        avatarUrl: "",
        my_company: {addrMore: ""},
        encryptedData: !1,
        iv: !1,
        isStaff: -1,
        isBoss: !1,
        userIsStaff: !1,
        hasClientPhone: !1,
        configInfo: !1,
        checkvoucher: !1,
        voucherStatus: {tag: "big", status: "unreceive"},
        auth: {authStatus: "400", authPhoneStatus: "400"},
        chooseStaffInfo: {avatar: "", avatarImg: ""},
        loginParam: {scene: "", is_qr: "", is_group: "", type: "", target_id: ""},
        wssUrl: "",
        bossUrl: "",
        noticeUrl: "",
        _setTabBarBadgeTimer: null,
        badgeNum: 0,
        clientUnread: 1,
        productDefault: "https://retail.xiaochengxucms.com/images/12/2018/11/t6MzXY2izRj1zZWi8pRdd1Zmx217r3.jpg",
        bannerDefault: "https://retail.xiaochengxucms.com/images/12/2018/11/RpbHpOzXlTHxPrE5XTm5hS3SB5EszX.jpg",
        chatImg: "https://retail.xiaochengxucms.com/images/12/2018/09/uEunvCzB16TY1gmTEtDDiEZ6YdU7Zu.png",
        logoImg: "https://retail.xiaochengxucms.com/images/12/2018/11/crDXyl3TyBRLUBch6ToqXL6e9D96hY.jpg",
        defaultUserImg: "https://retail.xiaochengxucms.com/images/12/2018/11/fDK7kkrmkMReK50l4r1Le740Kmra85.jpg",
        noUserImg: "https://retail.xiaochengxucms.com/images/12/2018/09/jyJlH5ax28TztQAQ2Jh8tIkXLhBQyK.png",
        moreImgs: "https://retail.xiaochengxucms.com/images/12/2018/09/jeVh5RF0dfndncFeZzmhzeW511V4Rm.png",
        ingImg: "https://retail.xiaochengxucms.com/images/12/2018/09/hnqwnkQsV4lNx2vIyCA3lxF3LTfGqv.png",
        bossImg: "https://retail.xiaochengxucms.com/images/12/2018/09/KYdftdZuDYh2TF9pQnJ0uT9tgNt2q2.png",
        playVideoImg: "https://retail.xiaochengxucms.com/images/12/2018/10/T8A1maB3boAB3A8Sb8yTYBs1b0BmaA.png",
        companyVideoImg: "https://retail.xiaochengxucms.com/images/12/2018/10/vmKklLlnkMRCRBFuZDMEkEcfu4fEKr.png",
        cardVideoImg: "https://retail.xiaochengxucms.com/images/12/2018/10/Ik4kmm8i4a8Qb5383a699m6p3g3g6q.png",
        tabBarList: [{
            iconPath: "/longbing_card/resource/icon/icon-card.png",
            selectedIconPath: "/longbing_card/resource/icon/icon-card-cur.png",
            url: "",
            showTab: 0,
            jump: "toPageUrl",
            type: "toCard",
            text: "名片"
        }, {
            iconPath: "/longbing_card/resource/icon/icon-shop.png",
            selectedIconPath: "/longbing_card/resource/icon/icon-shop-cur.png",
            url: "",
            showTab: 0,
            type: "toShop",
            jump: "toPageUrl",
            text: "商城"
        }, {
            iconPath: "/longbing_card/resource/icon/icon-news.png",
            selectedIconPath: "/longbing_card/resource/icon/icon-news-cur.png",
            url: "",
            showTab: 0,
            type: "toNews",
            jump: "toPageUrl",
            text: "动态"
        }, {
            iconPath: "/longbing_card/resource/icon/icon-company.png",
            selectedIconPath: "/longbing_card/resource/icon/icon-company-cur.png",
            url: "",
            showTab: 0,
            type: "toCompany",
            jump: "toPageUrl",
            text: "官网"
        }]
    }
});
