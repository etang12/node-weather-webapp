const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
// Partials are normal hbs templates that can be called directly by other templates
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Eric Tang'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Eric Tang'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Help me!',
        title: 'Help',
        name: 'Eric Tang'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Must provide address.'
        })
    }
    const address = req.query.address
    // geocode provides latitude, longitude, location of given address
    geocode(address, (error, { lat, long, loc } = {}) => {
        if (error) {
            return res.send({ error })
        }
        // forecast provides weather forecast details using lat and long values from geocode data
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            console.log(forecastData)
            return res.send({
                location: loc,
                forecast: forecastData,
                address: address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Eric Tang',
        errMsg: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Eric Tang',
        errMsg: 'Page not found.'
    })
})

// Setup web server to run on port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})