import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import {
  columbiaBlue,
  lightSteelBlue,
  primaryBlack,
  primaryBlue,
} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: calcHeight(20),
  },
  listContainer: {
    flex: 1,
    paddingTop: calcHeight(20),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calcWidth(16),
  },
  flagContainer: {
    marginVertical:calcHeight(16),
    height: calcHeight(36),
    width: calcWidth(36),
    borderRadius: calcHeight(25),
    backgroundColor: columbiaBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: calcWidth(16),
  },
  flag: {
    height: calcHeight(36),
    width: calcWidth(36),
    borderRadius: calcHeight(25),
    resizeMode: 'cover',
  },
  altImage: {
    height: calcHeight(20),
    width: calcWidth(20),
    fill: lightSteelBlue,
  },
  text: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  selectedText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlue,
  },
});
export default styles;
