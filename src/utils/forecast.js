const request = require('request')
var WEATHERSTACK_KEY = 'e891c98fdd0e7fa8541012bcc4005859'

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${lat},${long}&units=f`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to forecast services!')
        } else if (response.body.error) {
            callback('Unable to find location. Please try again.')
        } else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} F° out. It feels like ${response.body.current.feelslike} F°.`)
        }
    })
}

module.exports = forecast