/*
*   二维码在线功能的Socket
*       主要功能有 及时刷新在线人员信息 删除用户
* */
const {Controller} = require('egg');
const onlineMap = require('../../context/online')

class SignCtrl extends Controller {

    /**
     * /delete      删除一个用户
     * @param {integer} id  用户id
     */
    async delUser() {
        const {service} = this.ctx;
        const {id, roomId} = this.ctx.args[0];
        if (!id || isNaN(id)) {
            return service.message.alert(roomId, '删除失败');
        }
        const rs = await service.user.remove(id, roomId);
        if (rs > 0) {
            await service.message.sendDelAnUser(roomId, {id})
            return service.message.message(roomId, '删除成功');
        } else {
            return service.message.alert(roomId, '删除失败');
        }
    }

    /**
     * /registry    注册一个房间
     * @param {integer} id  房间号
     */
    async addRoom() {
        const id = this.ctx.args[0];
        const sender = onlineMap(this.ctx);
        if (!id || !id.id) {
            return;
        }
        console.log(`registry room id=${id.id} and socket id is ${this.ctx.socket.id}`)
        await sender.setOne(id.id, this.ctx.socket.id);
        const {service} = this.ctx;
        const users = await service.user.listUser(id.id);
        await service.message.sendUser(id.id, users);
    }
}

module.exports = SignCtrl;