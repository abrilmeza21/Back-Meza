import {ProductManager} from './Index.js'
import express from 'express'

const app = express()
const productManager = new ProductManager('./productos.json') 


app.get('/products',async(req,res)=>{
    try {
        const {limit} = req.query
        const products = await productManager.getProducts(limit || 'max')
        res.json(products)
    } catch (error) {
        res.send(error)
    }
    
})

app.get('/products/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    console.log(idProduct)
    try {
        const product = await productManager.getProductById(idProduct)
        console.log(product)
    if(product){
        res.json({product})
    }else{
        res.send('Producto no encontrado')
    }
    } catch (error) {
        res.send(error)
    }
})


const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})
