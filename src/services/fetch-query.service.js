export default async function fetchDispatcher(param) {

	switch(param.fetchType) {

		case 'GET': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/monitorings`
			).then(res => res.json());
			return query;
		}

		case 'POST': {
			let query = await fetch(
				`${process.env.REACT_APP_API_URL}/api/monitorings`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify({
						"data": param.value
					})
				}
			);
			return query;
		}

		case 'PUT': {
			let query = await fetch(
				`${process.env.REACT_APP_API_URL}/api/monitorings/${param.itemid}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: param.value
				}
			);
			return query;
		}

		case 'DELETE': {
			let query = await fetch(
				`${process.env.REACT_APP_API_URL}/api/monitorings/${param.itemid}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					}
				}
			);
			return query;
		}
		
		case 'SET_PARAMS': {
			let query = await fetch(
				`${process.env.REACT_APP_API_URL}/api/monitoring-params`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: param.value
				}
			);
			return query;		
		}

		case 'GET_PARAMS': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/monitoring-params/${param.value}`
			).then(res => res.json());
			return query;
		}

		case 'EDIT_PARAMS': {
			let query = await fetch(
				`${process.env.REACT_APP_API_URL}/api/monitoring-params/${param.itemid}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: param.value
				}
			);
			return query;		
		}

		case 'GET_PRODUCTS_TOTAL': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/product-search`
			).then(res => res.json());
			return query;
		}

		case 'GET_PRODUCTS_MONITORING': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/product-search?MonitoringUUID=${param.value}`
			).then(res => res.json());
			return query;
		}

		case 'REMOVE_PRODUCT': {
			let query = await fetch(
				`${process.env.REACT_APP_API_URL}/api/product-search/${param.value}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					}
				}
			);
			return query;		
		}

		case 'SET_PRODUCTS': {
			let query = await fetch(
				`${process.env.REACT_APP_API_URL}/api/product-search`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: param.value
				}
			);
			return query;		
		}

		case 'GET_SOURCES_TOTAL': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/parser-sources`
			).then(res => res.json());
			return query;
		}

		case 'SET_SOURCE': {
			let query = await fetch(
				`${process.env.REACT_APP_API_URL}/api/parser-sources`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: param.value
				}
			);
			return query;		
		}

		case 'GET_CLIENTS': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/clients`
			).then(res => res.json());
			return query;
		}

		case 'GET_PARTNERS': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/partners`
			).then(res => res.json());
			return query;
		}

		case 'GET_CITYES': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/geo/cities`
			).then(res => res.json());
			return query;
		}

		case 'GET_STATES': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/geo/states`
			).then(res => res.json());
			return query;
		}

		case 'GET_COUNTRIES': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/geo/countries`
			).then(res => res.json());
			return query;
		}

		case 'SET_REPORT': {
			let query = await fetch(
				`${process.env.REACT_APP_API_URL}/api/report-tasks`, { 
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: param.value
				}
			);
			return query;		
		}

		case 'GET_REPORTS': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/report-tasks`
			).then(res => res.json());
			return query;
		}

		case 'GET_TASKS': {
			let query = fetch(
				`${process.env.REACT_APP_API_URL}/api/tasks`
			).then(res => res.json());
			return query;
		}

		default:
			break;	

}}