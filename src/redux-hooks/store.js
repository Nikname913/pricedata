const store = [
	{ value: 'mName', label: '' },
	{ value: 'clientId', label: 0 },
	{ value: 'partnerId', label: 0 },
	{ value: 'sDate', label: '' },
	{ value: 'eDate', label: '' },
	{ value: 'uuid', label: '' },
	{ value: 'monList', label: [] },
	{ value: 'theme', label: [
		{ value: 'defaultTheme', pack: [
			{ value: 'header', styles: [
				{ elem: 'HEAD', backgroundColor: '#2d2d2d', color: '#fcfcfc' }
			]},
			{ value: 'sideBar', styles: [
				{ elem: 'ASIDE', backgroundColor: '#2d2d2d' },
				{ elem: 'MENU_BUTTON', 
					color: '#fcfcfc', 
					hoverBackground: '#ffc000',
					hoverColor: '#2d2d2d' },
			]},
			{ value: 'body', styles: [
				{ elem: 'WORKSPACE', backgroundColor: '#424242' }
			]},
			{ value: 'table', styles: [
				{ elem: 'TABLE_HEAD', 
					backgroundColor: '#6c757d', 
					color: '#fcfcfc' },
				{ elem: 'TABLE_CELL', 
					borderColor: '1px solid #2d2d2d', color: '#fcfcfc' },
				{ elem: 'TABLE_BUTTON', 
					backgroundColor: '#ffc000' },	
			]},
			{ value: 'removePopup', styles: [
				{ elem: 'CONTAINER', 
					backgroundColor: '#6c757d', 
					color: '#fcfcfc',
					btnsShadow: '0px 0px 3px 0.5px #2d2d2d' },
				{ elem: 'BUTTON_YES', backgroundColor: '#ffc000' },
				{ elem: 'BUTTON_NO', backgroundColor: '#ED5225' },
			]},
			{ value: 'cardElements', styles: [
				{ elem: 'CONTAINER', backgroundColor: '#6c757d' },
				{ elem: 'BUTTON', backgroundColor: '#ffc000' },
				{ elem: 'DATEPIC_LABEL', color: '#fcfcfc' },
				{ elem: 'TEXT_LABEL', color: '#fcfcfc' },
				{ elem: 'HEADLINE', color: '#fcfcfc' },
			]}
		]},
		{ value: 'brandPolTheme', pack: [
			{ value: 'header', styles: [
				{ elem: 'HEAD', backgroundColor: '#2d2d2d', color: '#fcfcfc' }
			]},
			{ value: 'sideBar', styles: [
				{ elem: 'ASIDE', backgroundColor: '#2d2d2d' },
				{ elem: 'MENU_BUTTON', 
					color: '#fcfcfc', 
					hoverBackground: '#ffc000',
					hoverColor: '#2d2d2d' },
			]},
			{ value: 'body', styles: [
				{ elem: 'WORKSPACE', backgroundColor: '#424242' }
			]},
			{ value: 'table', styles: [
				{ elem: 'TABLE_HEAD', 
					backgroundColor: '#6c757d', 
					color: '#fcfcfc' },
				{ elem: 'TABLE_CELL', 
					borderColor: '1px solid #2d2d2d', color: '#fcfcfc' },
				{ elem: 'TABLE_BUTTON', 
					backgroundColor: '#ffc000' },	
			]},
			{ value: 'removePopup', styles: [
				{ elem: 'CONTAINER', 
					backgroundColor: '#6c757d', 
					color: '#fcfcfc',
					btnsShadow: '0px 0px 3px 0.5px #2d2d2d' },
				{ elem: 'BUTTON_YES', backgroundColor: '#ffc000' },
				{ elem: 'BUTTON_NO', backgroundColor: '#ED5225' },
			]},
			{ value: 'cardElements', styles: [
				{ elem: 'CONTAINER', backgroundColor: '#6c757d' },
				{ elem: 'BUTTON', backgroundColor: '#ffc000' },
				{ elem: 'DATEPIC_LABEL', color: '#fcfcfc' },
				{ elem: 'TEXT_LABEL', color: '#fcfcfc' },
				{ elem: 'HEADLINE', color: '#fcfcfc' },
			]}
		]},
	]},
	{ value: 'pagination', label: [
		{ value: 'offset', label: 12 },
		{ value: 'items', label: 0 },
		{ value: 'pages', label: 0 },
		{ value: 'pageIndex', label: 1 },
		{ value: 'monList', label: []}
	]},
	{ value: 'monParams', label: {}},
	{ value: 'rulesState', label: [
		{ value: 'shortMenu', label: false },
		{ value: 'startDateViewCard', label: new Date() },
		{ value: 'endDateViewCard', label: new Date() },
		{ value: 'startDateEditCard', label: new Date() },
		{ value: 'endDateEditCard', label: new Date() },
		{ value: 'editCardValidateInner', label: 'обновить карточку' },
		{ value: 'showLogMenu', label: '0px' },
	]},
	{ value: 'logData', label: []}
];

export default store;