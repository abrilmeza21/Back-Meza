import fs from 'fs';


export class CartManager {


    constructor(path){
        this.path = path;
    }


    async getCarts(limit){
        try{
            if(fs.existsSync(this.path)){
                const infoCarts = await fs.promises.readFile(this.path, 'utf-8');
                if(limit === 'max'){
                    return JSON.parse(infoCarts);
                }else{
                    return JSON.parse(infoCarts).slice(0,limit);
                }
            }else{
                return [];
            }
        }catch(error){
            console.log(error);
            return error;
        }
    }


    async addCart(products){
        try{
            const cart ={
                id: await this.#cartId(),
                products:[products]
            }
            const cartFile = await this.getCarts();
            cartFile.push(cart);
            await fs.promises.writeFile(this.path,JSON.stringify(cartFile, null, 2))
        }catch(error){
            console.log(error);
            return error
        }
    }



    async getCartById(idCart){
        try {
            const cartFile = await this.getCarts();
            const cart = cartFile.find((c) => c.id === parseInt(idCart));
            if(cart){
                console.log(cart)
                return cart;
            } else{
                console.log('Carrito con el id ingresado no es correcto')
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }


    async updateCart(idCart, change){
        const cartFile = await this.getCarts();
        let foundCart = await this.getCartById(idCart)
        if(foundCart){
            foundCart = {...foundCart, ...change};
                cartFile = cartFile.map(cart => {
                if(cart.id == foundCart.id){
                    cart = foundCart
                }
                return cart
            })
            cartFile = JSON.stringify(cartFile, null, 2)
            await fs.promises.writeFile(this.path, cartFile)
            console.log(JSON.parse(cartFile))
            return cartFile
        }else{
            console.log('Carrito no encontrado');
            return error
        }
    }

    async deleteCart(idCart){
        try {
            let cartFile = await this.getCarts()
            let cart = await this.getCartById(idCart)
            if(cart){
                const filtrado = cartFile.filter(c => c.id != idCart)
                await fs.promises.writeFile(this.path, JSON.stringify(filtrado, null, 2))
                return filtrado
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }



    async addProductToCartById(idCart,idProduct,quantity){
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
        const cart = await this.getCarts()
        let numId = 0;
        if(cart.length>0){
            numId = cart.length+1;
        } else{
            numId = 1;
        }
    }

}