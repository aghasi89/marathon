import { StyleSheet } from 'react-native';
import { backgroundGrey, lightPeriwinkles, primaryBlue, primaryWhite } from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  profileImageContainer: {
    height: calcWidth(147),
    width: calcWidth(147),
    borderRadius: calcWidth(147),
    borderWidth: calcWidth(4),
    borderColor: primaryWhite,
  },
  image: {
    height: calcWidth(140),
    width: calcWidth(140),
    borderRadius: calcWidth(147),
  },
  buttonText: {
    color: primaryWhite,
    marginRight: calcWidth(10)
  },
  button: {
    backgroundColor: primaryBlue,
    position: "absolute",
    bottom: calcHeight(-10),
    width: calcWidth(143)
  },
  folowingTitle: {
    color: lightPeriwinkles,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
  },
  followingText: {
    color: primaryBlue,
    ...EnCodeSans({
      size: 'headline',
      weight: 'semibold',
    }),
  },
  container: {
    paddingHorizontal: calcWidth(24),
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginTop: calcHeight(-50)
  },
  roleContainer: {
    backgroundColor: primaryBlue,
    borderRadius: 30,
    left: calcWidth(20),
    bottom: calcHeight(-15),
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: calcWidth(15),
    paddingVertical: calcHeight(10)
  },
  followers: {
    marginTop: calcHeight(80),
    alignItems: "center"
  },
  altImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundGrey
  }
});
export default styles;
