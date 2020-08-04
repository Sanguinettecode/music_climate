import { Router } from 'express';
import UserController from './app/controllers/UserController';
import Authentication from './middleware/Auth';
import SessionController from './app/controllers/SessionController';
import PlaylistController from './app/controllers/PlaylistController'
import TracksController from './app/controllers/TracksController'
import ForgotPasswordController from './app/controllers/ForgotPasswordController'

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/forgotpassword', ForgotPasswordController.store)
routes.put('/forgotpassword', ForgotPasswordController.update)

routes.use(Authentication);

routes.put('/users', UserController.update);
routes.get('/playlists', PlaylistController.index);
routes.get('/playlists/tracks', TracksController.index);


export default routes;
