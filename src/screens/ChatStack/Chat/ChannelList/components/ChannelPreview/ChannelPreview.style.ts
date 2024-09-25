import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import { chatBarBack, chatSearchBorder, primaryBlack, primaryBlue, primaryWhite, red, textLightGray } from '../../../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  chatContainer: {
    backgroundColor: primaryWhite,
  },
  swipeMuteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: calcWidth(40),
    marginBottom: calcHeight(16),
    backgroundColor: textLightGray
  },
  swipeDeleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: calcWidth(40),
    marginBottom: calcHeight(16),
    backgroundColor: red
  },
  chatItemContainer: {
    flexDirection: "row", 
    flex: 1,
    paddingHorizontal: calcWidth(16),
    marginBottom: calcHeight(16),
    backgroundColor: primaryWhite,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: calcWidth(10)
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: calcWidth(30),
  },
  name: {
    fontSize: 18,
    fontWeight: "400",
    color: primaryBlack,
  },
  unreadName: {
    fontSize: 18,
    fontWeight: "800",
    color: primaryBlack,
  },
  unreadContainer: {
    paddingHorizontal: calcHeight(7),
    borderRadius: 100,
    backgroundColor: primaryBlue,
    justifyContent: "center",
    alignItems: "center"
  },
  unreadCount: {
    fontSize: 14,
    fontWeight: "600",
    color: primaryWhite,
  },
  chatIcon: {
    marginRight: calcWidth(4)
  },
  lastMessageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unreadLastMessage: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: primaryBlack,
    paddingRight: calcWidth(30),
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: chatSearchBorder,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "400",
    color: chatSearchBorder,
    marginLeft: calcWidth(8)
  },
});
export default styles;
