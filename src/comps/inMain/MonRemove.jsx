import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import { ReduxHooksContext } from "../../Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import fetchDispatcher from "../../services/fetch-query.service";
import bodyTags from '../../templates/body-styled-elements';

const RemoveWindow = bodyTags.MonitoringRemoveWindow;
const RemoveWindowIcon = bodyTags.MonitoringRemoveWindowIcon;
const RemoveWindowTitle = bodyTags.MonitoringRemoveWindowText;
const RemoveWindowHeadline = bodyTags.MonitoringRemoveWindowHeadline;
const ButtonsGroup = bodyTags.MonitoringRemoveWindowButtons;
const ButtonYes = bodyTags.MonitoringRemoveWindowButtonsYes;
const ButtonNo = bodyTags.MonitoringRemoveWindowButtonsNo;

export default function MonitoringRemove() {

	const { dispatch } = useContext(ReduxHooksContext);
	const [ params, setParams ] = useState({});
	const history = useHistory();

	let searchString = window.location.search;
	let histParams = new URLSearchParams(searchString);
	let monName = histParams.get('name');
	let monUuid = histParams.get('uuid');

	useEffect(() => {

		setParams({
			name: monName,
			uuid: monUuid
		});

	},[]);

	return (
		<RemoveWindow>
			<RemoveWindowIcon>
				<FontAwesomeIcon 
					style={{
						color: 'black',
						marginLeft: 16,
						marginTop: 14
					}}
        	size="2x" 
        	icon={faTrash}
      	/>
			</RemoveWindowIcon>
			<RemoveWindowHeadline>подтверждение удаления</RemoveWindowHeadline>
			<RemoveWindowTitle>{`действительно хотите удалить ${ params.name }?`}</RemoveWindowTitle>
			<ButtonsGroup>

				<ButtonYes
					onClick={ async () => {

						let check = await fetchDispatcher({
							fetchType: 'DELETE',
							itemid: params.uuid
						});

						if ( check.status === 200 ) {

							let date = new Date();
							let time = `${date.getHours()} : ${date.getMinutes()}`;
							dispatch({
							type: 'LOGGER',
							value: { 
								message: `${time} : мониторинг "${monName}" успешно удален. адрес запроса: http://api.bpgprice.loc/api/monitorings`, 
								time 
								}
							});

							localStorage.removeItem('count');
							localStorage.removeItem('sixstate');
							setTimeout(() => history.push('/history'), 400);

						}

					}}
				>
					ок
				</ButtonYes>
				<ButtonNo onClick={() => history.push('/history')}>отменить</ButtonNo>

			</ButtonsGroup>
		</RemoveWindow>
	);
}