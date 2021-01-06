const {Service} = require('egg');
const online = require('../context/online');

const ALL = "all";
const ADD_ONE = "addOne";
const DEL_ONE = "delOne";
const MOD_ONE = "modOne";
const ALERT = "alert";
const INFO = "info";

class MessageService extends Service {

    /**
     * 向客户端发送本房间的全部user
     */
    async sendUser(id, users) {
        const sender = online(this.ctx);
        await sender.sendMessage(id, users, ALL);
    }

    /**
     * 向客户端发送添加一个用户
     */
    async sendAnUser(id, user) {
        const sender = online(this.ctx);
        await sender.sendMessage(id, user, ADD_ONE);
    }

    /**
     * 向客户端发送修改一个用户
     */
    async sendUpdateAnUser(id, user) {
        const sender = online(this.ctx);
        await sender.sendMessage(id, user, MOD_ONE);
    }

    /**
     * 向客户端发送删除一个用户
     */
    async sendDelAnUser(id, user) {
        const sender = online(this.ctx);
        await sender.sendMessage(id, user, DEL_ONE);
    }

    async message(id, message) {
        const sender = online(this.ctx);
        await sender.sendMessage(id, message, INFO);
    }

    async alert(id, message) {
        const sender = online(this.ctx);
        await sender.sendMessage(id, message, ALERT);
    }
}

module.exports = MessageService;