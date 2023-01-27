const socketClient = io()


const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const addButton = document.getElementById('addButton')


addButton.addEventListener('click', () => {
    const product = {
        title: title.value,
        description: description.value,
        price: price.value
    }

    socketClient.emit('productData', product)
    title.value = ''
    description.value = ''
    price.value = ''
    alert('Producto agregado exitosamente')
})



socketClient.on('loadProducts', products => {
    console.log(products)
    let listProducts = document.getElementById('loadProducts')
    let product = ''
    products.forEach(prod => {
        product = product + `
                        <h2>Titulo: ${prod.title} </h2>
                        <p><strong>Descripción:</strong> ${prod.description}</p>
                        <p><strong>Precio:</strong> $ ${prod.price} </p>
                        `
    })
    listProducts.innerHTML = product
})
