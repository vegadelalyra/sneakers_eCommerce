export default function () {
    // Define a function to show the first prompt dialog
    function showFirstPromptDialog() {
      Swal.fire({
        title: "How many items do you want to remove?",
        input: "number",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Remove",
        showLoaderOnConfirm: true,
        preConfirm: (numberOfItems) => {
          numberOfItems = parseInt(numberOfItems);
          if (isNaN(numberOfItems) || numberOfItems <= 0) {
            return Swal.showValidationMessage("Please enter a valid number of items to remove.");
          }
          return numberOfItems;
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          const numberOfItems = result.value;
          showSecondPromptDialog(numberOfItems);
        }
      });
    }
  
    // Define a function to show the second prompt dialog
    function showSecondPromptDialog(numberOfItems) {
        Swal.fire({
          title: "Are you sure?",
          text: `Do you want to remove ${numberOfItems} items from your cart?`,
          icon: "question",
          showCloseButton: true,
          showCancelButton: true,
          focusCancel: false,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Edit',
          showLoaderOnConfirm: true,
          customClass: {
            closeButton: 'edit-button'
          },
          didOpen: () => {
            const cancelButton = Swal.getCancelButton();
            cancelButton.addEventListener('click', () => {
              Swal.close();
              showFirstPromptDialog();
            });
          }
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", `${numberOfItems} items have been removed from your cart.`, "success");
          }
        });
      }
      
  
    // Initial call to show the first prompt dialog
    showFirstPromptDialog();
  }
  