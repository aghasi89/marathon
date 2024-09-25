import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';
import { primaryBlue, primaryWhite, shadowPrimaryBlue } from '../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: calcHeight(25),
    paddingVertical: calcWidth(30),
    backgroundColor: primaryWhite,
  },
  headerText: {
    color: primaryBlue,
    ...EnCodeSans({
      size: 'body',
      weight: 'bold',
    }),
  },
  editInfo: {
    paddingVertical: calcHeight(20),
    borderBottomWidth: 1,
    borderBottomColor: shadowPrimaryBlue,
    marginTop: calcHeight(20),
  },
  addMember: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    color: primaryBlue,
    paddingLeft: calcWidth(10),
  },
  addMembersView: {
    flexDirection: 'row',
    paddingVertical: calcHeight(10),
  },
  footer: {
    marginTop: calcHeight(30),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancelButton: {
    paddingRight: calcWidth(20),
  },
});
export default styles;
