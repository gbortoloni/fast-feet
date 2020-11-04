import Sequelize, { Model } from 'sequelize';

class Recipients extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                rua: Sequelize.STRING,
                numero: Sequelize.STRING,
                complemento: Sequelize.STRING,
                estado: Sequelize.STRING,
                cidade: Sequelize.STRING,
                cep: Sequelize.STRING,
            },
            { freezeTableName: true, sequelize }
        );

        return this;
    }
}

export default Recipients;
