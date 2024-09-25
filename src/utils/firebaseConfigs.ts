import messaging from '@react-native-firebase/messaging';
import { chatClient } from '../services/chatConfig';
import { initFirebaseNotification } from '../store/actions/registration-action';
import { IUser } from '../types/types';
 
export const registerDevice = async (dispatch: any, user: IUser) => {    
    try {
        const push_provider = 'firebase';
        // const apnToken = await messaging().getAPNSToken().then((response) => {
        //     console.log(response, "getaosn");
        // }).then((er)=>{
        //     console.log(er,"ijdijusijusikjdu");
            
        // })
        const token =await  messaging().getToken()
        console.log(token,"toenk");

        const payload = {
            token: token,
            user: user?.id
        }
        if (token) {
            dispatch(initFirebaseNotification(payload))
            const devices = (await chatClient.getDevices()).devices
            if (devices)
                for (let i = 0; i < devices.length; i++) {
                    const element = devices[i];
                    await chatClient.removeDevice(element.id);
                }
            await chatClient.addDevice(token, push_provider, chatClient.user?.id);
        }
    } catch (error) {
        console.log("error", error);
    }
};

