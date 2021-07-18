export default function productsParser(inputData) {

	if (window.File && window.FileReader && window.FileList && window.Blob) {
		
		console.log('The File APIs are fully supported in this browser.');

	} else {
		
		console.log('The File APIs are not fully supported in this browser.');
	
	}

	let file = inputData[0];
	let fileReader = new FileReader();
	fileReader.readAsText(file);

	fileReader.onload = function() {
		
		let products = fileReader.result;
		products.split('\n').forEach(product => {
			console.log(product);
		});

	}

}