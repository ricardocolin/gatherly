const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const shortId = require('shortid')
const createHttpError = require('http-errors')
const ShortUrl = require('./models/dbModel')

//Setting Express properties
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

//Connecting to MongoDB Database - Online
mongoose.connect('mongodb+srv://Ricardo:Coronel1@gatherlytest.4egyd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    dbName: 'Gatherly-ShortenUrl',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(error => console.log('Error Connecting...'))

//enabling "ejs" as the front-end
app.set('view engine', 'ejs')

app.get('/', async(req, res, net) => {
    res.render('index')
})

//Serves the route where new ShortID URL is triggered/Accessed
  app.get('/:shortId', async (req, res, next) => {
    try {
      const { shortId } = req.params
      const result = await ShortUrl.findOne({ shortId })
      if (!result) {
        throw createHttpError.NotFound('This url does not exist')
      }
      res.redirect(result.url)
    } catch (error) {
      next(error)
    }
  })

//Getting Url from POST Request 
app.post('/', async (req, res, next) => {
    try {
      const { url } = req.body
      if (!url) {
        throw createHttpError.BadRequest('Please read "Note" - "URL NOT VALID"')
      }
      const urlExists = await ShortUrl.findOne({ url })
      //If Url already exist we would use it instead of creating a new shortID
      if (urlExists) {
        res.render('index', {
          shortenUrl: `${req.headers.host}/${urlExists.shortId}`,
        })
        return
      }
      //If it does not exist we create a new shortID and save it to DB
      const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() })
      const result = await shortUrl.save()
      res.render('index', {
        shortenUrl: `${req.headers.host}/${result.shortId}`,
      })
    } catch (error) {
      next(error)
    }
  })

 //Sends a 500 status error
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('index', { error: err.message })
  })
  
  //Gives error if url was not found
  app.use((req, res, next) => {
    next(createHttpError.NotFound())
  })

//Serving PORT 5000
app.listen(5000, () => console.log('Connected to PORT 5000...'))
