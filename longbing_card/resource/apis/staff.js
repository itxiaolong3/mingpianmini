Object.defineProperty(exports,"__esModule",{value:!0});var _xx_request=require("../js/xx_request.js");exports.default={getClientView:function(e){return _xx_request.req.post("clientView",e)},getMessageList:function(e){return _xx_request.req.post("chat",e)},getStarMark:function(e){return _xx_request.req.post("msgstart",e)},getStarMarkList:function(e){return _xx_request.req.post("startclient",e)},getLabelList:function(e){return _xx_request.req.post("msglabel",e)},getLabelUserList:function(e){return _xx_request.req.post("labeldetail",e)},getLabelEdit:function(e){return _xx_request.req.post("labeledit",e)},getGroupSend:function(e){return _xx_request.req.post("msgsend",e)},getGroupRecord:function(e){return _xx_request.req.post("msgrecord",e)},getAdminRecord:function(e){return _xx_request.req.post("msgadmin",e)},getStaffCouponList:function(e){return _xx_request.req.post("couponstafflist",e)},getCouponClean:function(e){return _xx_request.req.post("couponclean",e)},getCouponUserList:function(e){return _xx_request.req.post("coupongetlist",e)},toCheckPassword:function(e){return _xx_request.req.post("shopwriteoff",e)},toDelPoster:function(e){return _xx_request.req.post("myposterdel",e)},toAddMyShop:function(e){return _xx_request.req.post("myshopadd",e)},toDelMyShop:function(e){return _xx_request.req.post("myshopdel",e)},toGetOrderQr:function(e){return _xx_request.req.post("shoporderqr",e)}};