module.exports = app => {
    const {Sequelize} = app;
    const {DataTypes} = Sequelize;
    return app.mysql.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'id'
        },
        roomId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'room_id'
        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
            field: 'name',
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
    }, {
        tableName: 't_user',
        updatedAt: false,
        createdAt: true
    });
}