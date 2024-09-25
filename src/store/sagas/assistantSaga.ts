import {all, put, select, takeLatest} from 'redux-saga/effects';
import {AssistantTypes} from '../costants';
import assistantEP from '../../services/api/routes/assistant';
import {
  setAssistantById,
  setAssistantByIdCount,
  setAssistantChannels,
  setAssistantChatId,
  setDeletedAssistantMessage,
  setPostAssistantMessage,
} from '../actions/assistant-actions';
import {
  IAssistantChannelMessagesResultItem,
  IAssistantChannels,
  IAssistantPostImageMessagePayload,
  IAssistantPostMessagePayload,
  ICreateAssistantChannelPayload,
} from '../../types/types';
import {
  assistantChannelsSelector,
  assistantMessageCountSelector,
  assistantMessageListSelector,
  assistantTitleSelector,
} from '../selectors/assistant-selector';

function* getAssistantChannelGen({userId}: any): Generator {
  try {
    const response: any = yield assistantEP.getAssistant(userId);
    if (response) {
      yield put(setAssistantChannels(response));
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* getAssistantByIdGen({assistantId, page, cb}: any): Generator {
  try {
    const response: any = yield assistantEP.getAssistantById(assistantId, page);
    if (response) {
      yield put(setAssistantByIdCount(response.messages.count, response.title));
      yield put(setAssistantById(response.messages.results));
      cb && cb();
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* postAssistantMessageGen({
  assistantId,
  data,
  cb,
}: IAssistantPostMessagePayload): Generator {
  try {
    const response: any = yield assistantEP.postAssistantMessage(
      assistantId,
      data,
    );
    if (response) {
      yield put(
        setPostAssistantMessage([
          response.messages.results[0],
          response.messages.results[1],
        ]),
      );
      cb && cb();
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* postAssistantImageMessageGen({
  assistantId,
  data,
  cb,
}: IAssistantPostImageMessagePayload): Generator {
  try {
    const response: any = yield assistantEP.postAssistantImageMessage(
      assistantId,
      data,
    );
    if (response) {
      yield put(
        setPostAssistantMessage([
          response.messages.results[0],
          response.messages.results[1],
        ]),
      );
      cb && cb();
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* createAssistantChannelGen({
  data,
  cb,
}: ICreateAssistantChannelPayload): Generator {
  try {
    const response: any = yield assistantEP.createAssistantChannel(data);
    if (response) {
      yield put(setAssistantByIdCount(undefined, response.title));
      yield put(setAssistantById(response.messages.results));
      yield put(setAssistantChatId(response.id));
      cb && cb();
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* deleteAssistantChannelGen({assistantId, cb}: any): Generator {
  try {
    const response: any = yield assistantEP.deleteAssistantChannelItem(
      assistantId,
    );
    if (response.status == '204') {
      const assistantChannels = yield select(assistantChannelsSelector);
      const newList: IAssistantChannels[] = [
        ...(assistantChannels as IAssistantChannels[]),
      ];
      const deletedItemIndex = newList.findIndex(el => el.id === assistantId);
      if (deletedItemIndex > -1) {
        newList.splice(deletedItemIndex, 1);
        yield put(setAssistantChannels(newList));
      }
      cb && cb();
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* deleteAssistantMessageGen({id, cb}: any): Generator {
  try {
    const response: any = yield assistantEP.deleteAssistantMessage(id);
    console.log(response ,"RESPONSEE4564565645");
    
    if (response.status == '200') { 
      const assistantMessages = yield select(assistantMessageListSelector);
      const assistantMessagesCount = yield select(assistantMessageCountSelector);
      const assistantMessagesTitle = yield select(assistantTitleSelector);
      const newList: IAssistantChannelMessagesResultItem[] = [
        ...(assistantMessages as IAssistantChannelMessagesResultItem[]),
      ];
      id?.map((item: number) => {
        const deletedItemIndex = newList.findIndex(el => el.id === item);
        if (deletedItemIndex > -1) {
          newList.splice(deletedItemIndex, 1);
        }
      });      
      yield put(
        setAssistantByIdCount(
          (assistantMessagesCount as number) - 2,
          assistantMessagesTitle as string,
        ),
      );
      yield put(setDeletedAssistantMessage(newList));
      cb && cb();
    };
  } catch (error: any) {
    console.log(error);
  }
}

function* editAssistantGen({id, title, cb}: any): Generator {
  try {
    const response: any = yield assistantEP.editAssistant(id, title);
    if (response.status == '201') {
      cb && cb();
    }
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchAssistantSaga() {
  yield takeLatest(
    AssistantTypes.GET_ASSISTANT_CHANNELS as any,
    getAssistantChannelGen,
  ),
    yield takeLatest(
      AssistantTypes.GET_ASSISTANT_BY_ID as any,
      getAssistantByIdGen,
    ),
    yield takeLatest(
      AssistantTypes.POST_ASSISTANT_MESSAGE as any,
      postAssistantMessageGen,
    ),
    yield takeLatest(
      AssistantTypes.POST_ASSISTANT_IMAGE_MESSAGE as any,
      postAssistantImageMessageGen,
    )
    yield takeLatest(
      AssistantTypes.CREATE_ASSISTANT_CHANNEL as any,
      createAssistantChannelGen,
    ),
    yield takeLatest(
      AssistantTypes.DELETE_ASSISTANT_CHANNEL_ITEM as any,
      deleteAssistantChannelGen,
    ),
    yield takeLatest(AssistantTypes.EDIT_ASSISTANT as any, editAssistantGen);
  yield takeLatest(
    AssistantTypes.DELETE_ASSISTANT_MESSAGE as any,
    deleteAssistantMessageGen,
  );
}
