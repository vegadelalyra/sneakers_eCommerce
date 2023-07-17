// Change main gallery image

const imgContainer = document.querySelector('.gallery__image-container')
const prevGalleryBtn = document.querySelector('.gallery__previous')
const nextGalleryBtn = document.querySelector('.gallery__next')
const prevGalleryModalBtn = document.querySelector('.modal-gallery__previous')
const nextGalleryModalBtn = document.querySelector('.modal-gallery__next')

// [ CHANGE IMG WITH ARROWS ] beginning
const arrowBtns = [ prevGalleryBtn, nextGalleryBtn, prevGalleryModalBtn, nextGalleryModalBtn ]

let imgIndex = 1

arrowBtns.forEach(btn => btn.onclick = function(e) {
    e.target.alt == 'next'
    ? imgIndex == 4 ? imgIndex = 1 : imgIndex++
    : imgIndex == 1 ? imgIndex = 4 : imgIndex--

    this.attributes.class.value.includes('modal')
    ? modalImgContainer.style.backgroundImage = `url('./images/image-product-${imgIndex}.jpg')`
    : imgContainer.style.backgroundImage = `url('./images/image-product-${imgIndex}.jpg')`
})
// [ CHANGE IMG WITH ARROWS ] ending

// [ TOGGLE GALLERY MODAL ] beginning
const galleryModal = document.querySelector('.modal-gallery__background')

// Toggle modal
imgContainer.onclick = e => {
    if (e.target.tagName != 'IMG') galleryModal.style.display = 'grid'

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
        const img = e.target.src.replace('-thumbnail', '')

        this.id.includes('m') 
        ? modalImgContainer.style.backgroundImage = `url('${img}')`
        : imgContainer.style.backgroundImage = `url('${img}')`
    }
))
// [ THUMBNAILS ] ending