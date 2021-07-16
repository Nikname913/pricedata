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

		default:
			break;	

	}
}