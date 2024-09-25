import {StyleSheet} from 'react-native';
import {lightLine, primaryBlue, primaryWhite} from '../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  groupInfoContainer: {
    paddingHorizontal: calcWidth(16),
    marginTop: calcHeight(24),
  },
  createButton: {
    position: 'absolute',
    right: calcWidth(16),
    bottom: calcHeight(100),
  },
  line: {
    height: 1,
    backgroundColor: lightLine,
    marginHorizontal: calcWidth(16),
    marginTop: calcHeight(16),
    marginBottom: calcHeight(8)
  },
  usersList: {
    paddingHorizontal: calcWidth(16),
  },
  loadingView: {
    width: calcWidth(52),
    height: calcHeight(52),
    borderRadius: 60,
    backgroundColor: primaryBlue
  }
});
export default styles;
