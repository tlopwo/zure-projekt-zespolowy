if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const path = require('path');
const axios = require('axios')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(__dirname, "/public"));


app.post('/weather', (req, res) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=/${APP_API_KEY}'
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data.currently))
})

// Domyślna trasa GET dla "/"
app.get('/', (req, res) => {
    res.sendFile(__dirname.trimEnd(2) + '/public/index.html');
});

app.listen(8080, '0.0.0.0', () => {
    console.log('SERVER ON')
    console.log('App hosted - http://localhost:8080/')
})