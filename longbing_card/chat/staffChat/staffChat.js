var _xx_util = require("../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util),
    _index = require("../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {default: t}
}

var ping_user_id, ping_chat_to_uid, app = getApp(), chatInput = require("../../chat/chat-input/chat-input.js"),
    timer = 0, closeReconnect = !1, lockReconnect = !1, heartCheck = {
        timeout: 5e3, timeoutObj: null, serverTimeoutObj: null, reset: function () {
            return clearTimeout(timer), clearTimeout(this.timeoutObj), clearTimeout(this.serverTimeoutObj), this
        }, start: function () {
            this.timeoutObj = setTimeout(function () {
                var t = {ping: !0, user_id: ping_user_id, target_id: ping_chat_to_uid};
                t = JSON.stringify(t), wx.sendSocketMessage({
                    data: t, success: function () {
                    }
                })
            }, this.timeout)
        }
    };
Page({
    data: {
        user_id: "",
        chat_to_uid: "",
        chatid: "",
        contactUserName: "",
        chatAvatarUrl: "",
        toChatAvatarUrl: "",
        messageDate: "",
        useMessageType: [],
        currUType: 0,
        useMessage: [],
        showEditSec: !1,
        clientSource: [],
        messageList: [],
        lockReconnect: !1,
        limit: 0,
        closeReconnect: !1,
        showAddUseSec: !1,
        showUseMessage: !1,
        countMessage: 0
    }, onLoad: function (r) {
        var d = this;
        if (wx.hideShareMenu(), 1 == r.is_tpl) {
            var t = {user_id: wx.getStorageSync("userid"), target_id: r.to_uid};
            _index.baseModel.getChatInfo(t).then(function (t) {
                var e = t.data, a = e.user_info, s = e.target_info, i = e.chat_id, n = s.nickName, o = s.avatarUrl,
                    c = a.avatarUrl;
                d.setData({
                    is_tpl: 1,
                    chat_to_uid: r.to_uid,
                    "chatInfo.chat_id": i,
                    chatAvatarUrl: c,
                    toChatAvatarUrl: o,
                    contactUserName: n,
                    user_id: wx.getStorageSync("userid"),
                    globalData: app.globalData
                }, function () {
                    ping_user_id = wx.getStorageSync("userid"), ping_chat_to_uid = d.data.chat_to_uid, d.initData(), d.data.chatInfo.chat_id ? d.getMessageList() : d.data.chatInfo.chat_id || d.getChat(), d.linkSocket()
                })
            })
        } else d.setData({
            chat_to_uid: r.chat_to_uid,
            "chatInfo.chat_id": r.chatid,
            chatAvatarUrl: r.chatAvatarUrl,
            toChatAvatarUrl: r.toChatAvatarUrl,
            contactUserName: r.contactUserName,
            user_id: wx.getStorageSync("userid"),
            globalData: app.globalData
        }, function () {
            ping_user_id = wx.getStorageSync("userid"), ping_chat_to_uid = d.data.chat_to_uid, d.initData(), d.data.chatInfo.chat_id ? d.getMessageList() : d.data.chatInfo.chat_id || d.getChat(), d.linkSocket()
        });
        wx.setNavigationBarTitle({title: d.data.contactUserName});
        var e = app.util.url("entry/wxapp/upload"), a = getCurrentPages();
        a.length && (a = a[getCurrentPages().length - 1]) && a.__route__ && (e = e + "&m=" + a.__route__.split("/")[0]), d.setData({uploadUrl: e})
    }, setLinkTitle: function () {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
        if ("" != t) t += "...", wx.showNavigationBarLoading(); else {
            var e = this.data, a = e.contactUserName, s = e.clientSource.share_str;
            if (-1 < s.indexOf("//XL:")) {
                var i = s.split("//XL:");
                a = a + " " + i[0] + i[1]
            } else a = a + " " + s;
            t = a, wx.hideNavigationBarLoading()
        }
        wx.setNavigationBarTitle({title: t})
    }, linkSocket: function () {
        var e = this;
        e.setLinkTitle("连接中"), e.closeReconnect = !1, e.limit = 0, wx.connectSocket({
            url: app.globalData.wssUrl,
            success: function (t) {
                e.initEventHandle()
            }
        })
    }, initEventHandle: function () {
        var e = this, d = this;
        wx.onSocketMessage(function (t) {
            if (d.setLinkTitle(), "pong" == t.data) heartCheck.reset().start(); else {
                console.log("收到服务器内容：", t);
                var e = JSON.parse(t.data);
                if (console.log("收到服务器内容resData：", e), "" != e.data) {
                    var a = {};
                    if (e.data2) {
                        if (e.data2.user_id == d.data.chat_to_uid && e.data2.target_id == d.data.user_id) {
                            var s = e.data2.message_type;
                            s || (s = "text"), a = {
                                user_id: d.data.chat_to_uid,
                                target_id: d.data.user_id,
                                content: e.data2.content,
                                type: s,
                                status: 1,
                                uniacid: app.siteInfo.uniacid
                            }
                        }
                    } else {
                        var i = e.type;
                        i || (i = "text"), a = {
                            user_id: d.data.chat_to_uid,
                            target_id: d.data.user_id,
                            content: e.data,
                            type: i,
                            status: 1,
                            uniacid: app.siteInfo.uniacid
                        }
                    }
                    if (a.content) {
                        var n = d.data.messageList, o = n.length;
                        if (0 < o) n[o - 1].list.push(a); else {
                            var c = new app.util.date, r = (c.dateToLong(new Date) / 1e3).toFixed(0);
                            r = c.dateToStr("yyyy-MM-DD HH:mm:ss", c.longToDate(1e3 * r)), n.push({
                                create_time: r,
                                list: [a]
                            })
                        }
                        d.setData({messageList: n}, function () {
                            d.pageScrollToBottom()
                        })
                    } else ;
                }
            }
        }), wx.onSocketOpen(function () {
            d.setLinkTitle(), heartCheck.reset().start()
        }), wx.onSocketError(function (t) {
            e.reconnect()
        }), wx.onSocketClose(function (t) {
            e.reconnect()
        })
    }, unloadWebSocket: function () {
        lockReconnect = closeReconnect = !0, heartCheck.reset(), wx.closeSocket(function (t) {
        })
    }, reconnect: function () {
        var t = this;
        if (closeReconnect) return clearTimeout(timer), !(lockReconnect = !(closeReconnect = !0));
        lockReconnect && closeReconnect || (this.setLinkTitle("重连中"), lockReconnect = !0, clearTimeout(timer), this.data.limit < 12 ? (timer = setTimeout(function () {
            t.linkSocket(), lockReconnect = !1
        }, 5e3), this.setData({limit: this.data.limit + 1})) : wx.navigateBack())
    }, onReady: function () {
    }, onShow: function () {
        var t = this;
        t.setData({"useMessage.list": [], useMessageType: []}, function () {
            t.getSource()
        })
    }, onHide: function () {
    }, onUnload: function () {
        this.unloadWebSocket()
    }, catchtouchmove: function () {
        return !1
    }, onPullDownRefresh: function () {
        console.log("监听用户下拉动作");
        var t = this;
        if (!t.data.messageDate && 1 == t.data.messageList.length) {
            var e = t.data.messageList[0].list[0].id;
            t.setData({messageDate: e})
        }
        t.setData({
            show: !0,
            "useMessage.list": [],
            useMessageType: [],
            showUseMessage: !1,
            showClientSource: !1
        }, function () {
            t.getMessageList(), t.getSource()
        }), setTimeout(function () {
            wx.stopPullDownRefresh()
        }, 1e3)
    }, onReachBottom: function () {
    }, onPageScroll: function (t) {
    }, onShareAppMessage: function (t) {
    }, initData: function () {
        var t = wx.getSystemInfoSync();
        chatInput.init(this, {
            systemInfo: t,
            minVoiceTime: 1,
            maxVoiceTime: 60,
            startTimeDown: 56,
            format: "mp3",
            sendButtonBgColor: "mediumseagreen",
            sendButtonTextColor: "white",
            extraArr: [{picName: "choose_picture", description: "照片"}]
        }), this.setData({pageHeight: t.windowHeight}), this.textButton(), this.extraButton()
    }, textButton: function () {
        var u = this;
        chatInput.setTextMessageListener(function (t) {
            var r = t.success, e = t.e, a = t.fail, s = e.detail.value, d = {
                user_id: u.data.user_id,
                target_id: u.data.chat_to_uid,
                content: s,
                type: "text",
                status: 1,
                uniacid: app.siteInfo.uniacid
            };
            d = JSON.stringify(d), wx.sendSocketMessage({
                data: d, success: function (t) {
                    var e = u.data.messageList, a = e.length;
                    if (d = JSON.parse(d), 0 < a) e[a - 1].list.push(d); else {
                        var s = ((n = new app.util.date).dateToLong(new Date) / 1e3).toFixed(0);
                        s = n.dateToStr("yyyy-MM-DD HH:mm:ss", n.longToDate(1e3 * s)), e.push({
                            create_time: s,
                            list: [d]
                        })
                    }
                    var i = (u.data || 0).countMessage;
                    u.setData({messageList: e, countMessage: 1 * i + 1}, function () {
                        u.pageScrollToBottom()
                    });
                    var n, o = ((n = new app.util.date).dateToLong(new Date) / 1e3).toFixed(0), c = d.content;
                    "image" == d.type && (c = "[图片]"), u.SendTemplateCilent(o, c), r(!0)
                }, fail: function (t) {
                    a(!1)
                }
            })
        })
    }, extraButton: function () {
        var s = this;
        chatInput.clickExtraListener(function (t) {
            var e = parseInt(t.currentTarget.dataset.index);
            1 !== e ? (wx.chooseImage({
                count: 1,
                sizeType: ["compressed"],
                sourceType: 0 === e ? ["album"] : ["camera"],
                success: function (t) {
                    var e = t.tempFiles;
                    wx.showLoading({title: "发送中..."}), wx.uploadFile({
                        url: s.data.uploadUrl,
                        filePath: e[0].path,
                        name: "upfile",
                        formData: {},
                        success: function (t) {
                            wx.hideLoading();
                            var e = JSON.parse(t.data).data.path, a = {
                                user_id: s.data.user_id,
                                target_id: s.data.chat_to_uid,
                                content: e,
                                type: "image",
                                status: 1,
                                uniacid: app.siteInfo.uniacid
                            };
                            a = JSON.stringify(a), s.toSendMessage(a, 3)
                        }
                    })
                }
            }), s.hideExtra()) : wx.chooseVideo({
                maxDuration: 10, success: function (t) {
                    t.tempFilePath, t.thumbTempFilePath;
                    wx.showLoading({title: "发送中..."})
                }, fail: function (t) {
                }, complete: function (t) {
                }
            })
        }), chatInput.setExtraButtonClickListener(function (t) {
        })
    }, pageScrollToBottom: function () {
        wx.createSelectorQuery().select(".speak_box").boundingClientRect(function (t) {
            wx.pageScrollTo({scrollTop: t.height})
        }).exec()
    }, hideExtra: function (t) {
        this.setData({"inputObj.extraObj.chatInputShowExtra": !1})
    }, toSendMessage: function (r, d) {
        var u = this;
        wx.sendSocketMessage({
            data: r, success: function (t) {
                var e = u.data.messageList, a = e.length;
                if (r = JSON.parse(r), 0 < a) e[a - 1].list.push(r); else {
                    var s = ((n = new app.util.date).dateToLong(new Date) / 1e3).toFixed(0);
                    s = n.dateToStr("yyyy-MM-DD HH:mm:ss", n.longToDate(1e3 * s)), e.push({create_time: s, list: [r]})
                }
                var i = (u.data || 0).countMessage;
                u.setData({messageList: e, countMessage: 1 * i + 1}, function () {
                    u.pageScrollToBottom()
                });
                var n, o = ((n = new app.util.date).dateToLong(new Date) / 1e3).toFixed(0), c = r.content;
                "image" == r.type && (c = "[图片]"), u.SendTemplateCilent(o, c), 2 == d && u.setData({
                    showUseMessage: !1,
                    showAddUseSec: !1
                })
            }, fail: function (t) {
                2 == d ? u.setData({showUseMessage: !1, showAddUseSec: !1}) : 3 == d && u.toSendMessage(r, d)
            }
        })
    }, SendTemplateCilent: function (t, e) {
        app.util.request({
            url: "entry/wxapp/SendTemplateCilent",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {client_id: this.data.chat_to_uid, date: t, content: e},
            success: function (t) {
                t.data.errno
            },
            fail: function (t) {
            }
        })
    }, getSource: function () {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Source",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {client_id: n.data.chat_to_uid},
            success: function (t) {
                if (!t.data.errno) {
                    var e = t.data.data.share_str, a = n.data.contactUserName, s = {};
                    if (-1 < e.indexOf("//XL:")) {
                        var i = e.split("//XL:");
                        s.clientSourceStr = i, s.clientSourceType = "group", a = a + " " + i[0] + i[1]
                    } else a = a + " " + e;
                    wx.setNavigationBarTitle({title: a}), n.setData({
                        clientSource: t.data.data,
                        showClientSourceData: s
                    })
                }
            },
            fail: function (t) {
            }
        }), n.getReplyList()
    }, getChat: function () {
        var e = this;
        app.util.request({
            url: "entry/wxapp/chatId",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {to_uid: e.data.chat_to_uid},
            success: function (t) {
                t.data.errno || (e.setData({
                    chatInfo: t.data.data,
                    chatAvatarUrl: t.data.data.user_info.avatarUrl,
                    toChatAvatarUrl: t.data.data.target_info.avatarUrl
                }), e.getMessageList())
            },
            fail: function (t) {
            }
        })
    }, getMessageList: function () {
        var r = this, t = {chat_id: r.data.chatInfo.chat_id};
        r.data.messageDate && (t.create_time = r.data.messageDate), app.util.request({
            url: "entry/wxapp/messages",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: t,
            success: function (t) {
                if (!t.data.errno) {
                    var e = t.data.data.list;
                    if (0 == e.length) return r.setData({more: !1, loading: !1, isEmpty: !0, show: !0}), !1;
                    r.setData({loading: !0, messageDate: t.data.data.create_time});
                    var a = r.data.messageList;
                    1 == r.data.onPullDownRefresh && (a = []), a = a.reverse();
                    var s, i = new app.util.date;
                    for (var n in e) e[n].create_time.length < 12 && (e[n].create_time = i.dateToStr("yyyy-MM-DD HH:mm:ss", i.longToDate(1e3 * e[n].create_time)));
                    s = (e = e.reverse())[0].create_time, a.push({create_time: s, list: e}), a = a.reverse();
                    var o = 0;
                    for (var c in a) o += a[c].list.length;
                    r.setData({messageList: a, onPullDownRefresh: !1, countMessage: o})
                }
            },
            fail: function (t) {
            }
        })
    }, getReplyList: function () {
        var i = this;
        app.util.request({
            url: "entry/wxapp/ReplyList",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {},
            success: function (t) {
                if (!t.data.errno) {
                    var e = t.data.data, a = i.data.useMessageType;
                    for (var s in e) a.push(e[s].title);
                    i.setData({useMessage: e, useMessageType: a})
                }
            },
            fail: function (t) {
            }
        })
    }, getAddReply: function (e) {
        var a = this, s = a.data.useMessage, i = s[a.data.currUType].list;
        app.util.request({
            url: "entry/wxapp/AddReply",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {content: e},
            success: function (t) {
                t.data.errno || (i.push({id: t.data.data.id, content: e}), a.setData({
                    currUType: 0,
                    useMessage: s,
                    showAddUseSec: !1
                }))
            },
            fail: function (t) {
            }
        })
    }, getEditReply: function (e) {
        var a = this, s = a.data.useMessage, i = s[a.data.currUType].list;
        app.util.request({
            url: "entry/wxapp/EditReply",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {id: i[a.data.toEditInd].id, content: e},
            success: function (t) {
                t.data.errno || (i[a.data.toEditInd].content = e, a.setData({
                    useMessage: s,
                    showAddUseSecContent: "",
                    showAddUseSec: !1,
                    showEditSec: !1
                }))
            },
            fail: function (t) {
                a.setData({showAddUseSecContent: "", showAddUseSec: !1, showEditSec: !1})
            }
        })
    }, getDelReply: function (e) {
        var a = this, s = a.data.useMessage, i = s[a.data.currUType].list;
        app.util.request({
            url: "entry/wxapp/DelReply",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {id: i[e].id},
            success: function (t) {
                t.data.errno || (wx.showToast({
                    icon: "none",
                    title: "已成功删除数据！",
                    duration: 1e3
                }), i.splice(e, 1), a.setData({useMessage: s, showEditSec: !1}))
            },
            fail: function (t) {
                a.setData({showEditSec: !1})
            }
        })
    }, toSetStarMark: function () {
        var a = this, t = {client_id: a.data.chat_to_uid};
        _index.staffModel.getStarMark(t).then(function (t) {
            _xx_util2.default.hideAll();
            var e = 1;
            1 == a.data.clientSource.start && (e = 0), a.setData({"clientSource.start": e})
        })
    }, toJump: function (t) {
        var e = this, a = t.currentTarget.dataset.status, s = t.currentTarget.dataset.index,
            i = t.currentTarget.dataset.type, n = t.currentTarget.dataset.content;
        if ("toHome" == a || "toJumpUrl" == a) app.util.goUrl(t); else if ("toSource" == a) e.setData({showClientSource: !0}); else if ("toStarMark" == a) e.toSetStarMark(); else if ("previewImage" == a) wx.previewImage({
            current: n,
            urls: [n]
        }); else if ("toCopy" == a) app.util.goUrl(t); else if ("toUse" == a) e.setData({showUseMessage: !0}, function () {
            e.catchtouchmove()
        }); else if ("toSetTab" == a) e.setData({currUType: s, showEditSec: !1}); else if ("toSendMessage" == a) {
            var o = {
                user_id: e.data.user_id,
                target_id: e.data.chat_to_uid,
                content: n,
                type: "text",
                status: 1,
                uniacid: app.siteInfo.uniacid
            };
            o = JSON.stringify(o), e.toSendMessage(o, 2)
        } else if ("toClose" == a) e.setData({
            showClientSource: !1,
            showUseMessage: !1,
            showAddUseSec: !1,
            showAddUseSecContent: "",
            toEditInd: ""
        }); else if ("toAdd" == a) e.setData({showAddUseSec: !0}); else if ("toEditSec" == a) {
            var c;
            1 == i && (c = !1), 0 == i && (c = !0), e.setData({showEditSec: c})
        } else "toEdit" == a ? e.setData({
            showAddUseSecContent: n,
            showAddUseSec: !0,
            toEditInd: s
        }) : "toDelete" == a && wx.showModal({
            title: "", content: "是否确认删除此数据？", success: function (t) {
                t.confirm ? e.getDelReply(s) : e.setData({showEditSec: !1})
            }
        })
    }, formSubmit: function (t) {
        var e = this, a = t.detail.target.dataset.status, s = t.detail.formId;
        if (e.toSaveFormIds(s), "toCancel" == a) e.setData({
            showAddUseSec: !1,
            showAddUseSecContent: "",
            toEditInd: ""
        }); else if ("toSaveUseMessage" == a) {
            var i = t.detail.value.newuse;
            if (!i) return wx.showModal({title: "", content: "请输入您的话术！", confirmText: "知道啦", showCancel: !1}), !1;
            e.data.showAddUseSecContent ? e.getEditReply(i) : e.getAddReply(i)
        }
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
