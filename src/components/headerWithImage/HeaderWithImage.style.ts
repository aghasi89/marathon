import { StyleSheet } from 'react-native';
import { primaryGrey } from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  containerImage: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    resizeMode: 'contain'
  },
  containerCircle: {
    flexDirection: 'row',
    paddingHorizontal: 11,
    marginTop: 6,
    width: '100%',
    justifyContent: 'space-between'
  },
  circle: {
    width: 53,
    height: 53,
    borderRadius: 26,
    backgroundColor: primaryGrey,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default styles;
