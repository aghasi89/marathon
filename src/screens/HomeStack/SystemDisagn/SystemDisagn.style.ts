import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../assets/dimensions';
import {
  primaryBlue,
  primaryBlack,
  lightBlue,
} from '../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../assets/styles/fonts.styles';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    alignItems: 'center',
    color: 'black',
  },
  itemsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //  flexDirection: 'row',
    marginVertical: 20,
  },
  sliderContainer: {
    width: '50%',
  },
  button: {
    height: calcHeight(50),
    width: calcWidth(270),
  },
  textInputContainer: {
    width: '80%',
  },
  headerWithImageContainer: {
    height: 300,
    width: '100%',
  },
  dropDownContainer: {
    width: '40%',
  },
  dropDownContainerWithoutImage: {
    width: '35%',
  },
  numberInputContainer: {
    width: 85,
  },
  progressCard: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  selected: {
    height: calcHeight(30),
    width: calcHeight(30),
    backgroundColor: primaryBlue,
    borderRadius: calcHeight(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {width: calcWidth(40), alignItems: 'center'},

  myComponentContainer: {
    height: calcHeight(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
  myComponenetText: {
    color: primaryBlack,
  },
  uploadImage: {
    paddingHorizontal: 10,
    width: '100%',
  },
  modalContent: {alignItems: 'center'},
  modalText: {color: primaryBlack, textAlign: 'center'},
  leftIcon: {
    height: calcHeight(40),
    width: calcHeight(40),
    borderRadius: calcHeight(16),
    backgroundColor: lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
});
export default styles;
