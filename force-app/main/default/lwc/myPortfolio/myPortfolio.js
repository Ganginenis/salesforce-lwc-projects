import { LightningElement } from 'lwc';

export default class MyPortfolio extends LightningElement {

	isClicked = false;
	toggleClick(){
		this.isClicked = !this.isClicked;
	}
}