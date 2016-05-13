/**
 * create by Jocs 2016.04.30
 */

import express from 'express'
import {
	receiveFault,
	receiveError,
	getError,
	singleError,
	errorsWithLocation,
	simpleSearch,
	complexSearch
} from './controller'
import { initBrowser } from './browser'
import { initStatistic } from './statistic'

initBrowser()
initStatistic()

const router = express.Router()

router.post('/capture', receiveError)
router.post('/fault', receiveFault)
router.get('/singleError/:errorId', singleError)
router.get('/errorsWithLocation/:appId', errorsWithLocation)
router.get('/simpleSearch/:appId/:pageNumber/:pageSize/:message', simpleSearch)
router.get('/complexSearch/:appId/:pageNumber/:pageSize/:include/:errorType/:startTime/:endTime/:browser/:user', complexSearch)
router.get('/errors/:appId/:pageNumber/:pageSize', getError)


export default router
