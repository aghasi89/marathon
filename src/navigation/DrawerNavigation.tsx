import { createDrawerNavigator } from '@react-navigation/drawer';
import { primaryBlue } from '../assets/styles/colors.styles';
import DrawerContent from '../components/drawerContent/DrawerContent';
import FeedScreen from '../screens/FeedStack/Feed/Feed';

export type NavigationParamList = {
  FEED: undefined;
};

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        drawerActiveBackgroundColor: primaryBlue,
        drawerPosition: 'right',
        header: () => {
          return <></>;
        }
      })}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="FEED"
        options={() => ({
          drawerItemStyle: { display: 'none' }
        })}
        component={FeedScreen} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigation
