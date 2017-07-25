import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import thunk from 'redux-thunk';

import LoginScreen from './views/LoginScreen';
import MainScreen from './views/MainScreen';
import ProfileScreen from './views/ProfileScreen';

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen },
  Profile: { screen: ProfileScreen },
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
