const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creates a model for DB
const ShortUrlSchema = new Schema({
  
  //Variables to be stored in DB
  url: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
  },
})

const ShortUrl = mongoose.model('shortUrl', ShortUrlSchema)

module.exports = ShortUrl