const {Service} = require('egg');

class UserService extends Service {
    /**
     * 注册一个房间号
     * @returns 房间号
     */
    async registryRoomNumber(name = '') {
        const {mysql} = this.ctx;
        return await mysql.Room.create({
            name
        })
    }

    async getRoomById(roomId) {
        const {mysql} = this.ctx;
        return await mysql.Room.findOne({
            where: {
                id: roomId,
            }
        })
    }
}

module.exports = UserService;