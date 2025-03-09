let search = document.querySelector('.city-search')
const button = document.querySelector('.submit')
const wind = document.querySelector('[data-wind]')
const temperature = document.querySelector('[data-temperature]')
const pressure = document.querySelector('[data-pressure]')
let desc = document.getElementById('desc')
const APIkey = 'b50b4b8c081de0f71583cf50189c755f'

button.addEventListener('click', function(){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${APIkey}`)
  .then(response => response.json())
  // .then(data => console.log(data))
  .then(data => {
    let temperatureValue = data['main']['temp']
    let windValue = data['wind']['speed'] + ""
    let pressureValue = data['main']['pressure']
    let citynameValue = data['name']
    let descValue = "Currently: " + data['weather'][0]['description'] 

    temperature.innerHTML = temperatureValue.toFixed();
    wind.innerHTML = windValue;
    pressure.innerHTML = pressureValue.toFixed();
    cityname.innerHTML = citynameValue;
    desc.innerHTML = descValue;
  })
  .catch(error => {
    desc.innerHTML = `Error: ${error.message}`;
});
});