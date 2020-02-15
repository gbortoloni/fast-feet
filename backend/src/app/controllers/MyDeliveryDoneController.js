import { Op } from 'sequelize';

import Deliveries from '../models/Deliveries';
import Deliverymen from '../models/Deliverymen';
import Recipients from '../models/Recipients';

class MyDeliveryDoneController {
    async index(req, res) {
        const { id } = req.params;
        const deliverymanExists = await Deliverymen.findByPk(id);
        if (!deliverymanExists) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists.' });
        }

        const deliveries = await Deliveries.findAll({
            where: {
                deliveryman_id: id,
                canceled_at: null,
                end_date: {
                    [Op.ne]: null,
                },
            },
            include: [
                {
                    model: Recipients,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'rua',
                        'numero',
                        'complemento',
                        'estado',
                        'cidade',
                        'cep',
                    ],
                },
            ],
        });

        return res.json(deliveries);
    }
}

export default new MyDeliveryDoneController();
