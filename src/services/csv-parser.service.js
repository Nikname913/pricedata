import fetchDispatcher from "../services/fetch-query.service";

export default function productsParser(inputData, uuid) {

	if ( window.File && window.FileReader && window.FileList && window.Blob ) {
		
		console.log('The File APIs are fully supported in this browser.');

	} else {
		
		console.log('The File APIs are not fully supported in this browser.');
	
	}

	let file = inputData[0];
	let fileReader = new FileReader();
	fileReader.readAsText(file);

	fileReader.onload = function() {
		
		let products = fileReader.result;
		let data = [];

		products.split('\n').forEach((product, index) => {
			
			let line = product.split(' ')[1];

			if ( line !== undefined ) {
				
				let productData = {
					Name: line.split(';')[2],
					MonitoringUUID: uuid,
					SKU: line.split(';')[0],
					SearchRequest: (`${line.split(';')[0]} ${line.split(';')[2]}`).toUpperCase(),
					RequiredWords: [line.split(';')[2].toLowerCase()],
				}

				data.push(productData);

			}

		});

		// eslint-disable-next-line no-unused-vars
		let queryParams = fetchDispatcher({
			fetchType: 'SET_PRODUCTS_FUCK',
			value: JSON.stringify({ data })
		});

		// console.log(data);
		// console.log(queryParams);

	}

}