import { ICurrency, ITranstaction, IWallet, IWithdraw, IWithdrawMethod } from '../../types/types';
import { FinansicalTypes } from '../costants';

export interface IFinansical {
  //finances: undefined | IWallet[] | IWithdraw[] | ITranstaction[],
  myWallets: undefined | IWallet[],
  myTransactions: undefined | ITranstaction[],
  myWithdraws: undefined | IWithdraw[],
  currencyTypes: undefined | ICurrency[],
  withdrawMethods: undefined | IWithdrawMethod[],
  wallet: undefined | IWallet,
  stripePayouts: any,
  stripeBalance: any,
  stripeTransfers: any
}

export const initialState: IFinansical = {
  myWallets: undefined,
  myTransactions: undefined,
  myWithdraws: undefined,
  currencyTypes: undefined,
  withdrawMethods: undefined,
  wallet: undefined,
  stripePayouts: undefined,
  stripeBalance: undefined,
  stripeTransfers: undefined
};

const finansicalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FinansicalTypes.SET_MY_WALLETS:
      return {
        ...state,
        myWallets: action.payload,
      };
    case FinansicalTypes.SET_MY_WITHDRAWS:
      return {
        ...state,
        myWithdraws: action.payload,
      };
    case FinansicalTypes.SET_MY_TRANSACTIONS:
      return {
        ...state,
        myTransactions: action.payload,
      };
    case FinansicalTypes.SET_CURRENCY_TYPES:
      return {
        ...state,
        currencyTypes: action.payload,
      };
    case FinansicalTypes.SET_WITHDRAW_METHODS:
      return {
        ...state,
        withdrawMethods: action.payload,
      };
    case FinansicalTypes.SET_WALLET:
      return {
        ...state,
        wallet: action.payload,
      };
    case FinansicalTypes.SET_STRIPE_PAYOUTS:
      return {
        ...state,
        stripePayouts: action.payload,
      };
    case FinansicalTypes.SET_STRIPE_BALANCE:
      return {
        ...state,
        stripeBalance: action.payload,
      };
    case FinansicalTypes.SET_STRIPE_TRANSFERS:
      return {
        ...state,
        stripeTransfers: action.payload,
      };
    default:
      return state;
  }
};
export default finansicalReducer;
