var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
var path = require('path')
var createError = require('http-errors')
const categoryRouter = require('./app/category/router')
const dashboardRouter = require('./app/dashboard/router')
const nominalRouter = require('./app/nominal/router')
const voucherRouter = require('./app/voucher/router')
const bankRouter = require('./app/bank/router')
const paymentRouter = require('./app/payment/router')
const usersRouter = require('./app/users/router')
const transactionRouter = require('./app/transaction/router')
const playerRouter = require('./app/player/router')
const authRouter = require('./app/auth/router')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const URL = `/api/v1`

// view engine setup
app.use(cookieParser())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
    '/adminlte',
    express.static(path.join(__dirname, './node_modules/admin-lte'))
) // setup supaya style dan script bisa diimport di html
app.use(flash())
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {},
    })
)

app.use('/', usersRouter)
app.use('/dashboard', dashboardRouter)
app.use('/category', categoryRouter)
app.use('/nominal', nominalRouter)
app.use('/voucher', voucherRouter)
app.use('/bank', bankRouter)
app.use('/payment', paymentRouter)
app.use('/transaction', transactionRouter)
app.use('/transaction', transactionRouter)

// api

app.use(`${URL}/players`, playerRouter)
app.use(`${URL}/auth`, authRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
