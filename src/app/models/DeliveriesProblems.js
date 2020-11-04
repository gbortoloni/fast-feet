import Sequelize, { Model } from 'sequelize';

class DeliveriesProblems extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
            },
            { freezeTableName: true, sequelize }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Deliveries, {
            foreignKey: 'delivery_id',
            as: 'delivery',
        });
    }
}

export default DeliveriesProblems;
