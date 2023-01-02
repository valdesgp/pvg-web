"use strict"

global.__basedir = __dirname

// imports
const express = require('express')

const hbs = require('hbs')
const ejs = require('ejs');
const pug = require('pug');

// local imports
const util = require(__basedir + '/helpers/util')

// get config
const config = require(__basedir + '/config')
const {
  PORT: port,
} = config

// connect to the database
require(__basedir + '/helpers/mongoose')

// start express application
console.log(`starting application on port ${port}`)

// preparing express app
const app = express()

  // NEW: Set hbs as view engine
  app.set('view engine', 'pug')
  // NEW: Set ejs as view engine
  app.set('view engine', 'ejs')
  // NEW: Set hbs as view engine
  app.set('view engine', 'hbs')
  // NEW: expose style folder
  app.use('/public', express.static('public'));


// Parse incoming json
app.use(express.json({ limit: '50mb' }))
// CORS
const cors = require('cors')
const Face = require('./models/face')
app.use(cors())


// Routers
const heroRouter = require(__basedir + '/routers/hero')
app.use(heroRouter)


app.get('/', async (req, res) => {
  var perPage = 5
  var page = req.params.page || 1

  Face
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, heroRouter) {
          Face.count().exec(function(err, count) {
              if (err) return next(err)
              res.render('index.ejs', {
                  faces: heroRouter,
                  current: page,
                  pages: Math.ceil(count / perPage)
              })
          })
      })    
  });

  // Route for specifyng hero list page.
  app.get('/:page', async (req, res) => {
    var perPage = 5
    var page = req.params.page || 1
    Face
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, heroRouter) {
            Face.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('index.ejs', {
                    faces: heroRouter,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
      });


  
// BACKUP         
//  const DEFAULT_HEROES_PER_PAGE = 10
//  const DEFAULT_COMMENTS_PER_PAGE = 3
 // res.render("demo");
// const pages = {
//  page: parseInt(req.query.page, DEFAULT_HEROES_PER_PAGE) || 0,
//  limit: parseInt(req.query.limit, DEFAULT_HEROES_PER_PAGE) || DEFAULT_HEROES_PER_PAGE
// }
// Hero.find()
//Sort by "Name" ascending
//  .sort({name: 'asc'})
//Skip count
//  .skip(pages.page * pages.limit)
//Page limit count
//  .limit(pages.limit)
//  .exec(function (err, heroRouter) {
//      if(err) { res.status(500).json(err); return; };
      //res.json(doc);
//      res.render('index.ejs', {
//        heros: heroRouter
//    })
//      console.log("Succesfully loaded 'Heroes' sorted and paginated!")
//  });

// 404 Page
app.get('*', (req, res) => {
  res.status(404).send({
    "err": "not found!",
  })
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

