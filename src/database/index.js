import Sequelize from 'sequelize';

import Users from '../app/models/Users';
import Recipients from '../app/models/Recipients';
import Files from '../app/models/Files';
import Deliverymen from '../app/models/Deliverymen';
import Deliveries from '../app/models/Deliveries';
import DeliveriesProblems from '../app/models/DeliveriesProblems';

import databaseConfig from '../config/database';

const models = [
    Users,
    Recipients,
    Files,
    Deliverymen,
    Deliveries,
    DeliveriesProblems,
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => {
                model.init(this.connection);
                return model;
            })
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
