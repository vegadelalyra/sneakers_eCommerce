import { server } from './pageTitle&dbURL.js'

export async function home () {
    // Notify about sucess
    console.log('[ /# ] rendered.')

    // Get template
    const templatePath = '/src/backend/templates/home.html'
    let template = await fetch(templatePath)
    .then(html => html.text())
    document.body.innerHTML = template

    // Fetch data from database json-server
    const randomProduct = await renderHome()

    return {
        template: "/src/backend/templates/home.html",
        title: `Home | ${server.PageTitle}`,
        description: "Sneakers Gallery"
    }   
}

async function renderHome() {
    const product = await fetch(
        server.endPoint + '/products/1')
        .then(res => res.json())

    
    console.log(product)
}