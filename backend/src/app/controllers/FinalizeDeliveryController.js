import * as Yup from 'yup';

import Deliveries from '../models/Deliveries';
import Deliverymen from '../models/Deliverymen';

class FinalizeDeliveryController {
    async update(req, res) {
        const schema = Yup.object().shape({
            end_date: Yup.date().required(),
            signature_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { id, delivery_id } = req.params;

        const deliverymanExists = await Deliverymen.findByPk(id);
        if (!deliverymanExists) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists.' });
        }

        const deliveryExists = await Deliveries.findByPk(delivery_id);
        if (!deliveryExists) {
            return res.status(400).json({ error: 'Delivery does not exists.' });
        }

        const delivery = await deliveryExists.update(req.body);

        return res.json(delivery);
    }
}

export default new FinalizeDeliveryController();
