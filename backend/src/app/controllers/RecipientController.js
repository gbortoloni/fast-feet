import * as Yup from 'yup';

import Recipients from '../models/Recipients';

class RecipientController {
    async index(req, res) {
        const recipients = await Recipients.findAll();

        return res.json(recipients);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            rua: Yup.string().required(),
            numero: Yup.string().required(),
            complemento: Yup.string(),
            estado: Yup.string().required(),
            cidade: Yup.string().required(),
            cep: Yup.string()
                .required()
                .min(9)
                .max(9),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation falied' });
        }

        const {
            id,
            name,
            rua,
            numero,
            complemento,
            estado,
            cidade,
            cep,
        } = await Recipients.create(req.body);

        return res.json({
            id,
            name,
            rua,
            numero,
            complemento,
            estado,
            cidade,
            cep,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            rua: Yup.string(),
            numero: Yup.string(),
            complemento: Yup.string(),
            estado: Yup.string(),
            cidade: Yup.string(),
            cep: Yup.string()
                .min(9)
                .max(9),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation falied' });
        }

        const { id } = req.params;

        const recipient = await Recipients.findByPk(id);

        if (!recipient) {
            return res.status(401).json({ error: 'Recipient does not exists' });
        }

        const {
            name,
            rua,
            numero,
            complemento,
            estado,
            cidade,
            cep,
        } = await recipient.update(req.body);

        return res.json({
            id,
            name,
            rua,
            numero,
            complemento,
            estado,
            cidade,
            cep,
        });
    }
}

export default new RecipientController();
