var _data, _xx_util = require("../../resource/js/xx_util.js"),
  _xx_util2 = _interopRequireDefault(_xx_util),
  _request = require("../../resource/js/request"),
  _request2 = _interopRequireDefault(_request),
  _index = require("../../resource/apis/index.js");

function _interopRequireDefault(a) {
  return a && a.__esModule ? a : {
    default: a
  }
}

function _toConsumableArray(a) {
  if (Array.isArray(a)) {
    for (var t = 0, e = Array(a.length); t < a.length; t++) e[t] = a[t];
    return e
  }
  return Array.from(a)
}

function _defineProperty(a, t, e) {
  return t in a ? Object.defineProperty(a, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[t] = e, a
}
var timer, timerCoupon, timerClientUnread, app = getApp(),
  auth = require("../../templates/auth/auth.js"),
  voucher = require("../../templates/voucher/voucher.js"),
  innerAudioContext = wx.createInnerAudioContext(),
  innerAudioContextBG = wx.createInnerAudioContext();
Page({
  data: (_data = {
    toshowBG: !1,
    isToShowCard: !1,
    changeCardText: "交换手机号",
    color: "23,162,52",
    voucherStatus: {
      show: !0,
      status: "unreceive"
    },
    tmp_coupon_i: 0,
    coupon_record: !1,
    coupon_nickName: "",
    coupon_reduce: "",
    globalData: {},
    userid: "",
    showTabBar: !1,
    currentTabBarInd: "",
    currentTabBar: "cardList",
    toLeavingMessage: "",
    qrImg: "",
    avatarUrl: "",
    avatarName: "",
    cardToAddStatus: !1,
    customID: "",
    collectStatus: "-1",
    collectionList: {
      page: 1,
      total_page: "",
      list: []
    },
    paramCardList: {
      page: 1
    },
    refreshCardList: !1,
    loadingCardList: !0,
    moreStatus: 1,
    playPushStatus: 1,
    playPushBgStatus: 0,
    showShareStatus: 0,
    cardZanType: "",
    cardIndexData: {},
    refreshCardIndex: !1,
    activeIndex: 100000101,
    paramShop: {
      page: 1,
      type_id: 0
    },
    refreshShop: !1,
    loadingShop: !0,
    shop_all: {
      page: 1,
      total_page: "",
      list: []
    },
    categoryid: 0,
    scrollNav: "scrollNavAll",
    paramNews: {
      page: 1,
      to_uid: ""
    }
  }, _defineProperty(_data, "refreshShop", !1), _defineProperty(_data, "loadingShop", !0), _defineProperty(_data, "newsList", {
    page: 1,
    total_page: "",
    list: []
  }), _defineProperty(_data, "newsIndex", []), _defineProperty(_data, "evaStatus", !1), _defineProperty(_data, "currentNewsIndex", ""), _defineProperty(_data, "evaContent", ""), _defineProperty(_data, "ThumbsId", ""), _defineProperty(_data, "evaId", ""), _defineProperty(_data, "swiperStatus", {
    indicatorDots: !1,
    autoplay: !0
  }), _defineProperty(_data, "swiperIndexCur", 0), _defineProperty(_data, "refreshCompany", !1), _defineProperty(_data, "icon_voice_png", "https://retail.xiaochengxucms.com/images/12/2018/11/IgvvwVNUIVn6UMh4Dmh4m6nM4Widug.png"), _defineProperty(_data, "icon_voice_gif", "https://retail.xiaochengxucms.com/images/12/2018/11/CRFPPPTKf6f45J6H3N44BNCrjbFZxH.gif"), _data),
  onLoad: function(a) {
    var r = this;
    wx.hideShareMenu();
    app.util.showLoading(1), console.log("options************", a);
    var t = !1,
      e = "cardList";
    wx.hideShareMenu();
    var o = 0;
    (1 == a.is_qr && (o = 1), a.currentTabBar && (t = !0, "cardList" == a.currentTabBar && (t = !1), e = a.currentTabBar, "toCard" == a.currentTabBar ? wx.hideShareMenu() : "toShop" == a.currentTabBar ? wx.showShareMenu() : "toNews" == a.currentTabBar ? wx.showShareMenu() : "toCompany" == a.currentTabBar && wx.showShareMenu()), wx.getStorageSync("user")) && (wx.getStorageSync("user").phone && (app.globalData.hasClientPhone = !0, r.setData({
      "globalData.hasClientPhone": !0
    })));
    var n = {},
      i = r.data.paramNews;
    a.to_uid && (n.to_uid = a.to_uid, i.to_uid = a.to_uid, app.globalData.to_uid = a.to_uid), a.from_id && (n.from_id = a.from_id, app.globalData.from_id = a.from_id);
    var s = getCurrentPages();
    if (s.length && (s = s[getCurrentPages().length - 1]) && s.__route__ && (n.pageMUrl = "&m=" + s.__route__.split("/")[0]), a.custom) {
      var d = a.custom;
      r.getCustomQrRecordInsert(d)
    }
    r.setData({
      is_qr: o,
      showTabBar: t,
      currentTabBar: e,
      paramData: n,
      paramNews: i,
      userid: wx.getStorageSync("userid")
    }), getApp().getConfigInfo(!0, !0).then(function() {
      var a = app.globalData,
        t = a.platform,
        e = a.configInfo.config,
        o = e.android_pay,
        n = e.ios_pay,
        i = !0; - 1 < t.indexOf("android") && 0 == o && (i = !1), -1 < t.indexOf("ios") && 0 == n && (i = !1), r.setData({
        globalData: app.globalData,
        isToShowCard: !1,
        tmp_showPrice: i
      }, function() {
        setTimeout(function() {
          if ("cardList" == r.data.currentTabBar) r.setData({
            collectionList: {
              page: 1,
              total_page: "",
              list: []
            }
          }, function() {
            r.getCollectionList()
          });
          else {
            r.getCardIndexData();
            var a = void 0;
            "toCard" == r.data.currentTabBar ? (a = getApp().globalData.tabBarList[0].text, app.globalData.configInfo.config.mini_app_name && (a = app.globalData.configInfo.config.mini_app_name), 1044 == app.globalData.loginParam.scene && (timer = setInterval(function() {
              app.globalData.encryptedData && (r.toGetShareInfo(), clearInterval(timer))
            }, 1e3))) : "toShop" == r.data.currentTabBar ? (a = getApp().globalData.tabBarList[1].text, r.getShopTypes()) : "toNews" == r.data.currentTabBar ? (a = getApp().globalData.tabBarList[2].text, r.getNewsList()) : "toCompany" == r.data.currentTabBar && (a = getApp().globalData.tabBarList[3].text, r.getModular()), wx.setNavigationBarTitle({
              title: a
            })
          }
        }, 300)
      })
    }), 0 == r.data.cardToAddStatus && setTimeout(function() {
      r.setData({
        cardToAddStatus: !0
      }, setTimeout(function() {
        r.setData({
          cardToAddStatus: !1
        }, setTimeout(function() {
          r.setData({
            nofont: !0
          })
        }, 600))
      }, 1e4))
    }, 3e3)
  },
  onReady: function() {},
  onShow: function() {
    console.log("页面显示");
    wx.hideShareMenu();
    //我的代码////////////////
      let reqparam={"user_id":wx.getStorageSync("userid")}
      _index.baseModel.getUserinfo_me(reqparam).then((d) => {
          console.log(d.data.ispasstime,'是否过期')
          if (d.data.ispasstime){
              wx.showModal({
                  title: '注册提示',
                  content: '会员申请',
                  showCancel:true,
                  success(res) {
                      if (res.confirm) {
                        wx.setStorageSync('ispass',1)
                          // wx.redirectTo({
                          //     url: '/longbing_card/pages/mypage/vippay'
                          // })
                        wx.navigateTo({
                              url: '/longbing_card/pages/mypage/vippay'
                          })
                      } else if (res.cancel) {
                        wx.setStorageSync('ispass',1)
                          console.log('用户点击取消');
                      }
                  }
              })

          }else if(d.data.issend==0){
            wx.showModal({
              title: '欢迎您',
              content: '不知道如何使用？点我哦',
              showCancel:false,
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/longbing_card/pages/des/des'
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
      })
      //////////////////////////
    var n = this,
      a = {
        to_uid: app.globalData.to_uid
      };
    _index.baseModel.getClientUnread(a).then(function(a) {
      if (0 == a.errno) {
        var t = a.data.count,
          e = t.staff_count,
          o = t.user_count;
        n.setData({
          clientUnread: o,
          "globalData.clientUnread": o
        }, function() {
          app.globalData.badgeNum = e, app.globalData.clientUnread = o, app.globalData.clientUnread < o && (app.globalData.clientUnreadImg = !0, setTimeout(function() {
            app.globalData.clientUnreadImg = !1
          }, 5e3))
        })
      }
    });
    var t = n.data.currentTabBar,
      e = n.data.globalData.tabBarList;
    for (var o in e) t == e[o].type && n.setData({
      currentTabBarInd: o
    });
    "createCard" == n.data.onshowStatus && (app.globalData.configInfo = !1, getApp().getConfigInfo(!0, !0).then(function() {
      n.setData({
        showTabBar: !1,
        shop_all: {
          page: 1,
          total_page: "",
          list: []
        },
        company_company: {},
        company_modular: [],
        globalData: app.globalData,
        collectionList: {
          page: 1,
          total_page: "",
          list: []
        },
        "paramCardList.page": 1,
        onshowStatus: ""
      }, function() {
        n.getCollectionList()
      })
    }));
    var i = n.data,
      r = i.currentTabBar,
      s = i.cardIndexData,
      d = (i.globalData, i.toshowBG);
    "toCard" == r && s.info && n.setData({
      "voucherStatus.status": 0
    }, function() {
      n.getCardAfter(), s.info.bg && 1 == d && (innerAudioContextBG.src = s.info.bg, n.toPlayBgMusic()), console.log(d, "toshowBG")
    }), timerClientUnread = setInterval(function() {
      n.data.clientUnread < app.globalData.clientUnread && (app.globalData.clientUnreadImg = !0, n.setData({
        "globalData.clientUnreadImg": !0,
        clientUnread: app.globalData.clientUnread
      }), setTimeout(function() {
        app.globalData.clientUnreadImg = !1, n.setData({
          "globalData.clientUnreadImg": !1
        })
      }, 5e3))
    }, 1e4)
  },
  onHide: function() {
    console.log("页面隐藏");
    clearInterval(timer), clearInterval(timerCoupon), clearInterval(timerClientUnread)
  },
  onUnload: function() {
    console.log("页面关闭");
    clearInterval(timer), clearInterval(timerCoupon), clearInterval(timerClientUnread)
  },
  onPullDownRefresh: function() {
    var a = this;
    wx.getStorageSync("user").avatarUrl || a.checkAuthStatus();
    var t = !1;
    "cardList" != a.data.currentTabBar && (t = !0), app.globalData.configInfo = !1, getApp().getConfigInfo(!0, !0).then(function() {
      a.setData({
        showTabBar: t,
        globalData: app.globalData
      }, function() {
        wx.showNavigationBarLoading(), "cardList" == a.data.currentTabBar ? a.setData({
          refreshCardList: !0,
          cardSearchKey: "",
          "paramCardList.page": 1,
          "collectionList.page": 1,
          "collectionList.list": []
        }, function() {
          a.getCollectionList()
        }) : "toCard" == a.data.currentTabBar ? (clearInterval(timerCoupon), a.setData({
          refreshCardIndex: !0
        }, function() {
          a.toBGdestroy(), a.setData({
            toshowBG: !1
          }), a.getCardIndexData()
        })) : "toShop" == a.data.currentTabBar ? a.setData({
          refreshShop: !0
        }, function() {
          0 == a.data.categoryid ? a.getShopTypes() : a.getShopList()
        }) : "toNews" == a.data.currentTabBar ? a.setData({
          refreshNews: !0,
          "paramNews.page": 1,
          "newsList.page": 1,
          "newsList.list": []
        }, function() {
          a.getNewsList()
        }) : "toCompany" == a.data.currentTabBar && a.setData({
          refreshCompany: !0
        }, function() {
          a.getModular()
        })
      })
    })
  },
  onReachBottom: function() {
    var l = this,
      a = !1;
    "cardList" != l.data.currentTabBar && (a = !0), l.setData({
      showTabBar: a,
      loadingShop: !1,
      loadingNews: !1
    }, function() {
      if ("cardList" == l.data.currentTabBar) {
        var a = l.data.loadingCardList,
          t = l.data.collectionList,
          e = t.page;
        e == t.total_page || a || (l.setData({
          "paramCardList.page": parseInt(e) + 1,
          loadingCardList: !0
        }), l.getCollectionList())
      } else if ("toShop" == l.data.currentTabBar) {
        var o = l.data.loadingShop,
          n = l.data.shop_all,
          i = n.page;
        i == n.total_page || o || (l.setData({
          "paramShop.page": parseInt(i) + 1,
          refreshShop: !1,
          loadingShop: !0
        }), l.getShopList())
      } else if ("toNews" == l.data.currentTabBar) {
        var r = l.data.loadingNews,
          s = l.data.newsList,
          d = s.page;
        d == s.total_page || r || (l.setData({
          "paramNews.page": parseInt(d) + 1,
          loadingNews: !0
        }), l.getNewsList())
      }
    })
  },
  onPageScroll: function(a) {
    var t = this,
      e = t.data.newsIndex;
    for (var o in e)(e[o] = 1) && (e[o] = 0);
    t.setData({
      evaStatus: !1,
      newsIndex: e
    }), "cardList" != t.data.currentTabBar && t.setData({
      showTabBar: !0
    }), "toShop" == t.data.currentTabBar && t.setData({
      toShopScrollTop: a.scrollTop
    })
  },
  onShareAppMessage: function(a) {
    var t = this;
    wx.hideShareMenu();
    if ("toCard" == t.data.currentTabBar) {
      t.toVideoStop(), t.toBGdestroy();
      var e = t.data.cardIndexData;
      t.getShareRecord(), t.data.paramData.to_uid != wx.getStorageSync("userid") && t.getForwardRecord(1, 0);
      var o = Date.now(),
          n = e.info.share_text,
          i = e.share_img;
      console.log(n,'分享标题')
      if (i && "cardType1" != e.info.card_type && "cardType4" != e.info.card_type || (i = e.info.avatar_2), i = i + "?" + o, e.coupon.id) "toVoucher" == a.target.dataset.status && (n = e.coupon.title, i = "https://retail.xiaochengxucms.com/images/2/2019/01/mFL0pH86Fd8bsLS3HF98oIJeFdcs6F.png");
      return {
        title: n,
        path: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard",
        imageUrl: i
      }
    }
    if ("toShop" == t.data.currentTabBar) return {
      title: "",
      path: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toShop",
      imageUrl: ""
    };
    if ("toNews" == t.data.currentTabBar) {
      if ("button" === a.from) {
        var r = a.target.dataset,
            s = r.index,
            d = (r.status, r.id),
            l = void 0,
            u = (e = t.data.newsList.list)[s].cover[0],
            c = void 0;
        if (0 == e[s].type) l = "/longbing_card/users/pages/news/detail/detail?id=" + d + "&fromshare=true&from_id=" + wx.getStorageSync("userid"), 0 != e[s].user_id && (l = l + "&isStaff=true&to_uid=" + e[s].user_info.fans_id), 0 == e[s].user_id && (l = l + "&companyName=" + t.data.newsList.timeline_company.name + "&to_uid=" + app.globalData.to_uid), c = u;
        else if (1 == e[s].type) {
          l = "/longbing_card/users/pages/news/detail/detail?id=" + d + "&to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&status=toPlayVideo&name=" + e[s].title + "&src=" + e[s].content + "&report_id=" + e[s].id + "&id=" + e[s].id + "&fromshare=true&shareimg=";
          var p = e[s].cover[0];
          p || (p = app.globalData.companyVideoImg), c = p, l += p = encodeURIComponent(p)
        } else if (2 == e[s].type) {
          var g = encodeURIComponent(e[s].content);
          l = "/longbing_card/common/transtion/transtion?id=" + d + "&to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&status=toNewsLine&url=" + g + "&name=" + e[s].title + "&report_id=" + e[s].id + "&fromshare=true&shareimg=", (c = u) && (l += u = encodeURIComponent(u))
        }
        return t.data.paramData.to_uid != wx.getStorageSync("userid") && t.getForwardRecord(3, d), {
          title: e[s].title,
          path: l,
          imageUrl: c
        }
      }
      return {
        title: "",
        path: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toNews",
        imageUrl: ""
      }
    }
    return "toCompany" == t.data.currentTabBar ? (t.data.paramData.to_uid != wx.getStorageSync("userid") && t.getForwardRecord(4, 0), {
      title: "",
      path: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCompany",
      imageUrl: ""
    }) : void 0
  },
  ddd: function() {
    0 == app.globalData.to_uid ? wx.showModal({
      title: "",
      content: "不能与默认客服进行对话哦！",
      confirmText: "知道啦",
      showCancel: !1,
      success: function(a) {
        a.confirm
      }
    }) : app.globalData.to_uid == wx.getStorageSync("userid") ? wx.showModal({
      title: "",
      content: "不能和自己进行对话哦！",
      confirmText: "知道啦",
      showCancel: !1,
      success: function(a) {
        a.confirm
      }
    }) : (this.toVideoStop(), this.toBGdestroy(), wx.navigateTo({
      url: "/longbing_card/chat/userChat/userChat?chat_to_uid=" + app.globalData.to_uid + "&contactUserName=" + app.globalData.nickName + "&staffPhone=" + this.data.cardIndexData.info.phone + "&staffWechat=" + this.data.cardIndexData.info.wechat
    }))
  },
  getShowClientUnread: function() {
    var a = this;
    a.data.globalData.clientUnread && (app.globalData.clientUnreadImg = !0, a.setData({
      "globalData.clientUnreadImg": !0,
      clientUnread: app.globalData.clientUnread
    }), setTimeout(function() {
      app.globalData.clientUnread = 0, app.globalData.clientUnreadImg = !1, a.setData({
        "globalData.clientUnreadImg": !1
      })
    }, 5e3))
  },
  getCustomQrRecordInsert: function(a) {
    var t = {
      to_uid: this.data.paramData.to_uid,
      qr_id: a
    };
    _index.userModel.getCodeRecord(t).then(function(a) {
      console.log("getCodeRecord==>", a.data)
    })
  },
  toSearchCardBlur: function() {
    this.setData({
      toSearchCard: !1
    })
  },
  toSearchCard: function(a) {
    var t = a.detail.value;
    this.setData({
      cardSearchKey: t
    })
  },
  toSearchCardConfirm: function() {
    var a = this;
    a.setData({
      refreshCardList: !0,
      "paramCardList.page": 1,
      "collectionList.page": 1,
      "collectionList.list": []
    }, function() {
      a.getCollectionList()
    })
  },
  getCollectionList: function() {
    var n = this,
      a = n.data,
      i = a.refreshCardList,
      t = a.paramCardList,
      r = a.collectionList,
      e = a.cardSearchKey;
    i || _xx_util2.default.showLoading(), e && (t.keyword = e), _index.userModel.getCollectionList(t).then(function(a) {
      console.log("getCollectionList==>", a.data);
      var t = r,
        e = a.data;
      i || (e.list = [].concat(_toConsumableArray(t.list), _toConsumableArray(e.list)));
      var o = "-1";
      0 == e.list.length && (o = !1), n.setData({
        collectionList: e,
        collectStatus: o,
        loadingCardList: !1,
        refreshCardList: !1,
        cardSearchKey: "",
        "paramCardList.keyword": ""
      })
    })
  },
  toGetShareimg: function() {
    var e = this;
    _index.baseModel.getShareimg().then(function(a) {
      _xx_util2.default.hideAll();
      var t = a.data.path;
      e.setData({
        getShareImg: t
      })
    })
  },
  getCardIndexData: function() {
    var w = this,
      a = w.data.refreshCardIndex,
      t = w.data.paramData.to_uid;
    a || _xx_util2.default.showLoading();
    var e = {
      to_uid: t
    };
    _index.userModel.getCardShow(e).then(function(a) {
      if (_xx_util2.default.hideAll(), console.log(a, "getCardShow"), 0 == a.errno) {
        console.log("getCardShow==>", a.data);
        var t = a.data,
          e = t.to_uid,
          o = t.from_id,
          n = t.peoplesInfo,
          i = t.goods;
        for (var r in n) wx.getStorageSync("userid") == n[r].id && n.splice(r, 1);
        var s = t.info.images;
        for (var d in s) s[d] || s.splice(d, 1);
        for (var l in i) i[l].shop_price = (i[l].price / 1e4).toFixed(2);
        app.globalData.to_uid = e, app.globalData.from_id = o, app.globalData.nickName = t.info.name, app.globalData.avatarUrl = t.info.avatar, app.globalData.job_name = t.info.job_name, t.peoplesInfo = "";
        var u = t.info.myCompany.addr;
        if (u) {
          var c = u;
          20 < u.length && (c = u.slice(0, 20) + "..."), t.info.myCompany.addrMap = c
        }
        var p = t.info,
          g = p.bg,
          h = p.my_video,
          f = w.data.globalData.configInfo.config,
          _ = f.default_voice,
          m = f.default_voice_switch,
          x = f.default_video;
        g || (t.info.bg = _, t.info.bg_switch = m), h || (t.info.my_video = x), w.setData({
          cardIndexData: t,
          refreshCardIndex: !1,
          showTabBar: !0,
          "paramData.to_uid": e,
          "paramData.from_id": o
        }, function() {
          auth.checkAuth(w, _index.baseModel, _xx_util2.default);
          var a = w.data,
            t = a.currentTabBar,
            e = a.cardIndexData;
          if ("toCard" == t) {
            e.info.bg && (innerAudioContextBG.src = e.info.bg);
            wx.hideShareMenu();
            var o = 1;
            1 == e.info.bg_switch && e.info.bg && (console.log("自动播放背景音乐"), o = 2, innerAudioContextBG.play(function() {})), w.setData({
              playPushBgStatus: o
            }), console.log(e.info.bg_switch, "cardIndexData.info.bg_switch")
          }
          setTimeout(function() {
            w.getCardAfter()
          }, 500)
        })
      }
      if (-2 == a.errno) {
        console.log(a.message);
        var b = a.message;
        "card not found" == b && (b = "未找到该名片，去名片列表页看看吧"), wx.showModal({
          title: "",
          content: b,
          showCancel: !1,
          success: function(a) {
            a.confirm && w.setData({
              currentTabBar: "cardList",
              showTabBar: !1,
              cardIndexData: {},
              "collectionList.page": 1,
              "paramCardList.page": 1,
              "collectionList.list": [],
              loadingCardList: !1
            }, function() {
              w.getCollectionList()
            })
          }
        })
      }
    })
  },
  getCardAfter: function() {
    var g = this,
      a = {
        to_uid: g.data.paramData.to_uid
      },
      t = wx.getStorageSync("loginParamObj"),
      e = t.is_qr,
      o = t.is_group,
      n = t.type,
      i = t.target_id,
      r = t.from_id;
    a.from_id = r, a.is_qr = e, a.is_group = o, a.type = n, a.target_id = i, a.from_id = r, app.globalData.openGId_2 && (a.openGId = app.globalData.openGId_2), _index.userModel.getCardAfter(a).then(function(a) {
      _xx_util2.default.hideAll();
      var t = a.data,
        e = t.to_uid,
        o = t.is_boss,
        n = t.is_staff,
        i = t.coupon,
        r = t.coupon_last_record,
        s = t.peoplesInfo,
        d = t.tags,
        l = !1,
        u = !1;
      e == wx.getStorageSync("userid") && (1 == o && (u = !0), 1 == n && (l = !0)), app.globalData.isStaff = l, app.globalData.isBoss = u;
      var c = t.thumbs_up + 1 * t.staff_info.t_number,
        p = t.peoples + 1 * t.staff_info.view_number;
      g.setData({
        "cardIndexData.tags": d,
        "cardIndexData.peoplesInfo": s,
        "cardIndexData.coupon": i,
        "cardIndexData.coupon_last_record": r,
        "cardIndexData.isThumbs": t.isThumbs,
        "cardIndexData.voiceThumbs": t.voiceThumbs,
        "cardIndexData.thumbs_up2": c,
        "cardIndexData.peoples2": p,
        "cardIndexData.info.t_number": t.staff_info.t_number,
        "cardIndexData.info.view_number": t.staff_info.view_number,
        "globalData.isStaff": l,
        "globalData.isBoss": u
      }, function() {
        g.toShowVoucherFunction()
      })
    })
  },
  toPlayBgMusic: function() {
    var t = this,
      a = t.data,
      e = a.playPushBgStatus,
      o = a.cardIndexData,
      n = e;
    o.info.bg && (innerAudioContextBG.src = o.info.bg, 2 == n ? (t.setData({
      playPushBgStatus: 1
    }, function() {
      -2 == t.data.playPush_Status && (t.setData({
        playPushStatus: 2
      }), innerAudioContext.play(function() {}))
    }), innerAudioContextBG.pause(function() {})) : -1 == n ? (innerAudioContextBG.pause(function() {}), t.setData({
      playPushBgStatus: 1
    })) : (innerAudioContextBG.play(function() {}), t.setData({
      playPushBgStatus: 2
    }, function() {
      -2 == t.data.playPush_Status && (t.setData({
        playPushStatus: 1
      }), innerAudioContext.pause(function() {}))
    }))), innerAudioContextBG.onPlay(function(a) {
      console.log("开始播放", a)
    }), innerAudioContextBG.onStop(function(a) {
      console.log("结束播放", a)
    }), innerAudioContextBG.onEnded(function(a) {
      console.log("结束播放", a), t.setData({
        playPushBgStatus: 1
      }, function() {
        -2 == t.data.playPush_Status && (t.setData({
          playPushStatus: 2
        }), innerAudioContext.play(function() {}))
      })
    })
  },
  toVideoStop: function() {
    this.setData({
      playPushStatus: 1
    }), innerAudioContext.stop()
  },
  toBGdestroy: function() {
    var a = void 0;
    1 == this.data.playPushBgStatus && (a = -1), 2 == this.data.playPushBgStatus && (a = -2), this.setData({
      playPushBgStatus: a,
      toshowBG: !0
    }, function() {
      innerAudioContextBG.stop()
    })
  },
  toShowVoucherFunction: function() {
    var t = this,
      a = t.data,
      e = a.cardIndexData,
      o = a.tmp_showPrice,
      n = e.coupon_last_record,
      i = !0,
      r = "unreceive";
    if (0 < n.length) {
      var s = [];
      for (var d in n) s.push(n[d].user_id); - 1 < s.indexOf(e.user_id) && (i = !1, r = "receive")
    }
    t.setData({
      "voucherStatus.show": i,
      "voucherStatus.status": r
    }), 0 < n.length && t.data.voucherStatus.status && 1 == o && (timerCoupon = setInterval(function() {
      var a = t.data.tmp_coupon_i;
      t.setData({
        coupon_nickName: n[a].user_info.nickName,
        coupon_reduce: n[a].reduce,
        coupon_record: !0
      }, function() {
        setTimeout(function() {
          ++a == n.length && (a = 0), t.setData({
            coupon_record: !1,
            tmp_coupon_i: a
          })
        }, 5e3)
      })
    }, 1e4))
  },
  getEditPraiseStatus: function() {
    var o = this,
      a = {
        to_uid: app.globalData.to_uid,
        type: o.data.cardZanType
      };
    _index.userModel.getEditPraiseStatus(a).then(function(a) {
      _xx_util2.default.hideAll();
      var t = o.data.cardIndexData,
        e = "";
      if (3 == o.data.cardZanType) 1 == t.isThumbs ? (t.thumbs_up2 = 1 * t.thumbs_up2 - 1, t.isThumbs = 0, e = "取消靠谱！") : 0 == t.isThumbs && (t.thumbs_up2 = 1 * t.thumbs_up2 + 1, t.isThumbs = 1, e = "认为靠谱！");
      else if (1 == o.data.cardZanType) {
        e = "";
        1 == t.voiceThumbs ? (t.voiceThumbs = 0, e = "取消点赞！") : 0 == t.voiceThumbs && (t.voiceThumbs = 1, e = "点赞成功！")
      }
      wx.showToast({
        icon: "none",
        title: e,
        duration: 2e3
      }), o.setData({
        cardIndexData: t
      })
    })
  },
  toGetShareInfo: function() {
    var e = this;
    wx.login({
      success: function(a) {
        var t = {
          encryptedData: app.globalData.encryptedData,
          iv: app.globalData.iv,
          type: 1,
          code: a.code,
          to_uid: e.data.paramData.to_uid
        };
        _index.userModel.getShareInfo(t).then(function(a) {
          _xx_util2.default.hideAll(), clearInterval(timer)
        })
      }
    })
  },
  getShopTypes: function() {
    var s = this;
    s.data.refreshShop || _xx_util2.default.showLoading();
    var a = {
      to_uid: s.data.paramData.to_uid
    };
    _index.userModel.getShopTypes(a).then(function(a) {
      _xx_util2.default.hideAll(), console.log("getShopTypes==>", a.data);
      var t = a.data,
        e = t.shop_all,
        o = t.shop_type,
        n = t.shop_company,
        i = e.list;
      for (var r in i) i[r].shop_price = (i[r].price / 1e4).toFixed(2);
      s.setData({
        shop_all: e,
        shop_type: o,
        shop_company: n,
        showTabBar: !0
      })
    })
  },
  getShopList: function() {
    var i = this,
      a = i.data,
      r = a.refreshShop,
      t = a.paramShop,
      s = a.shop_all;
    r || _xx_util2.default.showLoading(), _index.userModel.getShopList(t).then(function(a) {
      console.log("getShopList==>", a.data);
      var t = s,
        e = a.data;
      r || (e.list = [].concat(_toConsumableArray(t.list), _toConsumableArray(e.list)));
      var o = e.list;
      for (var n in o) o[n].shop_price = (o[n].price / 1e4).toFixed(2);
      i.setData({
        shop_all: e,
        loadingShop: !1,
        refreshShop: !1,
        showTabBar: !0
      })
    })
  },
  getNewsList: function() {
    var l = this,
      a = l.data,
      u = a.refreshNews,
      t = a.paramNews,
      c = a.newsList;
    u || _xx_util2.default.showLoading(), _index.userModel.getNewsList(t).then(function(a) {
      _xx_util2.default.hideAll(), console.log("getNewsList==>", a.data);
      var t = c,
        e = a.data,
        o = e.list,
        n = l.data.newsIndex;
      for (var i in o) {
        for (var r in n.push(0), 2 == o[i].type && 3 == o[i].url_type && (o[i].content = "tel:" + o[i].content), o[i].show_more = 0, o[i].show_type = 0, o[i].thumbs) 0 != o[i].thumbs[r].user && o[i].thumbs[r].user.nickName || o[i].thumbs.splice(r, 1), 20 < o[i].thumbs.length && (o[i].show_more = 1);
        for (var s in o[i].show_c_more = 0, o[i].show_c_type = 0, o[i].comments) 0 != o[i].comments[s].user && o[i].comments[s].user.nickName || o[i].comments.splice(s, 1), 5 < o[i].comments.length && (o[i].show_c_more = 1);
        for (var d in o[i].cover) 1 == o[i].type || o[i].cover[d] || o[i].cover.splice(d, 1)
      }
      u || (e.list = [].concat(_toConsumableArray(t.list), _toConsumableArray(e.list))), l.setData({
        newsList: e,
        newsIndex: n,
        loadingNews: !1,
        refreshNews: !1
      })
    })
  },
  addEva: function(a) {
    var t = a.detail.value;
    this.setData({
      evaContent: t
    })
  },
  getThumbs: function(e) {
    var o = this,
      a = {
        id: o.data.ThumbsId,
        to_uid: app.globalData.to_uid
      };
    _index.userModel.getThumbs(a).then(function(a) {
      _xx_util2.default.hideAll(), console.log("getThumbs==>", a.data);
      var t = o.data.newsList;
      0 < t.list.length ? (1 == t.list[e].is_thumbs ? t.list[e].is_thumbs = 0 : t.list[e].is_thumbs = 1, 20 < t.list[e].thumbs.length && (t.list[e].show_type = 1), o.setData({
        newsList: t,
        evaStatus: !1,
        showTabBar: !0
      }, function() {
        o.getNewThumbsComment(o.data.ThumbsId)
      })) : o.setData({
        evaStatus: !1,
        showTabBar: !0
      }, function() {
        o.getNewThumbsComment(o.data.ThumbsId)
      })
    })
  },
  getComment: function() {
    var n = this,
      a = {
        id: n.data.evaId,
        to_uid: app.globalData.to_uid,
        content: n.data.evaContent
      };
    _index.userModel.getComment(a).then(function(a) {
      _xx_util2.default.hideAll(), console.log("getComment==>", a.data);
      var t = n.data,
        e = t.currentNewsIndex,
        o = t.newsList;
      5 < o.list[e].comments.length && (o.list[e].show_c_type = 1), n.setData({
        evaStatus: !1,
        showTabBar: !0,
        newsList: o
      }, function() {
        n.getNewThumbsComment(n.data.evaId)
      })
    })
  },
  getNewThumbsComment: function(a) {
    var d = this,
      t = {
        id: a,
        to_uid: app.globalData.to_uid
      };
    _index.userModel.getNewThumbsComment(t).then(function(a) {
      _xx_util2.default.hideAll(), console.log("getNewThumbsComment==>", a.data);
      var t = d.data.newsList,
        e = d.data.currentNewsIndex,
        o = a.data,
        n = o.thumbs,
        i = o.comments;
      for (var r in n) 0 != n[r].user && n[r].user.nickName || n.splice(r, 1);
      for (var s in i) 0 != i[s].user && i[s].user.nickName || i.splice(s, 1);
      t.list[e].thumbs = n, t.list[e].comments = i, d.setData({
        newsList: t,
        evaStatus: !1,
        showTabBar: !0,
        evaContent: "",
        ThumbsId: "",
        evaId: "",
        index: ""
      })
    })
  },
  getModular: function() {
    var i = this,
      r = i.data;
    r || _xx_util2.default.showLoading();
    var a = {
      to_uid: i.data.paramData.to_uid
    };
    _index.userModel.getModular(a).then(function(a) {
      _xx_util2.default.hideAll(), console.log("getModular==>", a.data);
      var t = a.data,
        e = t.company_company,
        o = t.company_modular;
      for (var n in r = !1, o) 4 == o[n].type && (o[n].info.markers = [{
        iconPath: "https://retail.xiaochengxucms.com/images/12/2018/11/A33zQycihMM33y337LH23myTqTl3tl.png",
        id: 1,
        callout: {
          content: o[n].info.address,
          fontSize: 14,
          bgColor: "#ffffff",
          padding: 4,
          display: "ALWAYS",
          textAlign: "center",
          borderRadius: 2
        },
        latitude: o[n].info.latitude,
        longitude: o[n].info.longitude,
        width: 28,
        height: 28
      }]);
      i.setData({
        company_company: e,
        company_modular: o,
        refreshCompany: r,
        showTabBar: !0
      })
    })
  },
  swiperChange: function(a) {
    var t = a.detail.current;
    this.setData({
      swiperIndexCur: t
    })
  },
  getForwardRecord: function(a, t) {
    var e = {
      type: a,
      to_uid: app.globalData.to_uid
    };
    2 != a && 3 != a || (e.target_id = t), _index.userModel.getForwardRecord(e).then(function(a) {
      _xx_util2.default.hideAll()
    })
  },
  getCopyRecord: function(a) {
    var t = {
      type: a,
      to_uid: app.globalData.to_uid
    };
    _index.userModel.getCopyRecord(t).then(function(a) {
      _xx_util2.default.hideAll()
    })
  },
  getShareRecord: function() {
    var a = {
      to_uid: app.globalData.to_uid
    };
    _index.userModel.getShareRecord(a).then(function(a) {
      _xx_util2.default.hideAll()
    })
  },
  getPhoneNumber: function(a) {
    if ("getPhoneNumber:ok" == a.detail.errMsg) {
      var t = a.detail.encryptedData,
        e = a.detail.iv;
      this.setPhoneInfo(t, e)
    } else a.detail.errMsg;
    this.ddd()
  },
  setPhoneInfo: function(a, t) {
    var o = this,
      e = {
        encryptedData: a,
        iv: t,
        to_uid: app.globalData.to_uid
      };
    _index.userModel.getPhone(e).then(function(e) {
      _xx_util2.default.hideAll(), app.globalData.hasClientPhone = !0, app.globalData.auth.authPhoneStatus = !0, o.setData({
        "globalData.hasClientPhone": !0,
        "globalData.auth.authPhoneStatus": !0
      }, function() {
        if (e.data.phone) {
          var a = wx.getStorageSync("userid"),
            t = wx.getStorageSync("user"),
            pid = wx.getStorageSync("pid");
            ispass = wx.getStorageSync("ispass");
          t.phone = e.data.phone, wx.setStorageSync("userid", a),wx.setStorageSync("pid", pid),wx.setStorageSync("ispass", ispass), wx.setStorageSync("user", t)
        }
      })
    })
  },
  getVoucher: function(a) {
    voucher.getVoucher(this, _index.userModel, _xx_util2.default, a)
  },
  getDismantling: function(a) {
    voucher.toGetCoupon(this, _index.userModel, _xx_util2.default)
  },
  toShareVoucher: function() {
    voucher.toShareVoucher(this)
  },
  toBigVoucher: function() {
    voucher.toBigVoucher(this)
  },
  toCloseVoucher: function() {
    voucher.toCloseVoucher(this)
  },
  checkAuthStatus: function() {
    auth.checkAuth(this, _index.baseModel, _xx_util2.default)
  },
  getAuthPhoneNumber: function(a) {
    auth.getAuthPhoneNumber(a)
  },
  getUserInfo: function(a) {
    auth.getUserInfo(a), console.log(" auth.getUserInfo(e)  *******************", a)
  },
  addEvaBtn: function(a) {
    if (!this.data.evaContent) return wx.showToast({
      icon: "none",
      title: "请输入评论内容！",
      duration: 2e3
    }), !1;
    this.getComment()
  },
  officialAccountErr: function(a) {
    console.log(a, "officialAccountErr")
  },
  officialAccount: function(a) {
    var t = a.detail,
      e = t.status,
      o = t.errMsg;
    console.log("official-account ==>", e, o)
  },
  getChangeCard: function(a) {
    var t = this;
    if ("getPhoneNumber:ok" == a.detail.errMsg) {
      console.log("同意交换手机号码");
      var e = a.detail.encryptedData,
        o = a.detail.iv;
      t.setData({
        changeCardText: "存入通讯录"
      }, function() {
        t.toSavePhoneNumber(1), t.setPhoneInfo(e, o), t.setData({
          isToShowCard: !1
        })
      })
    } else if ("getPhoneNumber:fail user deny" == a.detail.errMsg) {
      console.log("拒绝交换手机号码");
      var n = t.data.globalData.configInfo.config.force_phone;
      n || (n = 0), 1 == n && 0 == t.data.globalData.hasClientPhone ? (app.globalData.auth.authPhoneStatus = !1, t.setData({
        "globalData.auth.authPhoneStatus": !1
      })) : t.toSavePhoneNumber(1), t.setData({
        isToShowCard: !1
      })
    }
  },
  toSavePhoneNumber: function(t) {
    var e = this,
      a = e.data.cardIndexData.info,
      o = a.avatar,
      n = a.name,
      i = a.phone,
      r = a.telephone,
      s = a.wechat,
      d = a.email,
      l = a.myCompany,
      u = a.bg;
    e.toVideoStop(), e.toBGdestroy(), wx.addPhoneContact({
      photoFilePath: o,
      firstName: n,
      mobilePhoneNumber: i,
      hostNumber: r,
      weChatNumber: s,
      email: d,
      organization: l.name,
      workAddressCity: l.addr,
      success: function(a) {
        e.setData({
          isToShowCard: !1
        }, function() {
          app.globalData.to_uid != wx.getStorageSync("userid") && e.getCopyRecord(t)
        })
      },
      complete: function(a) {
        innerAudioContextBG.src = u
      }
    })
  },
  toCheckAuthPhoneStatus: function() {
    var a = this,
      t = !0;
    getApp().globalData.configInfo.config && 1 == getApp().globalData.configInfo.config.force_phone && 0 == getApp().globalData.hasClientPhone && (t = !1), getApp().globalData.auth.authStatus = !0, getApp().globalData.auth.authPhoneStatus = t, a.setData({
      "globalData.auth.authStatus": !0,
      "globalData.auth.authPhoneStatus": t
    }, function() {
      1 == t && a.data.currentTabBar
    })
  },
  toPreviewImg: function(a) {
    var t = _xx_util2.default.getData(a),
      e = t.status,
      o = t.index,
      n = t.src;
    if ("toNewsPreview" == e) {
      var i = this.data.newsList.list[o].cover;
      0 < i.length && wx.previewImage({
        current: n,
        urls: i
      })
    }
  },
  toJump: function(n) {
    var e = this,
      a = _xx_util2.default.getData(n),
      o = a.status,
      t = a.index,
      i = a.id,
      r = a.content,
      s = a.type,
      d = a.shareimg,
      l = a.url;
    if ("toSee" == o && e.setData({
        isToShowCard: -1
      }, setTimeout(function() {
        e.setData({
          isToShowCard: !1
        }), e.toCheckAuthPhoneStatus()
      }, 500)), "toTagsClick" == o) {
      var u = e.data.cardIndexData.tags;
      u[t].clicked = 1, u[t].count = 1 * u[t].count + 1, e.setData({
        "cardIndexData.tags": u
      }, setTimeout(function() {
        e.setData({
          clickedInd: t
        }, setTimeout(function() {
          e.setData({
            clickedInd: "-1"
          })
        }, 1e3))
      }, 200));
      var c = {
        tag_id: u[t].id
      };
      _index.userModel.getTagsClick(c).then(function(a) {
        _xx_util2.default.hideAll()
      })
    }
    if ("toTagsAgainClick" == o && _xx_util2.default.showFail("已经点赞过了！"), "toSearchCardFocus" == o && e.setData({
        toSearchCard: !0
      }), "toCopyright" == o && e.data.globalData.configInfo.config.logo_phone && app.util.goUrl(n), "toJumpUrl" != o && "toStaff" != o && "toBoss" != o && "toShowMore" != o && "toCarIndex" != o && "toMine" != o || ("toStaff" != o && "toBoss" != o || (e.toVideoStop(), innerAudioContextBG.stop()), app.util.goUrl(n)), "toImgJump" == o) {

      var p = e.data.globalData.configInfo.config.preview_switch,
        g = e.data.cardIndexData.info.images;
      console.log('点击了'+p)
      console.log(g,'图片集合')
      //if (1 == p) {
        if (0 < g.length) {
          e.toVideoStop(), e.toBGdestroy();
          var h = n.target.dataset.src;
          wx.previewImage({
            current: h,
            urls: g
          })
        }
      //} else app.util.goUrl(n)
    }
    if ("toMoreDetail" == o && (l = l + "&to_uid=" + app.globalData.to_uid, wx.navigateTo({
        url: l
      })), "toSearchCard" == o);
    else if ("toAddCard" == o) e.setData({
      onshowStatus: "createCard"
    }, function() {
      wx.navigateTo({
        url: "/longbing_card/staffs/pages/mine/editInfo/editInfo?status=createCard"
      })
    });
    else if ("toCardIndex" == o) {
      e.toBGdestroy(), app.util.showLoading(1);
      var f = wx.getStorageSync("userid"),
        _ = wx.getStorageSync("user"),
        m = wx.getStorageSync("isShowCard"),
          pid=wx.getStorageSync("pid"),
          ispass=wx.getStorageSync("ispass"),
        x = wx.getStorageSync("isShowMessage");
      wx.clearStorageSync(), wx.setStorageSync("userid", f),wx.setStorageSync("pid", pid),wx.setStorageSync("ispass", ispass), wx.setStorageSync("user", _), wx.setStorageSync("isShowCard", m), wx.setStorageSync("isShowMessage", x);
      var b = e.data.collectionList.list,
        w = b[t].userInfo.fans_id,
        S = wx.getStorageSync("userid"),
        D = b[t].userInfo.name;
      app.globalData.isStaff = -1, app.globalData.to_uid = w, app.globalData.from_id = S, app.globalData.nickName = D, wx.showShareMenu({
        withShareTicket: !0,
        success: function(a) {},
        fail: function(a) {}
      }), e.setData({
        "paramData.isStaff": -1,
        "paramData.to_uid": w,
        "paramData.from_id": S,
        currentTabBarInd: 0,
        currentTabBar: "toCard",
        showTabBar: !0,
        globalData: app.globalData,
        refreshCardIndex: !1,
        cardIndexData: {}
      });
      var v = getApp().globalData.tabBarList[0].text;
      app.globalData.configInfo.config.mini_app_name && (v = app.globalData.configInfo.config.mini_app_name), wx.setNavigationBarTitle({
        title: v
      }), e.getCardIndexData(), setTimeout(function() {
        if ("cardList" != e.data.currentTabBar && e.data.paramData.to_uid != wx.getStorageSync("userid")) {
          if (0 == app.globalData.clientUnread && 0 == e.data.clientUnread || 0 == app.globalData.clientUnread && 1 == e.data.clientUnread) {
            var a = e.data.cardIndexData.to_uid,
              t = wx.getStorageSync("isShowMessage");
            t || (t = []), -1 < t.indexOf(a) || a == wx.getStorageSync("userid") ? app.globalData.clientUnread = 0 : (app.globalData.clientUnread = 1, t.push(a), wx.setStorageSync("isShowMessage", t))
          }
          e.getShowClientUnread()
        }
      }, 1e3), wx.pageScrollTo({
        duration: 0,
        scrollTop: 0
      }), wx.hideLoading()
    }
    if ("toCardZan" == o ? (e.setData({
        toLeavingMessage: !1,
        cardZanType: s
      }), e.getEditPraiseStatus()) : "toVoice" == o ? (innerAudioContext.autoplay = !0, innerAudioContext.src = e.data.cardIndexData.info.voice, 1 == s && (e.setData({
        playPushStatus: 2,
        playPush_Status: -2
      }, function() {
        2 == e.data.playPushBgStatus && (e.setData({
          playPushBgStatus: -2
        }), innerAudioContextBG.pause(function() {}))
      }), innerAudioContext.play(function() {}), app.globalData.to_uid != wx.getStorageSync("userid") && e.getCopyRecord(9)), 2 == s && (innerAudioContext.pause(function() {}), e.setData({
        playPushStatus: 1,
        playPush_Status: 1
      }, function() {
        if (-2 == e.data.playPushBgStatus) {
          var a = e.data.cardIndexData;
          a.info.bg && (innerAudioContextBG.src = a.info.bg, e.setData({
            playPushBgStatus: 2
          }, function() {
            innerAudioContextBG.play(function() {})
          }))
        }
      })), innerAudioContext.onEnded(function() {
        e.setData({
          playPushStatus: 1,
          playPush_Status: 1
        }, function() {
          if (-2 == e.data.playPushBgStatus) {
            var a = e.data.cardIndexData;
            a.info.bg && (innerAudioContextBG.src = a.info.bg, e.setData({
              playPushBgStatus: 2
            }, function() {
              innerAudioContextBG.play(function() {})
            }))
          }
        })
      })) : "toCardList" == o ? (app.util.showLoading(1), clearInterval(timerCoupon), e.setData({
        showTabBar: !1,
        currentTabBar: "cardList",
        show: !1,
        moreStatus: 1,
        playPushStatus: 1,
        playPushBgStatus: 1,
        collectionList: {
          page: 1,
          total_page: "",
          list: []
        },
        "paramCardList.page": 1,
        voucherStatus: {
          show: 0,
          status: "unreceive"
        },
        "globalData.isStaff": !1,
        "globalData.isBoss": !1,
        cardIndexData: {},
        shop_all: {
          page: 1,
          total_page: "",
          list: []
        },
        newsList: {
          page: 1,
          total_page: "",
          list: []
        },
        newsIndex: [],
        company_company: {},
        company_modular: [],
        tmp_coupon_i: 0,
        coupon_record: !1,
        coupon_nickName: "",
        coupon_reduce: ""
      }, function() {
        e.toVideoStop(), innerAudioContextBG.stop()
      }), wx.setNavigationBarTitle({
        title: "名片列表"
      }), wx.hideShareMenu(), e.getCollectionList(), wx.pageScrollTo({
        duration: 0,
        scrollTop: 0
      }), wx.hideLoading()) : "toConsult" == o ? (e.setData({
        toLeavingMessage: !0
      }), app.globalData.to_uid != wx.getStorageSync("userid") && e.getCopyRecord(8), e.data.globalData.hasClientPhone, e.ddd()) : "toShareCard" == o && (2 == s && (e.toVideoStop(), e.toBGdestroy()), e.setData({
        showShareStatus: 0
      })), wx.onBackgroundAudioStop(function() {
        e.setData({
          playPushStatus: 1
        })
      }), "toShopDetail" == o) {
      var y = "";
      "toCard" == e.data.currentTabBar ? (y = e.data.cardIndexData.goods, e.toVideoStop(), e.toBGdestroy(),wx.hideShareMenu()) : "toShop" == e.data.currentTabBar && (y = e.data.shop_all.list), wx.navigateTo({
        url: "/longbing_card/pages/shop/detail/detail?id=" + y[t].id + "&to_uid=" + app.globalData.to_uid + "&from_id=" + app.globalData.from_id
      })
    } else if ("toTabClickMore" == o || "toTabClick" == o) {
      var C = n.currentTarget.dataset.categoryid,
        T = t,
        I = C;
      "toTabClickMore" == o && (T = "100000101", I = "All"), e.setData({
        activeIndex: T,
        categoryid: C,
        scrollNav: "scrollNav" + I,
        "paramShop.list": [],
        "paramShop.page": 1,
        "paramShop.type_id": C,
        refreshShop: !0
      }), e.getShopList()
    }
    if ("toNewsShow" == o) {
      var B = e.data.newsIndex;
      1 != s ? B[t] = 1 : 1 == s && (B[t] = 2), e.setData({
        newsIndex: B,
        currentNewsIndex: t
      })
    } else if ("toShowTag" == o) {
      var L = e.data.newsList.list;
      (L[t].show_type = 1) == s && (L[t].show_type = 0), e.setData({
        "newsList.list": L
      })
    } else if ("toShowComment" == o) {
      var P = e.data.newsList.list;
      (P[t].show_c_type = 1) == s && (P[t].show_c_type = 0), e.setData({
        "newsList.list": P
      })
    } else if ("toNewsZan" == o) {
      var A = e.data.newsIndex;
      for (var N in A) 1 == A[N] && (A[N] = 0);
      e.setData({
        newsIndex: A,
        toLeavingMessage: !1,
        ThumbsId: i
      }, function() {
        e.getThumbs(t)
      })
    } else if ("toEva" == o) {
      var M = e.data.newsIndex;
      for (var U in M) 1 == M[U] && (M[U] = 0);
      e.setData({
        newsIndex: M,
        toLeavingMessage: !1,
        evaId: i,
        evaStatus: !0,
        showTabBar: !1
      })
    } else if ("toAddEvaBtn" == o) {
      if (!e.data.evaContent) return wx.showToast({
        icon: "none",
        title: "请输入评论内容！",
        duration: 2e3
      }), !1;
      e.getComment()
    } else if ("toNewsDetail" == o) {
      var G = e.data.newsList.list;
      if (1 == G[t].type) {
        var k = "/longbing_card/users/pages/news/detail/detail?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&status=toPlayVideo&name=" + G[t].title + "&src=" + G[t].content + "&report_id=" + G[t].id + "&id=" + G[t].id + "&shareimg=",
          R = G[t].cover[0];
        R || (R = app.globalData.companyVideoImg), k += R = encodeURIComponent(R), wx.navigateTo({
          url: k
        })
      } else if (2 == G[t].type)
        if (1 == G[t].url_type) {
          var F = encodeURIComponent(G[t].content),
            V = "/longbing_card/common/webview/webview?id=" + i + "&to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&status=newsLine&url=" + F + "&name=" + G[t].title + "&report_id=" + G[t].id + "&shareimg=",
            q = G[t].cover[0];
          q && (V += q = encodeURIComponent(q)), wx.navigateTo({
            url: V
          })
        } else if (2 == G[t].url_type) {
        var j = {
          to_uid: app.globalData.to_uid,
          sign: "view",
          type: 10,
          target: G[t].id,
          scene: app.globalData.loginParam.scene,
          uniacid: app.siteInfo.uniacid
        };
        app.globalData.to_uid != wx.getStorageSync("userid") && e.toGetReport(j), app.util.goUrl(n)
      } else app.util.goUrl(n);
      else if (0 == G[t].type) {
        var E = "/longbing_card/users/pages/news/detail/detail?id=" + i + "&from_id=" + wx.getStorageSync("userid");
        0 != G[t].user_id && (E = E + "&isStaff=true&to_uid=" + G[t].user_info.fans_id), 0 == !G[t].user_id && (E = E + "&companyName=" + e.data.newsList.timeline_company.name), wx.navigateTo({
          url: E
        })
      }
    }
    if ("toDetail" == o) {
      var H = e.data.company_modular;
      if (5 == H[t].type) return !1;
      wx.navigateTo({
        url: "/longbing_card/users/pages/company/detail/detail?table_name=" + H[t].table_name + "&type=" + H[t].type + "&id=" + i + "&name=" + H[t].name + "&to_uid=" + e.data.cardIndexData.to_uid
      })
    } else if ("toCallHot" == o || "toCall" == o) {
      if (e.toVideoStop(), e.toBGdestroy(), !r || "暂未填写" == r) return !1;
      wx.makePhoneCall({
        phoneNumber: r,
        success: function(a) {
          if (app.globalData.to_uid != wx.getStorageSync("userid"))
            if ("toCallHot" == o) {
              var t = {
                to_uid: e.data.paramData.to_uid,
                sign: "copy",
                type: s,
                scene: app.globalData.loginParam.scene,
                uniacid: app.siteInfo.uniacid
              };
              e.toGetReport(t)
            } else "toCall" == o && e.getCopyRecord(s)
        }
      })
    } else "toPlayVideo" == o ? ("toCard" == e.data.currentTabBar && (e.toVideoStop(), e.toBGdestroy()), r = r + "&shareimg=" + encodeURIComponent(d), wx.navigateTo({
      url: r
    })) : "toCompanyMap" == o && wx.authorize({
      scope: "scope.userLocation",
      success: function(a) {
        wx.getLocation({
          type: "gcj02",
          success: function(a) {
            var t = _xx_util2.default.getData(n),
              e = t.latitude,
              o = t.longitude;
            wx.openLocation({
              latitude: parseFloat(e),
              longitude: parseFloat(o),
              name: r,
              scale: 28
            })
          }
        })
      },
      fail: function(a) {
        var t = a.errMsg;
        (-1 < t.indexOf("fail auth deny") || -1 < t.indexOf("fail:auth deny")) && e.setData({
          isSetting: !0
        })
      }
    })
  },
  toGetReport: function(a) {
    _index.baseModel.getReport(a).then(function(a) {
      _xx_util2.default.hideAll()
    })
  },
  getModularForm: function(a, t, e, o) {
    var n = {
      modular_id: this.data.company_modular[o].id,
      name: a,
      phone: t,
      content: e
    };
    _index.userModel.getModularForm(n).then(function(a) {
      _xx_util2.default.hideAll(), wx.showModal({
        title: "",
        content: "留言成功，请等待管理员处理",
        showCancel: !1,
        confrimText: "知道啦"
      })
    })
  },
  formTmpSubmit: function(a) {
    var t = a.detail.formId,
      e = _xx_util2.default.getFromData(a),
      o = e.status,
      n = e.index,
      i = a.detail.value,
      r = i.name,
      s = i.phone,
      d = i.content;
    this.data.company_modular;
    if ("toFormSubmit" == o) {
      if (!r) return wx.showModal({
        title: "",
        content: "请填写您的名字！"
      }), !1;
      if (!s) return wx.showModal({
        title: "",
        content: "请填写您的联系电话！"
      }), !1;
      if (!d) return wx.showModal({
        title: "",
        content: "请填写您想说的话！"
      }), !1;
      this.getModularForm(r, s, d, n)
    }
    this.toSaveFormIds(t)
  },
  toSetTabMenu: function(a) {
    var t = this;
    console.log(a, "toSetTabMenu");
    var e = _xx_util2.default.getData(a),
      o = e.status,
      n = e.index,
      i = e.type,
      r = e.text;
    e.contnet;
    if ("toTabBar" == o) {
      if (t.setData({
          currentTabBarInd: n,
          toCardStatus: "tabBar"
        }, function() {
          wx.getStorageSync("user").avatarUrl || auth.checkAuth(t, _index.baseModel, _xx_util2.default)
        }), "toCard" == i) app.globalData.configInfo.config.mini_app_name && (r = app.globalData.configInfo.config.mini_app_name), wx.setNavigationBarTitle({
        title: r
      }), t.setData({
        currentTabBar: i
      }),wx.hideShareMenu();
      else "toPageUrl" == t.data.globalData.tabBarList[n].jump ? (wx.setNavigationBarTitle({
        title: r
      }), t.setData({
        currentTabBar: i
      }), wx.hideShareMenu()) : app.util.goUrl(a, !0);
      wx.pageScrollTo({
        duration: 0,
        scrollTop: 0
      })
    }
    getApp().getConfigInfo().then(function() {
      t.setData({
        globalData: app.globalData
      }, function() {
        "toCard" == t.data.currentTabBar ? t.setData({
          refreshCardIndex: !1
        },wx.hideShareMenu(), function() {
          "tabBar" == t.data.toCardStatus && (t.data.cardIndexData.to_uid || t.getCardIndexData())
        }) : "toShop" == t.data.currentTabBar ? t.setData({
          refreshShop: !1
        }, function() {
          0 == t.data.shop_all.list.length && (_xx_util2.default.showLoading(), t.getShopTypes())
        }) : "toNews" == t.data.currentTabBar ? t.setData({
          "paramNews.to_uid": t.data.paramData.to_uid,
          refreshNews: !1
        }, function() {
          0 == t.data.newsList.list.length && t.getNewsList()
        }) : "toCompany" == t.data.currentTabBar && t.setData({
          refreshCompany: !1
        }, function() {
          (!t.data.company_modular || t.data.company_modular.length < 1) && t.getModular()
        }), t.toSaveFormIds(formId)
      })
    })
  },
  formSubmit: function(a) {
    var n = this,
      t = a.detail.formId,
      e = a.detail.target.dataset,
      o = e.status,
      i = e.index,
      r = e.type,
      s = e.text,
      d = e.content;
    if (n.setData({
        toCardStatus: ""
      }), "toJumpUrlAppid" == o && (console.log(o, "//////**88"), app.util.goUrl(a, !0)), "toTabBar" == o) {
      if (n.setData({
          currentTabBarInd: i,
          toCardStatus: "tabBar"
        }, function() {
          wx.getStorageSync("user").avatarUrl || auth.checkAuth(n, _index.baseModel, _xx_util2.default)
        }), "toCard" == r) n.toPlayBgMusic(), app.globalData.configInfo.config.mini_app_name && (s = app.globalData.configInfo.config.mini_app_name), wx.setNavigationBarTitle({
        title: s
      }), n.setData({
        currentTabBar: r
      }), wx.showShareMenu({
        withShareTicket: !0,
        success: function(a) {},
        fail: function(a) {}
      });
      else {
        var l = void 0;
        1 == n.data.playPushBgStatus && (l = -1), 2 == n.data.playPushBgStatus && (l = -2), n.setData({
          playPushStatus: 1,
          playPushBgStatus: l
        }, function() {
          innerAudioContext.stop(), innerAudioContextBG.stop()
        }), "toPageUrl" == n.data.globalData.tabBarList[i].jump ? (wx.setNavigationBarTitle({
          title: s
        }), n.setData({
          currentTabBar: r
        }), wx.showShareMenu()) : app.util.goUrl(a, !0)
      }
      wx.pageScrollTo({
        duration: 0,
        scrollTop: 0
      })
    } else if ("toCardMore" == o) {
      var u = 1;
      1 == d && (u = 2), n.setData({
        moreStatus: u
      })
    } else if ("toCallHot" == o || "toCall" == o) {
      if (!d || "暂未填写" == d) return !1;
      wx.makePhoneCall({
        phoneNumber: d,
        success: function(a) {
          if (app.globalData.to_uid != wx.getStorageSync("userid"))
            if ("toCallHot" == o) {
              var t = {
                to_uid: n.data.paramData.to_uid,
                sign: "copy",
                type: r,
                scene: app.globalData.loginParam.scene,
                uniacid: app.siteInfo.uniacid
              };
              n.toGetReport(t)
            } else "toCall" == o && n.getCopyRecord(r)
        }
      })
    } else if ("toCopy" == o) {
      if (!d || "暂未填写" == d) return !1;
      wx.setClipboardData({
        data: d,
        success: function(a) {
          wx.getClipboardData({
            success: function(a) {
              app.globalData.to_uid != wx.getStorageSync("userid") && n.getCopyRecord(r)
            }
          })
        }
      })
    } else "toMap" == o ? (n.toVideoStop(), n.toBGdestroy(), wx.authorize({
      scope: "scope.userLocation",
      success: function(a) {
        wx.getLocation({
          type: "gcj02",
          success: function(a) {
            var t = n.data.cardIndexData.info.myCompany,
              e = t.latitude,
              o = t.longitude;
            wx.openLocation({
              latitude: parseFloat(e),
              longitude: parseFloat(o),
              name: d,
              scale: 28
            })
          }
        })
      },
      fail: function(a) {
        var t = a.errMsg;
        (-1 < t.indexOf("fail auth deny") || -1 < t.indexOf("fail:auth deny")) && n.setData({
          isSetting: !0
        })
      }
    })) : "toShowShare" == o ?(wx.getStorageSync('ispass')? wx.showToast({
      icon: "none",
      title: '已过期，无法分享',
      duration: 2e3
    }):n.setData({
      showShareStatus: 1
    })) : "toAddPhone" == o ? n.toSavePhoneNumber(r) : "toShareCard" == o ? (2 == r && wx.navigateTo({
      url: "/longbing_card/users/pages/card/share/share"
    }), n.setData({
      showShareStatus: 0
    })) : "toNav" == o && app.util.goUrl(a, !0);
    getApp().getConfigInfo().then(function() {
      n.setData({
        globalData: app.globalData
      }, function() {
        "toCard" == n.data.currentTabBar ? n.setData({
          refreshCardIndex: !1
        },wx.hideShareMenu(), function() {
          "tabBar" == n.data.toCardStatus && (n.data.cardIndexData.to_uid || n.getCardIndexData())
        }) : "toShop" == n.data.currentTabBar ? n.setData({
          refreshShop: !1
        }, function() {
          0 == n.data.shop_all.list.length && n.getShopTypes()
        }) : "toNews" == n.data.currentTabBar ? n.setData({
          "paramNews.to_uid": n.data.paramData.to_uid,
          refreshNews: !1
        }, function() {
          0 == n.data.newsList.list.length && n.getNewsList()
        }) : "toCompany" == n.data.currentTabBar && n.setData({
          refreshCompany: !1
        }, function() {
          n.data.company_modular && 0 != n.data.company_modular.length || n.getModular()
        }), n.toSaveFormIds(t)
      })
    })
  },
  toSaveFormIds: function(a) {
    var t = {
      formId: a
    };
    _index.baseModel.getFormId(t).then(function(a) {})
  },
  //创建名片
  gocreate:function(){
    wx.navigateTo({
      url: '/longbing_card/staffs/pages/mine/editInfo/editInfo?status=createCard',
    })
  },
  //我的产品
  mygood:function(){
    wx.showToast({
      title: '待开发',
    })
  },
  proimg:function(e){
    console.log(e,'查看数据')
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  }
});