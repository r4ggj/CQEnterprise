import React from 'react'
import {
  StyleSheet
} from 'react-native'
import {MKTextField,MKColor} from 'react-native-material-kit'
const defaultStyle={
  paddingVertical:4,
};
const textfieldStyle={
  fontSize:16,
  color:'black',

};

export default function Input(props){
  const {style,inputStyle,placeholderTextColor,...inputProps}=props;
  return (
    <MKTextField
      tintColor={MKColor.Lime}
      underlineColorAndroid={'transparent'}
      {...inputProps}
      placeholderTextColor={placeholderTextColor===undefined?"#ccc":placeholderTextColor}
      textInputStyle={StyleSheet.flatten([textfieldStyle,inputStyle])}
      style={StyleSheet.flatten([defaultStyle,style])}

    />
  );
}
