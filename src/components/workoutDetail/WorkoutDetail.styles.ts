import {StyleSheet} from 'react-native';
import {calcHeight} from '../../assets/dimensions';
import {primaryBlack, primaryWhite} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';
export const styles = StyleSheet.create({
  container: {
    width: 60,
    backgroundColor: 'white',
  },
  titleText: {
    ...EnCodeSans({
      size: 'headline',
      weight: 'semibold',
    }),
    color: primaryBlack,
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: calcHeight(7),
  },
  title: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    color: primaryBlack,
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: calcHeight(7),
  },
});
