import express from 'express'
import productsRouter from '../routes/productsRouter.js'
import cartRouter from '../routes/cartRouter.js'
import { __dirname } from '../utils.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))


app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

app.get('/',(req,res)=>{
    res.send('Ruta raiz')
})



const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})
