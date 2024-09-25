import {Platform} from 'react-native';
import {
  PERMISSIONS,
  request,
  requestMultiple,
} from 'react-native-permissions';

const getLibraryPermission = async (cb?: (hasPermission:boolean) => void) => {
  if (Platform.OS === 'android') {
    if (Platform.Version > 32) {
      requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]).then(result => {
      const status = result['android.permission.READ_MEDIA_IMAGES'] === 'granted'&&
          result['android.permission.READ_MEDIA_VIDEO'] === 'granted' 
          cb&&cb(status)
      });
    } else if (Platform.Version <= 32) {
      request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(res => {
        cb&&cb(res ==='granted')
      });
    }
  }else{
    await request(PERMISSIONS.IOS.MEDIA_LIBRARY).then(res => {            
      cb&&cb(res ==='granted'|| res ==='unavailable')
      });
    
  }
};
export default getLibraryPermission;
