// Change main gallery image

const imgContainer = document.querySelector('.gallery__image-container')
const prevGalleryBtn = document.querySelector('.gallery__previous')
const nextGalleryBtn = document.querySelector('.gallery__next')
const prevGalleryModalBtn = document.querySelector('.modal-gallery__previous')
const nextGalleryModalBtn = document.querySelector('.modal-gallery__next')
const imgCDN_dynamicURL = i => `https://res.cloudinary.com/vegadelalyra/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1689613379/sprint2/image-product-${i}.jpg`

// [ CHANGE IMG WITH ARROWS ] beginning
const arrowBtns = [ prevGalleryBtn, nextGalleryBtn, prevGalleryModalBtn, nextGalleryModalBtn ]

let galleryThumbIndex = 1, modalThumbIndex = 1

arrowBtns.forEach(btn => btn.onclick = function(e) {
    let index = this.className.includes('modal')
    ? modalThumbIndex : galleryThumbIndex

    e.target.alt == 'next'
    ? index == 4 ? index = 1 : index++
    : index == 1 ? index = 4 : index--

    this.attributes.class.value.includes('modal')
    ? modalImgContainer.style.backgroundImage = `url(${imgCDN_dynamicURL(index)})`
    : imgContainer.style.backgroundImage = `url(${imgCDN_dynamicURL(index)})`

    this.className.includes('modal')
    ? modalThumbIndex = index
    : galleryThumbIndex = index
})
// [ CHANGE IMG WITH ARROWS ] ending

// [ TOGGLE GALLERY MODAL ] beginning
const galleryModal = document.querySelector('.modal-gallery__background')

// Toggle modal
imgContainer.onclick = e => {
    if (window.matchMedia('(max-width:1115px)').matches 
    ||e.target.tagName == 'IMG') return
    
    galleryModal.style.display = 'grid'
    modalImgContainer.style.backgroundImage = e.target.style.backgroundImage
    modalThumbIndex = galleryThumbIndex

    galleryModal.onclick = e => {
        if (e.target.style.cssText != "display: grid;") return

        galleryModal.style.display = 'none'
    }
}

// Close gallery modal button
const closeModalBtn = document.querySelector('.modal-gallery__close-container')
closeModalBtn.onclick = () => galleryModal.style.display = 'none'
// [ TOGGLE GALLERY MODAL ] ending

// [ THUMBNAILS ] beginning
const modalImgContainer = document.querySelector('.modal-gallery__image-container')
const thumbnails = document.querySelectorAll('.gallery__thumbnail')
const modalThumbnails = document.querySelectorAll('.modal-gallery__thumbnail')

const allThumbnails = [thumbnails, modalThumbnails]

allThumbnails.forEach(thumbnails => thumbnails.forEach(thumbnail => 
    thumbnail.onclick = function(e) {
        const img = e.target.src
        .replace(
            'c_thumb,w_200,g_face', 
            'w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai'
        )
        
        this.id.includes('m') 
        ? modalImgContainer.style.backgroundImage = `url('${img}')`
        : imgContainer.style.backgroundImage = `url('${img}')`
    }
))

const Observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.attributeName != 'style') return
        
        const imgNumber = getComputedStyle(mutation.target)
        .getPropertyValue('background-image').at(-7)

        mutation.target.classList[0].includes('modal')
        ? updateActiveThumbnail(modalThumbnails) 
        : updateActiveThumbnail(thumbnails)

        function updateActiveThumbnail(container) {
            [...container].find(thumbnail => 
                thumbnail.classList.contains('active'))
                .classList.toggle('active');

            [...container].find(thumbnail => 
                thumbnail.id.includes(imgNumber))
                .classList.toggle('active')
        }
    })
})

Observer.observe(imgContainer, { attributes: true })
Observer.observe(modalImgContainer, { attributes: true })
// [ THUMBNAILS ] ending