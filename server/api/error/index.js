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
import { validateError } from './middleware'

initBrowser()
initStatistic()

const router = express.Router()

router.post('/capture', validateError, receiveError)
router.post('/fault', receiveFault)
router.get('/singleError/:errorId', singleError)
router.get('/errorsWithLocation/:appId', errorsWithLocation)
router.get('/simpleSearch/:appId/:pageNumber/:pageSize/:message', simpleSearch)
router.post('/complexSearch', complexSearch)
router.get('/errors/:appId/:pageNumber/:pageSize', getError)


export default router
