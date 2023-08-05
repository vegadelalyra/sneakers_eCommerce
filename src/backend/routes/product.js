import { server } from './pageTitle&dbURL.js'

export async function product () {
    // If comes from an inexistent product, say sorry
    if (!!sessionStorage.getItem('error')) {
        console.log(sessionStorage.getItem('error'))
        sessionStorage.clear()
    }

    // Overcome dead-cached imported module of a deleted HTML
    if (sessionStorage.getItem('#') == 1) {
        location.reload()
        return sessionStorage.removeItem('#') 
    }; sessionStorage.setItem('#', 1)

    // Get product ID to render it
    const productID = localStorage.getItem('fetched product')

    // Fetch the randomnly picked product
    const Product = await fetch(server.endPoint)
    .then(res => res.json())
    .then(json => json.products[productID - 1])
        
    // if product doesn't exist. Get back
    if (!Product) {
        const messageError = `Product ${productID} doesn't exist yet!
Here you have other product, though!`
        sessionStorage.setItem('error', messageError)
        return location.href = '/#'
    }

    // Get template and notify about sucess
    const templatePath = '/src/backend/templates/home.html'
    let template = await fetch(templatePath)
    .then(html => html.text())
    document.body.innerHTML = template
    console.log('[ /', window.location.hash, '] rendered.')

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

    // Change little styles
    window.scrollTo(0, 0)

    // Import and attach all frontend events
    await import('/src/frontend.js')
}