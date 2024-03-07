import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';
export default class AlarmClock extends LightningElement {

	clockImage = AlarmClockAssets+'/AlarmClockAssets/clock.png'
	clockRingtone = new Audio(AlarmClockAssets+'/AlarmClockAssets/Clocksound.mp3')
	currentTime = ''
	hours = []
	minutes = []
	meridiums = ['AM','PM']
	alarmTime = ''
	isAlarmSet = false
	isAlarmTriggered = false

	hourSelected
	minuteSelected
	meriSelected

	get isAllFieldsNotSelected(){
		return !(this.hourSelected && this.minuteSelected && this.meriSelected)
	}

	get shakeImage(){
		return this.isAlarmTriggered ? 'shake' : ''
	}

	connectedCallback(){
		this.createHoursOptions()
		this.createMinutesOptions()
		this.currentTimeHandler()
	}

	currentTimeHandler(){
		setInterval(()=>{
			let dateTime = new Date();
			let hour = dateTime.getHours();
			let min = dateTime.getMinutes();
			let sec = dateTime.getSeconds();
			let ampm = "AM"
			if(hour === 0){
				hour = 12
			}else if(hour === 12){
				ampm = "PM"
			}else if(hour>=12){
				hour = hour - 12;
				ampm = "PM"
			}
			hour = hour <10 ? "0"+hour : hour;
			min = min < 10 ? "0"+min : min;
			sec = sec < 10 ? "0"+sec : sec;

			this.currentTime = `${hour}:${min}:${sec} ${ampm}`;
			if(this.alarmTime === `${hour}:${min} ${ampm}`){
				this.isAlarmTriggered = true
				this.clockRingtone.play()
				this.clockRingtone.loop = true;
			}
		},1000);	
	}

	createHoursOptions(){
		for(let i = 1; i<=12; i++){
			let val = i<10 ? "0"+i : i;
			this.hours.push(val);
		}
	}
	createMinutesOptions(){
		for(let i = 0; i<=59; i++){
			let val = i<10 ? "0"+i : i;
			this.minutes.push(val);
		}
	}

	optionHandler(event){
		const {label, value} = event.detail;
		if(label === 'hour(s)'){
			this.hourSelected = value
		}else if(label === 'minute(s)'){
			this.minuteSelected = value
		}else if(label === 'AM/PM'){
			this.meriSelected = value
		}else{

		}

		// console.log("Hours Selected: ", this.hourSelected);
		// console.log("Minutes Selected: ", this.minuteSelected);
		// console.log("Meridum Selected: ", this.meriSelected);
	}

	setAlarmHandler(){
		this.alarmTime = `${this.hourSelected}:${this.minuteSelected} ${this.meriSelected}`
		this.isAlarmSet = true
	}

	clearAlarmHandler(){
		this.isAlarmSet = false
		this.alarmTime = ''
		this.isAlarmTriggered = false
		this.clockRingtone.pause()
		const elements = this.template.querySelectorAll('c-clock-dropdown');
		Array.from(elements).forEach(element => {
			element.reset("");
		});
	}
}