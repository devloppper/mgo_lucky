const path = require('path')

module.exports = appInfo => {

    const config = exports = {};

    config.static = {
        dir: [{
            prefix: '/static',
            dir: path.join(appInfo.baseDir, './static')
        }]
    }

    config.view = {
        defaultViewEngine: 'nunjucks',
        root: path.join(appInfo.baseDir),
        mapping: {
            '.html': 'nunjucks'
        }
    }

    config.security = {
        csrf: {
            enable: false,
        }
    }

    config.io = {
        init: {
            //wsEngine: 'ws'
        },
        namespace: {
            '/': {
                connectionMiddleware: ['connection'],
                packetMiddleware: ['packet'],
            }
        }
    }

    config.keys = appInfo.name + '_1609815966925_2430';

    config.middleware = [];

    const userConfig = {};

    return {
        ...config,
        ...userConfig,
    };
};
