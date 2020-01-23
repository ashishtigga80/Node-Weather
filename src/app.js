const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geo.js')
const forecast = require('./utils/forecast')

const public = path.join(__dirname ,'../public')
const view = path.join(__dirname ,'./views')
const partial = path.join(__dirname ,'./views/partial')

const app = express()

app.set('view engine', 'hbs')
hbs.registerPartials(partial)
app.use(express.static(public))

app.get('', (req, res) => {
    res.render('index', {})
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({error: 'Enter search term'
    })}
    address = req.query.address
    geocode(address, (error, {latitude,longitude,location} = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({forecast: forecastData})
             })
        })
})
app.get('*', (req, res) => {
     res.render('error',undefined)
})

app.listen(3000, () => {})