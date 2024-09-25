import { IAddedMember } from '../../types/types';
import { ChatTypes } from '../costants';

export const setChatMessages = (payload: any) => {
    return {
        type: ChatTypes.SET_MESSAGE,
        payload,
    };
};
export const sendAddMembersNotification = (payload: IAddedMember) => {
    return {
        type: ChatTypes.SEND_ADD_MEMBER_NOTIFICATION,
        payload,
    };
};
