import * as Yup from 'yup';
import {
    startOfHour,
    parseISO,
    isBefore,
    isAfter,
    setHours,
    setMinutes,
    setSeconds,
} from 'date-fns';
import { Op } from 'sequelize';

import Deliverymen from '../models/Deliverymen';
import Deliveries from '../models/Deliveries';

class IniciateDeliveryController {
    async update(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { id, delivery_id } = req.params;
        const { start_date } = req.body;

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

        const startBusinessHour = startOfHour(
            setSeconds(setMinutes(setHours(new Date(), '05'), '00'), 0)
        );
        const endBusinessHour = startOfHour(
            setSeconds(setMinutes(setHours(new Date(), '15'), '00'), 0)
        );

        const date = parseISO(start_date);

        if (
            isBefore(date, startBusinessHour) ||
            isAfter(date, endBusinessHour)
        ) {
            return res.status(400).json({
                error: 'Delivery can only be picked up between 08:00 and 18:00',
            });
        }

        const countDeliveryman = await Deliveries.count({
            where: {
                deliveryman_id: id,
                start_date: {
                    [Op.between]: [startBusinessHour, endBusinessHour],
                },
            },
        });

        if (countDeliveryman === 5) {
            return res.status(400).json({
                error: 'You have reached the limit of 5 daily deliveries',
            });
        }

        const delivery = await deliveryExists.update(req.body);

        return res.json(delivery);
    }
}

export default new IniciateDeliveryController();
