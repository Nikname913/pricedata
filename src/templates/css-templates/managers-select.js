const selectStylesManager = {
  option: (theme) => ({
    ...theme,
    fontSize: '13px',
    padding: '12px 0',
    paddingLeft: '12px',
    cursor: 'pointer'
  }),
  input: (theme) => ({
    ...theme,
    fontSize: '13px',
		borderBottom: '2px solid #ffc000',
		minWidth: 300,
		paddingRight: 0,
		paddingLeft: 8,
		paddingBottom: 10,
		marginLeft: -6
  }),
  singleValue: (theme) => ({
    ...theme,
    fontSize: '13px',
    paddingBottom: '1px'
  }),
  control: (theme) => ({
    ...theme,
    marginBottom: 9,
    border: 'none',
    outline: 'none',
    boxShadow: '0px 0px 6px 0.5px transparent',
		backgroundColor: 'transparent',
		width: 400,
		paddingLeft: 10
  }),
  menu: (theme) => ({
    ...theme,
    overflow: 'hidden',
    paddingTop: 6,
    paddingBottom: 6,
    width: '80%',
    marginTop: 9,
    border: 'none',
  }),
  menuList: (theme) => ({
    ...theme,
    width: '110%'
  }),
  indicatorSeparator: (theme) => ({
    ...theme,
    display: 'none'
  }),
  dropdownIndicator: (theme) => ({
    ...theme,
    display: 'none'
  }),
	noOptionsMessage: (theme) => ({
		...theme,
		display: 'none'
	}),
	loadingMessage: (theme) => ({
		...theme,
		display: 'none'
	}),
	loadingIndicator: (theme) => ({
		...theme,
		display: 'none'
	})
}

export default selectStylesManager;