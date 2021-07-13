import React, { useEffect, useState, useContext } from "react";
import { ReduxHooksContext } from "../Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faUserCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import Switch from '@material-ui/core/Switch';
import headerTags from '../templates/header-styled-elements';
import { withStyles } from "@material-ui/styles";

const Header = headerTags.Header;
const Logo = headerTags.Logo;
const Label = headerTags.SwitchLabel;
const Menu = headerTags.MenuBlock;

const ThemeSwitch = withStyles({
  control: {
    display: 'none'
  },
  switchBase: {
    color: '#6c757d',
    '&$checked': {
      color: '#ffc000'
    },
    '&$checked + $track': {
      backgroundColor: 'black'
    }
  },
  checked: {},
  track: {}
})(Switch);

function Head() {

  const { dispatch } = useContext(ReduxHooksContext);
  const [ theme, setTheme ] = useState({ themeChanger: true });
  const [ showSwitch, setShowSwitch ] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    localStorage.getItem('theme') === 'defaultTheme' 
    ? setTheme({themeChanger: false}) : null;
    setTimeout(() => setShowSwitch(true), 1000);
  },[]);

  return (
    <Header>

      <Logo/>
      <Menu>
        <FontAwesomeIcon 
					style={{
						color: 'white',
						marginLeft: 6,
					  marginBottom: 8,
            cursor: 'pointer'
					}}
          size="md" 
          icon={faHome}
        />
        <FontAwesomeIcon 
					style={{
						color: 'white',
						marginLeft: 6,
					  marginBottom: 8,
            cursor: 'pointer'
					}}
          size="md" 
          icon={faUserCircle}
        />
        <FontAwesomeIcon 
					style={{
						color: 'white',
						marginLeft: 6,
					  marginBottom: 8,
            cursor: 'pointer'
					}}
          size="md" 
          icon={faWindowMaximize}
          onClick={() => {
            dispatch({ type: 'CONTROL_LOG_MENU', value: '-300px' });
          }}
        />
      </Menu>

      { showSwitch === true ? ( 

        <React.Fragment>

          <Label>
            <pre style={{ 
              color: 'white', 
              letterSpacing: 2, 
              fontSize: 11 }}
            >
              
              {`${localStorage.getItem('theme') !== null
                  ? localStorage.getItem('theme').split('Theme')[0].toUpperCase() : 'BRANDPOL'
                }\nTHEME`}
            
            </pre>
          </Label>
        
          <ThemeSwitch
            checked={theme.themeChanger}
            name="themeChanger"
            onChange={() => { 
              setTheme({
                themeChanger: !theme.themeChanger
              });
              if ( !theme.themeChanger === false ) { localStorage.setItem('theme', 'defaultTheme'); } 
              else { localStorage.setItem('theme', 'brandPolTheme'); }
              setTimeout(() => document.location.reload(), 300);
            }}
          /> 

        </React.Fragment>
      
      ) : null }
      
    </Header>
  );
}

export default Head;
