import { takeLatest, all, put } from 'redux-saga/effects';
import { IFeedPaymantInfo, IFeedPaymantSendInfo } from '../../types/types';
import finansicalEP from '../../services/api/routes/finansical';
import { IError } from '../../types/types';
import { FinansicalTypes } from '../costants';
import {
  setCurrencyTypes,
  setMyTransactions,
  setMyWallets,
  setMyWithdraws,
  setStripeBalance,
  setStripePayouts,
  setStripeTransfers,
  setWallet,
  setWithdrawMethods,
} from '../actions/finansical-action';
import { setError } from '../actions/administrative-action';

function* getFinances({ payload, cb }: any): Generator {
  try {
    const response: any = yield finansicalEP.getFinances(payload);
    if (response) {
      if (payload.index == 0) {
        yield put(setMyWallets(response));
      } else if (payload.index == 1) {
        yield put(setMyWithdraws(response));
      } else {
        yield put(setMyTransactions(response));
      }
      cb(response);
    }
  } catch (ex: any) { }
}
function* getFeedPaymantURL({
  payload,
  cb,
}: {
  payload: IFeedPaymantSendInfo;
  cb?: (paymantInfo: IFeedPaymantInfo) => void;
}): Generator {
  try {
    const response: any = yield finansicalEP.getFeedPaymantURL(payload);
    if (response) {
      cb && cb(response);
    }
  } catch (ex: any) { }
}

function* getCurrencyTypes({ payload, cb }: any): Generator {
  try {
    const response: any = yield finansicalEP.getCurrencyTypes();
    if (response) {
      yield put(setCurrencyTypes(response));
      cb && cb();
    }
  } catch (ex: any) { }
}

function* getWithdrawMethods({ id, payload, cb }: any): Generator {
  try {
    const response: any = yield finansicalEP.getRegionsWithdraw(id, payload);
    if (response) {
      if (response.length > 0) {
        yield put(setWithdrawMethods(response[0].methods));
      } else {
        yield put(setWithdrawMethods(response));
      }
      cb();
    }
  } catch (ex: any) { }
}

function* createWallet({ payload, cb }: any): Generator {
  try {
    const response: any = yield finansicalEP.createWallet(payload);
    if (response.status == '201') {
      cb();
    } else {
      const data: IError = {
        title: 'Something went wrong ...',
        text: response.message,
        buttonTitle: 'OK',
      };
      yield put(setError(data));
    }
  } catch (ex: any) { }
}

function* editWallet({ payload, walletId, cb }: any): Generator {
  try {
    const response: any = yield finansicalEP.editWallet(payload, walletId);
    if (response.status == '200') {
      cb();
    } else {
      const data: IError = {
        title: 'Something went wrong ...',
        text: response.message,
        buttonTitle: 'OK',
      };
      yield put(setError(data));
    }
  } catch (ex: any) { }
}

function* getWallet({ payload, cb }: any): Generator {
  try {
    const response: any = yield finansicalEP.getWallet(payload);
    if (response) {
      yield put(setWallet(response));
      cb();
    }
  } catch (ex: any) { }
}
function* createWidraw({ payload, cb }: any): Generator {
  try {
    const res: any = yield finansicalEP.createWidraw(payload);
    if (res.status == 201) {
      cb();
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* checkStripeKey({ payload, cb }: any): Generator {
  try {
    const res: any = yield finansicalEP.checkStripeMetodKey(payload);
    if (res) {
      cb('success', res);
    }
  } catch (ex) {
    cb('reject');
    console.log('exxxxxxxx', ex);
  }
}
function* getStripeRedirectUrl({ payload, cb }: any): Generator {
  try {
    const { redirect_url }: any = yield finansicalEP.getStripeRedirectUrl(
      payload,
    );
    if (redirect_url) {
      cb('success', redirect_url);
    }
  } catch (ex) {
    cb('reject');
    console.log('exxxxxxxx', ex);
  }
}
function delay(second: number) {
  return new Promise(r => {
    setTimeout(r, second * 1000);
  });
}
function* getLastStripe({ payload, cb }: any): Generator {
  try {
    while (true) {
      const res: any = yield finansicalEP.getLastStripe(payload);
      if (res.stripe_login_url) {
        cb('success', res);
        break;
      } else {
        yield delay(3);
      }
    }
  } catch (ex) {
    cb('reject');
    console.log('exxxxxxxx', ex);
  }
}
function* deleteStripeItem({ payload, cb }: any): Generator {
  try {
    const res: any = yield finansicalEP.deleteStripeItem(payload);
    cb('success');
  } catch (ex) {
    cb('reject');
    console.log('exxxxxxxx', ex);
  }
}
function* stripeDashboard({ payload, cb }: any): Generator {
  try {
    const res: any = yield finansicalEP.stripeDashboard(payload);
    if (res) {
      cb(res.url);
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getStripePayouts({ payload }: any): Generator {
  try {
    const res: any = yield finansicalEP.getStripePayouts(payload);
    if (res) {
      yield put(setStripePayouts(res));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getStripeBalance({ payload }: any): Generator {
  try {
    const res: any = yield finansicalEP.getStripeBalance(payload);
    if (res) {
      yield put(setStripeBalance(res));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getStripeTransfers({ payload }: any): Generator {
  try {
    const res: any = yield finansicalEP.getStripeTransfers(payload);
    if (res) {
      yield put(setStripeTransfers(res));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}

export function* watchFinansicalSaga() {
  yield all([
    takeLatest(FinansicalTypes.GET_FINANCES as any, getFinances),
    takeLatest(FinansicalTypes.GET_CURRENCY_TYPES as any, getCurrencyTypes),
    takeLatest(FinansicalTypes.GET_WITHDRAW_METHODS as any, getWithdrawMethods),
    takeLatest(FinansicalTypes.CREATE_WALLET as any, createWallet),
    takeLatest(FinansicalTypes.EDIT_WALLET as any, editWallet),
    takeLatest(FinansicalTypes.GET_FEED_PAYMANT_URL as any, getFeedPaymantURL),
    takeLatest(FinansicalTypes.GET_WALLET as any, getWallet),
    takeLatest(FinansicalTypes.CREATE_WITHDRAW as any, createWidraw),
    takeLatest(FinansicalTypes.CHECK_STRIPE_KEY as any, checkStripeKey),
    takeLatest(
      FinansicalTypes.GET_STRIPE_REDIRECT_URL as any,
      getStripeRedirectUrl,
    ),
    takeLatest(FinansicalTypes.GET_LAST_STRIPE as any, getLastStripe),
    takeLatest(FinansicalTypes.DELETE_STRIPE_ITEM as any, deleteStripeItem),
    takeLatest(FinansicalTypes.STRIPE_DASHBOARD as any, stripeDashboard),
    takeLatest(FinansicalTypes.GET_STRIPE_PAYOUTS as any, getStripePayouts),
    takeLatest(FinansicalTypes.GET_STRIPE_BALANCE as any, getStripeBalance),
    takeLatest(FinansicalTypes.GET_STRIPE_TRANSFERS as any, getStripeTransfers),
  ]);
}
