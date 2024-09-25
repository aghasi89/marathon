import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  chatSearchBorder,
  primaryBlue,
  primaryWhite,
  shadowPrimaryBlue,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  searchInputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: chatSearchBorder,
    minHeight: calcHeight(48),
    marginHorizontal: calcWidth(16),
    marginTop: calcHeight(8)
  },
  searchInput: {
    paddingLeft: calcWidth(8),
  },
  createButton: {
    position: 'absolute',
    right: calcWidth(16),
    bottom: calcHeight(100),
  },



  
  headerText: {
    color: primaryBlue,
    ...EnCodeSans({
      size: 'body',
      weight: 'bold',
    }),
  },
  usersList: {
    marginTop: calcHeight(25),
    paddingHorizontal: calcWidth(16)
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: calcHeight(50),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: calcHeight(14),
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: calcHeight(15),
  },
  back: {
    paddingHorizontal: calcWidth(32),
  },
  search: {
    paddingVertical: calcHeight(15),
    borderBottomColor: shadowPrimaryBlue,
    borderBottomWidth: 1,
  },
  icon: {
    width: calcWidth(20),
    height: calcHeight(20),
  },
});
export default styles;
