import {StyleSheet} from 'react-native';
import {lightPeriwinkles, primaryBlack, primaryBlue} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {},
  title: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlue,
  },
  subtitleAndIconContainer: {
    flexDirection: 'row',
    alignItems:'center'
  },
  subtitle: {
    ...EnCodeSans({
        size: 'legal',
        weight: 'regular',
      }),
      color: primaryBlack,
  },
  moreItemsText:{
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color:lightPeriwinkles,
    marginLeft:calcWidth(10)
  },
  iconStyle:{
    height:calcHeight(12),
    width:calcWidth(7),
    stroke:primaryBlue,
    marginLeft:calcWidth(16)
  }
});

export default styles;
