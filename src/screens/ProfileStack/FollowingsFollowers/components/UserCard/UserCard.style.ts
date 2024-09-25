import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import {
  primaryBlue,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: calcHeight(8),
    marginBottom: calcHeight(20),
    borderRadius: calcHeight(8),
    justifyContent: "space-between"
  },
  subConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  userAvatar: {
    width: calcHeight(42),
    height: calcHeight(42),
    borderRadius: calcHeight(20),
  },
  userName: {
    ...EnCodeSans({
      size: 'body',
      weight: 'bold',
    }),
    paddingLeft: calcWidth(10),
  },
  defaultButton: {
    backgroundColor: primaryBlue,
    paddingVertical: calcHeight(10),
    minHeight: calcHeight(45),
  },
  defaultButtonText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryWhite,
  },
  outLineButton: {
    paddingVertical: calcHeight(10),
    minHeight: calcHeight(45),
    paddingHorizontal: calcWidth(15)
  },
  outLineButtonText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlue,
  },
});
export default styles;
