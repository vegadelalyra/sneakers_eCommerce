import { server } from './pageTitle&dbURL.js'

export async function home () {
    // Notify about sucess
    console.log('[ /# ] rendered.')

    // Overcome dead-cached imported module of a deleted HTML
    if (sessionStorage.getItem('#') == 1) {
        location.reload()
        return sessionStorage.removeItem('#') }
    sessionStorage.setItem('#', 1)

    // Get template
    const templatePath = '/src/backend/templates/home.html'
    let template = await fetch(templatePath)
    .then(html => html.text())
    document.body.innerHTML = template

    // Fetch data from database json-server
    return await renderHome()
}

async function renderHome() {
    // Get random product [just for fun]
    const endPoint = server.endPoint + '/products/'

    const ids = await fetch(endPoint)
        .then(res => res.json())
        .then(products => products
            .map(product => product.id))

    // Guarantee to never fetch the same product
    let any, otherProduct = () => {
        any = ids[Math.floor(Math.random() * ids.length)]
        sessionStorage.getItem('productID') == any
        ? otherProduct() 
        : sessionStorage.setItem('productID', any)
    }; otherProduct()

    // fetch a random different product
    const randomProduct = await fetch(endPoint + any)
    .then(randomProduct => randomProduct.json())   

    // [Change html elements]
    const getItem = bem => document.querySelector(bem)

    // title
    document.title = server.PageTitle + ' | ' + randomProduct.name 

    // metadata
    getItem('meta[name="description"]')
    .setAttribute('content', randomProduct.name)

    // price
    getItem('.details__before').innerHTML = `$${randomProduct.price * 2}.00`    
    getItem('.details__now').innerHTML = `
        $${randomProduct.price}.00<span class="details__discount">50%</span>`

    // info
    getItem('.details__title').innerText = randomProduct.name
    getItem('.details__description').innerText = randomProduct.about
    
    // pics 
    document.querySelectorAll('.gallery__thumbnail')
    .forEach((thumbnail, index) => thumbnail.src = randomProduct.imgs[index])        
    document.querySelectorAll('.modal-gallery__thumbnail') 
    .forEach((thumbnail, index) => thumbnail.src = randomProduct.imgs[index])        

    // main img
    const mainImg_curatedURL = randomProduct.imgs[0]
    .replace('c_thumb,w_200,g_face', 'w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai') 
    
    document.querySelector('.gallery__image-container')
    .style.backgroundImage = `url(${mainImg_curatedURL})`

    // Import and attach all frontend events
    await import('/src/frontend.js')
}