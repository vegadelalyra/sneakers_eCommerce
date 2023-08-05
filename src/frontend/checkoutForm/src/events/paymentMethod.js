// PAYMENT METHOD SWAP [BEGINNING]
document.querySelectorAll('.method')
.forEach(payMethod => payMethod.onclick = async function() {
    
    // toggle selected/unselected styles on clicked button 
    this.classList.toggle('selected')
    const clicked = this.querySelector('.checkmark')
    clicked.classList.toggle('fill')
    clicked.setAttribute('name', 
    clicked.getAttribute('name') == 'checkmark-circle'
    ? 'checkmark-circle-outline' : 'checkmark-circle' )
    
    // toggle selected/unselected styles on the other button 
    const other = this.previousElementSibling || this.nextElementSibling
    other.classList.toggle('selected')
    const unclicked = other.querySelector('.checkmark')
    unclicked.classList.toggle('fill')
    unclicked.setAttribute('name', 
    unclicked.getAttribute('name') == 'checkmark-circle'
    ? 'checkmark-circle-outline' : 'checkmark-circle' )

    await import('./dynamicForm.js')
    .then(mod => mod.updateForm(this.id))
})
// PAYMENT METHOD SWAP [ENDING]