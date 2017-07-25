import React,{Component} from 'react';
import {StatusBar,View} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import thunk from 'redux-thunk';

import LoginScreen from './views/LoginScreen';
import MainScreen from './views/MainScreen';
import ProfileScreen from './views/ProfileScreen';
const flex={flex:1};
const defaultStatusBar={
  backgroundColor:"gray",//android
  translucent:false,//android
  networkActivityIndicatorVisible:true,//ios
  showHideTransition :'fade',//ios
  barStyle:"light-content",
  animated:false,
  hidden:false,
};
const setStatusBar=Screen=>class Container extends Component{
  static navigationOptions=Screen.navigationOptions;
  render(){
    return (<View style={flex}>
        <StatusBar  {...(Screen.StatusBar===undefined?defaultStatusBar:Screen.StatusBar)}/>
        <Screen {...this.props}/>
      </View>);
  }
}

export const AppNavigator = StackNavigator({
  Login: { screen:setStatusBar(LoginScreen)},
  Main: { screen: setStatusBar(MainScreen)},
  Profile: { screen: setStatusBar(ProfileScreen) },
});

class AppWithNavigationState extends Component{
  state={
    done:false
  };
  async componentDidMount(){
    let app_origin=await storage.load('APP_ORIGIN').catch(e=>{

    });
  }
  render(){
    return <AppNavigator navigation={addNavigationHelpers({ dispatch:this.props.dispatch, state: this.props.nav })} />;
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
