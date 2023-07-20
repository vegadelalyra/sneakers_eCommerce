import { server } from './pageTitle&dbURL.js'



export async function collections () {
    console.log('[ /#collections ] rendered.')

        // Get template
        const templatePath = '/src/backend/templates/collections.html'
        let template = await fetch(templatePath)
        .then(html => html.text())
        document.body.innerHTML = template

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