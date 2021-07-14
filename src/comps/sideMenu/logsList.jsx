import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ReduxHooksContext } from "../../Context";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import bodyTags from "../../templates/body-styled-elements";

const Container = bodyTags.LogsBar;
const Title = bodyTags.LogsBarTitle;
const Messages = bodyTags.LogsBarMessageSpace;
const Mess = bodyTags.LogsBarMessageSpaceLog;

const useStyles = makeStyles((theme) => ({
  btn: {
    display: "block",
    position: "absolute",
    width: "70%",
    fontSize: "10px",
    letterSpacing: 1,
    padding: "10px 14px",
    fontFamily: 'Roboto, "sans-serif"',
		top: '100%',
		marginTop: '-50px',
		left: '15%',
		marginLeft: 2
  },
}));

function LogsList() {

	const classes = useStyles();
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

			<Button 
        variant="contained" 
        className={classes.btn}
        onClick={() => {
					dispatch({
						type: 'LOGGER_CLEAR',
						value: []
					});
        }}
      >
        очистить логи
      </Button>

		</Container>
  );
}

export default LogsList;
