const {Controller} = require('egg');

class BaseCtrl extends Controller {

    async response(rs = this.Response.SUCCESS, data = {}) {
        this.ctx.body = {
            code: rs.code,
            msg: rs.msg,
            data,
        }
    }

    Response = {
        FAILED: {
            code: -1,
            msg: '操作失败',
        },
        SUCCESS: {
            code: 0,
            msg: '操作成功',
        },
        PARAM_ERROR: {
            code: -2,
            msg: '参数错误',
        },
        USER_EXIST: {
            code: 4001,
            msg: '已签到'
        },
        ROOM_NOT_EXIST: {
            code: 4002,
            msg: '房间不存在'
        }
    }

}

module.exports = BaseCtrl;