import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {primaryWhite} from '../../assets/styles/colors.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  modalConent: {
    ...borderStyle({
      size: 30,
      type: 'default',
    }),
    backgroundColor: primaryWhite,
    paddingTop: calcHeight(15),
    paddingBottom: calcHeight(30),
    paddingHorizontal: calcWidth(25),
  },
  icon: {alignItems: 'flex-end', marginBottom: calcHeight(5)},
});
export default styles;
