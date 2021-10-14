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

		case 'SOURCES_DATA':
			localStorage.setItem('sourceData', param.value);
			break;

		case 'CLEAR_SOURCES_DATA':
			localStorage.removeItem('sourceData');
			break;

		case 'CITYES_DATA':
			localStorage.setItem('cityesData', param.value);
			break;

		case 'CLEAR_CITYES_DATA':
			localStorage.removeItem('cityesData');
			break;	

		case 'FILTER_CLIENTS_DATA':
			localStorage.setItem('filterClientsData', param.value);
			break;

		case 'CLEAR_FILTER_CLIENTS_DATA':
			localStorage.removeItem('filterClientsData');
			break;

		case 'REPORTS_DATA':
			localStorage.setItem('reportsData', param.value);
			break;

		case 'CLEAR_REPORTS_DATA':
			localStorage.removeItem('reportsData');
			break;	

		case 'TASKS_DATA':
			localStorage.setItem('tasksData', param.value);
			break;

		case 'CLEAR_TASKS_DATA':
			localStorage.removeItem('tasksData');
			break;		

		default:
			break;

	}
}