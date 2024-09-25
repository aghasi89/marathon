import { StyleSheet } from 'react-native';
import {
  ghostWhite,
  primaryWhite,
  wildBlueYonder,
} from '../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    borderRadius: calcHeight(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(16),
    backgroundColor: ghostWhite,
    borderTopLeftRadius: calcHeight(16),
    borderTopRightRadius: calcHeight(16),
  },
  title: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'regular',
    }),
    color: wildBlueYonder,
  },
  closeIconStyle: {
    height: calcHeight(18),
    width: calcWidth(24),
    fill: wildBlueYonder,
  },
  child: {
    minHeight: calcHeight(100),
    borderBottomRightRadius: calcHeight(16),
    borderBottomLeftRadius: calcHeight(16),
    backgroundColor: primaryWhite,
    overflow: 'hidden'
  },
});

export default styles;
