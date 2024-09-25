import {Platform, StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  aliceBlue,
  primaryBlue,
  primaryGrey,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    zIndex: 0,
    position: 'relative',
  },
  icon: {
    height: calcHeight(23),
    width: calcWidth(23),
    marginLeft: calcWidth(10),
  },
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryBlue,
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  modalButtons: {
    paddingHorizontal: calcWidth(30),
  },
  modal: {
    paddingVertical: calcHeight(15),
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Aicontainer: {
    paddingHorizontal: calcHeight(26),
  },
  textArea: {
    paddingTop: calcHeight(10),
  },
  contentContainer: {
    marginBottom: 50,
  },
  modalContent: {
    paddingHorizontal: calcHeight(16),
    paddingVertical: calcWidth(15),
    backgroundColor: primaryWhite,
    height: calcHeight(300),
    maxHeight: calcHeight(400),
  },
  cardItemContainer: {
    marginHorizontal: calcWidth(8),
    marginVertical: calcWidth(16),
  },
  workoutModal: {
    paddingBottom: Platform.OS === 'ios' ? 0 : calcHeight(130),
  },
  workoutHeader: {
    alignSelf: 'center',
    ...EnCodeSans({size: 'form-field', weight: 'bold'}),
    color: primaryBlue,
  },
  searchInputContainer: {
    marginHorizontal: calcWidth(16),
    marginVertical: calcHeight(12),
    backgroundColor: aliceBlue,
    borderWidth: 0,
  },
  searchInput: {
    paddingLeft: calcWidth(10),
  },
  liveIcons: {
    height: calcHeight(30),
    width: calcWidth(30),
  },
  mod: {
    width: 100,
    borderWidth: 2,
    borderColor: 'green',
  },
  liveStreamModal: {
    width: '40%',
    height: calcHeight(300),
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'red',
  }
});
export default styles;
