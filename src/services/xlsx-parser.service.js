/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import fetchDispatcher from "./fetch-query.service";

export default function productsParser(inputData, uuid) {

	if ( window.File && window.FileReader && window.FileList && window.Blob ) {
		
		console.log('The File APIs are fully supported in this browser.');

	} else {
		
		console.log('The File APIs are not fully supported in this browser.');
	
	}

	let file = inputData[0];
	let fileReader = new FileReader();

}