// SWEET ALERT EVENT [BEGINNING]
// Call this function when you want to show the SweetAlert popup
export function showCongratulationsAlert() {
    Swal.fire({
        icon: 'success',   // Set the icon to 'success'
        title: 'CONGRATULATIONS',   // Set the title
        text: 'Your order will arrive in 2 business days.',   // Set the message text
        confirmButtonColor: '#3085d6',   // Customize the confirm button color
        confirmButtonText: 'Okay'   // Customize the confirm button text
    })
} // SWEET ALERT EVENT [ENDING] 