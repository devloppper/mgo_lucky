const BaseCtrl = require('./BaseCtrl');
const qrImage = require('qr-image');

class UserCtrl extends BaseCtrl {

    /**
     * @api {get}   /sign/page  签到二维码页面
     */
    async signPage() {
        const {id} = this.ctx.request.query;
        if (isNaN(id)) {
            return this.response(this.Response.PARAM_ERROR, {})
        }
        const {service} = this.ctx;
        // 查询房间信息
        const room = await service.room.getRoomById(id);
        if (!room) {
            return this.response(this.Response.ROOM_NOT_EXIST, {});
        }
        await this.ctx.render('static/user/sign', {
            room
        })
    }

    /**
     * @api {get}   /sign/to/page   写入签到页面
     */
    async toSyncPage() {
        const {id} = this.ctx.request.query;
        if (isNaN(id)) {
            return this.response(this.Response.PARAM_ERROR, {})
        }
        const {service} = this.ctx;
        // 查询房间信息
        const room = await service.room.getRoomById(id);
        if (!room) {
            return this.response(this.Response.ROOM_NOT_EXIST, {});
        }
        await this.ctx.render('static/user/signPage', {
            room
        })
    }

    /**
     * @api {post}  /sign/up    签到
     *
     * @apiParam {string}   name    名字
     * @apiParam {integer}  id      房间号
     *
     */
    async sign() {
        const {name, id} = this.ctx.request.body;
        if (!name || !id || isNaN(id)) {
            return this.response(this.Response.PARAM_ERROR, {});
        }
        const {service} = this.ctx;
        // 查询房间是否存在
        const room = await service.room.getRoomById(id);
        if (!room) {
            return this.response(this.Response.ROOM_NOT_EXIST, {});
        }
        // 1. 查询名字是否重复 [默认签到人员的姓名都不一样]
        const user = await service.user.findOneUserByName(id, name);
        if (user) {
            return this.response(this.Response.USER_EXIST, user);
        }
        // 2. 添加用户
        const rs = await service.user.addUser(id, name);
        if (rs) {
            await service.message.sendAnUser(id, rs);
            return this.response(this.Response.SUCCESS, {});
        } else {
            return this.response(this.Response.FAILED, {});
        }
    }

    /**
     * @api {get}  /sign/room/open     开一个房间
     *
     * @apiParam name {string}      房间名 可重复
     */
    async openRoom() {
        let {name} = this.ctx.request.query;
        if (!name) {
            name = this.getRandomName();
        }
        const {service} = this.ctx;
        const room = await service.room.registryRoomNumber(name);
        // 房间创建失败
        if (!room) {
            return this.response(this.Response.FAILED, {})
        }
        return this.ctx.redirect(`/sign/page?id=${room.id}`);
    }

    /**
     * @api {get} /sign/image   获取签到所用的二维码
     *
     * @apiParam id {integer}   房间ID
     */
    async loginQr() {
        const {id} = this.ctx.request.query;
        const qrCode = qrImage.image(`https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1997413355,496468449&fm=26&gp=0.jpg`, {
            ec_level: 'H'
        })
        const {ctx} = this;
        ctx.set('content-type', 'image/jpeg')
        ctx.body = qrCode;
    }

    getRandomName() {
        return `房间 ${Math.ceil(Math.random() * 100)}`
    }
}

module.exports = UserCtrl;