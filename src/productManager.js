import fs from 'fs'

export class ProductManager {
    constructor(path) {
        this.path = path
    }


    async getProducts(limit){
        try {
            if(fs.existsSync(this.path)){
                const infoProd = await fs.promises.readFile(this.path, 'utf-8')
                if(limit === 'max'){
                    console.log(infoProd)
                    return JSON.parse(infoProd)
                }else{
                return JSON.parse(infoProd).slice(0, limit)
                }
            } else {
                return []
            }
        } catch (error) {
            console.log("Error en la lectura del archivo" + error);
        }
    }


    async addProduct(producto) {
        const {title,description,code,price,stock,category,thumbnail,status} = producto
        try {
            if(!title || !description || !price || !code || !stock || !category) {
                return console.log('Error, completar todos los campos');
            } else {
                const prod = await this.getProducts();
                const checkCode = prod.find(product => product.code === code)
                    if(checkCode){
                        console.log('El código ingresado ya existe')
                    }else {
                        const product = {
                            id : await this.#numberId() ,
                            title,
                            description,
                            price,
                            thumbnail: [],
                            code,
                            stock,
                            category,
                            status: true,
                        }
                    prod.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(prod))
                    return console.log(product),
                    console.log('Producto cargado correctamente')
                } 
            }
        } catch(error) {
            console.log(error)
        } 
    } 

    async getProductById(idProduct){
        try {
        let prod = await this.getProducts();
        const findId =  prod.find( (p) => p.id === idProduct)
                return findId
        } catch(error) {
        return console.log('Producto con el id ingresado no es correcto')
    }
}

    async updateProduct(idProduct, cambio){
        try{
        let prod = await this.getProducts();
        let product = await this.getProductById(idProduct)
        if(product){
            product = {...product, ...cambio}
            prod = prod.map(produ => {
                if(produ.id == product.id){
                    produ = product}
                return produ
            })
            prod = JSON.stringify(prod, null, 2)
            await fs.promises.writeFile(this.path, prod)
            console.log(JSON.parse(prod))
            console.log('Producto editado correctamente')
            return console.log(prod)
        }else{
            return console.log('No se pudo editar el producto'+ null)
        }
        }catch(error) {
            console.log(error)
        }  
    } 

    async deleteProduct(idProduct){
        try{
            let prod = await this.getProducts();
            const indexProd = prod.findIndex((u) => u.id === idProduct)
                if (indexProd === -1) throw new Error('Producto no encontrado')
                prod.splice(indexProd,1)
                await fs.promises.writeFile(this.path, JSON.stringify(prod))
                return idProduct
        }catch(error) {
            return error
        }
    }

    async #numberId() {
        const prod = await this.getProducts()
        let id =
            prod.length === 0
            ? 1
            : prod[prod.length - 1].id + 1
        return id
    }


}

