if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const axios = require('axios')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req, res) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=/${APP_API_KEY}'
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data.currently))
})

// Domyślna trasa GET dla "/"
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8181, () => {
    console.log('SERVER ON')
    console.log('App hosted - http://localhost:8181/')
})