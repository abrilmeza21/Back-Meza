import {CartManager} from '../src/cartManager.js'
import { Router } from 'express'
import { __dirname } from '../utils.js'
import path from 'path'

const cartRouter = Router()
const cartManager = new CartManager(path.join(__dirname,'/src/files/cart.json')) 


cartRouter.get('/',async(req,res)=>{
    try {
        const {limit} = req.query
        const carts = await cartManager.getCarts ((limit || 'max'))
        res.json({carts})
    } catch (error) {
        res.send(error)
    }
    
})

cartRouter.post('/', async(req, res) => {
    const product = req.body;
    const newCart = await cartManager.addCart(product);
    res.json({message:"Carrito creado con éxito",newCart});
})


cartRouter.get('/:idProduct',async(req,res)=>{
    try {
        const {idCart} = req.params
        const cart = await cartManager.getCartById(parseInt(idCart))
        if(cart){
            res.json({message:'Usuario encontrado con exito', cart})
        } else {
        return (error)
        }
    } catch (error) {
        res.send(error)
    }
})

cartRouter.post('/:idCart/product/:idProduct',async(req,res) => {
    const idCart = req.params.idCart;
    const idProduct = req.params.idProduct;
    const quantity = req.body.quantity;
    const newProduct = await cartManager.addProductToCartById(idCart,idProduct,quantity);
    res.json({message:"producto agregado con éxito",newProduct});
});


export default cartRouter