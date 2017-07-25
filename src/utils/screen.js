import {Dimensions,PixelRatio} from 'react-native'
export const {width,height}=Dimensions.get('window');
export const  _1px=1/PixelRatio.get();
const screen={
  width,
  height,
  _1px
};
export default screen;
