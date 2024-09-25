import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  aliceBlue,
  primaryWhite,
  robinEggBlue,
} from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    height: calcHeight(450),
    marginBottom: calcHeight(65),
    paddingHorizontal: calcWidth(8),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchInputContainer: {
    marginHorizontal: calcWidth(16),
    backgroundColor: aliceBlue,
    borderWidth: 0,
  },
  searchInput: {
    paddingLeft: calcWidth(10),
  },
  cardItemContainer: {
    marginHorizontal: calcWidth(8),
    marginVertical: calcWidth(8),
  },
  plusButton: {
    width: calcWidth(60),
    height: calcWidth(60),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: calcWidth(16),
    bottom: calcHeight(24),
    borderWidth: calcHeight(2),
    borderColor: robinEggBlue,
    borderRadius: calcHeight(30),
    backgroundColor: primaryWhite,
    marginBottom: calcHeight(50),
  },
  plusIcon: {
    height: calcHeight(24),
    width: calcHeight(24),
    fill: robinEggBlue,
  },
});

export default styles;
