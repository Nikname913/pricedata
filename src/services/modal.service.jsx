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
          marginTop: 32,
          marginBottom: 5 
        }}>
        { props.title }
      </DialogTitle>
      <DialogContent style={{ width: 440, height: 500, overflowY: 'hidden' }}>
        
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
            marginTop: '10px',
            marginBottom: '32px',
            boxSizing: 'border-box'
          }}
        >
          
          вы можете определить, в какое время нужно запускать мониторинг. можно выбрать несколько стартов для каждого дня, с пн по пт
        
        </p>

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
							placeholder={`время запуска, ${
                index === 0
                ? 'понедельник'
                : index === 1
                ? 'вторник'
                : index === 2
                ? 'среда'
                : index === 3
                ? 'четверг'
                : index === 4
                ? 'пятница' : ''
              }`}
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
                let newValue = [];
                value.forEach(item => {
                  newValue.push(item.label);
                });
								let counter = index + 1;
								switch(counter) {
									case 1:
										localStorage.setItem('start1From', JSON.stringify(newValue));
										break;
									case 2:
										localStorage.setItem('start2From', JSON.stringify(newValue));
										break;
									case 3:
										localStorage.setItem('start3From', JSON.stringify(newValue));
										break;	
									case 4:
										localStorage.setItem('start4From', JSON.stringify(newValue));
										break;
									case 5:
										localStorage.setItem('start5From', JSON.stringify(newValue));
										break;

									default: break;
								}} else {
								let counter = index + 1;
								switch(counter) {
									case 1:
										localStorage.setItem('start1From', '[]');
										break;
									case 2:
										localStorage.setItem('start2From', '[]');
										break;
									case 3:
										localStorage.setItem('start3From', '[]');
										break;	
									case 4:
										localStorage.setItem('start4From', '[]');
										break;
									case 5:
										localStorage.setItem('start5From', '[]');
										break;

									default: break;
								}}

							}}
            />
          </InputLine>

        ))} 

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
          onClick={() => {
            setShowModal(false);
            console.log(localStorage.getItem('start1From'));
            console.log(localStorage.getItem('start2From'));
            console.log(localStorage.getItem('start3From'));
            console.log(localStorage.getItem('start4From'));
            console.log(localStorage.getItem('start5From'));
          }}
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
          
            ОБНОВИТЬ
        
        </Button>
      </DialogActions>
    </Dialog>

    ) : ( 

      <Dialog open={true}>
      <DialogTitle style={{ 
          padding: 0, 
          textAlign: 'center',
          marginTop: 32,
          marginBottom: 5 
        }}>
        { props.title }
      </DialogTitle>
      <DialogContent style={{ width: 440, height: 500, overflowY: 'hidden' }}>
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
            marginTop: '10px',
            boxSizing: 'border-box'
          }}
        >
          
          вы можете добавить параметры для данного мониторинга в этой форме. для сохранения все поля должны быть заполнены. по завершению нажмите кнопку "добавить" для сохранения
        
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
          onClick={() => {
            setShowModal(false);
            console.log(localStorage.getItem('start1From'));
            console.log(localStorage.getItem('start2From'));
            console.log(localStorage.getItem('start3From'));
            console.log(localStorage.getItem('start4From'));
            console.log(localStorage.getItem('start5From'));
          }}
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
          
            ДОБАВИТЬ
        
        </Button>
      </DialogActions>
    </Dialog>

    )}

    </React.Fragment>
  );
}