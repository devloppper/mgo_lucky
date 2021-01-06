'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller, io} = app;
    router.get('/', controller.index.homePage);

    router.get('/sign/room/open', controller.user.openRoom);
    router.get('/sign/image', controller.user.loginQr);
    router.get('/sign/page', controller.user.signPage);
    router.get('/sign/to/page', controller.user.toSyncPage);
    router.post('/sign/up', controller.user.sign);

    /* socket router*/
    io.of('/').route('delete', io.controller.sign.delUser);
    io.of('/').route('registry', io.controller.sign.addRoom);
};
