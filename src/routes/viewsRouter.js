import { ProductManager } from '../productManager.js'
import {Router}from 'express'
import { __dirname } from '../../utils.js'
import path from 'path'

const newProduct = new ProductManager(path.join(__dirname,'src/files/products.json'))

const router = Router()

router.post('/', async (req,res) => {
    const {title, description, price, thumbnail, code,stock} = req.body
    const product = await newProduct.addProducts(title, description, price, thumbnail, code,stock)
    res.json({product})
})

router.get('/', async (req,res) => {
    const products = await newProduct.getProducts('max')
    res.render('home', {products})
})

export default router