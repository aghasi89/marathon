import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  paleCornflowerBlue,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  rowFront: {
    minHeight: calcHeight(50),
    marginTop: calcHeight(10),
    overflow: 'hidden',
    backgroundColor: primaryWhite,
    flexDirection: 'row',
    borderRadius: calcHeight(20),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backRightBtn: {
    bottom: 0,
    position: 'absolute',
    top: 0,
    marginTop: calcHeight(10),
  },
  backRightBtnRight: {
    right: 0,
    backgroundColor: paleCornflowerBlue,
    borderColor: paleCornflowerBlue,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 30,
    minHeight: calcHeight(50),
  },
  userAvatar: {
    width: calcHeight(40),
    height: calcHeight(40),
    borderRadius: calcHeight(20),
  },
  name: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'bold',
    }),
    paddingLeft: calcHeight(10),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
