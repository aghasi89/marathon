import { StyleSheet } from 'react-native';
import { calcHeight } from '../../assets/dimensions';
import { primaryBlue } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {  
    width:'100%',
    marginBottom: calcHeight(10),
  },
  globalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: calcHeight(8)
  },
  text: {
    color: primaryBlue,
    ...EnCodeSans({
      size: 'legal',
      weight: 'semibold',
    }),
  }
});
export default styles;
