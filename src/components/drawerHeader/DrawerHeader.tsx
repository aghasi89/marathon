import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icons from '../../assets/icons/svg/index'
import styles from './DrawerHeader.style'
import { useSelector } from 'react-redux';
import { profileSelector } from '../../store/selectors/profile-selector';
import { unseenNotificationsCountSelector } from '../../store/selectors/notifications-selector';

interface IProps {
  navigation: any
}

const DrawerHeader: React.FC<IProps> = (props) => {

  const { navigation } = props
  const user = useSelector(profileSelector);
  const count = useSelector(unseenNotificationsCountSelector)

  return (
    <View style={[styles.container]}>
      <View style={styles.row}>
        <Icons.Marathon {...styles.logoIcon} />
      </View>
      <View style={styles.row}>
        {
          user && <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('NOTIFICATIONS')}>
            {
              count > 0 ? <Icons.UnseenNotifications /> : <Icons.Notifications />
            }
          </TouchableOpacity>
        }
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <Icons.DrawerMenu />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DrawerHeader;

