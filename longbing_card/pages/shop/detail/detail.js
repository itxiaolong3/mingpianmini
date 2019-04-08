var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util),
    _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {default: t}
}

var timer, timerLeftTime, app = getApp(), auth = require("../../../templates/auth/auth.js");
Page({
    data: {
        swiperIndexCur: 1,
        swiperStatus: {indicatorDots: !1, autoplay: !0},
        isStaff: "",
        detailData: {},
        globalData: {},
        bgStatus: !1,
        chooseStatus: !1,
        chooseNumStatus: !1,
        addNumber: 1,
        addPrice: 0,
        countPrice: 0,
        rulesIndex: 0,
        checkSpeList: [],
        collageList: [],
        tmpTimes: []
    }, onLoad: function (t) {
        console.log(t, "options");
        var d = this;
        app.util.showLoading(1), wx.showShareMenu({
            withShareTicket: !0, success: function (t) {
            }, fail: function (t) {
            }
        });
        var a = {};
        t.id && (a.detailID = t.id), t.to_uid && (a.to_uid = t.to_uid, app.globalData.to_uid = t.to_uid), t.from_id && (a.from_id = t.from_id, app.globalData.from_id = t.from_id), t.nickName && (app.globalData.nickName = t.nickName), d.setData({paramData: a}), getApp().getConfigInfo(!0, !1).then(function () {
            var t = app.globalData, a = t.platform, e = t.configInfo.config, o = e.android_pay, i = e.ios_pay, r = !0;
            -1 < a.indexOf("android") && 0 == o && (r = !1), -1 < a.indexOf("ios") && 0 == i && (r = !1), d.setData({
                tmp_showPrice: r,
                globalData: app.globalData
            }, function () {
                app.globalData.to_uid != wx.getStorageSync("userid") && getApp().getCardAfter(), d.getProductDetail(), d.getCardIndexData()
            })
        }), t.from_id && 2 == t.type && d.data.paramData.to_uid != wx.getStorageSync("userid") && 1044 == app.globalData.loginParam.scene && (timer = setInterval(function () {
            app.globalData.encryptedData && d.toGetShareInfo()
        }, 1e3));
        var e = app.globalData.tabBarList[1].text;
        e || (e = "商城"), wx.setNavigationBarTitle({title: e}), wx.hideLoading()
    }, onReady: function () {
    }, onShow: function (t) {
        this.getCollageList(), this.checkAuthStatus()
    }, onHide: function () {
        clearInterval(timer), clearInterval(timerLeftTime)
    }, onUnload: function () {
        clearInterval(timer), clearInterval(timerLeftTime)
    }, onPullDownRefresh: function () {
        var t = this;
        wx.showNavigationBarLoading(), getApp().getConfigInfo(!0, !1).then(function () {
            t.setData({globalData: app.globalData, checkSpeList: []}, function () {
                t.getProductDetail(), t.getCollageList()
            })
        }), wx.getStorageSync("user").avatarUrl || t.checkAuthStatus()
    }, onReachBottom: function () {
    }, onShareAppMessage: function (t) {
        var a = this;
        return {
            title: a.data.detailData.name,
            path: "/longbing_card/pages/shop/detail/detail?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&id=" + a.data.paramData.detailID + "&type=2&nickName=" + app.globalData.nickName,
            imageUrl: a.data.detailData.cover_true
        }
    }, getCardIndexData: function () {
        var i = this, t = {to_uid: i.data.paramData.to_uid};
        _index.userModel.getCardShow(t).then(function (t) {
            if (_xx_util2.default.hideAll(), 0 == t.errno) {
                console.log("getCardShow==>", t.data);
                var a = t.data, e = a.to_uid, o = a.from_id;
                app.globalData.to_uid = e, app.globalData.from_id = o, app.globalData.nickName = a.info.name, app.globalData.avatarUrl = a.info.avatar, app.globalData.job_name = a.info.job_name, i.setData({cardIndexData: a})
            }
        })
    }, getProductDetail: function () {
        var l = this, t = {goods_id: l.data.paramData.detailID, to_uid: app.globalData.to_uid};
        _index.userModel.getShopGoodsDetail(t).then(function (t) {
            var a = t.data, e = l.data.checkSpeList, o = [];
            for (var i in a.spe_list) 1 < a.spe_list.length && "默认" == a.spe_list[i].title && 1 == a.spe_list[i].sec.length && "默认" == a.spe_list[i].sec[0].title && a.spe_list.splice(i, 1), e.push(0), 0 < a.spe_list.length && o.push(a.spe_list[i].sec[0].id);
            if (0 < a.collage.length) {
                for (var r in a.collage) a.collage[r].shop_price = (a.collage[r].price / 1e4).toFixed(2), a.collage[r].shop_spe_price = (a.collage[r].spe_price_price / 1e4).toFixed(2);
                l.setData({tmpShowCheckCollageID: a.collage[0].id, tmpShowCheckNumber: a.collage[0].number})
            }
            var d = a.name, s = a.price,
                n = {name: d, price: s, sale_count: a.sale_count, cover2: a.cover2, qr: a.qr, unit: a.unit};
            a.shop_price = (s / 1e4).toFixed(2), l.setData({
                shareParamObj: n,
                detailData: a,
                addPrice: a.price,
                shop_collageAddPrice: (a.price / 1e4).toFixed(2),
                checkSpeList: e,
                checkIDs: o
            }, function () {
                l.getCurrentCheckIdAndPrice()
            })
        })
    }, getCollageList: function () {
        var n = this, t = {goods_id: n.data.paramData.detailID};
        _index.userModel.getShopCollageList(t).then(function (t) {
            var a = t.data, e = n.data.tmpTimes;
            e = [];
            var o = [];
            for (var i in a) 0 < a[i].left_number && o.push(a[i]);
            for (var r in o) {
                var d = o[r].left_time, s = parseInt(d / 24 / 60 / 60);
                s = 0 < s ? s + "天 " : "", e[r] = s + _xx_util2.default.formatTime(1e3 * d, "h小时m分钟"), 0 == d && (o.splice(r, 1), e.splice(r, 1)), n.setData({tmpTimes: e})
            }
            n.setData({collageList: o})
        })
    }, getShopAddTrolley: function (a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/ShopAddTrolley",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {goods_id: e.data.paramData.detailID, spe_price_id: e.data.spe_price_id, number: e.data.addNumber},
            success: function (t) {
                console.log("entry/wxapp/ShopAddTrolley ==>", t), t.data.errno || (1 == a && wx.showModal({
                    title: "",
                    content: "已成功加入购物车，快去看看吧",
                    cancelText: "继续选购",
                    confirmText: "查看已选",
                    success: function (t) {
                        t.confirm ? (e.toHideChoose(), wx.navigateTo({url: "/longbing_card/users/pages/shop/car/carIndex/carIndex"})) : t.cancel
                    }
                }), 2 == a && (e.setData({trolley_ids: t.data.data.id}), e.getToJumpUrl()))
            },
            fail: function (t) {
                console.log("entry/wxapp/ShopAddTrolley ==>  fail ==> ", t)
            }
        })
    }, swiperChange: function (t) {
        var a = t.detail.current;
        this.setData({swiperIndexCur: 1 * a + 1})
    }, toForwardRecord: function () {
        var t = {type: 2, to_uid: app.globalData.to_uid, target_id: this.data.paramData.detailID};
        app.util.request({
            url: "entry/wxapp/Forward",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: t,
            success: function (t) {
                t.data.errno
            },
            fail: function (t) {
            }
        })
    }, toCopyRecord: function (t) {
        app.util.request({
            url: "entry/wxapp/copyRecord",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {type: t, to_uid: app.globalData.to_uid},
            success: function (t) {
                t.data.errno
            },
            fail: function (t) {
            }
        })
    }, toGetShareInfo: function () {
        var e = this;
        wx.login({
            success: function (t) {
                var a = {
                    encryptedData: app.globalData.encryptedData,
                    iv: app.globalData.iv,
                    type: 3,
                    code: t.code,
                    to_uid: e.data.paramData.to_uid,
                    target_id: e.data.paramData.detailID
                };
                app.util.request({
                    url: "entry/wxapp/getShare",
                    cachetime: "30",
                    showLoading: !1,
                    method: "POST",
                    data: a,
                    success: function (t) {
                        t.data.errno || clearInterval(timer)
                    },
                    fail: function (t) {
                    }
                })
            }, fail: function (t) {
            }
        })
    }, getPhoneNumber: function (t) {
        if ("getPhoneNumber:ok" == t.detail.errMsg) {
            var a = t.detail.encryptedData, e = t.detail.iv;
            this.setPhoneInfo(a, e)
        } else t.detail.errMsg;
        this.checktoConsult()
    }, setPhoneInfo: function (t, a) {
        var o = this, e = {encryptedData: t, iv: a, to_uid: app.globalData.to_uid};
        _index.baseModel.getPhone(e).then(function (e) {
            _xx_util2.default.hideAll(), app.globalData.hasClientPhone = !0, app.globalData.auth.authPhoneStatus = !0, o.setData({
                "globalData.hasClientPhone": !0,
                "globalData.auth.authPhoneStatus": !0
            }, function () {
                if (e.data.phone) {
                    var t = wx.getStorageSync("userid"), a = wx.getStorageSync("user");
                    a.phone = e.data.phone, wx.setStorageSync("userid", t), wx.setStorageSync("user", a)
                }
            })
        })
    }, checkAuthStatus: function () {
        auth.checkAuth(this, _index.baseModel, _xx_util2.default)
    }, getAuthPhoneNumber: function (t) {
        auth.getAuthPhoneNumber(t)
    }, getUserInfo: function (t) {
        auth.getUserInfo(t), console.log("auth.getUserInfo(e)  *******************", t)
    }, checktoConsult: function () {
        0 == app.globalData.to_uid ? wx.showModal({
            title: "",
            content: "不能与默认客服进行对话哦！",
            confirmText: "知道啦",
            showCancel: !1,
            success: function (t) {
                t.confirm
            }
        }) : app.globalData.to_uid == wx.getStorageSync("userid") ? wx.showModal({
            title: "",
            content: "不能和自己进行对话哦！",
            confirmText: "知道啦",
            showCancel: !1,
            success: function (t) {
                t.confirm
            }
        }) : wx.navigateTo({url: "/longbing_card/chat/userChat/userChat?chat_to_uid=" + app.globalData.to_uid + "&contactUserName=" + app.globalData.nickName + "&goods_id=" + this.data.paramData.detailID})
    }, toShowChoose: function () {
        this.setData({bgStatus: !0, chooseNumStatus: !0})
    }, toHideChoose: function () {
        this.setData({bgStatus: !1, chooseStatus: !1, chooseNumStatus: !1})
    }, RemoveAddNum: function (t) {
        var a, e = this, o = t.currentTarget.dataset.status, i = e.data.addNumber, r = e.data.detailData.stock;
        if ("toCollagePay" == e.data.toOrderStatus && (a = e.data.tmpShowCheckNumber), "remove" == o) if ("toCollagePay" == e.data.toOrderStatus) {
            if (i < 1 * a + 1) return wx.showModal({
                title: "",
                content: "选择数量不能少于该拼团组合数量",
                confirmText: "知道啦",
                showCancel: !1,
                success: function (t) {
                    t.confirm
                }
            }), !1;
            i < 1 * r + 1 && (i = 1 * i - 1)
        } else {
            if (1 == i) return wx.showModal({
                title: "",
                content: "不能再少了",
                confirmText: "知道啦",
                showCancel: !1,
                success: function (t) {
                    t.confirm
                }
            }), !1;
            i < 1 * r + 1 && (i = 1 * i - 1)
        }
        if ("add" == o && 1 * r < (i = 1 * i + 1)) return wx.showModal({
            title: "",
            content: "库存不足，不能再添加了",
            confirmText: "知道啦",
            showCancel: !1,
            success: function (t) {
                t.confirm
            }
        }), !1;
        e.setData({addNumber: i}), e.toCountAddPrice()
    }, toCountAddPrice: function () {
        var t = this, a = t.data.addPrice;
        t.data.addNumber > parseInt(t.data.detailData.stock) && t.setData({addNumber: parseInt(t.data.detailData.stock)}), "toCollagePay" == t.data.toOrderStatus && (a = t.data.collageAddPrice), t.setData({countPrice: (1 * t.data.addNumber * (1 * a)).toFixed(2)})
    }, getCurrentCheckIdAndPrice: function () {
        var t = this, a = t.data.checkIDs, e = "";
        for (var o in a) e += a[o] + "-";
        e = e.slice(0, -1);
        var i = t.data.checkSpeList, r = t.data.detailData.spe_list, d = "";
        if (0 < r.length) {
            for (var s in i) d += r[s].sec[i[s]].title + "-";
            d = d.slice(0, -1)
        }
        var n, l, c, u, p = t.data.detailData.spe_price;
        if ("toCollagePay" == t.data.toOrderStatus) {
            var g = t.data.detailData.collage, h = t.data.rulesIndex;
            u = 1, c = g[h].price, l = g[h].spe_price_stock, console.log(l, "stock *************"), t.setData({
                collageAddPrice: c,
                shop_collageAddPrice: (c / 1e4).toFixed(2),
                addNumber: t.data.tmpShowCheckNumber
            })
        } else {
            for (var f in u = 0, p) e == p[f].spe_id_1 && (n = p[f].id, c = p[f].price, l = p[f].stock);
            t.setData({addPrice: c, shop_addPrice: (c / 1e4).toFixed(2)})
        }
        t.setData({
            tmpCheckIds: e,
            "detailData.stock": l,
            spe_price_id: n,
            tmpShowCheckID: u,
            spe_text: d
        }), t.toCountAddPrice()
    }, getToJumpUrl: function () {
        var t = this, a = t.data.toOrderStatus, e = "toOrder", o = t.data.detailData, i = !1;
        1 == o.is_self && (i = !0);
        var r = {
            count_price: t.data.countPrice,
            tmp_trolley_ids: t.data.trolley_ids,
            tmp_is_self: i,
            dataList: [{
                name: o.name,
                number: t.data.addNumber,
                goods_id: o.id,
                cover_true: o.cover_true,
                freight: o.freight,
                spe: t.data.spe_text,
                price2: t.data.addPrice,
                stock: o.stock,
                is_self: o.is_self
            }]
        };
        "toCollagePay" == a && (e = "toCollage", r.dataList[0].collage_id = t.data.tmpShowCheckCollageID, r.dataList[0].price2 = t.data.collageAddPrice), wx.setStorageSync("storageToOrder", r), t.toHideChoose(), wx.navigateTo({url: "/longbing_card/users/pages/shop/car/toOrder/toOrder?status=" + e})
    }, toJump: function (t) {
        var a = this, e = t.currentTarget.dataset.status, o = t.currentTarget.dataset.id,
            i = t.currentTarget.dataset.index, r = t.currentTarget.dataset.index1,
            d = t.currentTarget.dataset.paystatus;
        if ("toDetailJumpUrl" == e) app.util.goUrl(t); else if ("toCopyright" == e || "moreCollage" == e || "toReleaseCollage" == e) {
            if ("moreCollage" == e) {
                var s = {
                    name: (f = a.data.detailData).name,
                    unit: f.unit,
                    cover_true: f.cover_true,
                    collage_count: f.collage_count,
                    people: f.collage[a.data.rulesIndex].people,
                    number: f.collage[a.data.rulesIndex].number,
                    price: f.collage[a.data.rulesIndex].price,
                    oldPrice: f.price
                };
                wx.setStorageSync("moreCollageData", s)
            }
            app.util.goUrl(t)
        } else if ("toShop" == e) wx.reLaunch({url: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toShop"}); else if ("toConsult" == e) app.globalData.to_uid != wx.getStorageSync("userid") && a.toCopyRecord(8), 1 == a.data.globalData.hasClientPhone && a.checktoConsult(); else if ("toAddCar" == e || "toProductPay" == e || "toCollagePay" == e || "toOnlyPay" == e) a.setData({toOrderStatus: e}), a.toShowChoose(), a.getCurrentCheckIdAndPrice(); else if ("toPay" == e) {
            var n = a.data.toOrderStatus, l = "toOrder", c = a.data, u = c.addNumber, p = c.addPrice;
            if (u < 1) return wx.showModal({
                title: "",
                content: "请选择商品购买数量！",
                confirmText: "知道啦",
                showCancel: !1,
                success: function (t) {
                }
            }), !1;
            if (0 == p) return wx.showModal({
                title: "",
                content: "当前商品不支持购买！",
                confirmText: "知道啦",
                showCancel: !1,
                success: function (t) {
                }
            }), !1;
            if ("toAddCar" == n || "toAddCar" == d) a.getShopAddTrolley(1); else {
                n = a.data.toOrderStatus, l = "toOrder";
                var g = !1;
                1 == (f = a.data.detailData).is_self && (g = !0);
                var h = {
                    count_price: a.data.countPrice,
                    tmp_trolley_ids: a.data.trolley_ids,
                    tmp_is_self: g,
                    dataList: [{
                        name: f.name,
                        number: a.data.addNumber,
                        goods_id: f.id,
                        cover_true: f.cover_true,
                        freight: f.freight,
                        spe: a.data.spe_text,
                        price2: a.data.addPrice,
                        stock: f.stock,
                        is_self: f.is_self
                    }]
                };
                "toProductPay" != n && "toOnlyPay" != d || (h.dataList[0].spe_price_id = a.data.spe_price_id), "toCollagePay" == n && (l = "toCollage", h.dataList[0].collage_id = a.data.tmpShowCheckCollageID, h.dataList[0].price2 = a.data.collageAddPrice), wx.setStorageSync("storageToOrder", h), a.toHideChoose(), wx.navigateTo({url: "/longbing_card/users/pages/shop/car/toOrder/toOrder?status=" + l})
            }
        } else if ("chooseCollage" == e) a.setData({bgStatus: !0, chooseStatus: !0}); else if ("setrules" == e) {
            var f, _ = (f = a.data.detailData.collage)[i].spe_id_1, m = _.split("-"), D = [];
            for (var S in m) D.push(m[S]);
            var x = a.data.detailData.spe_list, w = [];
            for (var C in x) for (var b in x[C].sec) D[C] == x[C].sec[b].id && w.push(b);
            a.setData({
                rulesIndex: i,
                toOrderStatus: "toCollagePay",
                tmpShowCheckID: 1,
                collageAddPrice: f[i].price,
                shop_collageAddPrice: (f[i].price / 1e4).toFixed(2),
                "detailData.stock": f[i].spe_price_stock,
                addNumber: f[i].number,
                tmpShowCheckCollageID: f[i].id,
                tmpShowCheckNumber: f[i].number,
                checkIDs: D,
                checkSpeList: w,
                tmpCheckIds: _
            }), a.toCountAddPrice()
        } else if ("toCheckCur" == e) {
            x = a.data.checkSpeList;
            if (a.data.checkIDs[i] = o, x[i] = r, a.getCurrentCheckIdAndPrice(), a.setData({checkSpeList: x}), "toCollagePay" == a.data.toOrderStatus && (1 == a.data.tmpShowCheckID && a.setData({addNumber: a.data.tmpShowCheckNumber}), 0 == a.data.tmpShowCheckID)) return wx.showToast({
                icon: "none",
                title: "该组合没有参加拼团，请另选其他组合！",
                duration: 2e3
            }), !1
        }
    }, formSubmit: function (t) {
        var a = t.detail.formId, e = t.detail.target.dataset.status, o = t.detail.target.dataset.type;
        this.toSaveFormIds(a), "toCollection" == e || ("toShowShare" == e ? this.setData({showShareStatus: 1}) : "toCarIndex" == e ? wx.navigateTo({url: "/longbing_card/users/pages/shop/car/carIndex/carIndex"}) : "toMine" == e ? wx.navigateTo({url: "/longbing_card/users/pages/uCenter/index"}) : "toShareCard" == e && (this.setData({showShareStatus: 0}), 2 == o && wx.navigateTo({url: "/longbing_card/users/pages/shop/share/share"})))
    }, toSaveFormIds: function (t) {
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {formId: t},
            success: function (t) {
                t.data.errno
            },
            fail: function (t) {
            }
        })
    }
});
