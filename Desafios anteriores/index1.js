
class ProductManager {

    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
    if(!title || !description || !price || !thumbnail || !code || !stock) {
        return console.log('Error, completar todos los campos');
    } else {
        const checkCode = this.#checkCode(code)
        if(checkCode){
            console.log('El Código ingresado ya existe')
        } else {
            const product = {
            id: this.#addId(), 
            code,
            title,
            description,
            price,
            thumbnail,  
            stock,
            }
            this.products.push(product)
            console.log('Producto ingresado con Éxito')
        }
    }
    }

    getProducts(){
        return console.log(this.products)
    }

    getProductById(ProductId){
        const productOk = this.#checkProductoId(ProductId)
        if(productOk){
            console.log(productOk)
        } else {
            console.log('Producto no encontrado')
        }
    }

    #checkCode(code){
        return this.products.find(product => product.code === code)
    }

    #addId() {
        let idNumber =
        this.products.length === 0
            ? 1
            : this.products[this.products.length - 1].id + 1
        return idNumber
    }

    #checkProductoId(id){
        return this.products.find(product => product.id === id)
    }

}

const product = new ProductManager()

// TESTING

// getProducts muestra array vacio
product.getProducts()

// primer producto agregado
product.addProduct('producto prueba', 'Este es el producto prueba', 200, 'sin imagen', 'abc123', 25)

//getProducts muestra array con el primer producto agregado
product.getProducts()

// Código repetido
product.addProduct('producto prueba', 'Este es el producto prueba', 200, 'sin imagen', 'abc123', 25)

// Busqueda de producto por id
product.getProductById(1)

//id no encontrado
product.getProductById(67)



