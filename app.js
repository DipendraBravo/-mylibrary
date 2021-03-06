if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' })
}

const express = require('express')
const app = express()
const expresslayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const methodoverride = require('method-override');
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

const bodyparser = require('body-parser');


//connection
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("connected to Mongoose"))

app.use(methodoverride('_method'))
app.use(bodyparser.urlencoded({ limit: "10mb", extended: false }))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expresslayouts)
app.use(express.static('public'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
app.listen(process.env.PORT || 3000)