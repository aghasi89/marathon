import {
  IAssistantChannelMessagesResultItem,
  IAssistantChannels,
} from '../../types/types';
import {AssistantTypes} from '../costants';

export interface IAsssistant {
  assistantChannels: IAssistantChannels[];
  messageList: IAssistantChannelMessagesResultItem[];
  messageCount: number;
  assistantTitle: string;
  assistantChatId: number | undefined;
  isAssistantActive: boolean;
}

export const initialState: IAsssistant = {
  assistantChannels: [],
  messageList: [],
  messageCount: 0,
  assistantTitle: '',
  assistantChatId: undefined,
  isAssistantActive: false,
};

const assistantReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AssistantTypes.SET_ASSISTANT_ACTIVE:
      return {
        ...state,
        isAssistantActive: action.payload,
      };
    case AssistantTypes.SET_ASSISTANT_CHANNELS:
      return {
        ...state,
        assistantChannels: action.payload,
      };
    case AssistantTypes.SET_ASSISTANT_CHAT_ID:
      return {
        ...state,
        assistantChatId: action.payload,
      };
    case AssistantTypes.SET_ASSISTANT_BY_ID:
      return {
        ...state,
        messageList:
          state.messageList && action.payload
            ? [...state.messageList, ...action.payload]
            : state.messageList,
      };
    case AssistantTypes.SET_DELETE_ASSISTANT_MESSAGE:
      return {
        ...state,
        messageList: action.payload,
      };
    case AssistantTypes.SET_POST_ASSISTANT_MESSAGE:
      return {
        ...state,
        messageList:
          state.messageList && action.payload
            ? [...action.payload, ...state.messageList]
            : state.messageList,
      };
    case AssistantTypes.SET_ASSISTANT_BY_ID_COUNT:
      return {
        ...state,
        messageCount: action.payload ? action.payload : state.messageCount,
        assistantTitle: action.title,
      };
    case AssistantTypes.DELETE_ASSISTANT_BY_ID:
      return {
        ...state,
        messageList: [],
      };
    default:
      return state;
  }
};
export default assistantReducer;
