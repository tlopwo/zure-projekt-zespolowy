if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const axios = require('axios');
  const express = require('express');
  const app = express();
  
  app.use(express.json());
  app.use(express.static('public'));
  
  app.post('/weather', (req, res) => {
    const city = req.body.city;
    if (!city) {
      return res.status(400).json({ error: 'Brak nazwy miasta' });
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.APP_API_KEY}`;
    axios({
      url: url,
      responseType: 'json',
    })
      .then(response => res.json(response.data))
      .catch(error => {
        console.error('Błąd pobierania pogody:', error.message);
        res.status(500).json({ error: 'Błąd pobierania pogody' });
      });
  });
  
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
  });