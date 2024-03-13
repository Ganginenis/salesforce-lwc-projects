import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList'
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets'
// Example :- import TRAILHEAD_LOGO from '@salesforce/resourceUrl/trailhead_logo';'
export default class CurrencyConverter extends LightningElement {
	currencyImage = currencyConverterAssets+'/currencyConverterAssets/currency.svg'
	countryList = countryCodeList;
	countryFrom = "USD"
	countryTo = "INR"
	amount = ''
	result
	error
	changeHandler(event){
		const {name, value} = event.target

		// console.log("Name", name);
		// console.log("Value", value);
		this[name] = value
		this.result = ''
		this.error = ''
	}

	submitHandler(event){
		event.preventDefault();
		this.convert();
	}

	async convert(){
		const API_KEY = 'fda9336b91f752f321ede890'
		const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`
		try {
			const data = await fetch(API_URL);
			const jsonData = await data.json()
			// debugger;
			// console.log(jsonData);
			this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2);
			// console.log(this.result);
		} catch (error) {
			// console.log(error);
			this.error="An Error Occurred.Please Try again...!!!"
		}
	}

}