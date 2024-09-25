import { StyleSheet } from 'react-native';
import {
  primaryBlack, primaryBlue,
} from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';
import { calcHeight } from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  sectionTitle: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    marginTop: calcHeight(16),
  },
  sectionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  seeAllText: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    color: primaryBlue
  }
});
export default styles;
