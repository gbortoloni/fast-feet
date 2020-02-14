import Sequelize, { Model } from 'sequelize';

class Deliveries extends Model {
    static init(sequelize) {
        super.init(
            {
                product: Sequelize.STRING,
                canceled_at: Sequelize.DATE,
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
            },
            { freezeTableName: true, sequelize }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Recipients, {
            foreignKey: 'recipient_id',
            as: 'recipient',
        });
        this.belongsTo(models.Deliverymen, {
            foreignKey: 'deliveryman_id',
            as: 'deliveryman',
        });
        this.belongsTo(models.Files, {
            foreignKey: 'signature_id',
            as: 'signature',
        });
    }
}

export default Deliveries;
