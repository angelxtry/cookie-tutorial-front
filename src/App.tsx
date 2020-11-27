import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Login';
import createStore from './store';
import PrivateRoute from './PrivateRoute';
import Home from './features/home';

const store = createStore();

function App(): ReactElement {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
