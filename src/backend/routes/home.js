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

    const length = await fetch(endPoint)
        .then(res => res.json())
        .then(arr => arr.length)
 
    const any = Math.floor(Math.random() * length + 1)
    const randomProduct = await fetch(endPoint + any)
    .then(randomProduct => randomProduct.json())   

    // Change html elements
    document.title = server.PageTitle 
    + ' | ' + randomProduct.name 

    const getItem = bem => document.querySelector(bem)

    // metadata
    getItem('meta[name="description"]')
    .setAttribute('content', randomProduct.name)

    // price
    getItem('.details__before').innerHTML = randomProduct.price * 2    
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


    // Import and attach all frontend events
    await import('/src/frontend.js')
}