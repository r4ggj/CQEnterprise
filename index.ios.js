/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import futch from './src/utils/futch';
import Storage from './src/utils/storage'
import App from './src';
const originalFetch = fetch;
const returnTrue=()=>true;
const returnFalse=()=>false;
const returnUndefined=()=>undefined;
const returnNull=()=>null;
const _fetch=(url, opts) => {
  if (opts.onProgress && typeof opts.onProgress === 'function') {
    return futch(url, opts, opts.onProgress)
  } return originalFetch(url, opts)
}
const storage=new Storage();
global.fetch = _fetch;
global.returnTrue=returnTrue;
global.returnFalse=returnFalse;
global.returnUndefined=returnUndefined;
global.returnNull=returnNull;
global.storage=storage;
export default class CQEnterprise extends Component {
  render() {
    return (
      <App/>
    );
  }
}


AppRegistry.registerComponent('CQEnterprise', () => CQEnterprise);
