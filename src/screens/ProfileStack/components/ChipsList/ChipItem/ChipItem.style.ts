import { StyleSheet } from 'react-native';
import { primaryWhite } from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: calcHeight(10),
    marginRight: calcWidth(16),
    borderRadius: calcWidth(100),
    borderWidth: calcWidth(1),
    minWidth: calcWidth(40),
    minHeight: calcHeight(40)
  },
  contentContainer: {
    margin: calcWidth(8),
    flexDirection: 'row',
    alignItems: "center"
  },
  sectionText: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    maxWidth: calcWidth(200)

  },
});
export default styles;