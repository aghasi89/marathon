import { MessageResponse } from 'stream-chat';
import { ChatTypes } from '../costants';

export interface IChat {
    messages: MessageResponse[] | undefined;
}

export const initialState: IChat = {
    messages: []
};

const chatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ChatTypes.SET_MESSAGE:
            return {
                ...state,
                messages: action.payload,
            };
        default:
            return state;
    }
};
export default chatReducer;
