import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {

	height='';
	weight='';
	bmiValue = '';
	result ='';
	inputHandler(event){
		const {name, value} = event.target;
		if(name === 'height'){
			this.height = value
		}
		if(name === 'weight'){
			this.weight = value
		}

		// Another way
		// this[name] = value
	}

	submitHandler(event){
		event.preventDefault();
		console.log("Height:", this.height);
		console.log("Weight: ", this.weight);
		this.calculate();
	}

	calculate(){
		let height = Number(this.height)/100;
		let bmi = Number(this.weight)/(height * height);
		// console.log("BMI value is ",bmi);
		this.bmiValue = Number(bmi.toFixed(2));
		if(this.bmiValue < 18.5){
			this.result = "Underweight";
		} else if(this.bmiValue >= 18.5 && this.bmiValue <= 24.9){
			this.result = "Healthy";
		} else if(this.bmiValue >=25 && this.bmiValue <= 29.9){
			this.result = "Overweight";
		} else {
			this.result = "Obese"
		}

		console.log("BMI value is ", this.bmiValue);
		console.log("Result is ", this.result);
	}

	recalculate(){
		this.height='';
		this.weight='';
		this.bmiValue = '';
		this.result ='';
	}
}