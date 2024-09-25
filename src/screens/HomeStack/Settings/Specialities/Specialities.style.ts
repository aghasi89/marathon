import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  backgroudLightGrey,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  save: {
    ...EnCodeSans({
      weight: 'medium',
      size: 'body',
    }),
    color: primaryBlue,
    width: calcWidth(100),
  },
  multiSelectContainer: {
    marginTop: calcHeight(46),
  },
  buttonGroupContainer: {
    position: 'absolute',
    bottom: calcHeight(0),
  },
  inputContainer: {
    backgroundColor: backgroudLightGrey,
    height: calcHeight(45),
    flexDirection: 'row',
    borderRadius: calcHeight(23),
    paddingLeft: calcWidth(23),
    marginHorizontal: calcWidth(10),
  },
  closeButton: {
    height: calcHeight(45),
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    color: primaryBlack,
    ...EnCodeSans({size: 'body', weight: 'semibold'}),
    paddingVertical: calcHeight(5),
  },
});
export default styles;
