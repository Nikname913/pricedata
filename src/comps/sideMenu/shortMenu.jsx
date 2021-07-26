import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ReduxHooksContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faForward } from "@fortawesome/free-solid-svg-icons";
import bodyTags from "../../templates/body-styled-elements";

const SideBar = bodyTags.SideBar;
const SideMenuButton = bodyTags.SideMenuButton;

function ShortMenu() {

	const { dispatch } = useContext(ReduxHooksContext);

  return (
    <SideBar style={{ width: 64.5 }}>
      <Link to={"/add"} style={{ textDecoration: "none" }}>
        <SideMenuButton style={{ width: 42 }}>
          <FontAwesomeIcon
            style={{
              marginLeft: 12,
              marginRight: 10,
            }}
            size="lg"
            icon={faFolder}
            onClick={() => {
              dispatch({
                type: 'CONTROL_NAVIGATION',
                value: 0
              });
            }}
          />
        </SideMenuButton>
      </Link>
      <Link to={"/history"} style={{ textDecoration: "none" }}>
        <SideMenuButton style={{ width: 42 }}>
          <FontAwesomeIcon
            style={{
              marginLeft: 12,
              marginRight: 10,
            }}
            size="lg"
            icon={faFolder}
            onClick={() => {
              dispatch({
                type: 'CONTROL_NAVIGATION',
                value: 1
              });
            }}
          />
        </SideMenuButton>
      </Link>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <SideMenuButton style={{ width: 42 }}>
          <FontAwesomeIcon
            style={{
              marginLeft: 12,
              marginRight: 10,
            }}
            size="lg"
            icon={faFolder}
            onClick={() => {
              dispatch({
                type: 'CONTROL_NAVIGATION',
                value: 2
              });
            }}
          />
        </SideMenuButton>
      </Link>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <SideMenuButton style={{ width: 42 }}>
          <FontAwesomeIcon
            style={{
              marginLeft: 12,
              marginRight: 10,
            }}
            size="lg"
            icon={faFolder}
            onClick={() => {
              dispatch({
                type: 'CONTROL_NAVIGATION',
                value: 3
              });
            }}
          />
        </SideMenuButton>
      </Link>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <SideMenuButton style={{ width: 42 }}>
          <FontAwesomeIcon
            style={{
              marginLeft: 12,
              marginRight: 10,
            }}
            size="lg"
            icon={faFolder}
            onClick={() => {
              dispatch({
                type: 'CONTROL_NAVIGATION',
                value: 4
              });
            }}
          />
        </SideMenuButton>
      </Link>
      <FontAwesomeIcon 
        style={{ 
					display: 'block',
					position: 'absolute',
          marginLeft: 27,
          marginTop: -46,
					top: '100%',
          cursor: 'pointer',
					color: 'white'
        }} 
        size="md" 
        icon={faForward}
				onClick={() => {
					dispatch({
            type: 'CONTROL_MENU',
            value: false
          });
				}}
      />
    </SideBar>
  );
}

export default ShortMenu;
