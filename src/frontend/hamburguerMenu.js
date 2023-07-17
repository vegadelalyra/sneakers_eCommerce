// [ HAMBURGER MENU ]
const navMenuBtn = document.querySelector('.header__menu')
const navMenuModal = document.querySelector('.modal-navbar__background')
const closeBtn = document.querySelector('.modal-navbar__close-icon')

navMenuBtn.onclick = e => { 
    navMenuModal.style.display = 'block'

    navMenuModal.onclick = function(e) {
        if (e.target != this) return
        navMenuModal.style.display = 'none' 
    }
}

closeBtn.onclick = () => {
    navMenuModal.style.display = 'none' 
}