import { StyleSheet } from 'react-native';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { primaryBlack, primaryBlue, red } from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(8)
  },
  inputAndSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  switchContainer: {
    maxWidth: calcWidth(150)
  },
  switchSelectedText: {
    color: primaryBlue
  },
  inputAndErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: calcHeight(2),
  },
  errorMessage: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular'
    }),
    color: red,
    paddingRight: calcWidth(15)
  },
  inputContainerStyle: {
    width: calcWidth(90),
    paddingVertical: calcWidth(0),
    marginRight: calcWidth(10),
    justifyContent: 'center',
    borderRadius: calcHeight(10)
  },
  inputStyle: {
    flexGrow: 1,
    paddingVertical: calcHeight(5),
    paddingHorizontal: calcHeight(0),
    textAlign: 'center',
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular'
    })
  }
});
export default styles;
