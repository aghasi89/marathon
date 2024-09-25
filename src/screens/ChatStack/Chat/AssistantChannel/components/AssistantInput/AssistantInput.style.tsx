import {Platform, StyleSheet} from 'react-native';
import {
  chatSearchBorder,
  darkWhite,
  opacityBlack,
  primaryBlack,
  primaryBlue,
  transparentBlack,
} from '../../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: Platform.OS == 'ios' ? calcHeight(5) : 0,
    // alignItems: 'center',
    paddingHorizontal: calcWidth(18),
    paddingBottom: calcHeight(24),
  },
  imageContainer: {
    paddingBottom: calcHeight(10),
    paddingTop: calcHeight(5),
    width: calcWidth(110),
  },
  image: {
    width: calcWidth(110),
    height: calcHeight(100),
    borderRadius: 20,
  },
  deleteImage: {
    borderRadius: 15,
    backgroundColor: opacityBlack,
    padding: 7,
    position: "absolute",
    right: calcWidth(6),
    top: calcHeight(10)
  },
  toolsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputView: {
    flex: 1,
    marginRight: calcWidth(8),
  },
  inputContainer: {
    borderWidth: 0,
    borderRadius: calcHeight(23),
    minHeight: calcHeight(48),
    backgroundColor: darkWhite,
    paddingHorizontal: calcWidth(16),
    paddingVertical: 10,
  },
});
