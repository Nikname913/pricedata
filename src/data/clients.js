/* eslint-disable no-unused-vars */
import fetchDispatcher from "../services/fetch-query.service";
import middleware from "../redux-hooks/middleware";
import store from "../redux-hooks/store";

export default function data() {

	const getList = fetchDispatcher({ fetchType: 'GET_CLIENTS' });
	getList.then(data => {
		
		let mapArray = [];
		// eslint-disable-next-line array-callback-return
		data.data.map(item => {
			mapArray.push({
				value: item.id, 
				label: item.name
			})
		});

		middleware({
			type: 'FILTER_CLIENTS_DATA',
			value: JSON.stringify(mapArray)
		});

	});

	let fetchData = [];
	JSON.parse(localStorage.getItem('filterClientsData')) 
	? fetchData = JSON.parse(localStorage.getItem('filterClientsData')) 
	: fetchData = [];
	return fetchData;

	// eslint-disable-next-line no-unreachable
	middleware({ type: 'CLEAR_FILTER_CLIENTS_DATA' });

}

data();