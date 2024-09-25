import {StyleSheet} from 'react-native';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: calcHeight(100),
    marginHorizontal: calcWidth(16),
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: calcHeight(24),
  },
  title: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'semibold',
    }),
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  buttonsContainer: {
    marginBottom: calcHeight(18),
  },
});
export default styles;
