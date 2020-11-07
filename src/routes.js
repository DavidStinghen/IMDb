import Router from 'express'
import multer from 'multer'

import authMiddleware from './app/middlewares/auth'
import uploadConfig from './config/upload'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import MovieController from './app/controllers/MovieController'
import RatingController from './app/controllers/RatingController'

const routes = new Router()
const upload = multer(uploadConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMiddleware)

routes.put('/users/:id', UserController.update)
routes.put('/users/:id/active', UserController.active)

routes.post('/files', upload.single('file'), FileController.store)

routes.post('/movies', MovieController.store)
routes.put('/movies/:id', MovieController.update)
routes.get('/movies', MovieController.index)
routes.get('/movies/:id', MovieController.show)

routes.post('/rating/:movieId', RatingController.store)
routes.put('/rating/:movieId', RatingController.update)

export default routes
