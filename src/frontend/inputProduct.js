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

    if (lastValue != 0) return 
    productContainer.innerHTML = `
    <div class="cart-modal__details-container">
        <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="thumbnail">
        <div>
            <p class="cart-modal__product">Fall Limited Edition Sneakers</p>
            <p class="cart-modal__price">$125.00 x3 <span>$375.00</span></p>
        </div>
        <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
    </div>
    <button class="cart-modal__checkout">Checkout</button>`

    priceModal.innerHTML = `$125.00 x${lastValue} <span>$${lastValue*125}.00</span>`
}
// [ ADD TO CART ] ENDING

// [ CART MODAL ] BEGINNING 
const cartIconBtn = document.querySelector('.header__cart')
const cartModal = document.querySelector('.cart-modal')
const priceModal = document.querySelector('.cart-modal__price')

cartIconBtn.onclick = () => {
    cartModal.classList.toggle('show')

    // if (lastValue == 0) productContainer.innerHTML = '<p class="cart-empty">\
    // Your cart is empty</p>'
}
// [ CART MODAL ] ENDING

// [ DELETE CART ] BEGINNING
const deleteProductBtn = document.querySelector('.cart-modal__delete')
const productContainer = document.querySelector('.cart-modal__checkout-container')

deleteProductBtn.onclick = () => {
    productContainer.innerHTML = '<p class="cart-empty">\
        Your cart is empty</p>'

    cartNotification.innerText = lastValue = 0
    console.log('a');
}
// [ DELETE CART ] ENDING