/**
 * create by Jocs 2016.04.30
 */

import express from 'express'
import { receiveFault, receiveError, getError } from './controller'
import { initBrowser } from './browser'
import { initStatistic } from './statistic'

initBrowser()
initStatistic()

const router = express.Router()

router.post('/capture', receiveError)
router.post('/fault', receiveFault)
router.get('/:appId/:pageNumber/:pageSize', getError)

export default router
