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
}