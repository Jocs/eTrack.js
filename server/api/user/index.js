import express from 'express'
import { createUser, getMe } from './controller'
import { isAuthenticated } from '../../auth/service'

const router = express.Router()

router.post('/createUser', createUser)
router.get('/getMe', isAuthenticated, getMe)

export default router
