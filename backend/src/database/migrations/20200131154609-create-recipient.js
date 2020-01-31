module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('recipient', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            rua: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            numero: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            complemento: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            estado: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cidade: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cep: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('recipient');
    },
};