import { StyleSheet } from 'react-native';
import { inputBorder, primaryBlue, primaryWhite } from '../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { EnCodeSans } from '../../assets/styles/fonts.styles';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: calcHeight(8),
    borderRadius: calcHeight(8),
    paddingHorizontal: calcHeight(10),
  },
  userAvatar: {
    width: calcHeight(42),
    height: calcHeight(42),
    borderRadius: calcHeight(20),
  },
  shareButton: {
    backgroundColor: primaryBlue,
    paddingHorizontal: calcHeight(25),
    paddingVertical: calcWidth(5),
    borderRadius: calcHeight(5)
  },
  text:
  {
    ...EnCodeSans({
      size: 'body',
      weight: "medium"
    }),
    color: primaryWhite,
    justifyContent: "center",
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },
  userName: {
    ...EnCodeSans({
      size: 'body',
      weight: "medium",
    }),
    paddingLeft: calcWidth(10),
    flex: 1
  },
  admin: {
    color: inputBorder,
  },
});
export default styles;
