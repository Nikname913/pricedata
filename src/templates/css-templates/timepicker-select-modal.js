const selectStyles = {
  option: (theme) => ({
    ...theme,
    fontSize: '13px',
    padding: '12px 0',
    paddingLeft: '12px',
    cursor: 'pointer',
    color: '#2d2d2d',
		fontFamily: 'Roboto, "sans-serif"'
  }),
  input: (theme) => ({
    ...theme,
    fontSize: '13px',
    paddingBottom: '3px'
  }),
  singleValue: (theme) => ({
    ...theme,
    fontSize: '13px',
    paddingBottom: '1px'
  }),
  control: (theme) => ({
    ...theme,
    border: 'none',
    outline: 'none',
    boxShadow: '0px 0px 2px 0.5px grey',
		width: 300,
		fontFamily: 'Roboto, "sans-serif"',
		fontWeight: 200,
  }),
  menu: (theme) => ({
    ...theme,
    overflow: 'hidden',
    paddingTop: 6,
    paddingBottom: 6,
    width: '80%',
    marginTop: 10,
    border: 'none',
		fontFamily: 'Roboto, "sans-serif"',
		fontWeight: 200
  }),
  menuList: (theme) => ({
    ...theme,
    width: '110%'
  }),
  indicatorSeparator: (theme) => ({
    ...theme,
    backgroundColor: '#ffc000'
  }),
  dropdownIndicator: (theme) => ({
    ...theme,
    paddingRight: 9
  }),
	placeholder: (theme) => ({
		...theme,
		fontSize: '13px',
    paddingBottom: '2px'
	}),
	noOptionsMessage: (theme) => ({
		...theme,
		display: 'none'
	}),
	loadingMessage: (theme) => ({
		...theme,
		display: 'none'
	}),
  multiValueLabel: (theme) => ({
    ...theme,
    fontSize: '13px',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 8,
  }),
  valueContainer: (theme) => ({
    ...theme,
    paddingTop: 8,
    paddingBottom: 8
  })
}

export default selectStyles;