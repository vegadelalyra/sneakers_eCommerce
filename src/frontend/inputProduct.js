import sweetAlert from "./sweetAlert.js"
// Defining articles amount bought by the client 

// [ INPUT ] BEGINNING
let minusBtn = document.querySelector('.input__minus')
let userInput = document.querySelector('.input__number')
let plusBtn = document.querySelector('.input__plus')
const addToCartBtn = document.querySelector('.details__button')

let userInputNumber = 0

userInput.onkeydown = function(e) {
    const Backspace = e.key == 'Backspace'
    const Numbers = e.key.match(/^[0-9]+$/)
    const Arrows = e.key.includes('Arrow')
    const TextSelected = this.selectionStart == 0 
    && this.selectionEnd == this.value.length

    if (this.value == '0' && Numbers) this.value = ''

    if ((this.value.length == 1 && Backspace) || TextSelected) {
        e.preventDefault()
        this.value = '0'
    } 

    if (Numbers || Backspace || Arrows) return 
    
    e.preventDefault()
}

userInput.onkeyup = function() {
    userInputNumber = this.value
    toggleAddToCartBtn()
}

plusBtn.onclick = () => {
    userInput.value = ++userInputNumber
    toggleAddToCartBtn()
}

minusBtn.onclick = () => {   
    if (--userInputNumber < 0) userInputNumber = 0    

    userInput.value = userInputNumber
    toggleAddToCartBtn()
}

function toggleAddToCartBtn() {
    const input = userInput.value
    const btnDisabled = addToCartBtn
    .classList.contains('disabled')

    if (input == false && !btnDisabled) {
        addToCartBtn.classList.add('disabled')
        addToCartBtn.disabled = true
    }
      
    if (!Number(input) == false) {
    addToCartBtn.classList.remove('disabled')
    addToCartBtn.disabled = false
    }
}
// [ INPUT ] ENDING

// [ LOAD CART FROM LOCAL STORAGE ] BEGINNING
const productContainer = document.querySelector('.cart-modal__checkout-container')
const cartNotification = document.querySelector('.header__cart--notification')

const Cart = JSON.parse(localStorage.getItem('sneakers cart')) || {}

if (Object.values(Cart).length) {
    
    Object.values(Cart)
    .forEach(Product => addToCart(Product))

    const inCartProductsAmount = Object.values(Cart)
    .map(Product => Product.quant).reduce((a, b) => a + b)

    cartNotification.innerText = inCartProductsAmount
    cartNotification.style.display = 'block'
    
    document.querySelector('.cart-empty').style.display = 'none'
    document.querySelector('.cart-modal__checkout').style.display = 'flex'
}

// [ LOAD CART FROM LOCAL STORAGE ] ENDING

// [ ADD TO CART ] BEGINNING

let lastValue = parseInt(cartNotification.innerText)

addToCartBtn.onclick = () => {
    lastValue = lastValue + userInputNumber
    cartNotification.innerText = lastValue
    cartNotification.style.display = 'block'
    userInput.value = userInputNumber = 0

    document.querySelector('.cart-empty').style.display = 'none'
    document.querySelector('.cart-modal__checkout').style.display = 'flex'

    const Product = {}
    Product['title'] = document.querySelector('.details__title').innerHTML
    Product['price'] = document.querySelector('.details__now').innerHTML.split('<')[0]
    Product['quant'] = lastValue

    Cart[Product.title] ? modifyCart() : addToCart(Product) 
    
    Cart[Product['title']] = Product 
    localStorage.setItem('sneakers cart', JSON.stringify(Cart))
    console.log( '[', Product.title, '\n', Product.price, 
    'x', Product.quant, ']', 'added to Cart')
    toggleAddToCartBtn()

    function modifyCart(){
        document.querySelector(`#${Product.title.replaceAll(' ', '')}`)
        .innerHTML = `${Product.price} x${Product.quant} 
        <span>$${Number(Product.price.slice(1)) * Product.quant}.00</span>`
    }
}

function addToCart(Product){
    const ProductID = Product.title.replaceAll(' ', '')

    const template = `

        <div class="cart-modal__details-container" pid="${ProductID}">
            <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="thumbnail">
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
    productContainer.querySelector(`[name=${ProductID}]`).onclick = () => {
        const removedProduct = productContainer
        .querySelector(`[pid="${ProductID}"]`)
        productContainer.removeChild(removedProduct)

        delete Cart[Product.title]
        localStorage.setItem('sneakers cart', JSON.stringify(Cart))

        cartNotification.innerHTML = lastValue 
        = lastValue - Product.quant
        
        if (productContainer.children.length != 1) return 

        lastValue = 0
        cartNotification.style.display = 'none'
        document.querySelector('.cart-empty').style.display = 'block'
        document.querySelector('.cart-modal__checkout').style.display = 'none'
    }
    // [ DELETE PRODUCT FROM CART ] ENDING

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