import React, { Component } from 'react'
import {
  Platform
} from 'react-native'
import {StackNavigator} from 'react-navigation'
import { addNavigationHelpers } from 'react-navigation';
import { Provider,connect } from 'react-redux'
import { createStore,applyMiddleware,} from 'redux'
import thunk from 'redux-thunk'


import AppReducer from './reducers';
import AppWithNavigationState from './AppNavigator';

class Root extends React.Component {
  store = createStore(AppReducer,applyMiddleware(thunk));
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Root;
