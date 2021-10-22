/* eslint-disable no-unused-vars */
import fetchDispatcher from "../services/fetch-query.service";
import middleware from "../redux-hooks/middleware";
import store from "../redux-hooks/store";

export default function regions() {

	const getList = fetchDispatcher({ fetchType: 'GET' });
	getList.then(data => {
		
		let mapArray = [];
		// eslint-disable-next-line array-callback-return
		data.data.map(item => {
			mapArray.push({
				value: item.ID, 
				label: item.UUID
			})
		});

		middleware({
			type: 'MONITORINGS_DATA',
			value: JSON.stringify(mapArray)
		});

	});

	let fetchData = [];
	JSON.parse(localStorage.getItem('monitoringData')) 
	? fetchData = JSON.parse(localStorage.getItem('monitoringData')) 
	: fetchData = [];
	return fetchData;

	// eslint-disable-next-line no-unreachable
	middleware({ type: 'CLEAR_MONITORINGS_DATA' });

}

regions();