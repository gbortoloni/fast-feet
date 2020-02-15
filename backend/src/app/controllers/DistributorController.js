import Deliveries from '../models/Deliveries';
import Deliverymen from '../models/Deliverymen';
import DeliveriesProblems from '../models/DeliveriesProblems';
import CancelationDeliveryMail from '../jobs/CancelationDeliveryMail';
import Queue from '../../lib/Queue';

class DistributorController {
    async index(req, res) {
        const deliveriesProblems = await DeliveriesProblems.findAll({
            include: [
                {
                    model: Deliveries,
                    as: 'delivery',
                },
            ],
        });
        return res.json(deliveriesProblems);
    }

    async show(req, res) {
        const deliveryProblem = await DeliveriesProblems.findAll({
            where: {
                delivery_id: req.params.id,
            },
            include: [
                {
                    model: Deliveries,
                    as: 'delivery',
                },
            ],
        });
        return res.json(deliveryProblem);
    }

    async delete(req, res) {
        const deliveryProblem = await DeliveriesProblems.findByPk(
            req.params.id,
            {
                include: [
                    {
                        model: Deliveries,
                        as: 'delivery',
                    },
                ],
            }
        );

        const delivery = await Deliveries.findByPk(
            deliveryProblem.delivery.id,
            {
                include: [
                    {
                        model: Deliverymen,
                        as: 'deliveryman',
                    },
                ],
            }
        );
        delivery.canceled_at = new Date();
        await delivery.save();

        const cancelation = {
            description: deliveryProblem.description,
            product: delivery.product,
            name: delivery.deliveryman.name,
            email: delivery.deliveryman.email,
        };

        await Queue.add(CancelationDeliveryMail.key, {
            cancelation,
        });

        return res.json(cancelation);
    }
}

export default new DistributorController();
