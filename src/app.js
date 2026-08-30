"use strict"

global.__basedir = __dirname

// imports
const express = require('express')

const ejs = require('ejs');

// local imports
const util = require(__basedir + '/helpers/util')

// get config
const config = require(__basedir + '/config')
const {
  PORT: port,
  SITE_PASSWORD: sitePassword,
  SESSION_SECRET: sessionSecret,
} = config

const session = require('express-session')
const { requireAuth } = require(__basedir + '/helpers/auth')

// connect to the database
require(__basedir + '/helpers/mongoose')

// start express application
console.log(`starting application on port ${port}`)

// preparing express app
const app = express()

  // NEW: Set ejs as view engine
  app.set('view engine', 'ejs')

  // NEW: expose style folder
  app.use('/public', express.static('public'));


// Parse incoming json
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
// CORS
const cors = require('cors')
const Project = require('./models/project')
app.use(cors())

// Sessions (used for password-gating the site)
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week
}))

// Login routes (must stay outside the auth gate)
app.get('/login', (req, res) => {
  if (req.session.authenticated) return res.redirect('/')
  res.render('login.ejs')
})

app.post('/login', (req, res) => {
  if (req.body.password === sitePassword) {
    req.session.authenticated = true
    return res.redirect('/')
  }
  res.render('login.ejs', { error: 'Incorrect password. Try again.' })
})

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'))
})

// Gate everything below this line behind the password
app.use(requireAuth)

// Routers
const projectRouter = require(__basedir + '/routers/hero')
app.use(projectRouter)



              // Route for specifyng hero list page.
   app.get('/', async (req, res) => {
    var perPage = 0
    var page = req.params.page || 0
    Project
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, projectRouter) {
            Project.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('homepage.ejs', {
                    projects: projectRouter,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
      });

  // Route for specifyng hero list page.
   app.get('projects/:page', async (req, res) => {
    var perPage = 4
    var page = req.params.page || 1
    Project
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, projectRouter) {
            Project.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('projects.ejs', {
                    projects: projectRouter,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
      });


// 404 Page
app.get('*', (req, res) => {
  res.render("404.ejs")
})



app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({
    err: "Something broke!"
  })
})

app.listen(port, () => {
  console.log(`\nServer is up:\n\n\thttp://localhost:${port}\n\n`)
})

