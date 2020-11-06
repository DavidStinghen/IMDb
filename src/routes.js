import Router from 'express'

import UserController from './app/controllers/UserController'

const routes = new Router()

routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.put('/users/active/:id', UserController.active)

export default routes
