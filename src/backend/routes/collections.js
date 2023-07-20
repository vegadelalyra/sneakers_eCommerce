import { server } from './pageTitle&dbURL.js'

export async function collections () {
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
    .then(products => products.map(product => product.imgs))
    .then(albumes => albumes.map((album, volume) => 
    album.map(photo => { 
        photo = photo.replace('c_thumb,w_200,g_face/', '')
        console.log(photo)
        return {"id" : volume + 1, "url": photo }})))
    .then(collection => collection.flat())

    ShuffledProducts = shuffleArray(ShuffledProducts)

    // Import dynamically required scripts
    await (async () => { await import('../../frontend/hamburguerMenu.js')})()

    // [ CHANGE HTML ELEMENTS ]
    const getItem = bem => document.querySelector(bem)

    // litle fixes to styles
    document.body.style.overflow = 'auto'

    // title
    document.title = server.PageTitle + ' | ' + 'Collections'

    // metadata
    getItem('meta[name="description"]')
    .setAttribute('content', 'SNEAKERS Autumn Limited Collection')

    // [COLLECTIONS SECTION]
    const grids = document.querySelectorAll('[alt="sneaker"]')
    .forEach((grid, index) => grid.src = ShuffledProducts[index].url)

}
// Interesting Fisher-Yates (also known as Knuth) shuffle algorithm.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}