import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  backgroundligthBlue,
  formFieldGrey,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';
import {borderStyle} from '../../../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: calcWidth(10),
    paddingBottom: calcHeight(60),
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: calcWidth(10),
  },
  headerWithImageContainer: {
    height: calcHeight(350),
    width: '100%',
  },
  title: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'form-field',
    }),
    color: primaryBlack,
  },

  leftComponentStyle: {
    marginLeft: -calcWidth(17),
  },
  elipsIcon: {
    paddingHorizontal: calcWidth(15),
  },
  dayContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  days: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'body',
    }),
    color: primaryBlack,
  },
  dayCount: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'body',
    }),
    color: formFieldGrey,
  },
  programsContainer: {
    ...borderStyle({size: 25, type: 'default'}),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(25),
    paddingVertical: calcHeight(14),
    marginBottom: calcHeight(20),
  },
  iconContainer: {
    height: calcHeight(43),
    width: calcHeight(43),
    backgroundColor: backgroundligthBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: calcHeight(13),
    marginRight: calcWidth(15),
  },
  chipsGroup: {
    height: calcHeight(80),
  },
  arrowButton: {
    width: '15%',
    height: calcWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  meddleComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgesContainer: {
    height: calcHeight(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    marginHorizontal: calcWidth(12),
  },
  searchBar: {
    height: calcHeight(60),
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  infoCard: {
    width: '100%',
    marginVertical: calcHeight(10),
  },
  badgesNotification: {
    width: '100%',
    height: calcHeight(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icons: {
    flexDirection: 'row',
    paddingBottom: calcHeight(10),
    marginLeft: calcWidth(12),
  },
  filterList: {
    marginVertical: calcHeight(15),
  },
  text: {
    paddingBottom: calcHeight(10),
    color: primaryBlue,
    ...EnCodeSans({
      weight: 'medium',
      size: 'body',
    }),
  },
  badges: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
  },
  textInput: {
    ...EnCodeSans({
      weight: 'medium',
      size: 'form-field',
    }),
    paddingVertical: calcHeight(13),
  },
  bottomTexts: {
    paddingLeft: calcWidth(24),
  },
});
export default styles;
