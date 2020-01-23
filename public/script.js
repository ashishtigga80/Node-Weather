const Form = document.querySelector('form')
const search = document.querySelector('input')
const p = document.querySelector('#result')
Form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
     p.textContent = 'Wait'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                p.textContent = data.error
            } else {
                p.textContent = data.forecast
            }
        })
    })
})