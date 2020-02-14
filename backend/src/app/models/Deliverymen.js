import Sequelize, { Model } from 'sequelize';

class Deliverymen extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
            },
            { freezeTableName: true, sequelize }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Files, { foreignKey: 'avatar_id', as: 'avatar' });
    }
}

export default Deliverymen;
