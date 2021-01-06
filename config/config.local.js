module.exports = (appInfo) => {
    const config = {}
    config.sequelize = {
        baseDir: 'mysql',
        delegate: 'mysql',
        dialect: 'mysql',
        host: '39.108.211.255',
        port: 3307,
        username: 'root',
        password: 'mysql1234',
        database: 'lucky',
        dialectOptions: {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            supportBigNumbers: true,
            bigNumberStrings: true
        },
    }
    config.redis = {
        client: {
            port: 6378,
            host: 'www.apprendre.cn',
            db: 4,
            password: ''
        }
    }
    return {
        ...config
    }
}