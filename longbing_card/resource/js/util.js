var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, _base = require("base64"), _md = require("md5"), _md2 = _interopRequireDefault(_md),
    _xx_request = require("./xx_request");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {default: e}
}

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e
}

var util = {};

function getQuery(e) {
    var t = [];
    if (-1 != e.indexOf("?")) for (var a = e.split("?")[1].split("&"), n = 0; n < a.length; n++) a[n].split("=")[0] && unescape(a[n].split("=")[1]) && (t[n] = {
        name: a[n].split("=")[0],
        value: unescape(a[n].split("=")[1])
    });
    return t
}

function getUrlParam(e, t) {
    var a = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), n = e.split("?")[1].match(a);
    return null != n ? unescape(n[2]) : null
}

function getSign(e, t, a) {
    var n = require("md5.js"), r = "", o = getUrlParam(e, "sign");
    if (o || t && t.sign) return !1;
    if (e && (r = getQuery(e)), t) {
        var i = [];
        for (var s in t) s && t[s] && (i = i.concat({name: s, value: t[s]}));
        r = r.concat(i)
    }
    r = _.sortBy(r, "name"), r = _.uniq(r, !0, "name");
    for (var u = "", c = 0; c < r.length; c++) r[c] && r[c].name && r[c].value && (u += r[c].name + "=" + r[c].value, c < r.length - 1 && (u += "&"));
    return o = n(u + (a = a || getApp().siteInfo.token))
}

