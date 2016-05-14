/**
 * create by Jocs 2016.04.30
 */

import express from 'express'
import {
	createApp,
	getAll,
	deleteOne
} from './controller'
import { isAuthenticated } from '../../auth/service'

const router = express.Router()

router.post('/createApp', isAuthenticated(), createApp)
router.post('/getAll', isAuthenticated(), getAll)
router.get('/deleteOne/:userId/:appId', isAuthenticated(), deleteOne)

export default router
