import {ProductManager} from '../src/productManager.js'
import { Router } from 'express'
import { __dirname } from '../utils.js'
import path from 'path'
import { upload } from '../middlewares/multer.js'

const productRouter = Router()
const productManager = new ProductManager(path.join(__dirname,'src/files/products.json')) 


productRouter.get('/',async(req,res)=>{
    try {
        const {limit} = req.query
        const products = await productManager.getProducts(limit || 'max')
        res.json({products})
    } catch (error) {
        res.send(error)
    }
    
})

productRouter.get('/:idProduct',async(req,res)=>{
    try {
        const {idProduct} = req.params
        const product = await productManager.getProductById(parseInt(idProduct))
        if(product){
            res.json({message:'Usuario encontrado con exito', product})
        } else {
        return (error)
        }
    } catch (error) {
        res.send(error)
    }
})


productRouter.post('/', upload.single('file'), async(req, res) => {
    const product = req.body
    const addProduct = await productManager.addProduct(product)
    res.json({ message: 'Producto agregado con exito',addProduct})
})


productRouter.put('/:idProduct', async(req, res) => {
    try {
        const {idProduct} = req.params
        const product = req.body
        const updateProduct = await productManager.updateProduct(idProduct, ...product)
        console.log(updateProduct)
        res.json({ message: 'Producto modificado con exito'})
    } catch (error) {
        console.log('error')
        return error
    }
})


productRouter.delete('/:idProduct', async(req, res) => {
        const {idProduct} = req.params
        const deleteProduct = await productManager.deleteProduct(parseInt(idProduct))
            res.json({message:'Producto eliminado con exito', deleteProduct})
})





export default productRouter
