import { server } from './pageTitle&dbURL.js'

export async function women () {
    // Notify success
    console.log('[ /', window.location.hash, '] rendered.')

    // Overcome dead-cached imported module of a deleted HTML
    if (sessionStorage.getItem('collections') == 1) {
        location.reload()
        return sessionStorage.removeItem('collections') 
    }; sessionStorage.setItem('collections', 1)

    // Get template
    const templatePath = '/src/backend/templates/collections.html'
    let template = await fetch(templatePath)
    .then(html => html.text())
    document.body.innerHTML = template

    // Fetch all products images links
    let ShuffledProducts = await fetch(server.endPoint)
    .then(res => res.json())
    .then(json => json.products)
    .then(women => women.filter(product => product.genre == 'women'))
    .then(products => products.map(product => product.imgs))
    .then(albumes => albumes.map((album, volume) => 
    album.map(photo => { 
        photo = photo.replace('/c_thumb,w_200,g_face', '')
        return {"id" : volume + 1, "url": photo }})))
    .then(collection => collection.flat())

    ShuffledProducts = shuffleArray(ShuffledProducts)

    // Import dynamically required scripts
    await (async () => { await import('../../frontend/hamburguerMenu.js')})()
    await (async () => { await import('../../frontend/Cart.js')})()
    await (async () => { await import('../../backend.js')})()

    // [ CHANGE HTML ELEMENTS ]
    const getItem = bem => document.querySelector(bem)

    // litle fixes to styles
    document.querySelector('div').style.display = 'fixed'

    // title
    document.title = server.PageTitle + ' | ' + 'Collections'

    // metadata
    getItem('meta[name="description"]')
    .setAttribute('content', 'SNEAKERS Autumn Limited Collection')

    // [COLLECTIONS SECTION]
    function recursivePrint() {
        const img = ShuffledProducts.at(-1).url
        const href = ShuffledProducts.at(-1).id

        document.querySelector('section').innerHTML += `
        <div class="content-container__items">
            <a href="#product/${href}">
              <img src="${img}" alt="sneaker">
            </a>
        </div>`
        
        ShuffledProducts.pop()
        
        if (ShuffledProducts.length) return recursivePrint()
        return document.querySelector('div').style.display = 'none'
    } recursivePrint()
    // litle fixes to styles
    document.body.style.overflow = 'auto'
}
// Interesting Fisher-Yates (also known as Knuth) shuffle algorithm.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}