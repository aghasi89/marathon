import React from 'react';
import { StyleSheet } from 'react-native';
import { primaryBlue, primaryWhite } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { borderStyle } from '../../../assets/styles/global.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    borderRadius:calcHeight(25),
    backgroundColor: primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: calcHeight(5),
    paddingHorizontal: calcWidth(15),
    flexDirection: 'row'
  },
  shadow:{
    ...borderStyle({ size: 25, type: 'default' }),
  },
  text: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'medium'
    }),
    color: primaryWhite
  }
});
export default styles;