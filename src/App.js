import React, { Component } from 'react';
import Form from './components/Form';
import Weather from './components/Weather';
import './App.css'

const API_KEY = "258ab5217cd99d2ba5b16ab8b1195bbd";
class App extends Component {
  state = {
    tempreature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: ''
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data = await api.json();
    if (city && country) {
      this.setState({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
    } else {
      this.setState({
        tempreature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: 'Please Enter Data'
      })
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Weather app</h1>
        <Form getWeather={this.getWeather} />
        <Weather 
         tempreature={this.state.tempreature}
         city={this.state.city}
         country={this.state.country}
         humidity={this.state.humidity}
         description={this.state.description}
         error={this.state.error}
        />
      </div>
    )
  }
}

export default App;