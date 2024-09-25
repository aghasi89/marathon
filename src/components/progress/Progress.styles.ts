import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {primaryBlack, primaryWhite} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
  },
  progressStyle: {
    height:48,
    width:51,
    position:'absolute',
    overflow:'visible',
    borderRadius: calcHeight(50),
  },
  circleStyle: {
    ...borderStyle({size: 25, type: 'default'}),
    height: calcHeight(57),
    width: calcWidth(57),
    backgroundColor: primaryWhite,
    borderRadius: calcWidth(50),
    justifyContent: 'center',
    alignItems: 'center',    
  },
  progressCircleChild: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  titleText: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'semibold',
    }),
    color: primaryBlack,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: calcHeight(8),
  },
  bootomTexr: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'semibold',
    }),
    color: primaryBlack,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: calcHeight(8),
  },
});
