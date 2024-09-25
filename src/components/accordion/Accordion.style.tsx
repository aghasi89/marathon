import { StyleSheet } from 'react-native';
import { primaryBlack, primaryWhite } from '../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../assets/dimensions';

export const styles = StyleSheet.create({
  container: {
    marginBottom: calcHeight(16),
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(8),
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    paddingLeft: calcWidth(10),
    color: primaryBlack
  },
  icon: {
    width: calcWidth(40),
    height: calcHeight(40),
    borderRadius: calcHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: calcHeight(14),
    backgroundColor: primaryWhite,
  },
  image: {
    width: calcHeight(52),
    height: calcHeight(52),
    borderRadius: calcHeight(8),
  },
});
