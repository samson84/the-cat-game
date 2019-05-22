require('dotenv').config()
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const http_request = require('got');

const PORT = process.env.BACKEND_PORT || process.env.PORT;
const CAT_API_KEY = process.env.CAT_API_KEY;
const BASE_URL = 'https://api.thecatapi.com/v1'

const limiter = rateLimit({
  windowMs: 15*60*1000,
  max: 100
})

const log = (...args) => console.log(...args)

const app = express();

app.enable("trust proxy");
app.use(limiter)
app.use(helmet())
app.use('/', express.static('build'))

app.get('/cat-api/*', (req, res) => {
  const url = req.url.replace('/cat-api/', '')
  log('requesting:', url);
  http_request(url, {
    baseUrl: BASE_URL, 
    headers: {'x-api-key': CAT_API_KEY}, 
    json: true
  }).then((apiResponse) => {
    log('API response code:', apiResponse.statusCode)
    res.json(apiResponse.body)
  }).catch((error) => {
    log('API error occured:', error)
    res.status(500);
    res.json({error: 'Something went wrong on the server :('})
  })
})

app.listen(PORT, () => log('App listening on:', PORT))