export async function checkout() {
    // Notify success
    console.log('[ /', window.location.hash, '] rendered.')

    // Overcome dead-cached imported module of a deleted HTML
    if (sessionStorage.getItem('checkout') == 1) {
        location.reload()
        return sessionStorage.removeItem('checkout') 
    }; sessionStorage.setItem('checkout', 1)

    // Get template
    const templatePath = '/src/backend/templates/checkoutForm/index.html'
    let template = await fetch(templatePath)
    .then(html => html.text())

    document.write(template)
    
    
    // [Change html elements]]
    const getItem = bem => document.querySelector(bem)
    // some little styles
    // document.body.style.overflow = 'none'

}
