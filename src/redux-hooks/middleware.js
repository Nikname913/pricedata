export default function middleware(param) {

	switch (param.type) {

		case 'PRODUCTS_DATA':
			localStorage.setItem('productData', param.value);
			break;
		
		case 'CLEAR_PRODUCTS_DATA':
			localStorage.removeItem('productData');
			break;

		default: 
		break;

}}