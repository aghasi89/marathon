import { IReducer } from "../../types/types";

export const myWalletsSelector = (state: IReducer) => state.finansicalReducer.myWallets;
export const myWithdrawsSelector = (state: IReducer) => state.finansicalReducer.myWithdraws;
export const myTransactionsSelector = (state: IReducer) => state.finansicalReducer.myTransactions;
export const currencyTypesSelector = (state: IReducer) => state.finansicalReducer.currencyTypes;
export const withdrawMethodsSelector = (state: IReducer) => state.finansicalReducer.withdrawMethods;
export const walletSelector = (state: IReducer) => state.finansicalReducer.wallet;
export const stripePayoutsSelector = (state: IReducer) => state.finansicalReducer.stripePayouts;
export const stripeBalanceSelector = (state: IReducer) => state.finansicalReducer.stripeBalance;
export const stripeTransfersSelector = (state: IReducer) => state.finansicalReducer.stripeTransfers;