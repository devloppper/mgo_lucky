module.exports = app => {
    /*
    * 校验参数
    * */
    return async (ctx, next) => {
        const {id} = ctx.socket.handshake.query;
        if (!id || isNaN(id)) {
            return ctx.socket.disconnect('无房间ID')
        }

        await next();
    }
}