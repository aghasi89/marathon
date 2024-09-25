import {StyleSheet} from 'react-native';
import {
  primaryBlue,
  primaryWhite,
} from '../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    backgroundColor:primaryWhite
  },
  absoluteContainer: {
    height:'100%',
    width:'100%',
    position: 'absolute',
    justifyContent: 'space-between',
  },
  rowContainer: {
    width: '100%',
    paddingHorizontal: calcHeight(8),
    paddingVertical: calcWidth(8),
    alignItems: 'flex-end',
    minHeight:calcHeight(35),
  },
  middleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: primaryWhite,
    height: calcHeight(24),
    width: calcWidth(24),
    borderRadius: calcWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconContainer: {
    width: calcWidth(35),
    height: calcHeight(35),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:primaryBlue,
    borderRadius:calcHeight(18)
  },
  iconStyle: {
    height: calcHeight(20),
    width: calcWidth(20),
    fill:primaryWhite,
    marginLeft:calcWidth(3)
  },
  smallCard: {
    width: '100%',
    height: calcHeight(110),
    resizeMode: 'cover',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default styles;
