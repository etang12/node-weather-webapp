const request = require('request')
var MAPBOX_KEY = 'pk.eyJ1IjoiZXRhbmcxMiIsImEiOiJja3N6cG9vMmMydjg5Mm9sZWd2cXlranlhIn0.U5ZjYytWO0Rjpmt7NFdGgw'

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_KEY}&limit=1`
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (response.body.features.length === 0) {
            callback('Unable to find location, try again with another location.')
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                loc: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode