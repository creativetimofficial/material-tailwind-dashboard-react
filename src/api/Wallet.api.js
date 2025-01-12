import axiosClient from "@/api/axiosClient";
import { data } from "autoprefixer";

const WalletApi = {
  getWithdrawalRequests: (token,rest) => {
    const url = "/wallet/withdraw";
    console.log(token,rest)
    return axiosClient.post(url,rest, { headers: { token: token } });
  },
  getTransactionHistory: (token) => {
    const url = "/wallet/transactionHistory";
    return axiosClient.get(url, { headers: { token: token } });
  }
  ,
  getUserWithdrawalRequests: (token) => {
    const url = "/wallet/withdrawalRequests";
    return axiosClient.get(url, { headers: { token: token } });
  },
  getUserDepositRequests: (token) => {
    const url = "/wallet/depositRequests";
    return axiosClient.get(url, { headers: { token: token } });
  }
  ,
  getPendingAmount: (token) => {
    const url = "/wallet/pendingAmount";
    return axiosClient.get(url, { headers: { token: token } });
  }
  ,
  getUserWalletAnalysis: (token) => {
    const url = "/wallet/analysis";
    return axiosClient.get(url, { headers: { token: token } });
  },
  getAdminWalletAnalysis: (token) => {
    const url = "/wallet/adminAnalysis";
    return axiosClient.get(url, { headers: { token: token } });
  },
  getWallet: (token) => {
    const url = "/wallet/";
    return axiosClient.get(url, { headers: { token: token } });
  },
   walletAnalysisCharts: (token) => {
    const url = "/wallet/charts";
    return axiosClient.get(url, { headers: { token: token } });
  },
  adminWalletAnalysisCharts: (token) => {
    const url = "/wallet/adminCharts";
    return axiosClient.get(url, { headers: { token: token } });
  },
  
  adminWallets: (token) => {
    const url = "/wallet/admin/wallets";
    return axiosClient.get(url, { headers: { token: token } });
  },
  
  
  forceReleaseAllPendingBalances: (token) => {
    const url = "/wallet/force-release-all";
    return axiosClient.post(url, { headers: { token: token } });
  }
}

export default WalletApi;