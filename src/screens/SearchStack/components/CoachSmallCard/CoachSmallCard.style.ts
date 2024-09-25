import {StyleSheet} from 'react-native';
import {
  backgroundGrey,
  primaryBlack,
  primaryBlue,
  primaryWhite,
  workoutBlue,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    borderRadius: calcHeight(16),
    overflow: 'hidden',
  },
  imageContainer: {
    backgroundColor: backgroundGrey,
  },
  absoluteContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    paddingTop: calcHeight(12),
    paddingLeft: calcWidth(8),
  },
  iconContainer: {
    backgroundColor: primaryWhite,
    height: calcHeight(24),
    width: calcWidth(24),
    borderRadius: calcWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: calcHeight(8),
  },
  smallCard: {
    width: '100%',
    height: calcHeight(110),
    resizeMode: 'cover',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  altImage: {
    height: calcHeight(65),
    width: calcWidth(65),
  },
  flag: {
    height: calcHeight(24),
    width: calcWidth(24),
  },
  infoContainer: {
    paddingHorizontal: calcWidth(8),
    paddingVertical: calcWidth(8),
    backgroundColor: workoutBlue,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlack,
    marginRight: calcWidth(6),
  },
  rowContainerSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: calcHeight(8),
  },
  text: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    marginLeft: calcWidth(6),
    color: primaryBlack,
  },
  specialityText: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: primaryBlue,
    marginRight: calcWidth(12),
  },
});
export default styles;
