import store from './store';
export default function reducer(state = store, action) {
	switch(action.type) {

		case 'CORRECT_NAME': {
			let newState = [];
			state.map(item => {
				// eslint-disable-next-line no-unused-expressions
				item.value === 'mName' ? item.label = action.value : null;
				newState.push(item);
			});
			return newState;
		}

		case 'CORRECT_CID': {
			let newState = [];
			state.map(item => {
				// eslint-disable-next-line no-unused-expressions
				item.value === 'clientId' ? item.label = action.value : null;
				newState.push(item);
			});
			return newState;
		}

		case 'CORRECT_PID': {
			let newState = [];
			state.map(item => {
				// eslint-disable-next-line no-unused-expressions
				item.value === 'partnerId' ? item.label = action.value : null;
				newState.push(item);
			});
			return newState;
		}

		case 'CORRECT_SDATE': {
			let newState = [];
			state.map(item => {
				// eslint-disable-next-line no-unused-expressions
				item.value === 'sDate' ? item.label = action.value : null;
				newState.push(item);
			});
			return newState;
		}
			
		case 'CORRECT_EDATE': {
			let newState = [];
			state.map(item => {
				// eslint-disable-next-line no-unused-expressions
				item.value === 'eDate' ? item.label = action.value : null;
				newState.push(item);
			});
			return newState;
		}

		case 'CORRECT_UUID': {
			let newState = [];
			state.map(item => {
				// eslint-disable-next-line no-unused-expressions
				item.value === 'uuid' ? item.label = action.value : null;
				newState.push(item);
			});
			return newState;
		}

		case 'CREATE_LIST': {
			let newState = [];
			state.map(item => {
				// eslint-disable-next-line no-unused-expressions
				item.value === 'monList' ? item.label = action.value : null;
				newState.push(item);
			});
			return newState;
		}

		case 'PAGINATION_LIST': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'pagination' ) {
					item.label[1].label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'PAGINATION_PAGES': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'pagination' ) {
					item.label[2].label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'PAGE_INDEX': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'pagination' ) {
					item.label[3].label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'PAGINATION_PAGES_PACK': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'pagination' ) {
					item.label[4].label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'SET_ONE_PARAMS': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'monParams' ) {
					item.label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'CONTROL_MENU': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'rulesState' ) {
					item.label[0].label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'CONTROL_START_DATE_VIEW_CARD': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'rulesState' ) {
					item.label[1].label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'CONTROL_END_DATE_VIEW_CARD': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'rulesState' ) {
					item.label[2].label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'CONTROL_START_DATE_EDIT_CARD': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'rulesState' ) {
					item.label[3].label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'CONTROL_END_DATE_EDIT_CARD': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'rulesState' ) {
					item.label[4].label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'CONTROL_LOG_MENU': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'rulesState' ) {
					item.label[6].label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'LOGGER': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'logData' ) {
					item.label.unshift(action.value); 
				}
				newState.push(item);
			});
			return newState;
		}

		case 'LOGGER_CLEAR': {
			let newState = [];
			state.map(item => {
				if ( item.value === 'logData' ) {
					item.label = action.value; 
				}
				newState.push(item);
			});
			return newState;
		}

		default: return state;

	}
}