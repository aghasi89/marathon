import { StyleSheet } from 'react-native';
import {
  aliceBlueBackground,
  lightPeriwinkles,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
  },
  input: {
    borderColor: lightPeriwinkles,
    backgroundColor: aliceBlueBackground,
    borderWidth: 1,
    paddingVertical: calcHeight(12),
    paddingHorizontal: calcWidth(26),
    borderRadius: calcWidth(47),
    marginTop: calcHeight(8),
  },
  lable: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    textAlign: 'center',
    marginTop: calcHeight(16),
  },
  applyButton: {
    backgroundColor: primaryBlue,
    paddingVertical: calcHeight(8),
    marginTop: calcHeight(16),
  },
  backButton: {
    backgroundColor: primaryWhite,
    paddingVertical: calcHeight(8),
    marginTop: calcHeight(16),
    width: calcWidth(100),
    marginRight: calcWidth(20),
  },
  button: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  rowContainer: {
    justifyContent: 'center',
    marginVertical: calcHeight(8),
    flexDirection: 'row',
  },
  stripeDeleteButtonContainer: {
    marginVertical: calcHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stripeDeletButton: {
    height: '100%',
    borderWidth: calcWidth(1),
    borderColor: lightPeriwinkles,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: calcWidth(16),
    paddingVertical: calcWidth(14),
    borderRadius: calcHeight(10),
    backgroundColor: aliceBlueBackground,
  },
  bankInfoContainer: {
    flex: 1,
    paddingLeft: calcWidth(16),
  },
  bankInfoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteIconTouch: {
    flexDirection: 'row',
    paddingHorizontal: calcWidth(16),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
