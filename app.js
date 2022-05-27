const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = 3000
const hostname = '127.0.0.1'
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')


mongoose.connect('mongodb://127.0.0.1/pundit');

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: 'test-session',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({mongooseConnection: mongoose.connection})
}))

app.use(express.static('public'))

app.engine('handlebars',exphbs.engine())
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())

app.use((req, res, next) => {
    const {userId} = req.session
    if(userId) {
        res.locals = {
            displayLink: true
        }
    }  else {
        res.locals = {
            displayLink: false
        }
    }
    next()
})


const main = require('./routes/main')
/* const MongoStore = require('connect-mongo')
const { options } = require('./routes/main') */

app.use('/',main)





app.listen(port, hostname, () => console.log('server çalışıyor, http://localhost:%d',port))


