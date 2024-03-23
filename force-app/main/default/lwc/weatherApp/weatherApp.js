import { LightningElement } from 'lwc';
import WEATHER_ICONS from '@salesforce/resourceUrl/weatherAppIcons'
import getWeatherDetails from '@salesforce/apex/weatherAppController.weatherApiDetails'
const API_KEY = '45a7cbf0848b91024a66cf427e0505dc';
export default class WeatherApp extends LightningElement {

	clearIcon = WEATHER_ICONS + '/weatherAppIcons/clear.svg'
	cloudIcon = WEATHER_ICONS + '/weatherAppIcons/cloud.svg'
	droptletIcon = WEATHER_ICONS + '/weatherAppIcons/droplet.svg'
	rainIcon = WEATHER_ICONS + '/weatherAppIcons/rain.svg'
	snowIcon = WEATHER_ICONS + '/weatherAppIcons/snow.svg'
	hazeIcon = WEATHER_ICONS + '/weatherAppIcons/haze.svg'
	mapIcon = WEATHER_ICONS + '/weatherAppIcons/map.svg'
	stormIcon = WEATHER_ICONS + '/weatherAppIcons/storm.svg'
	thermometerIcon = WEATHER_ICONS + '/weatherAppIcons/thermometer.svg'
	arrowBackIcon = WEATHER_ICONS + '/weatherAppIcons/arrow-back.svg'

	cityName = ''
	loadingText = ''
	isError = false
	response
	weatherIcon


	get loadingClasses(){
		return this.isError ? 'error-msg' : 'success-msg'
	}

	searchHandler(event){
		this.cityName = event.target.value
	}

	submitHandler(event){
		event.preventDefault();
		this.fecthData()
	}

	fecthData(){
		this.isError = false
		this.loadingText = 'Fetching weather details...'
		// console.log("cityName: ", this.cityName);

		//Calling API using Server Side(Apex)
		getWeatherDetails({input: this.cityName})
			.then(result=>{
				this.weatherDetails(JSON.parse(result));
			}).catch((error)=>{
				// console.error(error);
				this.isError = true
				this.loadingText = "Something went wrong...!!!";
			})

		//Calling API using Client Side
		/*
		const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`;

		fetch(URL).then(res=>res.json()).then(result=>{
			console.log(JSON.stringify(result));
			this.weatherDetails(result);
		}).catch((error)=>{
			console.error(error);
			this.isError = true
			this.loadingText = "Something went wrong...!!!";
		})
		*/
	}

	weatherDetails(info){ 
		if(info.cod === "404"){
			this.isError = true;
			this.loadingText = `${this.cityName} isn't a valid city name`
		}else{
			this.loadingText = ''
			this.isError = true;
			const city = info.name;
			const country = info.sys.country;
			const {description, id} = info.weather[0];
			const {temp, feels_like, humidity} = info.main

			if(id === 800){
				this.weatherIcon = this.clearIcon
			} else if(id>=200 && id<=232){
				this.weatherIcon = this.stormIcon
			} else if((id>=300 && id<=321) || (id>=500 && id<=531)){
				this.weatherIcon = this.rainIcon
			} else if(id>=600 && id<=622){
				this.weatherIcon = this.snowIcon
			} else if(id>=701 && id<=781){
				this.weatherIcon = this.hazeIcon
			} else if(id>=801 && id<=804){
				this.weatherIcon = this.cloudIcon
			} else {}

			this.response = {
				city: city,
				description: description,
				location: `${city}, ${country}`,
				temperature: Math.floor(temp),
				feels_like: Math.floor(feels_like),
				humidity: `${humidity}%`
			}
		}
	}

	backHandler(){
		this.response = null
		this.loadingText = ''
		this.weatherIcon = ''
		this.cityName = ''
		this.isError = false

	}
}