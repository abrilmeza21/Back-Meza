import fs from 'fs';

export class CartManager {
    constructor(path){
        this.path = path;
    }


    async getCarts(limit){
        try{
            if(fs.existsSync(this.path)){
                const infoCarts = await fs.promises.readFile(this.path);
                if(limit === 'max'){
                    console.log(infoCarts)
                    return JSON.parse(infoCarts);
                }else{
                    return JSON.parse(infoCarts).slice(0,limit);
                }
            }else {
                return [];
            }
        }catch(error){
            console.log("Error en la lectura del archivo" + error);
        }
    }



    async addCart(producto){
        try{
            const cartFile = await this.getCarts();
            const cart = {
                id: await this.#cartId(),
                products:[producto]
            }
            cartFile.push(cart);
            await fs.promises.writeFile(this.path,JSON.stringify(cartFile))
            return console.log(cart),
            console.log('Carrito cargado correctamente')
        }catch(error){
            console.log(error);
        }
    }



    async getCartById(idCart){
        try {
            const cartFile = await this.getCarts();
            const cart = cartFile.find((c) => c.id === parseInt(idCart));
                return cart;
        } catch (error) {
            return console.log('Carrito con el id ingresado no es correcto')
        }
    }


    async updateCart(idCart, cambio){
        try{
        const cartFile = await this.getCarts();
        let foundCart = await this.getCartById(idCart)
        if(foundCart){
            foundCart = {...foundCart, ...cambio};
                cartFile = cartFile.map(cart => {
                if(cart.id == foundCart.id){
                    cart = foundCart}
                    return cart
            })
            cartFile = JSON.stringify(cartFile, null, 2)
            await fs.promises.writeFile(this.path, cartFile)
            console.log(JSON.parse(cartFile))
            console.log('Carrito editado correctamente')
            return console.log(cartFile)
        }else{
            return console.log('Carrito no encontrado');
        }
        }catch(error) {
            console.log(error)
        }  
    }

    async deleteCart(idCart){
        try {
            let cartFile = await this.getCarts()
            const indexCart = cartFile.findIndex((u) => u.id === idCart)
            if (indexCart === -1) throw new Error('Carrito no encontrado')
            cartFile.splice(indexCart,1)
            await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
            return idCart
    }catch(error) {
        return error
    }
}


    async addProductToCartById(idCart, idProduct, quantity){
        const cartFile = await this.getCarts();
        const cart = cartFile.find((c) => c.id === parseInt(idCart));
        if (cart === undefined)  return console.log("No encontrado")
        else {
            const index = read.indexOf(cart);
            if (cartFile[index].products.find((p) => p.id === parseInt(idProduct))){
                const indexProd = cartFile[index].products.indexOf(cartFile[index].products.find((p) => p.id === parseInt(idProduct)));
                cartFile[index].products[indexProd].quantity += quantity;
                await fs.promises.writeFile(this.path,JSON.stringify(cartFile, null, 2));
                return cart[index].products[indexProd];
            }else{
                const id = parseInt(idProduct);
                const product = {
                id: id,
                quantity: quantity
                }
                cartFile[index].products.push(product);
                await fs.promises.writeFile(this.path,JSON.stringify(cartFile, null, 2));
                return product;
            }
        }

    }


    async #cartId(){
        const cart = await this.getCarts();
        let id =
        cart.length === 0
            ? 1
            : cart[cart.length - 1].id + 1
    return id
}

}