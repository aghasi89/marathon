import {StyleSheet} from 'react-native';
import {
  backgroudGrayVeryLight,
  borderGrey,
  primaryBlack,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
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
  },
  selectUserButton: {
    width: calcWidth(360),
    height: calcHeight(45),
    marginTop: calcHeight(17),
    marginBottom: calcHeight(29),
  },
  selectedUserGeneralContainer: {
    marginTop: calcHeight(17),
    marginBottom: calcHeight(29),
  },
  selectedUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedUserImage: {
    height: calcHeight(29),
    width: calcWidth(29),
    borderRadius: calcWidth(19),
    marginRight: calcWidth(11),
  },
  titleText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  iconsStyle: {
    height: calcHeight(22),
    width: calcWidth(22),
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
  inputContainer: {
    width: calcWidth(380),
    height: calcHeight(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: backgroudGrayVeryLight,
    borderRadius: calcWidth(25),
  },
  inputStyle: {
    height: calcHeight(50),
    flex: 1,
    marginLeft: calcWidth(25),
  },
  findeUserIconTouch: {
    height: calcHeight(50),
    width: calcWidth(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userListContainer: {
    paddingLeft: calcWidth(20),
  },
  userListRowContainer: {
    width: calcWidth(400),
    height: calcHeight(50),
    alignItems: 'center',
    flexDirection: 'row',
  },
  userImage: {
    height: calcHeight(38),
    width: calcWidth(38),
    borderRadius: calcWidth(19),
    marginRight: calcWidth(27),
  },
});
export default styles;