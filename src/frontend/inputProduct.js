import sweetAlert from "./sweetAlert.js"
import { 
    lastValue as moduleLastValue,  
    cartNotification, Cart, addToCart
} from "./Cart.js"
let lastValue = moduleLastValue
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

// [ ADD TO CART ] BEGINNING

addToCartBtn.onclick = async () => {
    lastValue = await import('./Cart.js')
    .then(Cart => Cart.lastValue)
    lastValue = lastValue + userInputNumber
    cartNotification.innerText = lastValue
    cartNotification.style.display = 'block'

    const Product = {}
    Product['title'] = document.querySelector('.details__title').innerHTML
    Product['price'] = document.querySelector('.details__now').innerHTML.split('<')[0].trim()
    Product['quant'] = document.querySelector(`#${Product.title.replaceAll(' ', '')}`)?.innerText || userInputNumber
    
    if (typeof Product.quant == 'string') Product.quant = userInputNumber + Number(Product.quant
    .slice(Product.quant.indexOf('x') + 1, Product.quant.indexOf('x') + 2))
    Product['image'] = document.querySelector('.gallery__image-container').style.backgroundImage
    
    Product.image = Product.image.slice(4, Product.image.lastIndexOf(')'))
    .replace('w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/', '')

    Product['href'] = '/#product/' + Product.image.split('/').at(-2)

    console.log(Product.href)
    userInput.value = userInputNumber = 0


    document.querySelector('.cart-empty').style.display = 'none'
    document.querySelector('.cart-modal__checkout').style.display = 'flex'

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
// [ ADD TO CART ] ENDING