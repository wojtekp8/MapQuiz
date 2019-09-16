import React from 'react';
import './App.scss';
import Menu from '../Menu/Menu';
import GameMain from '../GameMain/GameMain';
import {HashRouter,Route,Switch} from 'react-router-dom';



function App() {
  return (<>
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Menu} />
            <Route path='/GameMain/' component={GameMain} />
          </Switch>
        </HashRouter>
    </>
  );
}

export default App;
