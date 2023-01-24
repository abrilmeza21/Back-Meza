import { __dirname } from '../utils.js'
import cartRouter from '../routes/cartRouter.js'
import express from 'express'
import productRouter from '../routes/productRouter.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))


app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

app.get('/',(req,res)=>{
    res.send('Ruta raiz')
})



const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})
