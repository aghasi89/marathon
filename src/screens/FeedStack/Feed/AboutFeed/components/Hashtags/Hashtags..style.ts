import { StyleSheet } from 'react-native';
import { lightPeriwinkle, primaryBlue } from '../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';

const style = StyleSheet.create({
  hashtagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: calcWidth(16)
  },
  feedCategoryContainer: {
    borderWidth: calcWidth(1),
    borderColor: lightPeriwinkle,
    paddingRight: calcWidth(25),
    paddingLeft: calcWidth(5),
    borderRadius: calcWidth(40)
  },
  hashtagsText: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'regular'
    }),
    color: primaryBlue,
    paddingLeft: calcWidth(20),
    paddingVertical: calcHeight(8),
  },

})
export default style