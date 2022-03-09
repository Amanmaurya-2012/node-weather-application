const { hasSubscribers } = require('diagnostics_channel')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')

const app = express()

// define path for express config
const partialspath = path.join(__dirname, '../templates/partials')
const viewspath = path.join(__dirname, '../templates/views')
const publicdirectorypath = path.join(__dirname, '../public')

// setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath )
hbs.registerPartials(partialspath)

// setup static directory to serve
app.use(express.static(publicdirectorypath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aman Maurya'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Aman Maurya',
        msg: 'This is help page. you can contact us any help.'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Aman Maurya'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }

    forecast(req.query.address, (error, {location, current} = {}) => {
        if(error){
            return res.send({error}) 
        }
        res.send({
            forecast: current.condition.text,
            location: location.name+ " "+ location.country,
            address: req.query.address
        })
    })

})

app.get('/help*', (req,res) => {
    res.render('404',{
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        errorMessage: 'Page not found'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('web-server started')
})
