// Defining articles amount bought by the client 

// [ INPUT ] BEGINNING
let minusBtn = document.querySelector('.input__minus')
let userInput = document.querySelector('.input__number')
let plusBtn = document.querySelector('.input__plus')

let userInputNumber = 0

plusBtn.onclick = () => {
    userInput.value = ++userInputNumber
}

minusBtn.onclick = () => {   
    if (--userInputNumber < 0) userInputNumber = 0    

    userInput.value = userInputNumber
}
// [ INPUT ] ENDING

// [ ADD TO CART ] BEGINNING
const addToCartBtn = document.querySelector('.details__button')
const cartNotification = document.querySelector('.header__cart--notification')

let lastValue = parseInt(cartNotification.innerText)

addToCartBtn.onclick = () => {
    lastValue = lastValue + userInputNumber

    cartNotification.innerText = lastValue
    cartNotification.style.display = 'block'
    userInput.value = userInputNumber = 0

    document.querySelector('.cart-empty').style.display = 'none'
    document.querySelector('.cart-modal__checkout').style.display = 'flex'


    productContainer.innerHTML += `

    <div class="cart-modal__details-container">
        <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="thumbnail">
        <div>
            <p class="cart-modal__product">Fall Limited Edition Sneakers</p>
            <p class="cart-modal__price">$125.00 x3 <span>$375.00</span></p>
        </div>
        <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
    </div>`

    priceModal.innerHTML = `$125.00 x${lastValue} <span>$${lastValue*125}.00</span>`
}
// [ ADD TO CART ] ENDING

// [ CART MODAL ] BEGINNING 
const cartIconBtn = document.querySelector('.header__cart')
const cartModal = document.querySelector('.cart-modal')
const priceModal = document.querySelector('.cart-modal__price')

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

    // if (lastValue == 0) productContainer.innerHTML = '<p class="cart-empty">\
    // Your cart is empty</p>'
}
// [ CART MODAL ] ENDING

// [ DELETE PRODUCT FROM CART ] BEGINNING
// const deleteProductBtn = document.querySelector('.cart-modal__delete')
const productContainer = document.querySelector('.cart-modal__checkout-container')

// deleteProductBtn.onclick = () => {
//     cartNotification.innerText = lastValue = 0
// }
// [ DELETE PRODUCT FROM CART ] ENDING