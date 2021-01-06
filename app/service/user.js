const {Service} = require('egg');

class UserService extends Service {

    /**
     * 添加一个用户
     * @param roomId    {int}        房间号
     * @param name      {string}    用户名称
     */
    async addUser(roomId, name) {
        const {mysql} = this.ctx;
        return await mysql.User.create({
            name,
            roomId,
        })
    }

    /**
     * 通过房间号和用户名称查询一个用户
     * @param roomId    {int}        房间号
     * @param name      {string}    用户名称
     */
    async findOneUserByName(roomId, name = '') {
        const {mysql} = this.ctx;
        return await mysql.User.findOne({
            where: {
                roomId,
                name,
            }
        })
    }


    /**
     * 查询一个房间下的用户列表
     * @param roomId    房间号
     */
    async listUser(roomId) {
        const {mysql} = this.ctx;
        return await mysql.User.findAll({
            where: {
                roomId
            }
        })
    }

    async remove(userId,roomId) {
        const {mysql} = this.ctx;
        return await mysql.User.destroy({
            where: {
                id: userId,
                roomId
            }
        })
    }

}

module.exports = UserService;