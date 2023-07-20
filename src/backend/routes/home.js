import { server } from './pageTitle&dbURL.js'

export async function home () {
    // Notify about sucess
    console.log('[ /', window.location.hash, '] rendered.')

    // Get random product [just for fun]
    const indexes = await fetch(server.endPoint)
        .then(res => res.json())
        .then(json => json.products.map(p => p.id))

    // Guarantee to never fetch the same product
    let any, otherProduct = () => {
        any = indexes[Math.floor(Math.random() * indexes.length)]
        sessionStorage.getItem('productID') == any
        ? otherProduct() 
        : sessionStorage.setItem('productID', any)
    }; otherProduct()

    // reroute to a single page of a random product
    localStorage.setItem('fetched product', JSON.stringify(any))
    return window.location.hash = '#product/' + any
}