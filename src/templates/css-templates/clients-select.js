const selectStyles = {
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
    paddingBottom: '3px',
    color: 'black',
  }),
  singleValue: (theme) => ({
    ...theme,
    fontSize: '13px',
    paddingBottom: '1px',
    color: 'black',
  }),
  control: (theme) => ({
    ...theme,
    marginBottom: 9,
    border: 'none',
    outline: 'none',
    boxShadow: '0px 0px 6px 0.5px grey'
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
    backgroundColor: '#ffc000'
  }),
  dropdownIndicator: (theme) => ({
    ...theme,
    paddingRight: 9
  }),
	placeholder: (theme) => ({
		...theme,
		fontSize: '13px',
    paddingBottom: '2px',
    color: 'black',
	}),
	noOptionsMessage: (theme) => ({
		...theme,
		display: 'none'
	}),
	loadingMessage: (theme) => ({
		...theme,
		display: 'none'
	})
}

export default selectStyles;