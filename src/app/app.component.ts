import { Component } from '@angular/core';
import { WeatherService } from './weather-service/weather-service.service';
import { DefaultData } from './default-data/default-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  weatherData = new DefaultData('Sunny Day', 'City', 'Country', 20, '10d', 10, 10);
  lat: any;
  lon: any;
  city:string;
  nearbyCityData: {temp: number, summary: string, name: string, country: string, icon: string}[] = [
    {'temp': 10, 'summary': 'Sunny Day', 'name': 'khandwa', 'country': 'IN', 'icon': '01d'},
    {'temp': 10, 'summary': 'Sunny Day', 'name': 'khandwa', 'country': 'IN', 'icon': '01d'},
    {'temp': 10, 'summary': 'Sunny Day', 'name': 'khandwa', 'country': 'IN', 'icon': '01d'}
  ]
  constructor (private WeatherService: WeatherService){}

  requestCityData(){

    // requesting weather data for entered city name

    this.WeatherService.getCitydata(this.city)
      .subscribe(data => {
        this.lat = data.coord.lat;
        this.lon = data.coord.lon;
        this.setLocationData(data);
        this.WeatherService.getNearbyLocation(this.lat, this.lon)
        .subscribe(data2 => this.setNearbyCityData(data2),
                  error => alert(error));
      },
      error => alert(error)
    );
  }
  requestLocationData(){

    //requesting user's current location coordinates

    if( navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
      
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;

        this.WeatherService.getLocation(this.lat, this.lon)
        .subscribe(data => {
          this.setLocationData(data);
          this.WeatherService.getNearbyLocation(this.lat, this.lon)
          .subscribe(data2 => this.setNearbyCityData(data2),
                    error => alert(error));
          },
                  error => alert(error));
      })
    }
    else{
      alert("Your browser does not support geolocation");
    }
  }
  setLocationData(data){

    // setting requested weather data to local variable

    this.weatherData.summary = data.weather[0].description;
    this.weatherData.location = data.name;
    this.weatherData.country = data.sys.country;
    this.weatherData.temp = parseInt(data.main.temp);
    this.weatherData.icon_id = data.weather[0].icon;
    this.weatherData.humidity = data.main.humidity;
    this.weatherData.wind = data.wind.speed;
    this.setImgAttribute(this.weatherData.icon_id,0);
  }
  setNearbyCityData(data2){

    //setting requested nearby city weather data to local variable

    for(let i = 1; i<4; i++){

      this.nearbyCityData[i-1].temp = data2.list[i].main.temp;
      this.nearbyCityData[i-1].summary = data2.list[i].weather[0].description;
      this.nearbyCityData[i-1].name = data2.list[i].name;
      this.nearbyCityData[i-1].country = data2.list[i].sys.country;
      this.nearbyCityData[i-1].icon = data2.list[i].weather[0].icon;
      this.setImgAttribute(this.nearbyCityData[i-1].icon, i);
    }
    this.weatherAppAnimation();
    this.city = '';
  }
  setImgAttribute(icon_id,i){

    //change weather icon based on weather data

    const icon = document.querySelectorAll('#weather-icon');
    icon[i].setAttribute('src', '../assets/img/icons/'+icon_id+'.svg');
  }
  weatherAppAnimation(){
      const navbar = document.querySelector('.navbar');
      const header = document.querySelector('header');
      const weather = document.querySelector('.content');
      const nearby = document.querySelector('.nearby-cities');

      navbar.classList.add('animate');
      header.classList.add('animate');
      weather.classList.add('animate');
      nearby.classList.add('animate');
  }
  
}
