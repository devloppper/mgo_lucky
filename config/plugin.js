'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    },
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks'
    },
    io: {
        enable: true,
        package: 'egg-socket.io'
    },
    redis: {
        enable: true,
        package: 'egg-redis'
    }
};
