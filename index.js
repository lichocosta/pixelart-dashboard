//WATCH
function actualizarHora() {
  let fecha = new Date();
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  let segundos = fecha.getSeconds();
  let diaSemana = fecha.getDay();
  let dia = fecha.getDate();
  let mes = fecha.getMonth();
  let year = fecha.getFullYear();
  let ampm;

  let time = document.getElementById('time');
  let pAMPM = document.getElementById('ampm');
  let pDiaSemana = document.getElementById('diaSemana');
  let pDia = document.getElementById('dia');
  let pMes = document.getElementById('mes');
  let pYear = document.getElementById('year');
  
  if (horas < 10) { horas = "0" + horas };
  if (minutos < 10) { minutos = "0" + minutos };
  if (segundos < 10) { segundos = "0" + segundos };
  if (horas == 0) { horas = 12 };
  
  time.innerHTML = horas + ":" + minutos + ":" + segundos;

  const semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  pDiaSemana.textContent = semana[diaSemana];

  pDia.textContent = dia;

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  pMes.textContent = meses[mes];

  pYear.textContent = year;

  if (horas >= 12) {
    horas = horas - 12;
    ampm = 'PM';
  } else {
    ampm = 'AM';
  }

  pAMPM.textContent = ampm;
};
actualizarHora();
setInterval(actualizarHora, 1000);

//API WEATHER
window.addEventListener('load', () => {
  if (!navigator.geolocation) return

  let longitude;
  let latitude;
  const temperatureValue = document.getElementById('temp-value');
  const temperatureDescription = document.getElementById('temp-description');
  const animatedIcon = document.getElementById('animated-icon');
  const humidityValue = document.getElementById('humidity-value');
  const windVelocity = document.getElementById('wind-velocity');

  navigator.geolocation.getCurrentPosition(async position => {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    const urlWeatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=alerts,daily,hourly,minutely&lang=es&appid=5170bb1c3a65ed75051a8ae14b60ee1b`;

    try {
      const response = await fetch(urlWeatherAPI)
      const data = await response.json()

      let temperature = Math.round(data.current.temp)
      temperatureValue.textContent = `${temperature} °C`

      let description = data.current.weather[0].description
      temperatureDescription.textContent = description.toUpperCase()

      let humidity = Math.round(data.current.humidity)
      humidityValue.textContent = `Humedad ${humidity}%`

      windVelocity.textContent = `Viento a ${data.current.wind_speed} m/s`

      const weatherIcons = {
        'Thunderstorm': 'animated/thunder.svg',
        'Drizzle': 'animated/rainy-2.svg',
        'Rain': 'animated/rainy-7.svg',
        'Snow': 'animated/snowy-6.svg',
        'Clear': 'animated/day.svg',
        'Atmosphere': 'animated/weather.svg',
        'Clouds': 'animated/cloudy-day-1.svg',
      }

      animatedIcon.src = weatherIcons[data.current.weather[0].main]

    } catch (error) {
      console.log(error);
    }
  })
})

//API CRYPTO
const cryptoContainer = document.getElementById('crypto-container');
const rankingCrypto = async () => {
  try {
    const answerCryptoAPI = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false`);

    const errorMessages = {
      401: "Pusiste mal la key",
      404: "La película no existe"
    }

    if (answerCryptoAPI.status !== 200) {
      return console.log(errorMessages[answerCryptoAPI.status] ?? 'Error');
    }

    const DATA_API = await answerCryptoAPI.json();

    let cryptoInformation = '';

    DATA_API.forEach(coin => {

      cryptoInformation +=
        `   
          <div class="">
            <div class="d-flex align-items-center justify-content-center">
              <img height="20" width="20" src="${coin.image}" alt="${coin.name}" class="me-2">
              <span>${coin.name}</span>
            </div>
            <div>
              <span>U$D ${coin.current_price.toFixed(4)}</span>
            </div>
          </div>    
        `;
    });

    cryptoContainer.innerHTML = cryptoInformation;

  } catch (error) {
    console.log(error);
  }
}
rankingCrypto();