import Mail from '../../lib/Mail';

class NotificationDeliveryMail {
    get key() {
        return 'NotificationDeliveryMail';
    }

    async handle({ data }) {
        const { deliveryMail } = data;

        await Mail.sendMail({
            to: `${deliveryMail.deliveryman.name} <${deliveryMail.deliveryman.email}`,
            subject: 'Entrega Disponível',
            template: 'notificationDelivery',
            context: {
                name: deliveryMail.deliveryman.name,
                product: deliveryMail.product,
            },
        });
    }
}

export default new NotificationDeliveryMail();
