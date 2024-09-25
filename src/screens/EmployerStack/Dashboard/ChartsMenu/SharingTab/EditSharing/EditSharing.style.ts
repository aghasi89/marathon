import {StyleSheet} from 'react-native';
import {
  borderGrey,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  contentContainer: {
    flex: 1,
    borderTopWidth: calcWidth(1),
    borderTopColor: borderGrey,
    width: calcWidth(400),
    alignItems: 'center',
    paddingTop:calcHeight(23)
  },
  iconsStyle: {
    height: calcHeight(40),
    width: calcWidth(40),
  },
  sendRequestButtonContainer: {
    position: 'absolute',
    width: '100%',
    height: calcHeight(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: calcHeight(35),
    borderTopRightRadius: calcHeight(35),
    bottom: calcHeight(0),
    elevation: 5,
    backgroundColor: primaryWhite,
  },
  sendRequestButton: {
    height: calcHeight(50),
    width: calcWidth(345),
  },
  toasterContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom:calcHeight(45)
  },
});
export default styles;