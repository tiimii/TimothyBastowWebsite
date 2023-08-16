const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')

// Connecting to database
mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Connected to the database.')
})

// Starting express server
const app = express()
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('home')
})
app.get('/work', (req, res) => {
    res.render('work')
})
app.get('/photography', (req, res) => {
    res.render('photography')
})
app.get('/other', (req, res) => {
    res.render('other')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})