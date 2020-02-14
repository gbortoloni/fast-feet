import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymenController from './app/controllers/DeliverymenController';
import DeliveriesControllers from './app/controllers/DeliveriesControllers';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliveryman', DeliverymenController.index);
routes.post('/deliveryman', DeliverymenController.store);
routes.put('/deliveryman/:id', DeliverymenController.update);
routes.delete('/deliveryman/:id', DeliverymenController.delete);

routes.get('/deliveries', DeliveriesControllers.index);
routes.post('/deliveries', DeliveriesControllers.store);
routes.put('/deliveries/:id', DeliveriesControllers.update);
routes.delete('/deliveries/:id', DeliveriesControllers.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
