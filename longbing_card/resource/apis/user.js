Object.defineProperty(exports, "__esModule", {value: !0});
var _xx_request = require("../js/xx_request.js");
exports.default = {
    getCollectionList: function (e) {
        return _xx_request.req.post("cardsV2", e)
    }, getCardIndexData: function (e) {
        return _xx_request.req.post("cardV5", e)
    }, getEditStaffV2: function (e) {
        return _xx_request.req.post("EditStaffV2", e)
    }, getCardShow: function (e) {
        return _xx_request.req.get("cardshow", e)
    }, getCardAfter: function (e) {
        return _xx_request.req.post("cardafter", e)
    }, getEditPraiseStatus: function (e) {
        return _xx_request.req.post("thumbs", e)
    }, getForwardRecord: function (e) {
        return _xx_request.req.post("Forward", e)
    }, getCopyRecord: function (e) {
        return _xx_request.req.post("copyRecord", e)
    }, getShareRecord: function (e) {
        return _xx_request.req.post("record", e)
    }, getShareInfo: function (e) {
        return _xx_request.req.post("getShare", e)
    }, getCodeRecord: function (e) {
        return _xx_request.req.post("customQrRecordInsert", e)
    }, getPhone: function (e) {
        return _xx_request.req.post("phone", e)
    }, getShopTypes: function (e) {
        return _xx_request.req.post("ShopTypesV2", e)
    }, getShopList: function (e) {
        return _xx_request.req.post("ShopGoods", e)
    }, getShopSearch: function (e) {
        return _xx_request.req.post("ShopSearch", e)
    }, getShopGoodsDetail: function (e) {
        return _xx_request.req.post("ShopGoodsDetail", e)
    }, getShopCollageList: function (e) {
        return _xx_request.req.post("shopcollagelist", e)
    }, getNewsList: function (e) {
        return _xx_request.req.post("timeline", e)
    }, getThumbs: function (e) {
        return _xx_request.req.post("timelineThumbs", e)
    }, getComment: function (e) {
        return _xx_request.req.post("timelineComment", e)
    }, getNewThumbsComment: function (e) {
        return _xx_request.req.post("timelineNew", e)
    }, getTimeLineDetail: function (e) {
        return _xx_request.req.post("timelineDetail", e)
    }, getModular: function (e) {
        return _xx_request.req.post("modularV2", e)
    }, getModularInfo: function (e) {
        return _xx_request.req.post("modularInfo", e)
    }, getModularList: function (e) {
        return _xx_request.req.post("modularList", e)
    }, getModularForm: function (e) {
        return _xx_request.req.post("modularform", e)
    }, getPosterType: function (e) {
        return _xx_request.req.post("postertypeV3", e)
    }, getMyPoster: function (e) {
        return _xx_request.req.post("myposter", e)
    }, getSavePoster: function (e) {
        return _xx_request.req.post("insertposter", e)
    }, getTagsList: function (e) {
        return _xx_request.req.post("tags", e)
    }, getTagsClick: function (e) {
        return _xx_request.req.post("tagsclick", e)
    }, getAddDeleteTags: function (e) {
        return _xx_request.req.post("tagsset", e)
    }, getCoupon: function (e) {
        return _xx_request.req.post("couponget", e)
    }, getCouponList: function (e) {
        return _xx_request.req.post("couponlist", e)
    }, getCouponQr: function (e) {
        return _xx_request.req.post("couponqr", e)
    }, getSouponshop: function (e) {
        return _xx_request.req.post("couponshop", e)
    }, getMyEarning: function (e) {
        return _xx_request.req.post("sellingprofit", e)
    }, getEarning: function (e) {
        return _xx_request.req.post("sellingcashdetail", e)
    }, getDistribution: function (e) {
        return _xx_request.req.post("sellingwater", e)
    }, getCommission: function (e) {
        return _xx_request.req.post("sellingwateruser", e)
    }, getWithdraw: function (e) {
        return _xx_request.req.post("sellingcash", e)
    }, getWithdrawList: function (e) {
        return _xx_request.req.post("sellingcashrecord", e)
    }
};