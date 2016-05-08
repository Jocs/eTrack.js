/**
 * create by Jocs 2016.05.05
 */
import express from 'express'
import { getStatisticData } from './controller'

// mock 记得删除
// import mock from './mock'
import mockLocation from '../environment'

// important 记得删除啊。
// mock()
mockLocation()

const router = express.Router()

router.get('/allInOne/:appId', getStatisticData)

export default router
