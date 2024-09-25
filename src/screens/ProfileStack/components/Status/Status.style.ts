import { StyleSheet } from 'react-native';
import { primaryBlack } from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  status: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
  }
});
export default styles;