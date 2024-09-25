import { StyleSheet } from 'react-native';
import { primaryBlack, primaryBlue, primaryGrey, primaryWhite } from '../../../../../assets/styles/colors.styles';
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
  curency: {
    flexDirection: "row",
    borderColor: primaryGrey,
    borderWidth: 1,
    borderRadius: calcWidth(30),
    justifyContent: "space-between",
    paddingHorizontal: calcWidth(12),
    paddingVertical: calcHeight(10)
  },
  balance: {
    color: primaryBlue,
    ...EnCodeSans({
      size: 'subText',
      weight: 'semibold',
    }),
    marginTop: calcHeight(20)
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: calcHeight(10),
    alignItems: "center"
  },
  left: {
    marginRight: calcWidth(14),
    paddingHorizontal: calcWidth(10)
  },
  curencyType: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'form-field',
      weight: 'semibold',
    }),
  },
  curencyText: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
  },
  sumContainer: {
    alignItems: "center"
  }
});
export default styles;
