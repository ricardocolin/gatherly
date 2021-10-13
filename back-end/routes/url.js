const express = require('express')
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');
//Allow json use
router.use(express.json({ limit: '1mb' }));

//Allow access from different port
router.all('/short', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });

// @route  POST /api/short
//@desc    Create short URL
router.post('/short', async(req, res) => {
    const { longUrl } = req.body;
    console.log( longUrl);
    console.log( { longUrl });
    const baseUrl = config.get('baseUrl');

    //Check base url
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    //Create url code
    const urlCode = shortid.generate();
    console.log("new Link: http://localhost:5000/",urlCode)

    //Check long url 
    if(validUrl.isUri(longUrl)) {
        try{
            // async function urlFunc(){
            let url = await Url.findOne({ longUrl });

            if(url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }
        }catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long url');
    }
});

module.exports = router;