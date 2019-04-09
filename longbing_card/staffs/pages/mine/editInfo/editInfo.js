var _xx_util = require("../../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util),
    _index = require("../../../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {default: a}
}

var app = getApp(), recorderManager = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext(),
    auth = require("../../../../templates/auth/auth.js");
Page({
    data: {
        color: "23,162,52",
        currentTags: 0,
        showAddUseSec: !1,
        textAreaFocus: !1,
        showTextArea: !1,
        cardTypeImgList: ["https://retail.xiaochengxucms.com/images/12/2018/11/Yg7rq8Y1CBi2S1R7s2c22TEcqrshCT.png", "https://retail.xiaochengxucms.com/images/12/2018/11/Lb6BO6B7b2M67O64d6b4b2b776Bd6O.png", "https://retail.xiaochengxucms.com/images/12/2018/11/nR22ZLhs8lQoX77DQX1fJ97fc7Ryzl.png"],
        cardTypeList: ["cardType1", "cardType4", "cardType2"],
        cardTypeIndex: 0,
        job: -1,
        company: -1,
        firstCreate: 0,
        playPushStatus: 1,
        startPushStatus: 1,
        recordAuthMethod: 1,
        globalData: {},
        uploadUrl: "",
        imgCountNum: 8,
        tempRecordFilePath: "",
        tempRecordFileTime: "",
        recordStatusText: "开始录音 按住说话",
        staffInfo: {images: []},
        currentIndex: 0,
        staffInfoAvatar: "",
        staffInfoImages: [],
        recordStatus: !0,
        icon_voice_png: "https://retail.xiaochengxucms.com/images/12/2018/11/IgvvwVNUIVn6UMh4Dmh4m6nM4Widug.png",
        icon_voice_gif: "https://retail.xiaochengxucms.com/images/12/2018/11/CRFPPPTKf6f45J6H3N44BNCrjbFZxH.gif",
        settingNum: 0,
        start: !1,
        play: !1,
        companylogo:'',
        wxqrcode:''
    }, onLoad: function (a) {
        var o = this;
        app.util.showLoading(1), wx.hideShareMenu(), o.getStaffCard(a);
        var t = "";
        o.data.staffInfo.voice ? t = "重新录音 按住说话" : o.data.staffInfo.voice || (t = "开始录音 按住说话");
        var e = app.util.url("entry/wxapp/upload"), n = getCurrentPages();
        n.length && (n = n[getCurrentPages().length - 1]) && n.__route__ && (e = e + "&m=" + n.__route__.split("/")[0]);
        var i = 0;
        if (app.globalData.configInfo.my_company) for (var s in app.globalData.configInfo.company_list) app.globalData.configInfo.my_company.id == app.globalData.configInfo.company_list[s].id && (i = s);
        a.status && o.setData({paramStatus: a.status}), o.setData({
            recordStatusText: t,
            uploadUrl: e,
            company: i,
            globalData: app.globalData
        }), wx.hideLoading(), recorderManager.onStart(function () {
            console.log("开始录音"), o.setData({start: !0, record_status: 1})
        }), recorderManager.onStop(function (a) {
            console.log("结束录音", a);
            var t = a.tempFilePath, e = a.duration;
            o.setData({
                start: !1,
                record_status: 2,
                showTostImg: !1,
                "staffInfo.voice": t,
                "staffInfo.voice_time": (e / 1e3).toFixed(0)
            }), innerAudioContext.src = t
        }), recorderManager.onError(function (a) {
            console.log("录音异常");
            a.errMsg
        }), innerAudioContext.onPlay(function () {
            console.log("开始播放"), o.setData({play: !0})
        }), innerAudioContext.onStop(function (a) {
            console.log("结束播放"), o.setData({play: !1, record_status: 2})
        }), innerAudioContext.onEnded(function (a) {
            console.log("结束播放"), o.setData({play: !1, record_status: 2})
        })
    }, onReady: function () {
    }, onShow: function () {
        this.checkAuthStatus()
    }, onHide: function () {
        1 == this.data.record_status && this.end()
    }, onUnload: function () {
        1 == this.data.record_status && this.end()
    }, onPullDownRefresh: function () {
        wx.showNavigationBarLoading()
    }, onReachBottom: function () {
    }, onPageScroll: function (a) {
    }, onShareAppMessage: function (a) {
    }, checkAuthStatus: function () {
        auth.checkAuth(this, _index.baseModel, _xx_util2.default)
    }, getUserInfo: function (a) {
        auth.getUserInfo(a)
    }, bindInputName: function (a) {
        this.setData({"cardIndexData.info.name": a.detail.value})
    }, bindInputJob: function (a) {
        this.setData({"cardIndexData.info.job": a.detail.value})
    }, bindInputPhone: function (a) {
        this.setData({"cardIndexData.info.phone": a.detail.value})
    }, bindInputPhone2: function (a) {
        this.setData({"cardIndexData.info.phone2": a.detail.value})
    }, bindInputEmail: function (a) {
        this.setData({"cardIndexData.info.email": a.detail.value})
    }, bindInputCompany: function (a) {
        this.setData({"cardIndexData.info.company": a.detail.value})
    },bindInputCompany2: function (a) {
        this.setData({"cardIndexData.info.company2": a.detail.value})
    },bindInputCompany3: function (a) {
        this.setData({"cardIndexData.info.company3": a.detail.value})
    },bindInputcomaddre: function (a) {
        this.setData({"cardIndexData.info.comaddre": a.detail.value})
    }, pickerSelected: function (a) {
        var t = this, e = a.currentTarget.dataset.status;
        // if ("job" == e) {
        //     var o = t.data.staffInfo.jobList;
        //     t.setData({job: a.detail.value, "cardIndexData.info.job_name": o[a.detail.value].name})
        // }
        // if ("address" == e) {
        //     var n = a.detail.value, i = t.data.globalData.configInfo.company_list;
        //     t.setData({
        //         company: n,
        //         "cardIndexData.info.myCompany.logo": i[n].logo,
        //         "cardIndexData.info.myCompany.addr": i[n].addr,
        //         "cardIndexData.info.myCompany.name": i[n].name,
        //         "cardIndexData.info.myCompany.short_name": i[n].short_name
        //     })
        // }
    }, getCardIndexData: function () {
        var e = this;
        _xx_util2.default.showLoading();
        var a = {to_uid: wx.getStorageSync("userid")};
        _index.userModel.getCardShow(a).then(function (a) {
            _xx_util2.default.hideAll();
            var t = a.data;
            t.thumbs_up2 = t.thumbs_up + 1 * t.info.t_number, t.peoples2 = t.peoples + 1 * t.info.view_number, e.setData({cardIndexData: t}, function () {
                e.getTagsList()
            })
        })
    }, getStaffCard: function (u) {
        var l = this;
        wx.showLoading({title: "加载中"}), app.util.request({
            url: "entry/wxapp/StaffCard",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function (a) {
                if (console.log("StaffCard ==>", a), !a.data.errno) {
                    var t = a.data.data.count, e = l.data.staffInfoImages;
                    for (var o in t.images) t.images[o] || t.images.splice(o, 1), 0 < t.images.length && e.push(t.images[o]);
                    var n = 0;
                    t.id || (n = 1);
                    var i = "";
                    u.avatar && (t.avatar = u.avatar, i = u.avatarImg, t.card_type = u.cardtype);
                    var s = l.data.globalData.configInfo.my_company;
                    s || (s = l.data.globalData.configInfo.company_list[l.data.company]), t.card_type || (t.card_type = "cardType1");
                    var r = l.data, d = r.cardTypeIndex, f = r.cardTypeList;
                    for (var c in f) t.card_type == f[c] && (d = c);
                    l.setData({
                        firstCreate: n,
                        job: a.data.data.job_index,
                        staffInfoImages: e,
                        staffInfo: t,
                        cardTypeIndex: d,
                        "staffInfo.jobList": a.data.data.job_list,
                        staffInfoAvatar: i,
                        imgCountNum: 8 - e.length,
                        "cardIndexData.info.myCompany.logo": s.logo,
                        "cardIndexData.info.myCompany.name": s.name,
                        "cardIndexData.info.myCompany.short_name": s.short_name,
                        "cardIndexData.info.myCompany.addr": s.addr,
                        "cardIndexData.info.avatar_2": t.avatar,
                        "cardIndexData.info.name": t.name,
                        "cardIndexData.info.job": t.job,
                        "cardIndexData.info.phone": t.phone,
                        "cardIndexData.info.phone2": t.phone2,
                        "cardIndexData.info.email": t.email,
                        "cardIndexData.info.company": t.company,
                        "cardIndexData.info.company2": t.company2,
                        "cardIndexData.info.company3": t.company3,
                        "cardIndexData.info.comaddre": t.comaddre,
                        companylogo:t.companylogo,
                        wxqrcode:t.wxqrcode,
                        "cardIndexData.info.job_name": a.data.data.job_list[a.data.data.job_index].name
                    }, function () {
                        "1" != t.is_staff || u.avatar || l.getCardIndexData()
                    })
                }
            },
            fail: function (a) {
                -1 == a.data.errno && l.setData({firstCreate: 1})
            }
        })
    }, toEditStaff: function (a) {
        var o = this;
        _index.userModel.getEditStaffV2(a).then(function (e) {
            console.log("getEditStaffV2==>", e.data), app.globalData.configInfo = !1, getApp().getConfigInfo().then(function () {
                o.setData({globalData: app.globalData}, function () {
                    var a = o.data.globalData, t = e.message;
                    "need code" == t && (t = "需要填写免审口令", a.configInfo.config.btn_code_miss && (t = a.configInfo.config.btn_code_miss)), "code error" == t && (t = "免审口令错误", a.configInfo.config.btn_code_err && (t = a.configInfo.config.btn_code_err)), wx.showToast({
                        icon: "none",
                        title: t,
                        duration: 2e3,
                        success: function () {
                            if (0 != e.errno) return !1;
                            setTimeout(function () {
                                wx.hideToast(), "createCard" == o.data.paramStatus ? wx.reLaunch({url: "/longbing_card/pages/index/index?currentTabBar=cardList&paramStatus=createCard"}) : wx.navigateBack()
                            }, 2e3)
                        }
                    })
                })
            })
        })
    }, chooseImage: function () {
        var t = this;
        wx.showActionSheet({
            itemList: ["优雅自拍", "相册收藏"], itemColor: "#3675f1", success: function (a) {
                a.cancel || (0 == a.tapIndex ? t.chooseWxImageShop("camera") : 1 == a.tapIndex && t.chooseWxImageShop("album"))
            }, fail: function (a) {
            }
        })
    }, chooseWxImageShop: function (a) {
        var e = this, o = e.data.staffInfo.images, n = e.data.staffInfoImages, t = e.data.imgCountNum;
        wx.chooseImage({
            count: t, sizeType: ["original", "compressed"], sourceType: [a], success: function (a) {
                for (var t in a.tempFilePaths) app.util.showLoading(3), wx.uploadFile({
                    url: e.data.uploadUrl,
                    filePath: a.tempFilePaths[t],
                    name: "upfile",
                    formData: {},
                    success: function (a) {
                        var t = JSON.parse(a.data);
                        o.push(t.data.path), n.push(t.data.img), wx.hideLoading(), e.setData({
                            "staffInfo.images": o,
                            staffInfoImages: n,
                            imgCountNum: 8 - o.length
                        })
                    }
                })
            }, fail: function (a) {
                wx.hideLoading()
            }
        })
    }, toAuthRecord: function (a) {
        var e = this;
        wx.authorize({
            scope: "scope.record", success: function (a) {
                e.setData({showTostImg: !0, recordAuthMethod: 2, record_status: 1}), recorderManager.start({
                    duration: 6e4,
                    sampleRate: 16e3,
                    numberOfChannels: 1,
                    encodeBitRate: 96e3,
                    format: "mp3",
                    frameSize: 50
                })
            }, fail: function (a) {
                var t = a.errMsg;
                (-1 < t.indexOf("fail auth deny") || -1 < t.indexOf("fail:auth deny")) && e.setData({
                    isSetting: !0,
                    record_status: 0,
                    recordAuthMethod: 1
                })
            }
        })
    }, toReRecord: function () {
        var a = this;
        a.setData({
            start: !0,
            record_status: 1,
            showTostImg: !1,
            "staffInfo.voice": "",
            "staffInfo.voice_time": ""
        }, function () {
            innerAudioContext.stop(), a.toAuthRecord()
        })
    }, start: function (a) {
        var t = this.data;
        t.start;
        t.play ? wx.showToast({title: "正在播放语音", icon: "none"}) : this.toAuthRecord()
    }, end: function (a) {
        recorderManager.stop()
    }, play: function () {
        var a = this.data, t = a.start, e = a.play;
        t ? wx.showToast({title: "正在录音", icon: "none"}) : e ? innerAudioContext.stop() : innerAudioContext.play()
    }, toUploadRecord: function (e) {
        var o = this;
        -1 != o.data.staffInfo.voice.indexOf("wxfile://") ? wx.uploadFile({
            url: o.data.uploadUrl,
            filePath: o.data.staffInfo.voice,
            name: "upfile",
            formData: {},
            success: function (a) {
                var t = JSON.parse(a.data);
                o.setData({"staffInfo.voice": t.data.path, staffInfoVoice: t.data.img}), e && e()
            },
            fail: function (a) {
            }
        }) : e && e()
    }, upload: function () {
        var n = this;
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function (a) {
                var t = a.tempFilePaths[0], e = n.data.staffInfo.card_type, o = n.data.paramStatus;
                wx.redirectTo({url: "/longbing_card/staffs/pages/mine/upload/upload?src=" + t + "&cardtype=" + e + "&paramstatus=" + o})
            }
        })
    }, getTagsList: function () {
        var r = this;
        _index.userModel.getTagsList().then(function (a) {
            _xx_util2.default.hideAll(), console.log("getTagsList ==>", a.data);
            var t = a.data, e = t.my_tags, o = t.sys_tags, n = [];
            for (var i in o) for (var s in n.push(0), e) o[i].tag == e[s].tag && (n[i] = 1);
            r.setData({my_tags: e, sys_tags: o, sys_check: n})
        })
    }, toGetForm: function (a) {
        var n = this, i = a, t = n.data, e = t.staffInfoImages, o = t.staffInfo, s = t.staffInfoAvatar, r = t.job,
            d = t.company, f = t.globalData;
        if (!i.name) return _xx_util2.default.showFail("请填写姓名！"), !1;
        if (!i.phone) return _xx_util2.default.showFail("请填写手机号！"), !1;
        if (!i.phone) return _xx_util2.default.showFail("请选择职称！"), !1;
        var c = o.jobList[r].id;
        if (r < 0) return c = "", _xx_util2.default.showFail("请选择职称！"), !1;
        var u = "", l = s;
        if (s || (l = o.avatar), 0 < e.length) for (var g in e) u += e[g] + ","; else for (var p in o.images) u += o.images[p] + ",";
        var m = f.configInfo.company_list[d].id;
        //公司logo传数据到接口
        u = u.slice(0, -1), i.avatar = l,i.companylogo=n.data.companylogo,i.wxqrcode=n.data.wxqrcode,i.images = u, i.job_id = c, i.company_id = m, i.card_type = o.card_type, n.toUploadRecord(function () {
            var a = n.data, t = a.staffInfoVoice, e = a.staffInfo, o = t;
            t || (o = e.voice), i.voice = o, i.voice_time = e.voice_time, n.toEditStaff(i)
        })
    }, toJump: function (a) {
        var t = this, e = a.currentTarget.dataset, o = e.status, n = e.index, i = e.type;
        if ("toCopyright" == o && app.util.goUrl(a), "toCardType" == o) {
            var s = t.data.cardTypeList;
            t.setData({cardTypeIndex: n, "staffInfo.card_type": s[n]})
        } else if ("toUpload" == o) "toAvatar" == i ? t.upload() : "toImages" == i && t.chooseImage(); else if ("toDeleteImg" == o) {
            var r = t.data.staffInfo.images, d = t.data.staffInfoImages;
            d.splice(n, 1), r.splice(n, 1), t.setData({
                "staffInfo.images": r,
                staffInfoImages: d,
                imgCountNum: 8 - r.length
            })
        } else if ("toDeleteTags" == o) {
            var f = t.data, c = f.my_tags, u = f.sys_tags, l = f.sys_check;
            for (var g in u) c[n].tag == u[g].tag && (l[g] = 0, t.setData({sys_check: l}));
            var p = {tag_id: c[n].id};
            c.splice(n, 1), t.setData({my_tags: c}), _index.userModel.getAddDeleteTags(p).then(function (a) {
                _xx_util2.default.hideAll()
            })
        }
    }, formSubmit: function (a) {
        var t = this, e = a.detail.formId, o = _xx_util2.default.getFromData(a), n = o.status, i = o.index, s = o.type,
            r = a.detail.value.content;

        if (t.toSaveFormIds(e), "toEditStaff" == n) {
            var d = a.detail.value;
            1 == t.data.record_status ? (t.end(), wx.showLoading({title: "录音上传中", mask: !0}), setTimeout(function () {
                _xx_util2.default.hideAll(), t.toGetForm(d)
            }, 1500)) : t.toGetForm(d)
        } else if ("toAddTags" == n) t.setData({showAddUseSec: !0}); else if ("toCancel" == n) t.setData({showAddUseSec: !1}); else if ("toSaveUseMessage" == n) {
            if (!r) return _xx_util2.default.showModalText("", "请输入印象标签！"), !1;
            var f = {tag: r};
            _index.userModel.getAddDeleteTags(f).then(function (a) {
                _xx_util2.default.hideAll(), t.setData({showAddUseSec: !1}, function () {
                    t.getTagsList()
                })
            })
        } else if ("toCheckSysTags" == n) {
            var c = t.data, u = c.my_tags, l = c.sys_tags, g = c.sys_check;
            if (0 == s) {
                for (var p in u) if (l[i].tag == u[p].tag) return _xx_util2.default.showModalText("", "不能添加重复的印象标签哦！"), !1;
                if (9 < u.length) return _xx_util2.default.showModalText("", "不能添加更多印象标签哦！"), !1;
                g[i] = 1;
                var m = l[i], h = {tag: l[i].tag};
                _index.userModel.getAddDeleteTags(h).then(function (a) {
                    _xx_util2.default.hideAll(), m.id = a.data.tag_id, u.push(m), t.setData({my_tags: u, sys_check: g})
                })
            }
            if (1 == s) for (var x in u) if (l[i].tag == u[x].tag) {
                var _ = {tag_id: u[x].id};
                u.splice(x, 1), g[i] = 0, t.setData({
                    my_tags: u,
                    sys_check: g
                }), _index.userModel.getAddDeleteTags(_).then(function (a) {
                    _xx_util2.default.hideAll()
                })
            }
        }
    }, toSaveFormIds: function (a) {
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
    },
    //我的代码开始
    choose_location: function (event) {
        let i=this;
        wx.chooseLocation({
            success: (res) => {
                i.setData({"staffInfo.comaddre": res.address})
            }
        })
    },
    choose_locationtwo: function (event) {
        let i=this;
        wx.chooseLocation({
            success: (res) => {
                i.setData({"staffInfo.company2": res.address})
            }
        })
    },
    choose_locationthree: function (event) {
        let i=this;
        wx.chooseLocation({
            success: (res) => {
                i.setData({"staffInfo.company3": res.address})
            }
        })
    },
    uplogo:function (e) {
       //companylogo
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                var i = this;
                wx.showLoading('上传中...')
                wx.uploadFile({
                    url: this.data.uploadUrl, filePath: res.tempFilePaths[0], name: "upfile", formData: {}, success: function (t) {
                        console.log(t, "获取图片成功 res");
                        var e = JSON.parse(t.data), a = e.data.path;
                        i.setData({
                            companylogo:a,
                        })
                        wx.hideLoading();
                       }, fail: function (t) {
                        wx.hideLoading(), console.log("获取图片失败，请稍后重试")
                        wx.showToast({
                            title: '上传失败！',
                        })
                    }
                })
            }
        })
    },
    upwx:function (e) {
        //upwx
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                var i = this;
                wx.showLoading('上传中...')
                wx.uploadFile({
                    url: this.data.uploadUrl, filePath: res.tempFilePaths[0], name: "upfile", formData: {}, success: function (t) {
                        var e = JSON.parse(t.data), a = e.data.path;
                        console.log(a, "获取图片成功 res");
                        i.setData({
                            wxqrcode:a,
                        })
                        wx.hideLoading();
                    }, fail: function (t) {
                        wx.hideLoading(), console.log("获取图片失败，请稍后重试")
                        wx.showToast({
                            title: '上传失败！',
                        })
                    }
                })
            }
        })
    }
    //我的代码结束
});
