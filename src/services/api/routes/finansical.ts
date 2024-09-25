import { IFeedPaymantSendInfo, IWithdraw } from '../../../types/types';
import Keys from '../../Keys';
import RestApi from '../RestApi';
import finansicalApi from '../finansicalInstance';

class FinansicalEP extends RestApi<any> {
  routeName = '';
  getFinances = async (payload: any) => {
    try {
      const res = await finansicalApi.get(`${payload.name}`, {
        params: payload.params
      });
      return res.data;
    } catch (ex: any) {
      console.log(ex);
    }
  };
  getCurrencyTypes = async () => {
    try {
      const res = await finansicalApi.get(`currency-type/`);
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getWithdrawMethods = async (id: number) => {
    try {
      const res = await finansicalApi.get(`withdraw-method/?currency_type=${id}`);
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  createWallet = async (payload: any) => {
    try {
      const res = await finansicalApi.post(`user-wallet/`, payload);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  editWallet = async (payload: any, walletId: number) => {
    try {
      const res = await finansicalApi.put(`user-wallet/${walletId}/`, payload);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getFeedPaymantURL = async (feedInfo: IFeedPaymantSendInfo) => {
    try {
      const res = await finansicalApi.post(`pay/`, feedInfo);
      return res.data;
    } catch (ex: any) {
      console.log(ex);
    }
  };
  getWallet = async (id: number) => {
    try {
      const res = await finansicalApi.get(`user-wallet/${id}/`);
      return res.data;
    } catch (ex: any) {
      console.log(ex);
    }
  };
  createWidraw = async (data: IWithdraw) => {
    try {
      const res = await finansicalApi.post(`withdraw/`, data);
      return res
    } catch (ex: any) {
      return ex.response.data
    }
  };
  checkStripeMetodKey = async (userId: number) => {
    try {
      const res = await finansicalApi.get(`user-stripe/${userId}/`);
      return res.data
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getStripeRedirectUrl = async (currencyId: number) => {
    try {
      const res = await finansicalApi.get(`stripe-login/?currency=${currencyId}`);
      return res.data
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getLastStripe = async (currencyId: number) => {
    try {
      const res = await finansicalApi.get(`get-last-stripe/${currencyId}/`);
      return res.data
    } catch (ex: any) {
      throw ex.response.data
    }
  };
  deleteStripeItem = async (id: number) => {
    try {
      const res = await finansicalApi.delete(`user-stripe/${id}/`);
      return res.data
    } catch (ex: any) {
      return ex.response.data
    }
  };
  stripeDashboard = async (id: number) => {
    try {
      const res = await finansicalApi.get(`stripe-dashboard/${id}/`);
      return res.data
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getStripePayouts = async (id: number) => {
    try {
      const res = await finansicalApi.get(`get-stripe-payouts/${id}/`);
      return res.data
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getStripeBalance = async (id: number) => {
    try {
      const res = await finansicalApi.get(`get-stripe-balance/${id}/`);
      return res.data
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getStripeTransfers = async (id: number) => {
    try {
      const res = await finansicalApi.get(`get-stripe-transfers/${id}/`);
      return res.data.data
    } catch (ex: any) {
      return ex.response.data
    }
  };
  getRegionsWithdraw = async (id: number, payload: any) => {
    try {
      const res = await finansicalApi.post(`regions-withdraw/?currency_type=${id}`, payload);
      return res.data
    } catch (ex: any) {
      return ex.response.data
    }
  };
}

const finansicalEP = new FinansicalEP();

export default finansicalEP;
