import { server } from './pageTitle&dbURL.js'

export function product () {
    const productID = localStorage
    .getItem('fetched product')
    
    // Notify about sucess
    console.log('[ /', window.location.hash, '] rendered.')

    document.body.innerHTML = '<h1>hola</h1>'
    console.log('funcionó? xd', localStorage
    .getItem('fetched product'))
}