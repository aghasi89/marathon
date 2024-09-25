import {StyleSheet} from 'react-native';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import {
  lightPeriwinkles,
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlue,
    marginRight:calcWidth(16)
  },
  buttonsContainer: {
    flexDirection: 'row',
    borderWidth: calcWidth(1),
    borderColor: lightPeriwinkles,
    overflow: 'hidden',
    borderRadius: calcWidth(10),
    justifyContent: 'space-between',
    flex:1
  },
  button: {
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow:1
  },
  buttonSelected: {
    borderWidth: calcWidth(0.2),
    borderColor: primaryWhite,
    backgroundColor: primaryBlue,
  },
  buttonText: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    color: lightPeriwinkles,
  },
  buttonTextSelected: {
    color: primaryWhite,
  },
  emptyView: {
    borderWidth: calcWidth(0.5),
    borderColor: lightPeriwinkles,
  },
});
export default styles;
