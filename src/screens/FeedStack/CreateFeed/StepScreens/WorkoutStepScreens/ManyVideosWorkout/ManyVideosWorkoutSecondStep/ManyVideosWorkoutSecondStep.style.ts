import { StyleSheet } from 'react-native';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
  robinEggBlue,
} from '../../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../../../assets/dimensions';
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollContainer: {
    paddingHorizontal: calcWidth(16),
    paddingTop: calcHeight(8),
  },
  messageContainer: {
    flexGrow: 1,
    paddingTop: calcHeight(226),
  },
  messageText: {
    ...EnCodeSans({
      size: 'headline2',
      weight: 'semibold',
    }),
    textAlign: 'center',
  },
  plusButtonContainer: {
    position: 'absolute',
    right: calcWidth(16),
    bottom: calcHeight(24),
    zIndex: 2
  },
  plusButton: {
    width: calcWidth(60),
    height: calcWidth(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: calcHeight(2),
    borderRadius: calcHeight(30),
    backgroundColor:primaryWhite
  },
  plusIcon: {
    height: calcHeight(24),
    width: calcHeight(24),
    fill: robinEggBlue,
  },
  exerciseItemContainer: {
    marginVertical: calcHeight(8),
  },
  padding: {
    paddingHorizontal: calcWidth(16),
  },
  scrollContainer1: {
    width: '100%',
    height: calcHeight(600),
    marginBottom: calcHeight(65),
    paddingHorizontal: calcWidth(16),
  },
  titleContainer: {
    paddingHorizontal: calcWidth(16),
    marginTop: calcHeight(16),
  },
  titleText: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: primaryBlack,
  },
  chipsContainer: {
    paddingVertical: calcHeight(24),
  },
  chipItem: {
    borderWidth: calcWidth(1),
    borderColor: robinEggBlue,
  },
  descriptionContainer: {},
  sectionTitles: {
    paddingHorizontal: calcWidth(16),
    marginBottom: calcHeight(16),
    marginTop: calcHeight(10),
  },
  modalContent: {
    backgroundColor: primaryWhite,
    height: '90%',
  },
  equipmentContainer: {
    marginTop: calcHeight(24),
    marginBottom: calcHeight(50)
  },
  equipmentTitleContainer: {
    alignItems: 'center',
  },
  equipmentTitle: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: primaryBlue,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: calcHeight(60),
    width: '100%',
    zIndex: 2,
    backgroundColor: primaryWhite,
    paddingVertical: calcHeight(5)
  },
  saveButton: {
    marginHorizontal: calcWidth(16),
    paddingVertical: calcHeight(10),
    borderRadius: calcHeight(8),
    backgroundColor: primaryBlue,
    alignItems: 'center'
  },
  saveButtonTitle: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'medium'
    }),
    color: primaryWhite
  }
});
export default styles;
