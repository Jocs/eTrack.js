/**
 * create by Jocs 2016.04.30
 */

import express from 'express'
import { receiveFault, receiveError } from './controller'
import { initBrowser } from './browser'

initBrowser()

const router = express.Router()

router.post('/capture', receiveError)
router.post('/fault', receiveFault)

export default router
