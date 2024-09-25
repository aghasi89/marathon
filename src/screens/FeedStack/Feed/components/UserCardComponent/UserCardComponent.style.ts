import {StyleSheet} from 'react-native';
import {lightPeriwinkles, primaryBlack} from '../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImageContainer: {
    height: calcHeight(40),
    width: calcWidth(40),
    borderRadius: calcHeight(25),
    backgroundColor: lightPeriwinkles,
    marginRight: calcWidth(10),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    height: calcHeight(40),
    width: calcWidth(40),
    borderRadius: calcHeight(25),
  },
  altImage: {
    height: calcHeight(30),
    width: calcWidth(30),
  },
  userName:{
    ...EnCodeSans({
        size:'body',
        weight:'semibold'
    }),
    color:primaryBlack
  },

});
export default styles;
