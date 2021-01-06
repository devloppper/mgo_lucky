module.exports = ctx => {
    const {app} = ctx;
    const {redis} = app;
    return {
        async setOne(id, socket) {
            if (!id || !socket) {
                return false;
            }
            // 将房间号和socket号注册到redis
            await redis.set(`ROOM[${id}]`, ctx.socket.id);
        },

        async sendMessage(id, message, type) {
            const socket = await this.getSocket(id);
            if (socket) {
                socket.emit(type, message);
            }
        },

        async getSocket(id) {
            const socketId = await redis.get(`ROOM[${id}]`);
            if (socketId) {
                const nsp = app.io.of('/');
                return nsp.sockets[socketId];
            }
            return null;
        }
    }
}