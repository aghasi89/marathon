import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {borderGrey, formFieldGrey} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    height: calcHeight(56),
    width: calcWidth(127),
    borderRadius: calcHeight(50),
    borderColor: borderGrey,
    borderWidth: calcWidth(1),
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: calcWidth(26),
  },
  containerRight: {
    height: calcHeight(56),
    width: calcWidth(127),
    borderRadius: calcHeight(50),
    borderColor: borderGrey,
    borderWidth: calcWidth(1),
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: calcWidth(26),
  },
  text: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    color: formFieldGrey,
  },
});

export default styles;
