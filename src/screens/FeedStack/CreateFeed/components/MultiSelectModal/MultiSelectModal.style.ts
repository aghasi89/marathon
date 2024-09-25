import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import {
  aliceBlueBackground,
  borderGrey,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal:calcWidth(20)
  },
  itemContainer: {
    justifyContent:'space-between',
    borderWidth:calcHeight(1),
    borderColor:borderGrey,
    borderRadius:calcHeight(80),
    flexDirection: 'row',
    paddingHorizontal: calcWidth(24),
    marginBottom:calcHeight(12),
    alignItems: 'center',
    backgroundColor:aliceBlueBackground ,
    paddingVertical:calcHeight(15)
  },
  selectedItemContainer: {
    borderWidth:calcHeight(1),
    borderColor:primaryBlue,
    marginBottom:calcHeight(12),
    flexDirection: 'row',
    borderRadius:calcHeight(80),
    paddingHorizontal: calcWidth(24),
    alignItems: 'center',
    backgroundColor: primaryBlue,
    paddingVertical:calcHeight(15)
  },
  text: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color:primaryBlack
  },
  selectedText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color:primaryWhite
  },
});
export default styles;
