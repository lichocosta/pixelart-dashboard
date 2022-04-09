(function () {
  var actualizarHora = function () {
    var fecha = new Date(),
      horas = fecha.getHours(),
      ampm,
      minutos = fecha.getMinutes(),
      segundos = fecha.getSeconds(),
      diaSemana = fecha.getDay(),
      dia = fecha.getDate(),
      mes = fecha.getMonth(),
      year = fecha.getFullYear();

    var pHoras = document.getElementById('horas'),
      pAMPM = document.getElementById('ampm'),
      pMinutos = document.getElementById('minutos'),
      pSegundos = document.getElementById('segundos'),
      pDiaSemana = document.getElementById('diaSemana'),
      pDia = document.getElementById('dia'),
      pMes = document.getElementById('mes'),
      pYear = document.getElementById('year');

    var semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    pDiaSemana.textContent = semana[diaSemana];

    pDia.textContent = dia;

    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    pMes.textContent = meses[mes];

    pYear.textContent = year;

    if (horas >= 12) {
      horas = horas - 12;
      ampm = 'PM';
    } else {
      ampm = 'AM';
    }

    if (horas == 0) {
      horas = 12;
    }

    pHoras.textContent = horas;
    pAMPM.textContent = ampm;
    
    if (minutos < 10) { minutos = "0" + minutos };
    if (segundos < 10) { segundos = "0" + segundos };

    pMinutos.textContent = minutos;
    pSegundos.textContent = segundos;

  };

  actualizarHora();
  var intervalo = setInterval(actualizarHora, 1000);

}())

//API WEATHER
window.addEventListener('load', () => {
  let longitude;
  let latitude;
  const temperatureValue = document.getElementById('temp-value');
  const temperatureDescription = document.getElementById('temp-description');
  const animatedIcon = document.getElementById('animated-icon');
  const humidityValue = document.getElementById('humidity-value');
  const windVelocity = document.getElementById('wind-velocity');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const urlWeatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=alerts,daily,hourly,minutely&lang=es&appid=5170bb1c3a65ed75051a8ae14b60ee1b`;

      console.log(urlWeatherAPI);

      fetch(urlWeatherAPI)
        .then(response => { return response.json() })
        .then(data => {
          console.log(data);
          let temperature = Math.round(data.current.temp)
          temperatureValue.textContent = `${temperature} °C`

          let description = data.current.weather[0].description
          temperatureDescription.textContent = description.toUpperCase()

          let humidity = Math.round(data.current.humidity)
          humidityValue.textContent = `Humedad ${humidity} %`

          windVelocity.textContent = `Viento a ${data.current.wind_speed} m/s`

          switch (data.current.weather[0].main) {
            case 'Thunderstorm':
              animatedIcon.src = 'animated/thunder.svg'
              break;
            case 'Drizzle':
              animatedIcon.src = 'animated/rainy-2.svg'
              break;
            case 'Rain':
              animatedIcon.src = 'animated/rainy-7.svg'
              break;
            case 'Snow':
              animatedIcon.src = 'animated/snowy-6.svg'
              break;
            case 'Clear':
              animatedIcon.src = 'animated/day.svg'
              break;
            case 'Atmosphere':
              animatedIcon.src = 'animated/weather.svg'
              break;
            case 'Clouds':
              animatedIcon.src = 'animated/cloudy-day-1.svg'
              break;
            default:
              animatedIcon.src = 'animated/cloudy-day-1.svg'
          }

        })
        .catch(error => {
          console.log(error);
        })
    })
  }
})

const cryptoContainer = document.getElementById('crypto-container');
const rankingCrypto = async () => {
  try {
    const answerCryptoAPI = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false`);;

    console.log(answerCryptoAPI);


    const errorMessages = {
      401: "Pusiste mal la key",
      404: "La película no existe"
    }

    if (answerCryptoAPI.status !== 200) {
      return console.log(errorMessages[answerCryptoAPI.status] ?? 'Error');
    }

    const DATA_API = await answerCryptoAPI.json();

    console.log(DATA_API);

    let cryptoInformation = '';

    DATA_API.forEach(coin => {

      cryptoInformation +=
        `   
          <div class="mb-3">
              <div class="d-flex align-items-center justify-content-center">
                  <img style="height:20px;width:20px;" src="${coin.image}" alt="${coin.name}" class="me-2">
                  <span class="">${coin.name}</span>
              </div>
              <div class="container-title">
                  <span class="titulo">U$D${coin.current_price.toFixed(2)}</span>
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
