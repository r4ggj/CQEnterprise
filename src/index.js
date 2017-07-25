import React, { Component } from 'react'
import {
  Platform
} from 'react-native'
import {StackNavigator} from 'react-navigation'
import { addNavigationHelpers } from 'react-navigation';
import { Provider,connect } from 'react-redux'
import { createStore } from 'redux'


import AppReducer from './reducers';
import AppWithNavigationState from './AppNavigator';

class Root extends React.Component {
  store = createStore(AppReducer);
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Root;
