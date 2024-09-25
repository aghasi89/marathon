import {StyleSheet} from 'react-native';
import {
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: calcWidth(25),
    paddingVertical: calcWidth(15),
    backgroundColor: primaryBlue,
    borderRadius: calcHeight(25),
  },
  textStyle: {
    color: primaryWhite,
    fontSize: 16,
  },
  goBack: {
    width: '12%',
    padding: 20,
  },
  main: {
    // flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: primaryWhite,
    marginTop: calcWidth(5),
    position: 'absolute',
    zIndex: 1,
  },
  smallMain: {
    width: '100%',
    height: calcHeight(330),
    backgroundColor: primaryWhite,
    marginTop: calcWidth(5),
    position: 'absolute',
    zIndex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: primaryWhite,
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  videoView: {
    width: '100%',
    height: calcHeight(770),
    position: 'relative',
    zIndex: 0,
  },
  smallVideoView: {
    width: '100%',
    height: calcHeight(330),
    position: 'relative',
    zIndex: 0,
  },
  openChat: {
    position: 'absolute',
    top: 10,
    zIndex: 1,
    right: 10,
    // justifyContent: 'center',
    // paddingLeft: calcWidth(10),
  },
  chatText: {
    color: 'white',
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: calcWidth(30),
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: calcWidth(15),
  },
  text: {
    fontSize: 16,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  esim: {
    borderWidth: 1,
    borderColor: "red"
  }
});