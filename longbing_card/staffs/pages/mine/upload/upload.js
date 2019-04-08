var _weCropper = require("../../../../templates/we-cropper/we-cropper.js"),
    _weCropper2 = _interopRequireDefault(_weCropper);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {default: t}
}

var app = getApp();
Page({
    data: {cropperOpt: {id: "cropper", scale: 2.5, zoom: 8, cut: ""}}, touchStart: function (t) {
        this.wecropper.touchStart(t)
    }, touchMove: function (t) {
        this.wecropper.touchMove(t)
    }, touchEnd: function (t) {
        this.wecropper.touchEnd(t)
    }, getCropperImage: function () {
        var e = this;
        this.wecropper.getCropperImage(function (t) {
            t ? (app.util.showLoading(3), e.toUploadImgs(t)) : wx.showToast({
                icon: "none",
                title: "图片上传失败，请稍后重试！",
                duration: 2e3
            })
        })
    }, toUploadImgs: function (t) {
        var i = this;
        wx.uploadFile({
            url: this.data.uploadUrl, filePath: t, name: "upfile", formData: {}, success: function (t) {
                console.log(t, "获取图片成功 res");
                var e = JSON.parse(t.data), a = e.data.path, o = e.data.img, r = i.data.paramstatus,
                    p = i.data.cropperOpt.cardType;
                wx.hideLoading();
                var n = "/longbing_card/staffs/pages/mine/editInfo/editInfo?avatar=" + a + "&avatarImg=" + o + "&cardtype=" + p + "&status=" + r;
                "poster" == r && (n = "/longbing_card/users/pages/uCenter/poster/upload/upload?tmpPath=" + a + "&tmpImg=" + o + "&title=" + p), wx.redirectTo({url: n})
            }, fail: function (t) {
                wx.hideLoading(), console.log("获取图片失败，请稍后重试"), wx.showModal({
                    title: "",
                    content: "图片上传失败，请稍后重试",
                    confirmText: "重新上传",
                    cancelText: "重新选择",
                    success: function (t) {
                        if (t.confirm) {
                            var e = i.data.cropperOpt.src;
                            i.toUploadImgs(e)
                        } else t.cancel && i.uploadTap()
                    }
                })
            }
        })
    }, uploadTap: function () {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function (t) {
                var e = t.tempFilePaths[0];
                a.wecropper.pushOrign(e)
            },
            fail: function (t) {
                wx.showModal({
                    title: "",
                    content: "获取图片失败，请稍后重试",
                    confirmText: "知道啦",
                    showCancel: !1,
                    success: function (t) {
                        t.confirm || t.cancel
                    }
                })
            }
        })
    }, onLoad: function (t) {
        var e = "裁剪头像";
        "poster" == t.paramstatus && (e = "裁剪海报"), wx.setNavigationBarTitle({title: e});
        var a = this.data.cropperOpt, o = t.ratio, r = t.src, p = t.key;
        this.setData({key: p || ""});
        var n = wx.getSystemInfoSync(), i = n.windowWidth, c = n.windowHeight - 50,
            s = {x: .1 * i, y: (c - .8 * i * (o = o || 1)) / 2, width: .8 * i, height: .8 * i * o};
        this.setData({
            "cropperOpt.width": i,
            "cropperOpt.height": c,
            "cropperOpt.cut": s
        }), r && (a.src = t.src, a.cardType = t.cardtype, new _weCropper2.default(a).on("ready", function (t) {
        }).on("beforeImageLoad", function (t) {
            wx.showToast({title: "上传中", icon: "loading", duration: 2e4})
        }).on("imageLoad", function (t) {
            wx.hideToast()
        }).on("beforeDraw", function (t, e) {
        }).updateCanvas());
        var u = app.util.url("entry/wxapp/upload"), l = getCurrentPages();
        l.length && (l = l[getCurrentPages().length - 1]) && l.__route__ && (u = u + "&m=" + l.__route__.split("/")[0]), this.setData({
            uploadUrl: u,
            paramstatus: t.paramstatus,
            globalData: app.globalData,
            cropperOpt: a
        }), wx.hideLoading()
    }
});
