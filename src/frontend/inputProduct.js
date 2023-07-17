// Defining articles amount bought by the client 

// [ INPUT ] BEGINNING
let minusBtn = document.querySelector('.input__minus')
let userInput = document.querySelector('.input__number')
let plusBtn = document.querySelector('.input__plus')

userInput.onkeydown = e => {
    const Backspace = e.key == 'Backspace'
    const Numbers = e.key.match(/^[0-9]+$/)
    const Arrows = e.key.includes('Arrow')

    if (Numbers || Backspace || Arrows) return 
    
    e.preventDefault()
}

let userInputNumber = 0

plusBtn.onclick = () => {
    userInput.value = ++userInputNumber
}

minusBtn.onclick = () => {   
    if (--userInputNumber < 0) userInputNumber = 0    

    userInput.value = userInputNumber
}
// [ INPUT ] ENDING

// [ LOAD CART FROM LOCAL STORAGE ] BEGINNING
const Cart = JSON.parse(localStorage.getItem('sneakers cart')) || {}

// if (Object.length(Cart)) 

// [ LOAD CART FROM LOCAL STORAGE ] ENDING

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

    const Product = {}
    Product['title'] = document.querySelector('.details__title').innerHTML
    Product['price'] = document.querySelector('.details__now').innerHTML.split('<')[0]
    Product['quant'] = lastValue

    Cart[Product.title] ? modifyCart() : addToCart() 
    
    Cart[Product['title']] = Product 
    localStorage.setItem('sneakers cart', JSON.stringify(Cart))
    console.log( '[', Product.title, '\n', Product.price, 
    'x', Product.quant, ']', 'added to Cart')

    function addToCart(){
        productContainer.innerHTML += `

            <div class="cart-modal__details-container">
                <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="thumbnail">
                <div>
                    <p class="cart-modal__product">${Product.title}</p>
                    <p class="cart-modal__price" id="${Product.title.replaceAll(' ', '')}">
                        ${Product.price} x${Product.quant} 
                        <span>
                            $${Number(Product.price.slice(1)) * Product.quant}.00
                        </span>
                    </p>
                </div>
                <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
            </div>`
    }

    function modifyCart(){
        document.querySelector(`#${Product.title.replaceAll(' ', '')}`)
        .innerHTML = `${Product.price} x${Product.quant} 
        <span>$${Number(Product.price.slice(1)) * Product.quant}.00</span>`
    }
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