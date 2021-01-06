module.exports = app => {
    const {Sequelize} = app;
    const {DataTypes} = Sequelize;
    return app.mysql.define('room', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'id'
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
        tableName: 't_room',
        updatedAt: false,
        createdAt: true
    });
}