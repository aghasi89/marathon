import { StyleSheet } from 'react-native';
import { lightPeriwinkle, primaryBlack, primaryBlue, primaryWhite } from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(14),
    borderRadius: calcWidth(30),
    backgroundColor: primaryWhite,
    flex: 1,
    marginBottom: calcWidth(16),
    marginHorizontal: calcWidth(16),
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  user: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: calcHeight(15),
    alignItems: "center"
  },
  date: {
    color: lightPeriwinkle,
    ...EnCodeSans({
      size: 'subText',
      weight: 'medium',
    }),
  },
  padding: {
    paddingHorizontal: calcWidth(30)
  },
  status: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'semibold',
    }),
  },
  moneyTitle: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlue
  },
  money: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'bold',
    }),
    primaryBlack
  },
  centered: {
    alignItems: "center"
  },
  stripeStyle: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    justifyContent: "space-between"
  }
});
export default styles;
