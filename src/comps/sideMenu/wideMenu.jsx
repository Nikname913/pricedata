import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ReduxHooksContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import bodyTags from "../../templates/body-styled-elements";

const SideBar = bodyTags.SideBar;
const SideMenuButton = bodyTags.SideMenuButton;

const useStyles = makeStyles((theme) => ({
  btn: {
    display: "block",
    position: "absolute",
    width: "80%",
    fontSize: "10px",
    letterSpacing: 1,
    padding: "10px 14px",
    fontFamily: 'Roboto, "sans-serif"',
    top: "100%",
    left: "10%",
    marginTop: "-70px",
  },
}));

function WideMenu() {

  const classes = useStyles();
  const { dispatch } = useContext(ReduxHooksContext);

  return (
    <SideBar>
      <Link to={"/add"} style={{ textDecoration: "none" }}>
        <SideMenuButton>
          <FontAwesomeIcon
            style={{
              marginLeft: 12,
              marginRight: 10,
            }}
            size="lg"
            icon={faFolder}
          />
          add monitoring
        </SideMenuButton>
      </Link>
      <Link to={"/history"} style={{ textDecoration: "none" }}>
        <SideMenuButton>
          <FontAwesomeIcon
            style={{
              marginLeft: 12,
              marginRight: 10,
            }}
            size="lg"
            icon={faFolder}
          />
          monitoring history
        </SideMenuButton>
      </Link>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <SideMenuButton>
          <FontAwesomeIcon
            style={{
              marginLeft: 12,
              marginRight: 10,
            }}
            size="lg"
            icon={faFolder}
          />
          create report
        </SideMenuButton>
      </Link>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <SideMenuButton>
          <FontAwesomeIcon
            style={{
              marginLeft: 12,
              marginRight: 10,
            }}
            size="lg"
            icon={faFolder}
          />
          manual
        </SideMenuButton>
      </Link>
      <Button 
        variant="contained" 
        className={classes.btn}
        onClick={() => {
          dispatch({
            type: 'CONTROL_MENU',
            value: true
          });
        }}
      >
        свернуть
      </Button>
    </SideBar>
  );
}

export default WideMenu;
