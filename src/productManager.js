import fs from 'fs'

export class ProductManager {
    constructor(path) {
        this.path = path
    }


    async getProducts(limit){
        try {
            if(fs.existsSync(this.path)){
                const prod = await fs.promises.readFile(this.path, 'utf-8')
                if(limit === 'max'){
                    console.log(prod)
                    return JSON.parse(prod)
                }else{
                return JSON.parse(prod).slice(0, limit)
                }
            } else {
                return []
            }
        } catch (error) {
            console.log("Error en la lectura del archivo" + error);
        }
    }


    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if(!title || !description || !price || !thumbnail || !code || !stock) {
                return console.log('Error, completar todos los campos');
            } else {
                let prod = await this.getProducts();
                let checkCode = prod.find(product => product.code === code)
                if(checkCode){
                    console.log('El código ingresado ya existe')
                }else {
                    let numId = 0;
                    if(prod.length>0){
                        numId = prod.length+1;
                    } else{
                        numId = 1;
                    }
                    const product = {
                        id : numId,
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock,
                    }
                    prod.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(prod))
                    return console.log('Producto cargado correctamente' + product)
                } 
            }
        } catch(error) {
            console.log(error)
        } 
    } 

    async getProductById(idProduct){
        try {
        let prod = await this.getProducts();
        const findId = prod.find((p)=>p.id===parseInt(idProduct))
            if(findId){
            return console.log(findId)
            } else {
            console.log('Producto con el id ingresado no es correcto')
            }
        } catch(error) {
        console.log(error)
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
            return console.log('Producto editado correctamente'+ prod)
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
        let product = await this.getProductById(id)
            if(product){
                const filtrado =prod.filter(produ => produ.id != idProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(filtrado, null, 2))
                return console.log('Producto eliminado correctamente'+ filtrado)
            }
        }catch(error) {
            console.log('Np se pudo eliminar el producto'+ error)
        }
    }
}

