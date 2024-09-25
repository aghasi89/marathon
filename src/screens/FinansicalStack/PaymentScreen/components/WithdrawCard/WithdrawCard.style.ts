import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import { lightPeriwinkle, primaryBlack, primaryWhite } from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(14),
    borderRadius: calcWidth(30),
    backgroundColor: primaryWhite,
    shadowColor: primaryBlack,
    flex: 1,
    marginBottom: calcWidth(16),
    marginHorizontal: calcWidth(16),
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: "row"
  },
  currency: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'legal',
      weight: 'semibold',
    }),
  },
  status: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'semibold',
    }),
    marginRight: calcWidth(17)
  },
  date: {
    color: lightPeriwinkle,
    ...EnCodeSans({
      size: 'subText',
      weight: 'medium',
    }),
  }
});
export default styles;
