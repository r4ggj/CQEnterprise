import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { Button, StyleSheet, Text, View,Image,KeyboardAvoidingView,ScrollView,StatusBar } from 'react-native';
import MButton from '../components/MButton';
import Input from '../components/Input';
import screen from '../utils/screen'

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5FCFF'
  },
  bg:{
    flex:1,
    width:screen.width,
    height:screen.height,//不要这一句
  },
  topContainer:{
    flex:2
  },
  loginFields:{
    flex:3,
    paddingHorizontal:12,
    paddingVertical:6,
  },
  keybordContainer:{
    backgroundColor:'red',
    paddingVertical:8,
    backgroundColor:'#fff',
    borderRadius:2,
  },
  inputRow:{
    flexDirection:'row',
    paddingHorizontal:12,
    alignItems:'center'
  },
  userName:{
    width:36,
    height:36
  },
  userNameLabel:{
    fontSize:18,
    color:'#666',
    textAlign:'center',
    paddingHorizontal:8
  },
  loginButton:{
    marginTop:20,
    backgroundColor:'rgb(40,100,164)'
  },
  loginButtonText:{
    fontSize:20,
    fontWeight:'bold'
  },
  registButton:{
    position:'relative',
    left:0,
    right:0,
    top:36,
    bottom:36,
    justifyContent:'center',
    alignItems:'center'
  },
  line:{
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:'#ccc'
  }
});

class LoginScreen  extends Component{
  constructor(props){
    super(props);
  }
  static StatusBar={
    backgroundColor:"rgb(40,100,164)"
  };
  static IMGS={
    bg:require('../assets/bg.jpg'),
    userName:require('../assets/user-name.png'),
    password:require('../assets/pwd.png'),
  };
  static navigationOptions = {
    title: '登陆',
    header:null
  };
  render(){
    console.log(this.props)
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps ="handled" contentContainerStyle={styles.container}>
        <Image source={LoginScreen.IMGS.bg}  resizeMode="cover" style={styles.bg}>
          <View style={styles.topContainer}/>
          <View style={styles.loginFields}>
            <KeyboardAvoidingView behavior ="position" style={styles.keybordContainer} contentContainerStyle={StyleSheet.positionFill}>
              <View style={styles.inputRow}>
                <Image source={LoginScreen.IMGS.userName} style={styles.userName} resizeMode="contain"/>
                <Text style={styles.userNameLabel}>{`手 机 号`}</Text>
                <Input style={{flex:1,}} underlineSize={0} placeholder="请输入手机号" maxLength={11} keyboardType ="numeric"/>
              </View>
              <View style={styles.line}/>
              <View style={styles.inputRow}>
                <Image source={LoginScreen.IMGS.userName} style={styles.userName} resizeMode="contain"/>
                <Text style={styles.userNameLabel}>{`密     码`}</Text>
                <Input password style={{flex:1}} underlineSize={0} placeholder="请输入密码"/>
              </View>

            </KeyboardAvoidingView>

            <MButton
              style={styles.loginButton}
              onPress={() => this.props.navigation.dispatch({ type: 'Login' })}
              textStyle={styles.loginButtonText}
              text="登  录"
            />

            <View style={styles.registButton}>
              <MButton
                onPress={() => this.props.navigation.navigate('Profile')}
                text="注册"
              />
            </View>
          </View>
        </Image>
      </ScrollView>
    )
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};


export default connect(state=>state)(LoginScreen);
