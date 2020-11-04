import * as Yup from 'yup';

import Deliveries from '../models/Deliveries';
import DeliveriesProblems from '../models/DeliveriesProblems';

class DeliveryProblemController {
    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation falied.' });
        }

        const delivery = await Deliveries.findByPk(req.params.id);
        if (!delivery) {
            return res.status(400).json({ error: 'Delivery does not exists.' });
        }

        const deliveryProblem = await DeliveriesProblems.create({
            description: req.body.description,
            delivery_id: req.params.id,
        });

        return res.json(deliveryProblem);
    }
}

export default new DeliveryProblemController();
