import { server } from './pageTitle&dbURL.js'

export async function home () {
    // Notify about sucess
    console.log('[ /', window.location.hash, '] rendered.')

    // Overcome dead-cached imported module of a deleted HTML
    if (sessionStorage.getItem('#') == 1) {
        location.reload()
        return sessionStorage.removeItem('#') }
    sessionStorage.setItem('#', 1)

<<<<<<< HEAD
    // Get template
    const templatePath = '/src/backend/templates/home.html'
    let template = await fetch(templatePath)
    .then(html => html.text())
    
    // Fetch data from database hosted server
    new Promise( r => document.body.innerHTML = template)
    return await renderHome()
}

async function renderHome() {
=======
>>>>>>> main
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

<<<<<<< HEAD
    // fetch a random different product
    const randomProduct = await Products[any]

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
=======
    // reroute to a single page of a random product
    localStorage.setItem('fetched product', JSON.stringify(any))
    return window.location.hash = '#product/' + any
>>>>>>> main
}