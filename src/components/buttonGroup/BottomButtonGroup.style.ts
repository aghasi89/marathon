import {StyleSheet} from 'react-native';
import {calcHeight} from '../../assets/dimensions';
import {lightBlue} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: lightBlue,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: lightBlue,
    width: '100%',
    height: calcHeight(90),
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: '#FDFEFE',
  },
  textContainer: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'medium',
    }),
    marginHorizontal: 15,
  },
  line: {
    width: 1,
    height: 49,
    backgroundColor: lightBlue,
    marginVertical: 13,
  },
});
export default styles;
