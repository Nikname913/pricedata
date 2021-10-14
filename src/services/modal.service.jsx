import React, { useContext, useState, useEffect } from "react";
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MonitoringParamsForm from "../comps/inMain/MonParamsForm";
import ReportsForm from "../comps/inMain/ReportsForm";
import fetchDispatcher from "../services/fetch-query.service";
import middleware from "../redux-hooks/middleware";
import { ModalContext, ReduxHooksContext } from '../Context';
import { times } from '../data/times';
import selectStylesTimepicker from '../templates/css-templates/timepicker-select-modal';
import bodyTags from '../templates/body-styled-elements';

const InputLine = bodyTags.MonitoringAddParamsFormLine;
const InputLineLabel = bodyTags.MonitoringAddParamsFormLineDayStartLabel;
const ReportItem = bodyTags.MonitoringReportListItem;
const ReportItemTitle = bodyTags.MonitoringReportListItemTitle;
const ReportItemContent = bodyTags.MonitoringReportListItemContent;
const ReportItemButton = bodyTags.MonitoringReportListItemButton;

export default function Modal({ props }) {
  
  const { state, dispatch } = useContext(ReduxHooksContext);
  const [ ,setShowModal ] = useContext(ModalContext);
  const [ paramsData, setParamsData ] = useState({});

  const createParamsFromEditForm = (data) => {
	
    let params = { data }
    setParamsData(params);
  
  }

  useEffect(() => {

    const query = fetchDispatcher({fetchType: 'GET_REPORTS'});
    query.then(data => {

      middleware({
        type: 'REPORTS_DATA',
        value: JSON.stringify(data)
      });

      setTimeout(() => {

        dispatch({
          type: 'REPORT_DATA_LIST',
          value: JSON.parse(localStorage.getItem('reportsData'))
        });

        middleware({ type: 'CLEAR_REPORTS_DATA' });

        console.log(state[18].label);

      }, 1000);

		});

  },[]);
  
  return(

    <React.Fragment>

    { props.modalType === 'showReportService' ? (

    <Dialog 
      open={true}
      onWheel={(e) => e.stopPropagation()}
    >
      <DialogTitle style={{ 
          padding: 0, 
          textAlign: 'center',
          marginTop: 32,
          marginBottom: 5, 
        }}>
        { props.title }
      </DialogTitle>
      <DialogContent 
        style={{ 
          width: 500, 
          height: 500, 
          overflowY: 'hidden', 
          backgroundColor: 
            props.background === '#6c757d' 
            ? '' : '',
          marginLeft: 14,
          marginRight: 14,
          marginTop: 28,
          marginBottom: 20,
          borderTop: '2px solid #ffc000'
        }}
        onWheel={(e) => {
          if ( e.deltaY > 0 ) {
						dispatch({
							type: 'CONTROL_MODALCARD_MARGIN',
							value: state[10].label[13].label - 10
						});
					} else {
						// eslint-disable-next-line no-unused-expressions
						state[10].label[13].label < 0 
						? dispatch({
							type: 'CONTROL_MODALCARD_MARGIN',
							value: state[10].label[13].label + 10
						})
						: dispatch({
							type: 'CONTROL_MODALCARD_MARGIN',
							value: 29
						});
					}
				}}
      >
        <p
          style={{
            color: 'black',
            fontFamily: 'Roboto, "sans-serif',
            fontSize: 13,
            lineHeight: '22px',
            textAlign: 'center',
            width: '90%',
            padding: '0 20px',
            margin: '0 auto',
            marginTop: state[10].label[13].label,
            marginBottom: '38px',
            boxSizing: 'border-box'
          }}
        >
          
          ниже представлен список всех отчетов по выбранному мониторингу. для просмотра отдельного отчета нажмите по нему. вы также можете удалить отчет, как и в списке, так и в карточке
        
        </p>

        { state[18].label.data?.length > 0 ? 
        
          state[18].label.data.map(item => (

            <ReportItem>
              <ReportItemTitle>{ item.UUID }</ReportItemTitle>
              <ReportItemContent style={{ marginTop: -8 }}>тип отчета - {
              
                item.ReportType === 'daily_prices_report' 
                ? 'ежедневный мониторинг цен'
                : 'ежедневный мониторинг цен eccomerce'

              }</ReportItemContent>
              <ReportItemContent>начальный период - {item.PeriodStart}</ReportItemContent>
              <ReportItemContent>конечный период - {item.PeriodEnd}</ReportItemContent>

              <ReportItemButton
                onClick={() => {

                  window.open(`${process.env.REACT_APP_API_URL}/api/report-tasks/${item.UUID}/download`)

                }}
              >
                скачать отчет
              </ReportItemButton>

            </ReportItem>

          ))

        : null }

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
      </DialogActions>
    </Dialog>

    ) : props.modalType === 'newReportService' ? (
    
    <Dialog 
      open={true}
      onWheel={(e) => e.stopPropagation()}
    >
      <DialogTitle style={{ 
          padding: 0, 
          textAlign: 'center',
          marginTop: 32,
          marginBottom: 5, 
        }}>
        { props.title }
      </DialogTitle>
      <DialogContent 
        style={{ 
          width: 500, 
          height: 500, 
          overflowY: 'hidden', 
          backgroundColor: 
            props.background === '#6c757d' 
            ? '' : '',
          marginLeft: 14,
          marginRight: 14,
          marginTop: 28,
          marginBottom: 20,
          borderTop: '2px solid #ffc000'
        }}
        onWheel={(e) => {
          if ( e.deltaY > 0 ) {
						dispatch({
							type: 'CONTROL_MODALCARD_MARGIN',
							value: state[10].label[13].label - 10
						});
					} else {
						// eslint-disable-next-line no-unused-expressions
						state[10].label[13].label < 0 
						? dispatch({
							type: 'CONTROL_MODALCARD_MARGIN',
							value: state[10].label[13].label + 10
						})
						: dispatch({
							type: 'CONTROL_MODALCARD_MARGIN',
							value: 29
						});
					}
				}}
      >
        <p
          style={{
            color: 'black',
            fontFamily: 'Roboto, "sans-serif',
            fontSize: 13,
            lineHeight: '22px',
            textAlign: 'center',
            width: '90%',
            padding: '0 20px',
            margin: '0 auto',
            marginTop: state[10].label[13].label,
            marginBottom: '20px',
            boxSizing: 'border-box'
          }}
        >
          
          в этой форме вы можете создать новый отчет для открытого мониторинга. для этого заполните все поля и нажмите кнопку добавить. все поля являются обязательными
        
        </p>

        <ReportsForm 
          blackColor={true}
          paramsUp={createParamsFromEditForm}
					createFilter={props.monitoring}
        />

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
          onClick={ async () => {
            setShowModal(false);
            let query = await fetchDispatcher({
              fetchType: 'SET_REPORT',
              value: JSON.stringify({
                data: {
                  MonitoringUUID: props.uuid,
                  ReportType: state[14].label,
                  Language: state[15].label,
                  PeriodStart: state[16].label.getMonth() + 1 < 10
                    ? `${state[16].label.getFullYear()}-0${state[16].label.getMonth() + 1}-${state[16].label.getDate()}`
                    : `${state[16].label.getFullYear()}-${state[16].label.getMonth() + 1}-${state[16].label.getDate()}`,
                  PeriodEnd: `${state[17].label().getFullYear()}-${state[17].label().getMonth() + 1}-${state[17].label().getDate()}`
                }
              })
            });
            console.log({
              MonitoringUUID: props.uuid,
              ReportType: state[14].label,
              Language: state[15].label,
              PeriodStart: state[16].label.getMonth() + 1 < 10
                ? `${state[16].label.getFullYear()}-0${state[16].label.getMonth() + 1}-${state[16].label.getDate()}`
                : `${state[16].label.getFullYear()}-${state[16].label.getMonth() + 1}-${state[16].label.getDate()}`,
              PeriodEnd: `${state[17].label().getFullYear()}-${state[17].label().getMonth() + 1}-${state[17].label().getDate()}`
            });
            console.log(query);
          }}
        >
          
            ДОБАВИТЬ
        
        </Button>
      </DialogActions>
    </Dialog>
    
    ) : props.modalType === 'startTimeService' ? (

    <Dialog 
      open={true}
      onWheel={(e) => e.stopPropagation()}
    >
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

        { [{},{},{},{},{},{},{}].map((item, index) => (
          
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
            <InputLineLabel>{`${
              index === 0
              ? 'понедельник'
              : index === 1
              ? 'вторник'
              : index === 2
              ? 'среда'
              : index === 3
              ? 'четверг'
              : index === 4
              ? 'пятница'
              : index === 5
              ? 'суббота'
              : index === 6
              ? 'воскресенье' : ''
            }`}</InputLineLabel>
						<Select
              isMulti
							defaultOptions
							isSearchable="true"
							isClearable="true"
              isDisabled={ index < 7 ? false : true }
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
                ? 'пятница'
                : index === 5
                ? 'суббота'
                : index === 6
                ? 'воскресенье' : ''
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

      <Dialog 
        open={true}
        onWheel={(e) => e.stopPropagation()}
      >
      <DialogTitle style={{ 
          padding: 0, 
          textAlign: 'center',
          marginTop: 32,
          marginBottom: 5, 
        }}>
        { props.title }
      </DialogTitle>
      <DialogContent 
        style={{ 
          width: 500, 
          height: 500, 
          overflowY: 'hidden', 
          backgroundColor: 
            props.background === '#6c757d' 
            ? '' : '',
          marginLeft: 14,
          marginRight: 14,
          marginTop: 28,
          marginBottom: 20,
          borderTop: '2px solid #ffc000'
        }}
        onWheel={(e) => {
          if ( e.deltaY > 0 ) {
						dispatch({
							type: 'CONTROL_MODALCARD_MARGIN',
							value: state[10].label[13].label - 10
						});
					} else {
						// eslint-disable-next-line no-unused-expressions
						state[10].label[13].label < 0 
						? dispatch({
							type: 'CONTROL_MODALCARD_MARGIN',
							value: state[10].label[13].label + 10
						})
						: dispatch({
							type: 'CONTROL_MODALCARD_MARGIN',
							value: 29
						});
					}
				}}
      >
        <p
          style={{
            color: 'black',
            fontFamily: 'Roboto, "sans-serif',
            fontSize: 13,
            lineHeight: '22px',
            textAlign: 'center',
            width: '90%',
            padding: '0 20px',
            margin: '0 auto',
            marginTop: state[10].label[13].label,
            marginBottom: '20px',
            boxSizing: 'border-box'
          }}
        >
          
          вы можете добавить параметры для данного мониторинга в этой форме. для сохранения все поля должны быть заполнены. по завершению нажмите кнопку "добавить" для сохранения
        
        </p>

        <MonitoringParamsForm 
          blackColor={true}
          paramsUp={createParamsFromEditForm}
					createFilter={props.monitoring}
        />

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
          onClick={ async () => {
            setShowModal(false);
            let query = await fetchDispatcher({
              fetchType: 'SET_PARAMS',
              value: JSON.stringify(paramsData)
            });
            console.log(query);
          }}
        >
          
            ДОБАВИТЬ
        
        </Button>
      </DialogActions>
    </Dialog>

    )}

    </React.Fragment>
  );
}