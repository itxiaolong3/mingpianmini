var _xx_util = require("../../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util),
    _request = require("../../../../resource/js/request"), _request2 = _interopRequireDefault(_request),
    _index = require("../../../../resource/apis/index.js");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {default: e}
}

var app = getApp();
Page({
    imagePath: "", data: {template: {}}, onLoad: function (e) {
        app.util.showLoading(4);
        var t = getCurrentPages(), r = t[t.length - 2].__data__;
        if (!r){
            console.log('为空')
            r=t[t.length - 2].data;
        }
        console.log("prevPage", t);
        var a = app.globalData.to_uid, o = (app.globalData.isIphoneX, r.cardIndexData.info), i = o.job,
            n = o.myCompany.name;
        17 < i.length && (i = i.slice(0, 17) + "..."), 35 < n.length && (n = n.slice(0, 35) + "..."), wx.hideShareMenu();
        var p = {
            width: "750rpx",
            height: "800rpx",
            background: "#ffffff",
            views: [{
                type: "image",
                url: "/longbing_card/resource/images/icon-shareimg.png",
                css: {top: "20rpx", left: "8rpx", width: "734rpx", height: "460rpx", rotate: 0, borderRadius: 0}
            }, {
                type: "rect",
                css: {
                    top: "100rpx",
                    left: "80rpx",
                    color: "#e0e0e1",
                    borderRadius: "96rpx",
                    borderWidth: 0,
                    width: "96rpx",
                    height: "96rpx"
                }
            }, {
                type: "image",
                url: r.cardIndexData.info.avatar,
                css: {top: "96rpx", left: "80rpx", width: "96rpx", height: "96rpx", rotate: 0, borderRadius: "96rpx"}
            }, {
                type: "text",
                text: r.cardIndexData.info.name,
                css: {
                    fontSize: "30rpx",
                    top: "100rpx",
                    left: "206rpx",
                    color: "#000000",
                    textDecoration: "none",
                    align: "left",
                    width: "480rpx"
                }
            }, {
                type: "text",
                text: i,
                css: {
                    fontSize: "26rpx",
                    top: "140rpx",
                    left: "206rpx",
                    color: "#969696",
                    textDecoration: "none",
                    align: "left",
                    width: "480rpx"
                }
            }, {
                type: "text",
                text: n,
                css: {
                    fontSize: "26rpx",
                    top: "175rpx",
                    left: "206rpx",
                    color: "#969696",
                    textDecoration: "none",
                    align: "left",
                    width: "480rpx"
                }
            }, {
                type: "text",
                text: r.cardIndexData.info.phone,
                css: {
                    fontSize: "26rpx",
                    top: "260rpx",
                    left: "80rpx",
                    color: "#969696",
                    textDecoration: "none",
                    align: "left",
                    width: "600rpx"
                }
            }, {
                type: "text",
                text: r.cardIndexData.info.wechat,
                css: {
                    fontSize: "26rpx",
                    top: "300rpx",
                    left: "80rpx",
                    color: "#969696",
                    textDecoration: "none",
                    align: "left",
                    width: "600rpx"
                }
            },
              {
                type: "text",
                text: r.cardIndexData.info.company,
                css: {
                  fontSize: "26rpx",
                  top: "340rpx",
                  left: "80rpx",
                  color: "#969696",
                  textDecoration: "none",
                  align: "left",
                  width: "580rpx"
                }
              }, 
               {
                type: "text",
                //text: r.cardIndexData.info.myCompany.addrMore,
                text: r.cardIndexData.info.comaddre,
                css: {
                    fontSize: "26rpx",
                    top: "380rpx",
                    left: "80rpx",
                    color: "#969696",
                    textDecoration: "none",
                    align: "left",
                    width: "580rpx"
                }
            }, {
                type: "image",
                url: r.cardIndexData.qr,
                css: {top: "520rpx", left: "80rpx", width: "220rpx", height: "220rpx", rotate: 0, borderRadius: 0}
            }, {
                type: "image",
                url: "/longbing_card/resource/images/icon-fingerprint.png",
                css: {top: "520rpx", left: "460rpx", width: "160rpx", height: "160rpx", rotate: 0, borderRadius: 0}
            }, {
                type: "text",
                text: "扫描或长按识别 收下名片",
                css: {
                    fontSize: "26rpx",
                    top: "710rpx",
                    left: "403rpx",
                    color: "#969696",
                    textDecoration: "none",
                    align: "left",
                    width: "300rpx"
                }
            }]
        };
        this.setData({template: p, to_uid: a, globalData: app.globalData})
    }, onReady: function () {
    }, onShow: function () {
    }, onHide: function () {
    }, onUnload: function () {
    }, onPullDownRefresh: function () {
    }, onReachBottom: function () {
    }, onShareAppMessage: function (e) {
        var t = getCurrentPages(), r = t[t.length - 2].__viewData__.cardIndexData;
        e.from, this.getShareRecord(), r.to_uid != wx.getStorageSync("userid") && this.getForwardRecord(1, 0);
        var a = Date.now(), o = r.share_img;
        return o && "cardType1" != r.info.card_type && "cardType4" != r.info.card_type || (o = r.info.avatar_2), o = o + "?" + a, {
            title: r.info.share_text,
            path: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard",
            imageUrl: o
        }
    }, onImgOK: function (e) {
        this.setData({imagePath: e.detail.path}), wx.hideLoading(), console.log(e)
    }, previewImage: function () {
        var e = this.data.imagePath, t = [];
        t.push(e), wx.previewImage({current: e, urls: t})
    }, getForwardRecord: function (e, t) {
        var r = {type: e, to_uid: app.globalData.to_uid};
        2 != e && 3 != e || (r.target_id = t), _index.userModel.getForwardRecord(r).then(function (e) {
            _xx_util2.default.hideAll()
        })
    }, getShareRecord: function () {
        var e = {to_uid: app.globalData.to_uid};
        _index.userModel.getShareRecord(e).then(function (e) {
            _xx_util2.default.hideAll()
        })
    }, getCopyRecord: function (e) {
        var t = {type: 10, to_uid: app.globalData.to_uid};
        _index.userModel.getCopyRecord(t).then(function (e) {
            _xx_util2.default.hideAll()
        })
    }, saveImage: function () {
        var r = this;
        wx.authorize({
            scope: "scope.writePhotosAlbum", success: function (e) {
                wx.saveImageToPhotosAlbum({
                    filePath: r.data.imagePath, success: function (e) {
                        app.globalData.to_uid != wx.getStorageSync("userid") && r.getCopyRecord(), console.log("保存名片成功 ==>", e), wx.showToast({
                            icon: "none",
                            title: "名片海报保存成功，快去相册看看吧！",
                            duration: 2e3
                        })
                    }, fail: function (e) {
                        console.log("fail ==> ", e)
                    }
                })
            }, fail: function (e) {
                var t = e.errMsg;
                (-1 < t.indexOf("fail auth deny") || -1 < t.indexOf("fail:auth deny")) && r.setData({isSetting: !0})
            }
        })
    }
});
