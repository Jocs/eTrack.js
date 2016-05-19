/**
 * create by Jocs 2016.05.19
 */
import express from 'express'
import { getLocation } from './controller'

const router = express.Router()

router.post('/getLocation', getLocation)

export default router
