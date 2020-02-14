import * as Yup from 'yup';

import Deliveries from '../models/Deliveries';
import Deliverymen from '../models/Deliverymen';
import Recipients from '../models/Recipients';
import Files from '../models/Files';

class DeliverymenController {
    async index(req, res) {
        const deliveries = await Deliveries.findAll({
            include: [
                {
                    model: Deliverymen,
                    as: 'deliveryman',
                    attributes: ['id', 'name', 'email'],
                    include: [
                        {
                            model: Files,
                            as: 'avatar',
                            attributes: ['id', 'name', 'path', 'url'],
                        },
                    ],
                },
                {
                    model: Recipients,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'name',
                        'rua',
                        'numero',
                        'complemento',
                        'estado',
                        'cidade',
                        'cep',
                    ],
                },
                {
                    model: Files,
                    as: 'signature',
                    attributes: ['id', 'name', 'path', 'url'],
                },
            ],
        });

        return res.json(deliveries);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            product: Yup.string().required(),
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            canceled_at: Yup.date(),
            start_date: Yup.date(),
            end_date: Yup.date(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation falied.' });
        }

        const { recipient_id, deliveryman_id } = req.body;

        const deliverymanExists = await Deliverymen.findByPk(deliveryman_id);
        if (!deliverymanExists) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists.' });
        }

        const recipientExists = await Recipients.findByPk(recipient_id);
        if (!recipientExists) {
            return res
                .status(400)
                .json({ error: 'Recipient does not exists.' });
        }

        const delivery = await Deliveries.create(req.body);

        return res.json(delivery);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            product: Yup.string(),
            recipient_id: Yup.number(),
            deliveryman_id: Yup.number(),
            canceled_at: Yup.date(),
            start_date: Yup.date(),
            end_date: Yup.date(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation falied.' });
        }

        const { recipient_id, deliveryman_id } = req.body;

        const delivery = await Deliveries.findByPk(req.params.id);
        if (!delivery) {
            return res.status(400).json({ error: 'Delivery does not exists.' });
        }

        if (deliveryman_id) {
            const deliverymanExists = await Deliverymen.findByPk(
                deliveryman_id
            );
            if (!deliverymanExists) {
                return res
                    .status(400)
                    .json({ error: 'Deliveryman does not exists.' });
            }
        }

        if (recipient_id) {
            const recipientExists = await Recipients.findByPk(recipient_id);
            if (!recipientExists) {
                return res
                    .status(400)
                    .json({ error: 'Recipient does not exists.' });
            }
        }

        const { id, product } = await delivery.update(req.body);

        return res.json({ id, product, recipient_id, deliveryman_id });
    }

    async delete(req, res) {
        const delivery = await Deliveries.findByPk(req.params.id);
        if (!delivery) {
            return res.status(400).json({ error: 'Delivery does not exists.' });
        }
        await delivery.destroy();
        return res.json();
    }
}
export default new DeliverymenController();
