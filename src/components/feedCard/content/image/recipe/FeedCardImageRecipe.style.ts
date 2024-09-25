import {StyleSheet} from 'react-native';
import {
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flexDirection: 'row',
    paddingLeft: calcWidth(3),
    paddingRight:calcWidth(23),
    alignItems: 'center',
  },
  recipeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: calcHeight(11),
  },
  recipeTitleAndTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:calcWidth(20)
  },
  title: {
    ...EnCodeSans({
      size: 'subLittle',
      weight: 'medium',
    }),
    color: primaryWhite,
    marginBottom: calcHeight(3),
  },
  text: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'semibold',
    }),
    color: primaryWhite,
    marginBottom: calcHeight(3),
  },
  line: {
    height: calcHeight(22),
    width: calcWidth(1),
    backgroundColor:primaryWhite
  },
});

export default styles;
