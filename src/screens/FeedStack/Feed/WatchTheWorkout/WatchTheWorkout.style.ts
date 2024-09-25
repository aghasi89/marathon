import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {primaryWhite} from '../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  scrollContainer: {
    backgroundColor: primaryWhite,
  },
  backIconTouchContainer: {
    paddingHorizontal: calcWidth(17),
    paddingVertical: calcHeight(24),
    position: 'absolute',
    top: calcHeight(0),
    left: calcWidth(0),
    zIndex: 1,
  },
  progressContainer: {
    marginVertical: calcHeight(16),
  },
  timerContainer: {
    paddingHorizontal: calcWidth(30),
  },
  stepperButtonsContainer: {
    paddingHorizontal: calcWidth(16),
    marginTop: calcHeight(48),
  },
  exerciseItemContainer: {
    marginVertical: calcHeight(24),
  },
  restTimeContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: calcHeight(10),
    alignItems: 'center',
  },
  restTimeText: {
    fontSize: 40,
    fontWeight: '600',
    color: primaryWhite,
  },
  restTimer: {
    fontSize: 40,
    fontWeight: '600',
    color: primaryWhite,
    marginVertical: calcHeight(40),
  },
  congratulation: {
    height: '100%',
    width: '100%',
  },
});
export default styles;
