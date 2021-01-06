module.exports = (appInfo) => {
    const config = {}
    config.sequelize = {
        baseDir: 'mysql',
        delegate: 'mysql',
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3307,
        username: 'root',
        password: 'mysql1234',
        database: 'lucky_qas',
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
            host: '127.0.0.1',
            db: 5,
            password: ''
        }
    }
    return {
        ...config
    }
}