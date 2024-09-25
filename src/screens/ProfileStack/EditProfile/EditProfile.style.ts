import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { borderGrey, circleBorder, lightSteelBlue, primaryBlack, primaryBlue, primaryGrey, primaryWhite, red } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { borderStyle } from '../../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  mandatoryMessageContainer: {
    marginTop: calcHeight(100),
    paddingHorizontal: calcWidth(32),
    marginBottom: calcHeight(-84)
  },
  mandatoryMessage: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular'
    }),
    textAlign: 'center',
    color: red
  },
  contentContainer: {
    top: calcHeight(100),
    paddingHorizontal: calcWidth(24),
    marginBottom: calcHeight(100)
  },
  lable: {
    color: primaryGrey,
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'medium',
    }),
  },
  button: {
    marginBottom: calcHeight(20),
    maxWidth: '70%'
  },
  genderButtonsContainer: {
    flexDirection: "row",
    marginTop: calcHeight(16),
  },
  errorMesageText: {
    color: red,
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    marginBottom: calcHeight(15),
    marginTop: calcHeight(5),
    marginLeft: calcWidth(21)
  },
  input: {
    marginBottom: calcHeight(25),
    marginTop: calcHeight(16)
  },
  margin: {
    marginTop: calcHeight(16)
  },
  textArea: {
    marginBottom: calcHeight(25),
    marginTop: calcHeight(16),
    minHeight: calcHeight(256),
    maxHeight: calcHeight(256),
    alignItems: "flex-start"
  },
  dropDownContainerStyle: {
    borderRadius: 0,
    borderColor: borderGrey,
    borderWidth: 1
  },
  selectedItemContainerStyle: {
    backgroundColor: circleBorder
  },
  dropDown: {
    borderRadius: calcWidth(25),
    borderColor: borderGrey,
    borderWidth: 1,
    paddingHorizontal:
      calcWidth(25),
    marginTop: calcHeight(16)
  },
  textInput: {
    paddingHorizontal: calcWidth(25),
    ...borderStyle({ size: 35, type: 'outline' }),
    alignItems: 'center',
    flexDirection: 'row',
    color: primaryBlack,
    marginTop: calcHeight(16)
  },
  row: {
    maxHeight: calcHeight(52),
    flexDirection: 'row',
  },
  description: {
    color: primaryBlack
  },
  containerStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    ...borderStyle({ size: 35, type: 'outline' }),
    width: '100%'
  },
  textContainerStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopRightRadius: 35,
    borderBottomRightRadius: 35,
    borderWidth: 0,
  },
  textInputStyle: {
    padding: 0
  },
  codeTextStyle: {
    paddingLeft: calcWidth(24),
    color: primaryBlack
  },
  certificateContainer: {
    borderColor: borderGrey,
    borderTopLeftRadius: calcWidth(30),
    borderTopRightRadius: calcWidth(30),
    borderWidth: 1,
    borderBottomWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: calcHeight(16)
  },
  certificateRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: calcWidth(16)
  },
  selectInputContainer: {
    marginBottom: calcHeight(16),
  },
  modalContent: {
    alignItems: 'center'
  },
  outLineButtonText: {
    color: primaryBlue
  },
  rowWrapContainer: {
    flexDirection: "row",
    flexWrap: 'wrap'
  },
  selectInputIconStyle: {
    height: calcHeight(16),
    width: calcWidth(16),
    fill: lightSteelBlue,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  padding: {
    paddingLeft: 20
  },
  outLineButton: {
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(8),
    maxHeight: calcHeight(50),
    marginRight: calcWidth(10),
    marginTop: calcHeight(10)
  },
  actionSheetIcon: {
    height: calcHeight(12),
    width: calcWidth(12),
    fill: primaryBlack,
  },
  sheetButtons: {
    flexDirection: "row",
    alignItems: "center"
  },
  sheetButtonText: {
    marginLeft: calcWidth(20)
  },
  emptyView: {
    marginTop: calcHeight(20)
  },
  shhetContainer: {
    flex: 1,
    width: "90%"
  },
  image: {
    width: calcWidth(23),
    height: calcHeight(23)
  },
  certificateInput: {
    borderWidth: 0,
    flex: 1,
    paddingLeft: calcWidth(5)
  },
  removeButton: {
    padding: calcWidth(10),
    paddingRight: 0
  },
  addCertificateButton: {
    flexDirection: "row",
    borderColor: borderGrey,
    borderBottomLeftRadius: calcWidth(30),
    borderBottomRightRadius: calcWidth(30),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: calcHeight(16)
  },
  addCertificateText: {
    marginLeft: calcWidth(10),
    color: primaryBlack
  },
});
export default styles;
