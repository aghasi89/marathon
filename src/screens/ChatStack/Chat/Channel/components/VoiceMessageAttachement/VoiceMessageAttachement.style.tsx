import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';
import { primaryGrey } from '../../../../../../assets/styles/colors.styles';
import { lightGray } from '../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../assets/styles/fonts.styles';

export const styles = StyleSheet.create({
  loadingIndicatorContainer: {
    paddingHorizontal: calcWidth(10),
    paddingVertical: calcWidth(7),
  },
  container: {
    width: calcWidth(250),
    paddingHorizontal: calcWidth(7),
    paddingVertical: calcWidth(5),
  },
  audioPlayerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: calcHeight(50)
  },
  progressDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  progressDetailsText: {
    color: primaryGrey,
    ...EnCodeSans({ size: 'subText', weight: 'semibold' }),
  },
  progressIndicatorContainer: {
    flex: 1,
    backgroundColor: lightGray,
    marginHorizontal: calcHeight(8),
  },
  progressLine: {
    borderWidth: calcWidth(2),
    borderColor: 'white',
    borderRadius: calcWidth(2),
  },
  icon: {
    width: calcWidth(36),
    height: calcHeight(36),
  },
  iconContainer: {
    paddingVertical: calcWidth(5),
  },
});
