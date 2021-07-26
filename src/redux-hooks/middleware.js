export default function middleware(param) {

	switch (param.type) {

		case 'PRODUCTS_DATA':
			localStorage.setItem('productData', param.value);
			break;
		
		case 'CLEAR_PRODUCTS_DATA':
			localStorage.removeItem('productData');
			break;

		case 'PRODUCTS_DATA_MON':
			localStorage.setItem('productDataMonitoring', param.value);
			break;
		
		case 'CLEAR_PRODUCTS_DATA_MON':
			localStorage.removeItem('productDataMonitoring');
			break;	

		case 'MONITORINGS_DATA':
			localStorage.setItem('monitoringData', param.value);
			break;
			
		case 'CLEAR_MONITORINGS_DATA':
			localStorage.removeItem('monitoringData');
			break;	

		default: 
		break;

}}