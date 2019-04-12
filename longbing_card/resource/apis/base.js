Object.defineProperty(exports, "__esModule", {value: !0});
var _xx_request = require("../js/xx_request.js");
exports.default = {
    getLogin: function (e) {
        return _xx_request.req.post("login", e)
    },
    getBind: function (e) {
        return _xx_request.req.post("binduser", e)
    },
    getCopyRecord: function (e) {
        return _xx_request.req.post("copyRecord", e)
    },
    getFormId: function (e) {
        return _xx_request.req.post("formid", e)
    },
    getConfigV2: function (e) {
        return _xx_request.req.post("configV3", e)
    },
    getUserPhone: function (e) {
        return _xx_request.req.post("UserPhone", e)
    },
    getUpdateUserInfo: function (e) {
        return _xx_request.req.post("update", e)
    },
    getClientUnread: function (e) {
        return _xx_request.fly.post(_xx_request.tmpUrl + "ClientUnread", e)
    },
    getChatInfo: function (e) {
        return _xx_request.req.post("messageinfo", e)
    },
    getShareimg: function (e) {
        return _xx_request.req.get("getshareimg", e)
    },
    getPhone: function (e) {
        return _xx_request.req.post("phone", e)
    },
    getReport: function (e) {
        return _xx_request.req.post("radarreport", e)
    },
    //我的接口开始
    getUserinfo_me(param) {
        return _xx_request.req.post("CheckPasstime", param)
    },
    getVipprice(param) {
        return _xx_request.req.post("Getvipprice", param)
    },
    YQcode(param) {
        return _xx_request.req.post("YQcode", param)
    },
    WXpay(param) {
        return _xx_request.req.post("MyPay", param)
    },
    //分销页面
  Userinfo(param) {
    return _xx_request.req.post("Userinfo", param)
  },
  //提现接口
  TX(param) {
    return _xx_request.req.post("TX", param)
  },
  GetTeam(param){
    return _xx_request.req.post("GetTeam", param)
  },
  TXlist(param) {
    return _xx_request.req.post("TXlist", param)
  },
  Getteamorder(param) {
    return _xx_request.req.post("Getteamorder", param)
  },
  Userbook(param) {
    return _xx_request.req.post("Userbook", param)
  },
  Readuserbook(param) {
    return _xx_request.req.post("Readuserbook", param)
  },
  //过期提示3天以后再提示
   Addpasstime(param) {
    return _xx_request.req.post("Addpasstime", param)
  },
    //我的接口结束
};