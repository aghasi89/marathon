import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  inputBorder,
  paleCornflowerBlue,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: calcHeight(8),
    marginBottom: calcHeight(20),
    borderRadius: calcHeight(8),
  },
  userAvatar: {
    width: calcHeight(42),
    height: calcHeight(42),
    borderRadius: calcHeight(20),
  },
  selectedUser: {
    backgroundColor: paleCornflowerBlue,
  },
  userName: {
    ...EnCodeSans({
      size: 'body',
      weight: 'bold',
    }),
    paddingLeft: calcWidth(10),
  },
  admin: {
    color: inputBorder,
  },
});
export default styles;
