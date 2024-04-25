require('dotenv').config()
const express = require('express')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser') // Import body-parser
const passport = require('passport')
const cors = require('cors')
const mongoose = require('mongoose')
const db = process.env.DATABASE_URI
const secret = process.env.SECRET
const PORT = process.env.PORT || 5000
const app = express()
const signupRoute = require('./routes/api/register')
const loginRoute = require('./routes/api/login')
const checkAuthRoute = require('./routes/api/checkAuth')
const logoutRoute = require('./routes/api/logout')
const usersRoute = require('./routes/api/users')
const UpdateUser = require('./routes/api/UpdateUser')
const checkPass = require('./routes/api/checkPass')
const AddEvent = require('./routes/api/AddEvent')
const getEvents = require('./routes/api/getEvents')
const deleteEvent = require('./routes/api/DeleteEvent')
const UpdateEvent = require('./routes/api/UpdateEvent')
const forgetPassword = require('./routes/api/ForgetPassword')
require('./passport/index')

// Increase payload size limit for body-parser
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' })) // Set a higher limit for JSON requests

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)

const store = new MongoDBSession({
  uri: db,
  collection: 'sessions',
})

app.use(
  session({
    key: 'sessionId',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // maxAge: 30 * 1000,
    },
  }),
)

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.post('/register', signupRoute)
app.post('/login', loginRoute)
app.post('/events', AddEvent)
app.post('/forget-password', forgetPassword)
app.get('/login', checkAuthRoute)
app.get('/logout', logoutRoute)
app.get('/users', usersRoute)
app.get('/checkPass', checkPass)
app.get('/events', getEvents)
app.put('/users/:userId', UpdateUser)
app.put('/events/:idEvent', UpdateEvent)
app.delete('/events/:idEvent', deleteEvent)
// Database + Server Connection Validation
mongoose
  .connect(db)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database Connected!')
      console.log(`Server is running on PORT: ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error)
  })
