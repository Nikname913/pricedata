import React, { useState, useReducer } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { ModalContext, ReduxHooksContext } from './Context';
import Home from './comps/Home';
import reducer from './redux-hooks/reducer';
import store from './redux-hooks/store';

function App({ props }) {

  const history = props;
  const [ showModal, setShowModal ] = useState(false);
  const [ state, dispatch ] = useReducer(reducer, store);

  return (
    <ReduxHooksContext.Provider value={{ state, dispatch}}>
    <ModalContext.Provider value={[ showModal, setShowModal ]}>
      <Switch>
        <Redirect 
          from="/auth" 
          to="/"
        /> 
        <Route 
          history={history} 
          path='/' 
          component={Home}
        />
      </Switch>
    </ModalContext.Provider>
    </ReduxHooksContext.Provider>
  );
}

export default App;
