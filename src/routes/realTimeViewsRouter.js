import { Router } from "express"
import { Server } from 'socket.io'

const router = Router()

router.get('/', async (req, res) => {
    res.render('realTimeProducts')
})


export default router