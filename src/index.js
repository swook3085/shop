import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Main from './Shared/Home';
import Content from './Shared/Main';
import {createStore, applyMiddleware} from 'redux';
import reducers from './Redux/Reducer/reducer';
import {Provider} from  'react-redux';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
          <Switch>
              <Route exact path="/" component={Main}/>
              <Route exact path="/:path" component={Content}/>
              <Route exact path="/:path/:id" component={Content}/>
          </Switch>
        </Router>
    </Provider>
, document.getElementById('root'));
