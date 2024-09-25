import { IReducer } from "../../types/types";

export const assistantChannelsSelector = (state: IReducer) => state.assistantReducer.assistantChannels;
export const assistantMessageListSelector = (state: IReducer) => state.assistantReducer.messageList;
export const assistantMessageCountSelector = (state: IReducer) => state.assistantReducer.messageCount;
export const assistantIdSelector = (state: IReducer) => state.assistantReducer.assistantChatId;
export const assistantTitleSelector = (state: IReducer) => state.assistantReducer.assistantTitle;
export const assistantActiveSelector = (state: IReducer) => state.assistantReducer.isAssistantActive;