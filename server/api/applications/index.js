/**
 * create by Jocs 2016.04.30
 */

import express from 'express'
import { createApp, getAll } from './controller'
import { isAuthenticated } from '../../auth/service'

const router = express.Router()

router.post('/createApp', isAuthenticated(), createApp)
router.post('/getAll', isAuthenticated(), getAll)

export default router
