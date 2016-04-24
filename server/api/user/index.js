import express from 'express'
import { createUser, getMe, checkEmail } from './controller'
import { isAuthenticated } from '../../auth/service'

const router = express.Router()

router.post('/createUser', checkEmail, createUser)
router.get('/getMe', isAuthenticated(), getMe)

export default router
