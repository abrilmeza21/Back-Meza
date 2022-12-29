const fs = require('fs')

class ProductManager {
    constructor() {
        this.products = []
        this.path = './Productos.txt'
    }

    async getAll (){
        try {
            if(fs.existsSync(this.path)){
            let prod = await fs.promises.readFile(this.path); 
            let prodObj = JSON.parse(prod);
            return prodObj;
            }
        } catch (error) {
            console.log("Error en la lectura del archivo" + error);
        }
    }

    async getProducts (){
        try {
            let prod = await this.getAll();
            if(prod){
                return console.log(prod)
            } else {
                return []
            }
        } catch (error) {
            console.log("Error en archivo" + error);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if(!title || !description || !price || !thumbnail || !code || !stock) {
                return console.log('Error, completar todos los campos');
            } else {
                let prod = await this.getAll();
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

    async getProductById(id){
        try {
        let prod = await this.getAll();
        const findId = prod.find(product => product.id === id)
            if(findId){
            console.log(findId)
            return findId
            } else {
            console.log('Producto con el id ingresado no es correcto')
            }
        } catch(error) {
        console.log(error)
    }
}

    async updateProduct(id, cambio){
        try{
        let prod = await this.getAll();
        let product = await this.getProductById(id)
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

    async deleteProduct(id){
        try{
        let prod = await this.getAll();
        let product = await this.getProductById(id)
            if(product){
                const filtrado =prod.filter(produ => produ.id != id)
                await fs.promises.writeFile(this.path, JSON.stringify(filtrado, null, 2))
                return console.log('Producto eliminado correctamente'+ filtrado)
            }
        }catch(error) {
            console.log('Np se pudo eliminar el producto'+ error)
        }
    }
}

const product = new ProductManager()
// TESTING

// getProducts muestra array vacio
//product.getProducts()

// Productos agregados
// product.addProduct('producto 1', 'Este es el producto prueba 1', 200, 'sin imagen', 'abc123', 25)
// product.addProduct('producto 2', 'Este es el producto prueba 2', 200, 'sin imagen', 'dsadsdsa', 25)

//getProducts muestra array con los productos agregados
// product.getProducts()

// Código repetido
// product.addProduct('producto prueba', 'Este es el producto prueba', 200, 'sin imagen', 'abc123', 25)

// Busqueda de producto por id
// product.getProductById(1)
// product.getProductById(2)

//Id no encontrado
// product.getProductById(67)

// Actualizar productos:
// product.updateProduct(2, {"title":'prueba cambiada'})

// Eliminar producto:
// product.deleteProduct(1)