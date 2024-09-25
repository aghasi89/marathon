import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  borderGrey,
  formFieldGrey,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  dropContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: borderGrey,
    paddingVertical: calcHeight(24),
    paddingHorizontal: calcWidth(10),
  },
  title: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'body',
    }),
    color: formFieldGrey,
    marginLeft: calcWidth(10),
    marginBottom: calcHeight(5),
  },
  icon: {
    marginRight: calcWidth(10),
  },
  iconsContainer:{
    flexDirection:'row'
  },
  icons: {
    marginRight: calcWidth(26),
  },
});
export default styles;
