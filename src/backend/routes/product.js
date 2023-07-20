import { server } from './pageTitle&dbURL.js'

export async function product () {
    // Get product ID to render and notify about sucess
    const productID = localStorage.getItem('fetched product')
    console.log('[ /', window.location.hash, '] rendered.')

    // Fetch the randomnly picked product
    const Product = await fetch(server.endPoint)
    .then(res => res.json())
    .then(json => json.products[productID])

    // Get template
    const templatePath = '/src/backend/templates/home.html'
    let template = await fetch(templatePath)
    .then(html => html.text())
    document.body.innerHTML = template

    // then, render it!
    renderRandom(Product) 
}

async function renderRandom(randomProduct) {
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