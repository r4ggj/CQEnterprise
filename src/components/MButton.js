import React from 'react'
import {
  Text,
  StyleSheet
} from 'react-native'
import {MKButton,MKColor} from 'react-native-material-kit'
const defaultStyle={
  paddingVertical:8,
  paddingHorizontal:12,
  borderRadius:2,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:MKColor.Teal,
  shadowRadius:2,
  shadowOffset:{width:0, height:2},
  shadowOpacity:.7,
  shadowColor:"black"
};
const defaultTextStyle={
  fontSize:16,
  color:'white'
};

export default function MButton(props){
  const {style,textStyle,elevation,...buttonProps}=props;
  return (
    <MKButton
      {...buttonProps}
      {...StyleSheet.flatten([defaultStyle,style])}
      elevation={elevation===undefined?2:elevation}
      >
      <Text pointerEvents="none"  style={StyleSheet.flatten([defaultTextStyle,textStyle])}>
        {props.text}
      </Text>
    </MKButton>
  );
}
