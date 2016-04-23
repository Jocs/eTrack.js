import express from 'express'
import { createApp } from './controller'

const router = express.Router()

router.post('/createApp', createApp)

export default router
