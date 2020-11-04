import Mail from '../../lib/Mail';

class NotificationDeliveryMail {
    get key() {
        return 'CancelationDeliveryMail';
    }

    async handle({ data }) {
        const { cancelation } = data;

        await Mail.sendMail({
            to: `${cancelation.name} <${cancelation.email}`,
            subject: 'Entrega cancelada',
            template: 'cancelationDelivery',
            context: {
                name: cancelation.name,
                product: cancelation.product,
                description: cancelation.description,
            },
        });
    }
}

export default new NotificationDeliveryMail();
