import { Platform, StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';
import { primaryBlack, primaryBlue, primaryGrey, primaryWhite } from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingBottom:Platform.OS==='ios'?calcHeight(40):calcHeight(20)
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    right: 20,
    top: Platform.OS === "ios" ? 50 : 20,
    alignItems: 'flex-end',
    height: calcHeight(30),
    width: calcWidth(30),
    zIndex: 1
  },
  closeIcon: {
    height: calcHeight(20),
    width: calcWidth(20)
  },
  actionSheetIcon: {
    height: calcHeight(21),
    width: calcWidth(21),
    fill: primaryBlack,
  },
  reportHeader: {
    textAlign: "center",
    color: primaryBlue,
    ...EnCodeSans({
      size: "form-field",
      weight: "bold"
    }),
  },
  reportQuestion: {
    color: primaryGrey,
    ...EnCodeSans({
      size: "body",
      weight: "bold"
    }),
    marginBottom: calcHeight(10)
  },
  reportItem: {
    paddingVertical: calcHeight(5),
  },
  reportItemText: {
    color: primaryBlack,
    ...EnCodeSans({
      size: "body",
      weight: "semibold"
    }),
  },
  wrapper: {
    paddingVertical: calcHeight(20),
    paddingHorizontal: calcWidth(15)
  },
  applyButton: {
    backgroundColor: primaryBlue,
    borderRadius: 8,
    borderWidth: calcHeight(2),
    borderColor: primaryBlue,
    paddingVertical: calcHeight(5)
  },
  reportInput: {
    marginBottom: calcHeight(10)
  }

})

export default style