util.base64_encode = function (e) {
    return (0, _base.base64_encode)(e)
}, util.base64_decode = function (e) {
    return (0, _base.base64_decode)(e)
}, util.md5 = function (e) {
    return (0, _md2.default)(e)
}, util.url = function (e, t) {
    var a = getApp(),
        n = a.siteInfo.siteroot + "?i=" + a.siteInfo.uniacid + "&t=" + a.siteInfo.multiid + "&v=" + a.siteInfo.version + "&from=wxapp&";
    if (e && ((e = e.split("/"))[0] && (n += "c=" + e[0] + "&"), e[1] && (n += "a=" + e[1] + "&"), e[2] && (n += "do=" + e[2] + "&")), t && "object" === (void 0 === t ? "undefined" : _typeof(t))) for (var r in t) r && t.hasOwnProperty(params) && t[r] && (n += r + "=" + t[r] + "&");
    return n
}, util.getSign = function (e, t, a) {
    return getSign(e, t, a)
}, util.getNewUrl = function (e) {
    var t = getApp(), a = getCurrentPages();
    return a.length && (a = a[getCurrentPages().length - 1]), e = t.siteInfo.siteroot + "?i=" + t.siteInfo.uniacid + "&t=" + t.siteInfo.multiid + "&v=" + t.siteInfo.version + "&from=wxapp&c=entry&a=wxapp&m=" + a.__route__.split("/")[0] + "&do=" + e
}, util.request = function (r) {
    var e = require("md5.js"), o = getApp();
    (r = r || {}).cachetime = r.cachetime ? r.cachetime : 0, r.hideLoading = void 0 === r.hideLoading || r.hideLoading;
    var i = r.url;
    if (-1 == i.indexOf("http://") && -1 == i.indexOf("https://") && (i = util.url(i)), getUrlParam(i, "state") || r.data && r.data.state || (i = i), !r.data || !r.data.m) {
        var t = getCurrentPages();
        t.length && (t = t[getCurrentPages().length - 1]) && t.__route__ && (i = i + "&m=" + t.__route__.split("/")[0])
    }
    if (!i) return !1;
    if (r.cachetime) {
        var a = e(i), n = wx.getStorageSync(a), s = Date.parse(new Date);
        if (n && n.data) {
            if (n.expire > s) return r.complete && "function" == typeof r.complete && r.complete(n), r.success && "function" == typeof r.success && r.success(n), console.log("cache:" + i), r.hideLoading && (wx.hideLoading(), wx.hideNavigationBarLoading()), !0;
            wx.removeStorageSync(a)
        }
    }
    var u = wx.getStorageSync("userid");
    if (o.globalData.userid = u) {
        var c;
        i = i;
        var l = r.data;
        l.user_id = u, l.scene = o.globalData.loginParam.scene, wx.request((_defineProperty(c = {
            url: i,
            data: l,
            header: r.header ? r.header : {},
            method: "POST"
        }, "header", {"content-type": "application/x-www-form-urlencoded"}), _defineProperty(c, "success", function (e) {
            if (r.hideLoading && (wx.hideNavigationBarLoading(), wx.hideLoading()), e.data.errno) {
                if (-2 == e.data.errno && wx.showModal({
                        title: "提示",
                        content: e.data.message,
                        showCancel: !1
                    }), r.fail && "function" == typeof r.fail) r.fail(e); else if (e.data.message) {
                    if (null != e.data.data && e.data.data.redirect) var t = e.data.data.redirect; else t = "";
                    o.util.message(e.data.message, t, "error")
                }
            } else r.success && "function" == typeof r.success && r.success(e)
        }), _defineProperty(c, "fail", function (e) {
            r.hideLoading && (wx.hideNavigationBarLoading(), wx.hideLoading());
            var t = require("md5.js")(i), a = wx.getStorageSync(t);
            if (a && a.data) return r.success && "function" == typeof r.success && r.success(a), console.log("failreadcache:" + i), !0;
            r.fail && "function" == typeof r.fail && r.fail(e)
        }), _defineProperty(c, "complete", function (e) {
            r.complete && "function" == typeof r.complete && r.complete(e)
        }), c))
    } else {
        var d = o.siteInfo.siteroot + "?i=" + o.siteInfo.uniacid + "&t=" + o.siteInfo.multiid + "&v=" + o.siteInfo.version + "&from=wxapp&c=entry&a=wxapp&do=" + "login&m=" + t.__route__.split("/")[0];
        wx.login({
            success: function (e) {
                var t, a = wx.getStorageSync("fromID");
                0 < a.length && (n.from_id = a);
                var n = {
                    code: e.code,
                    scene: o.globalData.loginParam.scene,
                    is_qr: o.globalData.loginParam.is_qr,
                    is_group: o.globalData.loginParam.is_group,
                    type: o.globalData.loginParam.type,
                    target_id: o.globalData.loginParam.target_id,
                    encryptedData: o.globalData.encryptedData,
                    iv: o.globalData.iv
                };
                wx.request((_defineProperty(t = {
                    url: d,
                    data: n,
                    header: {},
                    method: "POST"
                }, "header", {"content-type": "application/x-www-form-urlencoded"}), _defineProperty(t, "success", function (e) {
                    if (wx.hideNavigationBarLoading(), e.data.errno) return !1;
                    var t, a = r.data;
                    a.user_id = e.data.data.user_id, wx.setStorageSync("userid", e.data.data.user_id), console.log("userid    **************", a, wx.getStorageSync("userid")), wx.setStorageSync("user", e.data.data.user), o.globalData.userid = e.data.data.user_id, e.data.data.user.phone && (o.globalData.hasClientPhone = !0), i = i, wx.request((_defineProperty(t = {
                        url: i,
                        data: a,
                        header: r.header ? r.header : {},
                        method: "POST"
                    }, "header", {"content-type": "application/x-www-form-urlencoded"}), _defineProperty(t, "success", function (e) {
                        if (wx.hideNavigationBarLoading(), e.data.errno) {
                            if (r.fail && "function" == typeof r.fail) r.fail(e); else if (e.data.message) {
                                if (null != e.data.data && e.data.data.redirect) var t = e.data.data.redirect; else t = "";
                                o.util.message(e.data.message, t, "error")
                            }
                        } else r.success && "function" == typeof r.success && r.success(e)
                    }), _defineProperty(t, "fail", function (e) {
                        wx.hideNavigationBarLoading();
                        var t = require("md5.js")(i), a = wx.getStorageSync(t);
                        if (a && a.data) return r.success && "function" == typeof r.success && r.success(a), console.log("failreadcache:" + i), !0;
                        r.fail && "function" == typeof r.fail && r.fail(e)
                    }), _defineProperty(t, "complete", function (e) {
                        r.complete && "function" == typeof r.complete && r.complete(e)
                    }), t))
                }), _defineProperty(t, "fail", function (e) {
                }), _defineProperty(t, "complete", function (e) {
                    console.log("login complete", e)
                }), t))
            }
        })
    }
}, util.getUserInfo = function (a) {
    var e = function () {
        console.log("start login");
        var t = {sessionid: "", wxInfo: "", memberInfo: ""};
        wx.login({
            success: function (e) {
                util.request({
                    url: "auth/session/openid", data: {code: e.code}, cachetime: 0, success: function (e) {
                        e.data.errno || (t.sessionid = e.data.data.sessionid, wx.setStorageSync("userInfo", t), wx.getUserInfo({
                            success: function (e) {
                                t.wxInfo = e.userInfo, wx.setStorageSync("userInfo", t), util.request({
                                    url: "auth/session/userinfo",
                                    data: {
                                        signature: e.signature,
                                        rawData: e.rawData,
                                        iv: e.iv,
                                        encryptedData: e.encryptedData
                                    },
                                    method: "POST",
                                    header: {"content-type": "application/x-www-form-urlencoded"},
                                    cachetime: 0,
                                    success: function (e) {
                                        e.data.errno || (t.memberInfo = e.data.data, wx.setStorageSync("userInfo", t)), "function" == typeof a && a(t)
                                    }
                                })
                            }, fail: function () {
                                "function" == typeof a && a(t)
                            }, complete: function () {
                            }
                        }))
                    }
                })
            }, fail: function () {
                wx.showModal({
                    title: "获取信息失败", content: "请允许授权以便为您提供给服务", success: function (e) {
                        e.confirm && util.getUserInfo()
                    }
                })
            }
        })
    }, t = wx.getStorageSync("userInfo");
    t.sessionid ? wx.checkSession({
        success: function () {
            "function" == typeof a && a(t)
        }, fail: function () {
            t.sessionid = "", console.log("relogin"), wx.removeStorageSync("userInfo"), e()
        }
    }) : e()
}, util.navigateBack = function (t) {
    var e = t.delta ? t.delta : 1;
    if (t.data) {
        var a = getCurrentPages(), n = a[a.length - (e + 1)];
        n.pageForResult ? n.pageForResult(t.data) : n.setData(t.data)
    }
    wx.navigateBack({
        delta: e, success: function (e) {
            "function" == typeof t.success && t.success(e)
        }, fail: function (e) {
            "function" == typeof t.fail && t.fail(e)
        }, complete: function () {
            "function" == typeof t.complete && t.complete()
        }
    })
}, util.footer = function (e) {
    var t = e, a = getApp().tabBar;
    for (var n in a.list) a.list[n].pageUrl = a.list[n].pagePath.replace(/(\?|#)[^"]*/g, "");
    t.setData({tabBar: a, "tabBar.thisurl": t.__route__})
}, util.message = function (e, t, a) {
    if (!e) return !0;
    if ("object" == (void 0 === e ? "undefined" : _typeof(e)) && (t = e.redirect, a = e.type, e = e.title), t) {
        var n = t.substring(0, 9), r = "", o = "";
        "navigate:" == n ? (o = "navigateTo", r = t.substring(9)) : "redirect:" == n ? (o = "redirectTo", r = t.substring(9)) : (r = t, o = "redirectTo")
    }
    a || (a = "success"), "success" == a ? wx.showToast({
        title: e,
        icon: "success",
        duration: 2e3,
        mask: !!r,
        complete: function () {
            r && setTimeout(function () {
                wx[o]({url: r})
            }, 1800)
        }
    }) : "error" == a && wx.showModal({
        title: "", content: e, showCancel: !1, complete: function () {
            r && wx[o]({url: r})
        }
    })
}, util.user = util.getUserInfo, util.showLoading = function (e) {
    var t;
    1 == e && (t = "加载中"), 2 == e && (t = "数据删除中"), 3 == e && (t = "图片上传中"), 4 == e && (t = "海报生成中"), wx.showLoading({
        title: t,
        mask: !0
    })
}, util.showImage = function (e) {
    var t = e ? e.currentTarget.dataset.preview : "";
    if (!t) return !1;
    wx.previewImage({urls: [t]})
}, util.parseContent = function (e) {
    if (!e) return e;
    var t = e.match(new RegExp(["\ud83c[\udf00-\udfff]", "\ud83d[\udc00-\ude4f]", "\ud83d[\ude80-\udeff]"].join("|"), "g"));
    if (t) for (var a in t) e = e.replace(t[a], "[U+" + t[a].codePointAt(0).toString(16).toUpperCase() + "]");
    return e
}, util.date = function () {
    this.isLeapYear = function (e) {
        return 0 == e.getYear() % 4 && (e.getYear() % 100 != 0 || e.getYear() % 400 == 0)
    }, this.dateToStr = function (e, t) {
        e = e || "yyyy-MM-dd HH:mm:ss", t = t || new Date;
        var a = e;
        return a = (a = (a = (a = (a = (a = (a = (a = (a = (a = (a = (a = (a = a.replace(/yyyy|YYYY/, t.getFullYear())).replace(/yy|YY/, 9 < t.getYear() % 100 ? (t.getYear() % 100).toString() : "0" + t.getYear() % 100)).replace(/MM/, 9 < t.getMonth() + 1 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1))).replace(/M/g, t.getMonth())).replace(/w|W/g, ["日", "一", "二", "三", "四", "五", "六"][t.getDay()])).replace(/dd|DD/, 9 < t.getDate() ? t.getDate().toString() : "0" + t.getDate())).replace(/d|D/g, t.getDate())).replace(/hh|HH/, 9 < t.getHours() ? t.getHours().toString() : "0" + t.getHours())).replace(/h|H/g, t.getHours())).replace(/mm/, 9 < t.getMinutes() ? t.getMinutes().toString() : "0" + t.getMinutes())).replace(/m/g, t.getMinutes())).replace(/ss|SS/, 9 < t.getSeconds() ? t.getSeconds().toString() : "0" + t.getSeconds())).replace(/s|S/g, t.getSeconds())
    }, this.dateAdd = function (e, t, a) {
        switch (a = a || new Date, e) {
            case"s":
                return new Date(a.getTime() + 1e3 * t);
            case"n":
                return new Date(a.getTime() + 6e4 * t);
            case"h":
                return new Date(a.getTime() + 36e5 * t);
            case"d":
                return new Date(a.getTime() + 864e5 * t);
            case"w":
                return new Date(a.getTime() + 6048e5 * t);
            case"m":
                return new Date(a.getFullYear(), a.getMonth() + t, a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
            case"y":
                return new Date(a.getFullYear() + t, a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds())
        }
    }, this.dateDiff = function (e, t, a) {
        switch (e) {
            case"s":
                return parseInt((a - t) / 1e3);
            case"n":
                return parseInt((a - t) / 6e4);
            case"h":
                return parseInt((a - t) / 36e5);
            case"d":
                return parseInt((a - t) / 864e5);
            case"w":
                return parseInt((a - t) / 6048e5);
            case"m":
                return a.getMonth() + 1 + 12 * (a.getFullYear() - t.getFullYear()) - (t.getMonth() + 1);
            case"y":
                return a.getFullYear() - t.getFullYear()
        }
    }, this.strToDate = function (dateStr) {
        var data = dateStr, reCat = /(\d{1,4})/gm, t = data.match(reCat);
        return t[1] = t[1] - 1, eval("var d = new Date(" + t.join(",") + ");"), d
    }, this.strFormatToDate = function (e, t) {
        var a = 0, n = -1, r = t.length;
        -1 < (n = e.indexOf("yyyy")) && n < r && (a = t.substr(n, 4));
        var o = 0;
        -1 < (n = e.indexOf("MM")) && n < r && (o = parseInt(t.substr(n, 2)) - 1);
        var i = 0;
        -1 < (n = e.indexOf("dd")) && n < r && (i = parseInt(t.substr(n, 2)));
        var s = 0;
        (-1 < (n = e.indexOf("HH")) || 1 < (n = e.indexOf("hh"))) && n < r && (s = parseInt(t.substr(n, 2)));
        var u = 0;
        -1 < (n = e.indexOf("mm")) && n < r && (u = t.substr(n, 2));
        var c = 0;
        return -1 < (n = e.indexOf("ss")) && n < r && (c = t.substr(n, 2)), new Date(a, o, i, s, u, c)
    }, this.dateToLong = function (e) {
        return e.getTime()
    }, this.longToDate = function (e) {
        return new Date(e)
    }, this.isDate = function (e, t) {
        null == t && (t = "yyyyMMdd");
        var a = t.indexOf("yyyy");
        if (-1 == a) return !1;
        var n = e.substring(a, a + 4), r = t.indexOf("MM");
        if (-1 == r) return !1;
        var o = e.substring(r, r + 2), i = t.indexOf("dd");
        if (-1 == i) return !1;
        var s = e.substring(i, i + 2);
        return !(!isNumber(n) || "2100" < n || n < "1900") && (!(!isNumber(o) || "12" < o || o < "01") && !(s > getMaxDay(n, o) || s < "01"))
    }, this.getMaxDay = function (e, t) {
        return 4 == t || 6 == t || 9 == t || 11 == t ? "30" : 2 == t ? e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? "29" : "28" : "31"
    }, this.isNumber = function (e) {
        return /^\d+$/g.test(e)
    }, this.toArray = function (e) {
        e = e || new Date;
        var t = Array();
        return t[0] = e.getFullYear(), t[1] = e.getMonth(), t[2] = e.getDate(), t[3] = e.getHours(), t[4] = e.getMinutes(), t[5] = e.getSeconds(), t
    }, this.datePart = function (e, t) {
        t = t || new Date;
        var a = "";
        switch (e) {
            case"y":
                a = t.getFullYear();
                break;
            case"M":
                a = t.getMonth() + 1;
                break;
            case"d":
                a = t.getDate();
                break;
            case"w":
                a = ["日", "一", "二", "三", "四", "五", "六"][t.getDay()];
                break;
            case"ww":
                a = t.WeekNumOfYear();
                break;
            case"h":
                a = t.getHours();
                break;
            case"m":
                a = t.getMinutes();
                break;
            case"s":
                a = t.getSeconds()
        }
        return a
    }, this.maxDayOfDate = function (e) {
        (e = e || new Date).setDate(1), e.setMonth(e.getMonth() + 1);
        var t = e.getTime() - 864e5;
        return new Date(t).getDate()
    }
}, util.getHostname = function (e) {
    var t = /^http(s)?:\/\/(.*?)\//;
    return e.replace(t, "Host/"), e = t.exec(e)[2], console.log(e), e
}, util.promisify = function (r) {
    return function (a) {
        for (var e = arguments.length, n = Array(1 < e ? e - 1 : 0), t = 1; t < e; t++) n[t - 1] = arguments[t];
        return new Promise(function (e, t) {
            r.apply(void 0, [Object.assign({}, a, {success: e, fail: t})].concat(n))
        })
    }
}, util.getData = function (e) {
    return e.currentTarget.dataset
}, util.getFromData = function (e) {
    return e.detail.target.dataset
}, util.goUrl = function (e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? util.getFromData(e) : util.getData(e),
        a = t.url, n = t.method, r = t.name;
    if (n = n || "navigateTo", a) if (-1 < a.indexOf("_COPY_DEEP_XX")) {
        a = a.split("_COPY_DEEP_XX")[1];
        /^\d{7,23}$/.test(a) ? (console.log("纯数字"), wx.showActionSheet({
            itemList: ["呼叫", "复制", "添加到手机通讯录"],
            success: function (e) {
                0 == e.tapIndex ? (console.log("呼叫"), wx.makePhoneCall({phoneNumber: a})) : 1 == e.tapIndex ? (console.log("复制"), wx.setClipboardData({
                    data: a,
                    success: function (e) {
                        console.log(e), wx.getClipboardData({
                            success: function (e) {
                                console.log("复制文本成功 ==>>", e.data)
                            }
                        })
                    }
                })) : 2 == e.tapIndex && (console.log("添加到手机通讯录"), wx.addPhoneContact({
                    firstName: r,
                    mobilePhoneNumber: a,
                    success: function (e) {
                        console.log("添加到手机通讯录 ==> ", e)
                    },
                    fail: function (e) {
                        console.log("添加到手机通讯录fail ==> ", e)
                    }
                }))
            }
        })) : (console.log("纯文本"), wx.setClipboardData({
            data: a, success: function (e) {
                wx.getClipboardData({
                    success: function (e) {
                        console.log("复制文本成功 ==>>", e.data)
                    }
                })
            }
        }))
    } else {
        if (-1 < a.indexOf("toCopy:")) return a = a.split(":")[1], void wx.setClipboardData({
            data: a,
            success: function (e) {
                wx.getClipboardData({
                    success: function (e) {
                        console.log("复制文本成功 ==>>", e.data)
                    }
                })
            }
        });
        if (-1 < a.indexOf("tel:")) wx.makePhoneCall({phoneNumber: a.split(":")[1]}); else {
            if (-1 < a.indexOf("http")) return a = encodeURIComponent(a), void wx.navigateTo({url: "/longbing_card/common/webview/webview?url=" + a});
            if (0 == a.indexOf("wx")) {
                var o, i = "", s = "release", u = a.split(":");
                return 1 == u.length ? o = u[0] : 2 == u.length ? (o = u[0], i = u[1]) : 3 == u.length && (o = u[0], i = u[1], s = u[2]), void wx.navigateToMiniProgram({
                    appId: o,
                    path: i,
                    extraData: {lb: "longbing"},
                    envVersion: s,
                    success: function (e) {
                    }
                })
            }
            wx[n]({url: a})
        }
    }
}, module.exports = util;