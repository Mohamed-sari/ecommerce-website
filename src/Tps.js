import { Oval } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import "./App.css";

function Grp204WeatherApp() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
    errorMessage: '',
  });
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavorites(savedFavorites);
  }, []);

  const toDateFunction = () => {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août',
      'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ];
    const WeekDays = [
      'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi',
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const search = async (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();

      if (!input) {
        setWeather({
          ...weather,
          error: true,
          errorMessage: 'Veuillez entrer un nom de ville valide.',
        });
        return;
      }

      setWeather({ ...weather, loading: true, error: false, errorMessage: '' });

      const url = 'https://api.openweathermap.org/data/2.5/forecast';
      const api_key = "35262b40094fad7158eef9565ee6a843";

      if (!api_key) {
        setWeather({
          ...weather,
          loading: false,
          error: true,
          errorMessage: 'La clé API est manquante. Veuillez la configurer correctement.',
        });
        return;
      }

      try {
        const res = await axios.get(url, {
          params: {
            q: input,
            units: 'metric',
            cnt: 8,
            appid: api_key,
          },
        });
        setWeather({
          data: res.data,
          loading: false,
          error: false,
        });
        setInput(''); 
      } catch (error) {
        setWeather({
          data: {},
          loading: false,
          error: true,
          errorMessage: error.response?.data?.message
            ? 'Ville introuvable.'
            : 'Erreur de réseau. Vérifiez votre connexion Internet.',
        });
      }
    }
  };

  const addToFavorites = () => {
    if (!input) return;

    if (favorites.includes(input)) {
      setWeather({
        ...weather,
        error: true,
        errorMessage: 'Cette ville est déjà dans vos favoris.',
      });
      return;
    }

    const updatedFavorites = [...favorites, input];
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
    setInput('');
  };

  const getFavoriteWeather = (city) => {
    setInput(city);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  return (
    <div className="App">
      <h1 className="app-name">Application Météo grp204</h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Entrez le nom de la ville..."
          name="query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={search}
        />
        <button className="add-to-favorites" onClick={addToFavorites}>
          Ajouter aux favoris
        </button>
        <button className="search-btn" onClick={search}>
          Rechercher
        </button>
      </div>

      {weather.loading && (
        <Oval type="Oval" color="black" height={100} width={100} />
      )}

      {weather.error && (
        <span className="error-message">
          <FontAwesomeIcon icon={faFrown} />
          <span>{weather.errorMessage}</span>
        </span>
      )}

      {weather.data.list && (
        <div>
          <h2>
            {weather.data.city.name}, {weather.data.city.country}
          </h2>
          <span>{toDateFunction()}</span>
          <img
            src={`https://openweathermap.org/img/wn/${weather.data.list[0].weather[0].icon}@2x.png`}
            alt={weather.data.list[0].weather[0].description}
          />
          <p>{Math.round(weather.data.list[0].main.temp)}°C</p>
          <p>Vitesse du vent : {weather.data.list[0].wind.speed} m/s</p>
        </div>
      )}

      {weather.data.list && (
        <div className="forecast-list">
          <h3>Prévisions sur 7 jours</h3>
          <ul>
            {weather.data.list.slice(1, 8).map((forecast, index) => (
              <li key={index}>
                <h4>{formatDate(forecast.dt)}</h4>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt={forecast.weather[0].description}
                />
                <p>Température: {Math.round(forecast.main.temp)}°C</p>
                <p>Vitesse du vent: {forecast.wind.speed} m/s</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="favorites-list">
          <h3>Villes Favoris</h3>
          <ul>
            {favorites.map((city, index) => (
              <li key={index} onClick={() => getFavoriteWeather(city)}>
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Grp204WeatherApp;
