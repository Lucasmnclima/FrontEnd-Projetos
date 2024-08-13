// Adiciona um ouvinte de eventos para o formulário, para tratar o envio
document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city').value;
    getWeather(city);  // Obtém os dados do clima atual
    getForecast(city); // Obtém a previsão de cinco dias
});


// Função para obter os dados do clima atual
async function getWeather(city) { //Função assíncrona para que consuma a API com tempo
    const apiKey = '5019369a5a96c22bd083d83fa7c72b09'; // Substitua pela sua chave da API OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) { // Lembrando que o ! representa negação
            throw new Error('Cidade não encontrada');
        }
        const data = await response.json();
        displayWeather(data); // Exibe os dados do clima atual
    } catch (error) {
        alert(error.message);
    }
}

// Função para exibir os dados do clima atual
function displayWeather(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerText = `Temperatura: ${data.main.temp}°C`;
    document.getElementById('humidity').innerText = ` ${data.main.humidity}%`;
    document.getElementById('wind').innerText = ` ${data.wind.speed} m/s`;
    document.getElementById('description').innerText = `Descrição: ${data.weather[0].description}`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-data').classList.remove('hidden');
}

// Função para exibir a previsão de cinco dias
function displayForecast(data) {
    const forecastData = document.getElementById('forecast-data');
    forecastData.innerHTML = ''; // Limpa os dados anteriores da previsão

    // Filtra a lista de previsão para obter os dados das 12:00 de cada dia
    const forecastList = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));

    // Cria e exibe os elementos da previsão para cada dia
    forecastList.forEach(forecast => {
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        
        const date = new Date(forecast.dt_txt);
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        forecastElement.innerHTML = `
            <h4>${date.toLocaleDateString('pt-BR', options)}</h4>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Weather icon">
            <p>Temp: ${forecast.main.temp}°C</p>
            <p>Humidade: ${forecast.main.humidity}%</p>
            <p>Vento: ${forecast.wind.speed} m/s</p>
            <p>${forecast.weather[0].description}</p>
        `;

        forecastData.appendChild(forecastElement);
    });

    document.getElementById('forecast').classList.remove('hidden');
}
