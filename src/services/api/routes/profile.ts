import { Platform } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util'
import RestApi from '../RestApi';
import googleApi from '../googleInstance';
import mainApi from '../mainInstance';
import Keys from '../../Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import feedApi from '../feedInstance';
import { IUserFeeds } from '../../../types/types';

const UPLOAD_TIMEOUT = 2 * 60 * 1000;

class ProfileEP extends RestApi<any> {
  routeName = '';
  profileInfo = async () => {
    try {
      const res = await mainApi.get(`get-me/`);
      return res.data;
    } catch (ex: any) {
      throw ex.response.data
    }
  };
  personInfo = async (id: number) => {
    try {
      const res = await mainApi.get(`user-details/${id}/`);
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  personInfoByUsername = async (username: string) => {
    try {
      const res = await mainApi.post(`get-user-with-username/`, { username });
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  changeProfileInfo = async (id: number, data: any) => {
    try {
      const res = await mainApi.put(`user-details/${id}/`, data);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  changeEmail = async (email: string) => {
    try {
      const res = await mainApi.post(`change-email/`, { email: email });
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  changePassword = async (payload: any) => {
    try {
      const res = await mainApi.post(`change-password/`, payload);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  resetPassword = async (payload: any) => {
    try {
      const res = await mainApi.post(`check-forget-code/`, payload);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  setPassword = async (payload: any) => {
    try {
      const res = await mainApi.post(`set-password/`, payload);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getLocation = async (place_id: string) => {
    try {
      const res = await googleApi.get(`json?place_id=${place_id}&fields=name,formatted_address&key=AIzaSyBsoSy5YuvQDgZ7P-Ds_1IDS8OrPKp4gHY&language=en`);
      return res.data.results;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getLanguages = async () => {
    try {
      const res = await mainApi.get(`languages/`);
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getSpecialities = async () => {
    try {
      const res = await mainApi.get(`speciality/`);
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  setFiles = async (data: any) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const realPath =
          Platform.OS === 'ios'
            ? decodeURIComponent(data.path.replace('file://', ''))
            : data.path;
        const response = await ReactNativeBlobUtil.config({
          timeout: UPLOAD_TIMEOUT,
        }).fetch(
          'POST',
          `${Keys.API_URL}files/files/`,
          {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            'Content-Type': 'multipart/form-data',
          },
          [
            {
              name: 'file_url',
              filename: data.modificationDate,
              data: ReactNativeBlobUtil.wrap(realPath),
              type: data.mime,
              size: data.size,
            },
          ],
        );
        return JSON.parse(response.data)
      }
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getFeeds = async ({ filterBy, id, geo, params, showPrivate }: IUserFeeds) => {
    try {
      const res = await feedApi.get(`/all-feed/?&me=${id}${filterBy === 'feed' ? '' : `&type=` + filterBy}${showPrivate ? '&my=true' : ''}`, {
        params
      });
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getMyCreatedFeedsByStatus = async ({ filterBy, id }: IUserFeeds) => {
    try {
      console.log(filterBy, id);

      const res = await feedApi.get(`/get-coach-feed/${id}/?type=${filterBy}`);
      console.log(res.status);

      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getMyPurchases = async ({ params, page }: any) => {
    var newParams = new URLSearchParams();
    params.type.map((el: string) => {
      return newParams.append("type", el);
    })
    try {
      const res = await feedApi.get(`get-bought-feed/?page=${page}`, {
        params: newParams
      });
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  followUser = async (id: number) => {
    try {
      const res = await mainApi.post(`follow-or-unfollow/`, { whom_user: id });
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getFollowers = async (id: number) => {
    try {
      const res = await mainApi.get(`get-followers/${id}/`);
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getFollowings = async (id: number) => {
    try {
      const res = await mainApi.get(`get-followings/${id}/`);
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  searchUser = async (user: string) => {
    try {
      const res = await mainApi.get(`user-details/?search=${user}`);
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  generateMessage = async (payload: any) => {
    try {
      const res = await mainApi.post(`generate-message/`, payload);
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getRegions = async () => {
    try {
      const res = await mainApi.get(`geolocation/`);
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getUserWithStream = async (id: string) => {
    try {
      const res = await mainApi.post(`get-user-with-stream/`, {
        stream_id: id
      });
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  postCertificate = async (data: any) => {
    try {
      const res = await mainApi.post(`user-certificate/`, data);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  deleteCertificate = async (id: number) => {
    try {
      const res = await mainApi.delete(`user-certificate/${id}/`);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  editCertificate = async (data: any, id: number) => {
    try {
      const res = await mainApi.put(`certificates/${id}/`, data);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  setCoachPassword = async (payload: any) => {
    try {
      const res = await mainApi.post(`set-coach-password/?token=${payload.token}&verificated_email=${payload.email}&register=coach`, { password: payload.password });
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  }
}

const profileEP = new ProfileEP();

export default profileEP;
