import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ReduxHooksContext } from "../../Context";
import bodyTags from "../../templates/body-styled-elements";

const Container = bodyTags.LogsBar;
const Title = bodyTags.LogsBarTitle;
const Messages = bodyTags.LogsBarMessageSpace;
const Mess = bodyTags.LogsBarMessageSpaceLog;

function LogsList() {

	const { state, dispatch } = useContext(ReduxHooksContext);

  return (
    <Container style={{ marginLeft: state[10].label[6].label }}>
			<FontAwesomeIcon 
				style={{
					display: 'block',
					position: 'absolute',
					left: 0,
					color: 'white',
					marginLeft: 16,
					marginTop: 12,
					cursor: 'pointer'
				}}
        size="md" 
        icon={faTimes}
				onClick={() => {
					dispatch({ type: 'CONTROL_LOG_MENU', value: '0px' });
				}}
      />
			<Title>LOG PANEL</Title>
			<Messages>{ state[11].label.map(item => {

				return(
					<Mess>
						{ item.message }
					</Mess>
				);

			})}</Messages>
		</Container>
  );
}

export default LogsList;
