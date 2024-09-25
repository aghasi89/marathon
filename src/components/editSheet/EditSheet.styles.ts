import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {primaryWhite} from '../../assets/styles/colors.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({size: 25, type: 'default'}),
    width: '100%',
    backgroundColor: primaryWhite,
  },
  button: {
    width: calcWidth(360),
    justifyContent: 'center',
    paddingHorizontal: calcWidth(30),
    height: calcHeight(55),
    borderRadius: calcHeight(62),
  },
  textLeft: {
    width: calcWidth(360),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: calcWidth(30),
    height: calcHeight(55),
    borderRadius: calcHeight(62),
    marginVertical:calcHeight(6)
  },
  textRight: {
    width: calcWidth(200),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: calcWidth(19),
    height: calcHeight(55),
    borderRadius: calcHeight(62),
    marginVertical:calcHeight(6)
  },
  listContainer: {
    height: '100%',
    paddingBottom: calcHeight(60),
  },
  listContainerRight: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    paddingBottom: calcHeight(60),
  },
});
export default styles;
