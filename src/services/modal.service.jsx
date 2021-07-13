import React, { useContext } from "react";
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ModalContext } from '../Context';
import { times } from '../data/times';
import selectStylesTimepicker from '../templates/css-templates/timepicker-select-modal';
import bodyTags from '../templates/body-styled-elements';

const InputLine = bodyTags.MonitoringAddParamsFormLine;

export default function Modal({ props }) {
  
  const [ ,setShowModal ] = useContext(ModalContext);
  
  return(
    <React.Fragment>

    { props.modalType === 'startTimeService' ? (

    <Dialog open={true}>
      <DialogTitle style={{ 
          padding: 0, 
          textAlign: 'center',
          marginTop: 24,
          marginBottom: 5 
        }}>
        { props.title }
      </DialogTitle>
      <DialogContent style={{ width: 440, height: 500, overflowY: 'hidden' }}>
        <DialogContentText style={{ width: '80%' }}>
          { props.text }
        </DialogContentText>

        { [{},{},{},{},{}].map((item, index) => (
          
          <InputLine 
            style={{ 
              marginTop: 10,
              marginBottom: 10,
              width: 400,
              height: 'auto',
              marginLeft: 'auto',
              marginRight: 'auto',
              justifyContent: 'space-between'
            }}
          >
						<Select
              isMulti
							defaultOptions
							isSearchable="true"
							isClearable="true"
              isDisabled={ index < 5 ? false : true }
							options={times}
							placeholder="время от"
							theme={theme => ({
          			...theme,
          			borderRadius: 4,
          			colors: {
            		...theme.colors,
            		primary: 'rgb(236,236,236)',
            		primary25: 'rgb(236,236,236)',
            		primary50: 'rgb(236, 236, 236)'
          		}
        			})}
							styles={selectStylesTimepicker}
              onChange={value => {
								if ( value !== null ) {
								let counter = index + 1;
								switch(counter) {
									case 1:
										localStorage.setItem('start1From', value.label);
										break;
									case 2:
										localStorage.setItem('start2From', value.label);
										break;
									case 3:
										localStorage.setItem('start3From', value.label);
										break;	
									case 4:
										localStorage.setItem('start4From', value.label);
										break;
									case 5:
										localStorage.setItem('start5From', value.label);
										break;

									default: break;
								}} else {
								let counter = index + 1;
								switch(counter) {
									case 1:
										localStorage.setItem('start1From', '');
										break;
									case 2:
										localStorage.setItem('start2From', '');
										break;
									case 3:
										localStorage.setItem('start3From', '');
										break;	
									case 4:
										localStorage.setItem('start4From', '');
										break;
									case 5:
										localStorage.setItem('start5From', '');
										break;

									default: break;
								}}

							}}
            />
          </InputLine>

        ))} 

        <p
          style={{
            color: 'grey',
            fontFamily: 'Roboto, "sans-serif',
            fontSize: 13,
            lineHeight: '22px',
            textAlign: 'center',
            width: '90%',
            padding: '0 20px',
            margin: '0 auto',
            marginTop: '40px',
            boxSizing: 'border-box'
          }}
        >
          
          вы можете выбрать либо начальный и конечный момент времени, либо только время старта. не выбирайте исключительно конечное значение
        
        </p>

      </DialogContent>
      <DialogActions style={{ marginRight: '20px', marginBottom: '20px' }}>
      <Button
          style={{
            display: 'block',
            position: 'relative',
            width: '140px',
            height: '40px',
            lineHeight: '42px',
            borderRadius: '4px',
            fontSize: '11px',
            backgroundColor: '#ffc000',
            boxShadow: '0px 0px 2px 0.5px grey',
            color: '#2d2d2d',
            boxSizing: 'border-box',
            border: 'none',
            padding: 0,
            marginRight: 4
          }}
          onClick={() => setShowModal(false)}
        >
          
            ОТМЕНА
        
        </Button>
        <Button
          style={{
            display: 'block',
            position: 'relative',
            width: '140px',
            height: '40px',
            lineHeight: '42px',
            borderRadius: '4px',
            fontSize: '11px',
            backgroundColor: '#ffc000',
            boxShadow: '0px 0px 2px 0.5px grey',
            color: '#2d2d2d',
            boxSizing: 'border-box',
            border: 'none',
            padding: 0
          }}
          onClick={() => setShowModal(false)}
        >
          
            OK
        
        </Button>
      </DialogActions>
    </Dialog>

    ) : ( 

    <Dialog open={true}>
      <DialogTitle style={{ marginTop: '18px' }}>
        { props.title }
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ width: '80%' }}>
          { props.text }
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ marginRight: '20px', marginBottom: '20px' }}>
        <Button
          style={{
            display: 'block',
            position: 'relative',
            width: '170px',
            height: '40px',
            lineHeight: '42px',
            borderRadius: '4px',
            fontSize: '11px',
            backgroundColor: '#ED5225',
            color: 'white',
            boxSizing: 'border-box',
            border: 'none',
            padding: 0
          }}
          onClick={() => setShowModal(false)}
        >
          
            OK
        
        </Button>
      </DialogActions>
    </Dialog>

    )}

    </React.Fragment>
  );
}