import {
  IAssistantChannelMessagesResultItem,
  IAssistantChannels,
  IAssistantPostImageMessagePayload,
  IAssistantPostMessagePayload,
  ICreateAssistantChannelPayload,
} from '../../types/types';
import {AssistantTypes} from '../costants';

export const getAssistantChannels = (userId: number) => {
  return {
    type: AssistantTypes.GET_ASSISTANT_CHANNELS,
    userId,
  };
};
export const setAssistantChatId = (payload: number | undefined) => {
  return {
    type: AssistantTypes.SET_ASSISTANT_CHAT_ID,
    payload,
  };
};
export const setAssistantChannels = (payload: IAssistantChannels[]) => {
  return {
    type: AssistantTypes.SET_ASSISTANT_CHANNELS,
    payload,
  };
};
export const getAssistantById = (
  assistantId: number,
  page: number,
  cb: () => void,
) => {
  return {
    type: AssistantTypes.GET_ASSISTANT_BY_ID,
    assistantId,
    page,
    cb,
  };
};
export const setAssistantById = (
  payload: IAssistantChannelMessagesResultItem[],
) => {
  return {
    type: AssistantTypes.SET_ASSISTANT_BY_ID,
    payload,
  };
};
export const setAssistantByIdCount = (
  payload: number | undefined,
  title: string,
) => {
  return {
    type: AssistantTypes.SET_ASSISTANT_BY_ID_COUNT,
    payload,
    title,
  };
};
export const deleteAssistantById = () => {
  return {
    type: AssistantTypes.DELETE_ASSISTANT_BY_ID,
  };
};
export const postAssistantMessage = ({
  assistantId,
  data,
  cb,
}: IAssistantPostMessagePayload) => {
  return {
    type: AssistantTypes.POST_ASSISTANT_MESSAGE,
    assistantId,
    data,
    cb,
  };
};
export const postAssistantImageMessage = ({
  assistantId,
  data,
  cb,
}: IAssistantPostImageMessagePayload) => {
  return {
    type: AssistantTypes.POST_ASSISTANT_IMAGE_MESSAGE,
    assistantId,
    data,
    cb,
  };
};
export const setPostAssistantMessage = (
  payload: IAssistantChannelMessagesResultItem[],
) => {
  return {
    type: AssistantTypes.SET_POST_ASSISTANT_MESSAGE,
    payload,
  };
};
export const createAssistantChannel = ({
  data,
  cb,
}: ICreateAssistantChannelPayload) => {
  return {
    type: AssistantTypes.CREATE_ASSISTANT_CHANNEL,
    data,
    cb,
  };
};
export const deleteAssistantChannelItem = (
  assistantId: number,
  cb?: () => void,
) => {
  return {
    type: AssistantTypes.DELETE_ASSISTANT_CHANNEL_ITEM,
    assistantId,
    cb,
  };
};
export const editAssistant = (id: number, title: string, cb: () => void) => {
  return {
    type: AssistantTypes.EDIT_ASSISTANT,
    id,
    title,
    cb,
  };
};
export const deleteAssistantMessage = (id: number[], cb?: () => void) => {
  return {
    type: AssistantTypes.DELETE_ASSISTANT_MESSAGE,
    id,
    cb
  };
};
export const setDeletedAssistantMessage = (payload: IAssistantChannelMessagesResultItem[]) => {
  return {
    type: AssistantTypes.SET_DELETE_ASSISTANT_MESSAGE,
    payload
  };
};
export const setAssistantActive = (payload: boolean) => {
  return {
    type: AssistantTypes.SET_ASSISTANT_ACTIVE,
    payload
  };
};