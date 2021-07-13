import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
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

	const [ params, setParams ] = useState({});
	const history = useHistory();

	useEffect(() => {
		
		let searchString = window.location.search;
		let params = new URLSearchParams(searchString);
		let monName = params.get('name');
		let monUuid = params.get('uuid');

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

						console.log(check);

						if ( check.status === 200 ) {

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