/**
 * create by Jocs 2016.04.30
 */

import express from 'express'
import { receiveFault, receiveError, getError, singleError, errorsWithLocation } from './controller'
import { initBrowser } from './browser'
import { initStatistic } from './statistic'

initBrowser()
initStatistic()

const router = express.Router()

router.post('/capture', receiveError)
router.post('/fault', receiveFault)
router.get('/singleError/:errorId', singleError)
router.get('/errorsWithLocation/:appId', errorsWithLocation)
router.get('/errors/:appId/:pageNumber/:pageSize', getError)


export default router
