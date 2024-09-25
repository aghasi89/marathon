import {StyleSheet} from 'react-native';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  cardItemContainerSorted: {
    marginLeft: calcWidth(16),
    marginVertical: calcHeight(16),
  },
  cardItemContainer: {
    marginLeft: calcWidth(16),
    marginBottom: calcHeight(16),
  },
  listContentContainer: {
    paddingBottom: calcHeight(70),
  },
  coachCardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cardContainer: {
    marginHorizontal: calcWidth(8),
    marginBottom: calcHeight(16),
  },
  followButtonText: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    color: primaryWhite,
  },
  cardHeaderText: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  statusText: {
    ...EnCodeSans({
      size: 'little',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
});

export default styles;