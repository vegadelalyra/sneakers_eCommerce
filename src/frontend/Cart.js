// [ LOAD CART FROM LOCAL STORAGE ] BEGINNING
const productContainer = document.querySelector('.cart-modal__checkout-container')
const cartNotification = document.querySelector('.header__cart--notification')
const checkoutButton = document.querySelector('.cart-modal__checkout')

const Cart = JSON.parse(localStorage.getItem('sneakers cart')) || {}

if (Object.values(Cart).length) {
    
    Object.values(Cart).forEach(Product => addToCart(Product))
    
    const inCartProductsAmount = Object.values(Cart)
    .map(Product => Product.quant).reduce((a, b) => a + b)

    cartNotification.innerText = inCartProductsAmount
    cartNotification.style.display = 'block'
    
    document.querySelector('.cart-empty').style.display = 'none'
    document.querySelector('.cart-modal__checkout').style.display = 'flex'
}
// [ LOAD CART FROM LOCAL STORAGE ] ENDING
let lastValue = parseInt(cartNotification.innerText)
function addToCart(Product){
    const ProductID = Product.title.replaceAll(' ', '')

    const template = `

        <div class="cart-modal__details-container" pid="${ProductID}">
            <img class="cart-modal__image" src=${Product.image} alt="thumbnail">
            <div>
                <p class="cart-modal__product">${Product.title}</p>
                <p class="cart-modal__price" id="${ProductID}">
                    ${Product.price} x${Product.quant} 
                    <span>
                        $${Number(Product.price.slice(1)) * Product.quant}.00
                    </span>
                </p>
            </div>
            <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete" name=${ProductID}>
        </div>`

    productContainer.innerHTML += template
    
    // [ DELETE PRODUCT FROM CART ] BEGINNING
    document.querySelectorAll('.cart-modal__delete')
    .forEach(x => x.onclick = function(){ 
        const removedProduct = productContainer
        .querySelector(`[pid="${this.name}"]`)
        productContainer.removeChild(removedProduct)

        let name = this.previousElementSibling.querySelector('p').innerText 
        let quant = this.previousElementSibling.querySelector('p:nth-child(2)').innerText
        quant = Number(quant.slice(quant.indexOf('x') + 1, quant.lastIndexOf('$')).trim())

        delete Cart[name]
        localStorage.setItem('sneakers cart', JSON.stringify(Cart))
        cartNotification.innerHTML = lastValue = lastValue - quant
        
        if (productContainer.children.length != 1) return 

        cartNotification.style.display = 'none'
        document.querySelector('.cart-empty').style.display = 'block'
        document.querySelector('.cart-modal__checkout').style.display = 'none'

        console.log(`[ ${Product.title} ] \nremoved from Cart`)
    })
    // [ DELETE PRODUCT FROM CART ] ENDING
}       
// [ ADD TO CART ] ENDING

// [ CART MODAL ] BEGINNING 
const cartIconBtn = document.querySelector('.header__cart')
const cartModal = document.querySelector('.cart-modal')
// const priceModal = document.querySelector('.cart-modal__price')

cartIconBtn.onmouseover = function() {
    if (cartModal.classList.contains('show')) return 
    cartModal.style.display = 'block'

    document.querySelector('main').onmouseout = e => {
        if (e.target.attributes.class?.value.includes('header')
        || cartModal.classList.contains('show')) return

        cartModal.style.display = 'none'
    }
}

cartIconBtn.onclick = function() {
    cartModal.classList.toggle('show')

    this.children[1].src.includes('orange')
    ? this.children[1].src = './images/icon-cart.svg' 
    : this.children[1].src = './images/icon-cart-orange.svg'
}
// [ CART MODAL ] ENDING