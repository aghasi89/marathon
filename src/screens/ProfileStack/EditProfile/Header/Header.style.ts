import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';
import { backgroundGrey, lightPeriwinkles, primaryBlue, primaryWhite } from '../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  backgroundImage: {
    height: calcHeight(207),
  },
  editBackgroundImage: {
    position: "absolute",
    backgroundColor: "#f5f5fa",
    height: calcWidth(33),
    width: calcWidth(33),
    bottom: calcWidth(-10),
    borderRadius: calcWidth(33),
    borderWidth: 2,
    borderColor: primaryWhite,
    right: calcWidth(2),
    alignItems: "center",
    justifyContent: "center"
  },
  editProfileImage: {
    position: "absolute",
    backgroundColor: "#f5f5fa",
    height: calcWidth(33),
    width: calcWidth(33),
    bottom: calcWidth(-10),
    borderRadius: calcWidth(33),
    borderWidth: 2,
    borderColor: primaryWhite,
    right: calcWidth(-10),
    top: calcHeight(90),
    alignItems: "center",
    justifyContent: "center"
  },
  profileImageContainer: {
    height: calcWidth(147),
    width: calcWidth(147),
    borderRadius: calcWidth(147),
    borderWidth: 2,
    borderColor: primaryWhite,
    position: "absolute",
    top: calcHeight(137),
    left: '30%'
  },
  image: {
    height: calcWidth(143),
    width: calcWidth(143),
    borderRadius: calcWidth(147),
  },
  buttonText: {
    color: primaryWhite
  },
  button: {
    backgroundColor: primaryBlue,
    position: "absolute",
    bottom: calcHeight(-10),
    width: calcWidth(143)
  },
  altBackgroundImageContainer:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:backgroundGrey
  },
  altBackgroundImage:{
    height:calcHeight(65),
    width:calcWidth(65),
    fill:lightPeriwinkles,
  },
  altImageContainer:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:backgroundGrey
  }
});
export default styles;
