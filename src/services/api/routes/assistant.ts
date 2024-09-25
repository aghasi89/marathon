import { IAssistantPostImageMessagePayloadData, IAssistantPostMessagePayloadData } from "../../../types/types";
import mainApi from "../mainInstance";

class AssistantEP {
    getAssistant = async (id:number) => {
        try {
          const res = await mainApi.get(`topic/?user=${id}`);
          return res.data;
        } catch (ex: any) {
          return ex.response.data
        }
      };
      getAssistantById = async (id:number, page:number) => {
        try {
          const res = await mainApi.get(`topic/${id}/?&page=${page}`);
          return res.data;
        } catch (ex: any) {
          return ex.response.data
        }
      };
      postAssistantMessage = async (id:number | undefined,data: IAssistantPostMessagePayloadData) => {
        try {
          const res = await mainApi.post(`/send-message-topic/${id}/`, data);
          return res.data;
        } catch (ex: any) {
          return ex.response.data
        }
      };
      postAssistantImageMessage = async (id:number | undefined,data: IAssistantPostImageMessagePayloadData) => {
        try {
          const res = await mainApi.post(`/send-file-topic/${id}/`, data);
          return res.data;
        } catch (ex: any) {
          return ex.response.data
        }
      };
      createAssistantChannel = async (data: IAssistantPostMessagePayloadData) => {
        try {
          const res = await mainApi.post(`/create-threads/`, data);
          return res.data;
        } catch (ex: any) {
          return ex.response.data
        }
      };
      deleteAssistantChannelItem = async (id:number) => {
        try {
          const res = await mainApi.delete(`/topic/${id}/`);
          return res;
        } catch (ex: any) {
          return ex.response.data
        }
      };
      editAssistant = async (id:number, title: string) => {
        try {
          const res = await mainApi.put(`/topic/${id}/`, {title});
          return res;
        } catch (ex: any) {
          return ex.response.data
        }
      };
      deleteAssistantMessage = async (id:number[]) => {
        try {
          const res = await mainApi.post(`delete-messages/`, {messages: id});
          return res;
        } catch (ex: any) {
          return ex.response.data
        }
      };
};
const assistantEP = new AssistantEP();
export default assistantEP;