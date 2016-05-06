/**
 * create by Jocs 2016.05.05
 */
import express from 'express'
import { getStatisticData } from './controller'
import mock from './mock'

mock()

const router = express.Router()

router.get('/allInOne/:appId', getStatisticData)

export default router
