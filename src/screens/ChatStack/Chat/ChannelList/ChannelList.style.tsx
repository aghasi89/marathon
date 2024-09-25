import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  aliceBlue,
  chatSearchBorder,
  primaryBlack,
  primaryBlue,
  primaryWhite,
  red,
  textLightGray,
} from '../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  searchInputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: chatSearchBorder,
    minHeight: calcHeight(48),
    marginHorizontal: calcWidth(16),
    marginTop: calcHeight(8),
  },
  searchInput: {
    paddingLeft: calcWidth(8),
  },
  channelListContainer: {
    flex: 1,
    paddingBottom: calcHeight(70),
  },
  chatContainer: {
    backgroundColor: primaryWhite,
  },
  swipeMuteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: calcWidth(40),
    marginBottom: calcHeight(16),
    backgroundColor: textLightGray,
  },
  swipeDeleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: calcWidth(40),
    marginBottom: calcHeight(16),
    backgroundColor: red,
  },
  chatItemContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: calcWidth(16),
    marginBottom: calcHeight(16),
    backgroundColor: primaryWhite,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: calcWidth(10),
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: calcWidth(30),
  },
  name: {
    fontSize: 18,
    fontWeight: '400',
    color: primaryBlack,
  },
  unreadName: {
    fontSize: 18,
    fontWeight: '800',
    color: primaryBlack,
  },
  unreadContainer: {
    paddingHorizontal: calcHeight(7),
    borderRadius: 100,
    backgroundColor: primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: 14,
    fontWeight: '600',
    color: primaryWhite,
  },
  chatIcon: {
    marginRight: calcWidth(4),
  },
  lastMessageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unreadLastMessage: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: primaryBlack,
    paddingRight: calcWidth(30),
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: chatSearchBorder,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '400',
    color: chatSearchBorder,
    marginLeft: calcWidth(8),
  },
  createButton: {
    position: 'absolute',
    right: calcWidth(16),
    bottom: calcHeight(100),
  },
  channelList: {
    marginTop: calcHeight(5),
  },
  assistantList: {
    marginBottom: 80,
  },
});
export default styles;
