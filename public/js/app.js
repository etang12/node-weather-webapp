//select form/input from index.hbs file, input - stores user input
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
// html target id's with #{id name} | target classes with .{class name}
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// sets index.hbs <form></form> tag to act as a submit command
// on submit grab value from <input> (user input) and fetch() at weather-app api endpoint to show weather info in clientside JS
weatherForm.addEventListener('submit', (e) => {
    // prevents web page from hard refreshing
    e.preventDefault()

    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

