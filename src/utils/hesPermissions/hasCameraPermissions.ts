import {Platform} from 'react-native';
import {
  PERMISSIONS,
  request,
} from 'react-native-permissions';

const getCameraPermission = async (cb?: (hasPermission: boolean) => void) => {
  if (Platform.OS === 'android') {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {        
      cb && cb(result === 'granted'||result==='limited');
    });
  }else{
    request(PERMISSIONS.IOS.CAMERA).then(result => {        
      cb && cb(result === 'granted'||result==='limited');
    });
  }
};
export default getCameraPermission;
