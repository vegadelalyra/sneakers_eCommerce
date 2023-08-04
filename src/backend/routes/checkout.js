import { server } from './pageTitle&dbURL.js'

export async function checkout() {
    // Notify success
    console.log('[ /', window.location.hash, '] rendered.')

    // Overcome dead-cached imported module of a deleted HTML
    if (sessionStorage.getItem('checkout') == 1) {
        location.reload()
        return sessionStorage.removeItem('checkout') 
    }; sessionStorage.setItem('checkout', 1)

    // Get template
    const templatePath = '/src/backend/templates/checkoutForm/checkout.html'
    let template = await fetch(templatePath)
    .then(html => html.text())
    
    // Get styles
    const stylesPath = '/src/backend/templates/checkoutForm/checkout.css'
    const styles = document.createElement('link')
    styles.setAttribute('href', stylesPath)
    styles.setAttribute('rel', 'stylesheet')

    // Get events script (which imports axios-based app script)
    const JSeventsPath = '/src/backend/templates/checkoutForm/events.js'
    const JSevents = document.createElement('script')
    JSevents.setAttribute('src', JSeventsPath)
    JSevents.setAttribute('type', 'module')
    JSevents.defer = true

    // Apply styled template and scripts to attached document
    document.body.innerHTML = template
    document.head.appendChild(styles)
    document.head.appendChild(JSevents)

    // Import dynamically required scripts
    await (async () => { await import('../../frontend/hamburguerMenu.js')})()
    await (async () => { await import('../../frontend/Cart.js')})()
    await (async () => { await import('../../backend.js')})()

   // [ CHANGE HTML ELEMENTS ]

    // change title 
    document.title = server.PageTitle + ' | ' + 'Checkout'
}
