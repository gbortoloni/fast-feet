import * as Yup from 'yup';

import File from '../models/File';
import Deliverymen from '../models/Deliverymen';

class DeliverymenController {
    async index(req, res) {
        const deliverymen = await Deliverymen.findAll({
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'path', 'url'],
                },
            ],
        });
        return res.json(deliverymen);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation falied.' });
        }

        const deliverymanExists = await Deliverymen.findOne({
            where: { email: req.body.email },
        });

        if (deliverymanExists) {
            return res
                .status(400)
                .json({ error: 'Delivery man already exists.' });
        }

        const { id, name, email } = await Deliverymen.create(req.body);

        return res.json({ id, name, email });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation falied.' });
        }

        const deliveryman = await Deliverymen.findByPk(req.params.id);

        if (req.body.email && req.body.email !== deliveryman.email) {
            const deliverymanExists = await Deliverymen.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (deliverymanExists) {
                return res
                    .status(400)
                    .json({ error: 'Delivery man already exists.' });
            }
        }

        const { id, name, email } = await deliveryman.update(req.body);

        return res.json({ id, name, email });
    }

    async delete(req, res) {
        const deliverymanExists = await Deliverymen.findByPk(req.params.id);

        if (!deliverymanExists) {
            return res
                .status(400)
                .json({ error: 'Delivery man does not exists.' });
        }

        await deliverymanExists.destroy();
        return res.json();
    }
}

export default new DeliverymenController();
