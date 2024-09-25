import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    width: calcWidth(150),
    height: calcHeight(200),
    backgroundColor: 'rgba(88, 156, 254, 0.1)',
    borderRadius: calcHeight(16),
    marginBottom: calcHeight(10),
    marginTop: calcHeight(15),
  },
  type: {
    ...EnCodeSans({
      size: 'little',
      weight: 'medium',
    }),
    color: primaryBlue,
  },
  content: {
    paddingTop: calcHeight(8),
    paddingHorizontal: calcWidth(8),
    paddingVertical: calcHeight(10),
  },
  image: {
    height: calcHeight(100),
    borderTopRightRadius: calcHeight(16),
    borderTopLeftRadius: calcHeight(16),
  },
  footer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: calcHeight(10),
  },
  textName: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  textDate: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    color: primaryBlue,
  },
  userCount: {
    ...EnCodeSans({
      size: 'little',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  priceContainer: {
    backgroundColor: primaryWhite,
    height: calcHeight(17),
    width: calcWidth(45),
    position: 'absolute',
    zIndex: 1,
    borderRadius: calcHeight(16),
    top: calcHeight(10),
    left: calcWidth(10),
  },
  price: {
    ...EnCodeSans({
      size: 'subLittle',
      weight: 'medium',
    }),
    color: primaryBlack,
    textAlign: 'center',
  },
});
export default styles;
