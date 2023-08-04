// UPDATE FORM BASED ON PAYMENT METHOD [BEGINNING]
const Form = document.querySelector('form')

export async function updateForm(paymentMethod) {
    const paypal = [
        "PayPal account owner name",
        "PayPal account owner SSN",
        "PayPal account email",
        "example@email.com",
        "email"
    ]

    const card = [
        "Cardholder name",
        "Cardholder SSN",
        "Card Number",
        "1234567890XXXYYY",
        "number"
    ]    
    paymentMethod == 'paypal'
    ? await transForm(...paypal)
    : await transForm(...card)

    async function transForm(name, ssn, link, ph, intyp) {
        await Promise.all([
            Form.querySelector('[for="cardholder-name"]')
            .innerText = name,
            Form.querySelector('[for="card-ssn"]')
            .innerText = ssn,
            Form.querySelector('[for="card-number"]')
            .innerText = link,
            Form.querySelector('#card-number')
            .placeholder = ph,
            Form.querySelector('#card-number')
            .type = intyp,
            Form.querySelector('#card-number').parentElement
            .classList.toggle('card-number'),
            Form.querySelector('#card-number').parentElement
            .classList.toggle('cardholder-name'),
            Form.querySelector('#card-expire-date')
            .classList.toggle('hidden')
        ])
    }
}
// UPDATE FORM BASED ON PAYMENT METHOD [ENDING]
