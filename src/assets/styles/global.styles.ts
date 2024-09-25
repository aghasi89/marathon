import { Dimensions, ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { calcHeight } from '../dimensions';
import { borderGrey } from './colors.styles';
import { IMediaSize } from '../../types/types';
export type BorderSize = 25 | 55 | 30 | 35 | 65;
export type BorderType = 'default' | 'outline' | 'dashed';
export interface BorderParams {
  size: BorderSize,
  type: BorderType
};
export interface MediaSizeParams {
  type?: IMediaSize,
  paddingSize?:number,
  isVideo?: boolean
};

const paramsByType: Record<BorderType, TextStyle> = {
  default: {
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  outline: {
    borderWidth: 1,
    borderColor: borderGrey,
  },
  dashed: {
    borderWidth: 2,
    borderColor: borderGrey,
    borderStyle: 'dashed',
  }
};
const dimension = Dimensions.get('window')

export function borderStyle({
  size,
  type,
}: BorderParams): TextStyle {
  return {
    ...paramsByType[type],
    borderRadius: calcHeight(size),
  };
}

export function mediaSizeStyle({
  type='16:9',
  paddingSize,
  isVideo=false
}: MediaSizeParams): ImageStyle {
  let width:number
  let height:number
 
  switch (type) {
    case '16:9':
      width=dimension.width-(paddingSize??0),
      height=width * (9/16)
      break;
      case '4:5':
      width=dimension.width-(paddingSize??0),
      // height=width * (5/4)
      // height=width * (5/4) + (isVideo ? calcHeight(200) : 0) full width
      height=width + (isVideo ? calcHeight(170) : 0)
      break
    default:
      width= dimension.width-(paddingSize??0),
      // height=width
      //  height=width + (isVideo ? calcHeight(295) : 0) full width
      height=width + (isVideo ? calcHeight(170) : 0)
      break;
  }
  return {
   width,
   height
  };
}

export const styles = StyleSheet.create({

})