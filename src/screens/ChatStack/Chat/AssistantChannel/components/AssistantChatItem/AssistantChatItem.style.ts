import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  assistantMessageBlack,
  midGray,
  primaryWhite,
  robinEggBlue,
} from '../../../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  messageItem: {
    flexDirection: 'row',
    // alignItems: "flex-end",
    width: '100%',
    marginTop: calcHeight(16),
  },
  myMessageItem: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: calcHeight(16),
  },
  timeContainer: {
    justifyContent: 'center',
    paddingHorizontal: calcWidth(10),
  },
  timeText: {
    fontSize: 12,
    fontWeight: '400',
    color: midGray,
  },
  messageTextContainer: {
    backgroundColor: primaryWhite,
    borderRadius: 24,
    borderBottomLeftRadius: 0,
    paddingVertical: calcHeight(10),
    paddingHorizontal: calcWidth(20),
  },
  myMessageTextContainer: {
    backgroundColor: robinEggBlue,
    borderRadius: 24,
    borderBottomRightRadius: 0,
    paddingVertical: calcHeight(2),
    paddingHorizontal: calcWidth(4),
  },
  messageText: {
    fontSize: 14,
    fontWeight: '400',
    color: assistantMessageBlack,
    lineHeight: 21,
  },
  myMessageText: {
    marginVertical: calcHeight(10),
    marginHorizontal: calcWidth(20),
    fontSize: 14,
    fontWeight: '400',
    color: primaryWhite,
    lineHeight: 21,
  },
  avatarContainer: {
    justifyContent: 'flex-end',
  },
  userAvatar: {
    width: calcHeight(28),
    height: calcHeight(28),
    borderRadius: calcHeight(21),
    resizeMode: 'center',
    marginRight: calcWidth(4),
  },
});
export default styles;
