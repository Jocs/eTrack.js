/**
 * create by Jocs 2016.05.05
 */
import express from 'express'
import { browserPercentage } from './controller'

const router = express.Router()

router.get('/percentage/:appId', browserPercentage)

export default router
