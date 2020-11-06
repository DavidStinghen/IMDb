import Router from 'express'
import multer from 'multer'

import authMiddleware from './app/middlewares/auth'
import uploadConfig from './config/upload'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'

const routes = new Router()
const upload = multer(uploadConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMiddleware)

routes.put('/users/:id', UserController.update)
routes.put('/users/active/:id', UserController.active)

routes.post('/files', upload.single('file'), FileController.store)

export default routes
