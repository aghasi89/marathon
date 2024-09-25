import {StyleSheet} from 'react-native';
import {
  aliceBlue,
  primaryBlue,
  primaryWhite,
  robinEggBlue,
} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInputContainer: {
    marginHorizontal: calcWidth(16),
    backgroundColor: aliceBlue,
    borderWidth: 0,
  },
  searchInput: {
    paddingLeft: calcWidth(10),
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: calcHeight(8),
  },
  title: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: primaryBlue,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: calcWidth(8),
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardItemContainer: {
    marginHorizontal: calcWidth(8),
    marginVertical: calcWidth(16),
  },
  plusButton:{
    width: calcWidth(60),
    height: calcWidth(60),
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    right:calcWidth(16),
    bottom:calcHeight(24),
    borderWidth: calcHeight(2),
    borderColor:robinEggBlue,
    borderRadius:calcHeight(30),
    backgroundColor:primaryWhite
  },
  plusIcon:{
    height: calcHeight(24),
    width: calcHeight(24),
    fill:robinEggBlue
  }
});
export default styles;
