import authApi from '../mainInstance';
import { IMarathons } from '../../../types/types';
import Window from '../../../server/server';

Window;
class Group {
  getGroupCategories = async () => {
    try {
      const res = await authApi.get('/marathonGroup/categories');
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
  getMarathonGroupTags = async () => {
    try {
      const res = await authApi.get('/marathonGroup/tags');
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
  createGroup = async (requestBody: IMarathons) => {
    try {
      const res = await authApi.post('/marathonGroup', requestBody);
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
  getGroups = async () => {
    try {
      const res = await authApi.get('/marathonGroups');
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
  deleteGroup = async (id: number) => {
    try {
      const res = await authApi.delete(`/marathonGroups/${id}`);
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
  getGroupById = async (id: number) => {
    try {
      const res = await authApi.get(`/marathonGroups/${id}`);
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
  changeGroup = async (requestBody: IMarathons, id: number) => {
    try {
      const res = await authApi.patch(`/marathonGroups/${id}`, requestBody);
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
  getClients = async () => {
    try {
      const res = await authApi.get('/clients');
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
  getLeads = async () => {
    try {
      const res = await authApi.get('/leads');
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
  getInviteGroups = async () => {
    try {
      const res = await authApi.get('/groups');
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
  getNotifications = async () => {
    try {
      const res = await authApi.get('/notifications');
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
  getPayments = async () => {
    try {
      const res = await authApi.get('/payments');
      return res.data;
    } catch (ex) {
      throw ex.response.data;
    }
  };
}

const marathonGroups = new Group();
export default marathonGroups;
