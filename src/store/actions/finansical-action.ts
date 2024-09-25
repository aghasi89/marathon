import { ICheckStripeResponseData, IRequestStatusType, IWallet, IWithdraw } from "../../types/types";
import { FinansicalTypes } from "../costants";
import { IFeedPaymantInfo, IFeedPaymantSendInfo } from '../../types/types';

export const getFinances = (payload: { name?: string, params?: any, index?: number, type?: string }, cb?: (responseData?: IWallet[]) => void) => {
  return {
    type: FinansicalTypes.GET_FINANCES,
    payload,
    cb,
  };
};

export const stripeDashboard = (payload: number, cb: (url: string) => void) => {
  return {
    type: FinansicalTypes.STRIPE_DASHBOARD,
    payload,
    cb,
  };
};

export const setMyWallets = (payload: any) => {
  return {
    type: FinansicalTypes.SET_MY_WALLETS,
    payload,
  };
};

export const setMyTransactions = (payload: any) => {
  return {
    type: FinansicalTypes.SET_MY_TRANSACTIONS,
    payload,
  };
};

export const setMyWithdraws = (payload: any) => {
  return {
    type: FinansicalTypes.SET_MY_WITHDRAWS,
    payload,
  };
};

export const getFeedPaymantURLAction = (
  payload: IFeedPaymantSendInfo,
  cb?: (paymantInfo: IFeedPaymantInfo) => void,
) => {
  return {
    type: FinansicalTypes.GET_FEED_PAYMANT_URL,
    payload,
    cb,
  };
};

export const getCurrencyTypes = (cb?: () => void) => {
  return {
    type: FinansicalTypes.GET_CURRENCY_TYPES,
    cb
  };
};

export const setCurrencyTypes = (payload: any) => {
  return {
    type: FinansicalTypes.SET_CURRENCY_TYPES,
    payload
  };
};

export const getWithdrawMethods = (id: number, payload: any, cb: () => void) => {
  return {
    type: FinansicalTypes.GET_WITHDRAW_METHODS,
    id,
    payload,
    cb
  };
};

export const setWithdrawMethods = (payload: any) => {
  return {
    type: FinansicalTypes.SET_WITHDRAW_METHODS,
    payload
  };
};

export const createWallet = (payload: any, cb: () => void) => {
  return {
    type: FinansicalTypes.CREATE_WALLET,
    payload,
    cb
  };
};

export const editWallet = (payload: any, walletId: number, cb: () => void) => {
  return {
    type: FinansicalTypes.EDIT_WALLET,
    payload,
    walletId,
    cb
  };
};

export const getWallet = (payload: number, cb: () => void) => {
  return {
    type: FinansicalTypes.GET_WALLET,
    payload,
    cb,
  };
};

export const setWallet = (payload: IWallet | undefined) => {
  return {
    type: FinansicalTypes.SET_WALLET,
    payload,
  };
};

export const createWidraw = (payload: IWithdraw, cb?: () => void) => {
  return {
    type: FinansicalTypes.CREATE_WITHDRAW,
    payload,
    cb
  };
};
export const checkStripeKeyAction = (payload: number, cb?: (status: IRequestStatusType, data: ICheckStripeResponseData[]) => void) => {
  return {
    type: FinansicalTypes.CHECK_STRIPE_KEY,
    payload,
    cb
  };
};
export const getStripeRedirectUrlAction = (payload: number, cb?: (status: IRequestStatusType, data: string) => void) => {
  return {
    type: FinansicalTypes.GET_STRIPE_REDIRECT_URL,
    payload,
    cb
  };
};
export const getLastStripeAction = (payload: number, cb?: (status: IRequestStatusType, data: ICheckStripeResponseData) => void) => {
  return {
    type: FinansicalTypes.GET_LAST_STRIPE,
    payload,
    cb
  };
};
export const getStripePayouts = (payload: number) => {
  return {
    type: FinansicalTypes.GET_STRIPE_PAYOUTS,
    payload,
  };
};
export const setStripePayouts = (payload: any) => {
  return {
    type: FinansicalTypes.SET_STRIPE_PAYOUTS,
    payload,
  };
};
export const getStripeBalance = (payload: number) => {
  return {
    type: FinansicalTypes.GET_STRIPE_BALANCE,
    payload,
  };
};
export const setStripeBalance = (payload: any) => {
  return {
    type: FinansicalTypes.SET_STRIPE_BALANCE,
    payload,
  };
};
export const getStripeTransfers = (payload: number) => {
  return {
    type: FinansicalTypes.GET_STRIPE_TRANSFERS,
    payload,
  };
};
export const setStripeTransfers = (payload: any) => {
  return {
    type: FinansicalTypes.SET_STRIPE_TRANSFERS,
    payload,
  };
};
export const deleteStripeItemAction = (payload: number, cb?: (status: IRequestStatusType) => void) => {
  return {
    type: FinansicalTypes.DELETE_STRIPE_ITEM,
    payload,
    cb
  };
};
