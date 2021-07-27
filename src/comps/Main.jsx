import React, { useContext } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { ReduxHooksContext } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import bodyTags from "../templates/body-styled-elements";
import MonitoringForm from './inMain/MonForm';
import SourceForm from "./inMain/SourceForm";
import MonitoringList from "./inMain/MonList";
import MonitoringCardRouter from "./inMain/MonCardRoute";
import MonitoringRemove from "./inMain/MonRemove";
import WideMenu from "./sideMenu/wideMenu";
import ShortMenu from "./sideMenu/shortMenu";

const MainSection = bodyTags.MainSection;
const HelloBrother = bodyTags.MainSectionHelloBlock;
const HelloBrotherLogo = bodyTags.MainSectionHelloBlockLogo;
const HelloBrotherText = bodyTags.MainSectionHelloBlockText;
const RightSideBar = bodyTags.RightSideBar;
const PageTitle = bodyTags.RightSideBarPageTitle;
const Back = bodyTags.RightSideBarPageTitleBack;
const Forward = bodyTags.RightSideBarPageTitleForward;

function Main({ props }) {

  const history = props;
  const location = useLocation();
  const hist = useHistory();
  const { state } = useContext(ReduxHooksContext);

  return (
    <React.Fragment>
    <RightSideBar>
      <PageTitle>
        <Back>
          <FontAwesomeIcon 
            style={{ 
              marginRight: 5,
              marginBottom: 1.5,
              cursor: 'pointer'
            }} 
            size="lg" 
            icon={faBackward}
            onClick={() => {
              hist.goBack();
            }}
          />
        </Back>
        <Forward>
          <FontAwesomeIcon 
            style={{ 
              marginRight: 5,
              marginBottom: 1.5,
              cursor: 'pointer'
            }} 
            size="lg" 
            icon={faForward}
          />
        </Forward>
        { location.pathname.indexOf('add') !== (-1)
        ? 'создание нового мониторинга'  
        : location.pathname.indexOf('view') !== (-1)
        ? 'просмотр карточки мониторинга' 
        : location.pathname.indexOf('correct') !== (-1)
        ? 'редактирование мониторинга'
        : location.pathname.indexOf('history') !== (-1)
        ? 'история мониторингов'
        : location.pathname.indexOf('remove') !== (-1)
        ? 'удаление мониторинга'
        : location.pathname.indexOf('parser-sources') !== (-1)
        ? 'добавление и просмотр источников поиска' : null }
      </PageTitle>
    </RightSideBar>
    <MainSection>
      
      { state[10].label[0].label === true ? <ShortMenu/> : <WideMenu/> }

      <Switch>

        <Route
          history={history}
          path="/add"
          component={MonitoringForm}
        />

        <Route
          history={history}
          path="/history"
          component={MonitoringList}
        />

        <Route
          history={history}
          path="/parser-sources"
          component={SourceForm}
        />

        <Route
          history={history}
          path="/card"
          component={MonitoringCardRouter}
        />  

        <Route
          history={history}
          path="/remove"
          component={MonitoringRemove}
        /> 

        <Route
          history={history}
          path="/"
          component={() => {
            return(
              <HelloBrother>
                <HelloBrotherLogo/>
                <HelloBrotherText>добро пожаловать в платформу создания мониторингов. продолжайте работу или ознакомьтесь с сервисом в разделе обучения. хорошего рабочего дня!</HelloBrotherText>
              </HelloBrother>
            );
          }}
        />  

      </Switch>

    </MainSection>
    </React.Fragment>
  );
}

export default Main;
