Object.defineProperty(exports, "__esModule", {value: !0}), exports.uploadFile = exports.req = exports.fly = exports.tmpUrl = void 0;
var _xx_util = require("./xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util),
    _siteinfo = require("../../../siteinfo.js"), _siteinfo2 = _interopRequireDefault(_siteinfo);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {default: e}
}

var Fly = require("./wx.js"), fly = new Fly, tokenFly = new Fly, model_name = "longbing_card",
    tmpUrl = _siteinfo2.default.siteroot + "?i=" + _siteinfo2.default.uniacid + "&t=" + _siteinfo2.default.multiid + "&v=" + _siteinfo2.default.version + "&from=wxapp&c=entry&a=wxapp&m=" + model_name + "&do=";
Promise.prototype.finally = function (t) {
    var n = this.constructor;
    return this.then(function (e) {
        return n.resolve(t()).then(function () {
            return e
        })
    }, function (e) {
        return n.resolve(t()).then(function () {
            throw e
        })
    })
};
var tmp_time = 0, tmp_login_time = 0;
fly.config.timeout = 15e3, fly.config.headers = tokenFly.config.headers = {"content-type": "application/x-www-form-urlencoded"}, fly.interceptors.request.use(function (o) {
    o.body || (o.body = {});
    var e = wx.getStorageSync("userid"), t = o.url;
    if (!e && t.indexOf("configV3") < 0 && t.indexOf("ClientUnread") < 0) return fly.lock(), new Promise(function (n, e) {
        wx.login({
            success: function (e) {
                var t = e.code;
                t && n(t)
            }, fail: function () {
            }
        })
    }).then(function (e) {
        var t = tmpUrl + "login", n = {code: e};
        if (!(3 < ++tmp_login_time)) return tokenFly.post(t, n)
    }).then(function (e) {
        var t = getApp();
        if (e.data) {
            console.log(e.data, "xx_request.js    Login==>", tmp_login_time);
            var n = e.data, i = n.user_id, r = n.user;
            r && (wx.setStorageSync("user", r), r.phone && (t.globalData.hasClientPhone = !0)), o.body.user_id = i, t.globalData.userid = i, wx.setStorageSync("userid", i)
        }
    }).finally(function () {
        fly.unlock();
        var e = wx.getStorageSync("pid");
        if (e) {
            var t = e;
            fly.post(tmpUrl + "binduser", {from_id: t}).then(function () {
            })
        }
    }).then(function () {
        return fly.request(o)
    });
    e && (o.body.user_id = e)
}), tokenFly.interceptors.response.use(function (e) {
    _xx_util2.default.hideAll();
    var t = e.request.url;
    if (-2 == e.data.errno && -1 < t.indexOf("login") && 2 < tmp_login_time) {
        var n = e.data.message;
        -2 == e.data.errno && 2 == e.data.message && (-1 < (n = e.data.data.errmsg).indexOf("invalid appid,") && (n = "AppID填写错误 请检查后重填"), -1 < n.indexOf("invalid appsecret,") && (n = "AppSecret填写错误 请检查后重填")), -1 < n.indexOf("too many") && (n = "小程序数量超过限制"), _xx_util2.default.showModal({content: n})
    }
    return e.data
}, function (e) {
    _xx_util2.default.hideAll()
}), fly.interceptors.response.use(function (e) {
    _xx_util2.default.hideAll();
    var t = e.request.url;
    return -2 == e.data.errno && (-1 < t.indexOf("cardshow") || -1 < t.indexOf("cardafter") || -1 < t.indexOf("binduser") || -1 < t.indexOf("login") || -1 < t.indexOf("EditStaffV2") || -1 < t.indexOf("timelineDetail") || -1 < t.indexOf("modularInfo") || _xx_util2.default.showModal({content: e.data.message})), e.data
}, function (e) {
    _xx_util2.default.hideAll();
    var t = e.request.url;
    if (-1 < t.indexOf("configV3") || -1 < t.indexOf("cardshow")) {
        if (!(2 < ++tmp_time)) return fly.request(e.request);
        _xx_util2.default.networkError({msg: "当前网络异常"}), tmp_time = 0
    }
});
var uploadFile = function (t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = e.name,
        i = void 0 === n ? "file" : n, r = e.filePath, o = e.formData, l = void 0 === o ? {type: "picture"} : o;
    return t = tmpUrl + "" + t, new Promise(function (n, e) {
        wx.uploadFile({
            url: t, filePath: r, name: i, header: {}, formData: l, success: function (e) {
                if (200 == e.statusCode) {
                    var t = JSON.parse(e.data);
                    0 == t.errno ? n(t.data) : _xx_util2.default.showModal({content: "上传失败"})
                } else _xx_util2.default.showModal({content: "上传失败"})
            }, fail: function (e) {
                _xx_util2.default.showModal({content: "上传失败"}), wx.hideLoading()
            }, complete: function (e) {
            }
        })
    })
}, req = {
    post: function (n, i) {
        return n = tmpUrl + "" + n, new Promise(function (t, e) {
            fly.post(n, i).then(function (e) {
                0 != e.errno && -1 != e.errno && -2 != e.errno || t(e)
            })
        })
    }, get: function (n, i) {
        return n = tmpUrl + "" + n, new Promise(function (t, e) {
            fly.get(n, i).then(function (e) {
                0 != e.errno && -2 != e.errno || t(e)
            })
        })
    }
};
exports.tmpUrl = tmpUrl, exports.fly = fly, exports.req = req, exports.uploadFile = uploadFile;