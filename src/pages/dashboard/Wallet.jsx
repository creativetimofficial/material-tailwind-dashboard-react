import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, Wallet } from 'lucide-react';
import WalletApi from '@/api/Wallet.api';
import { useAuth } from '@/hooks/Auth';
import { useSnackbar } from '@/hooks/SnackBar';

const WithdrawalModal = ({ isOpen, onClose, withdrawalMethod, setWithdrawalMethod, withdrawalData, handleInputChange, handleSubmitWithdrawal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Withdraw Funds</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setWithdrawalMethod('bank')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                withdrawalMethod === 'bank' ? 'bg-[#212121] text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Bank Transfer
            </button>
            <button
              onClick={() => setWithdrawalMethod('crypto')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                withdrawalMethod === 'crypto' ? 'bg-[#212121] text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Cryptocurrency
            </button>
          </div>

          {withdrawalMethod === 'bank' ? (
            <div className="space-y-3">
              <input
                type="text"
                name="accountName"
                placeholder="Account Name"
                value={withdrawalData.accountName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121]"
              />
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={withdrawalData.accountNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121]"
              />
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={withdrawalData.bankName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121]"
              />
              <input
                type="text"
                name="bankBranch"
                placeholder="Bank Branch"
                value={withdrawalData.bankBranch}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121]"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                name="walletAddress"
                placeholder="Wallet Address"
                value={withdrawalData.walletAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121]"
              />
              <input
                type="text"
                name="network"
                placeholder="Network"
                value={withdrawalData.network}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121]"
              />
            </div>
          )}

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={withdrawalData.amount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121]"
          />
          <input
            type="text"
            name="note"
            placeholder="Note"
            value={withdrawalData.note}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#212121]"
          />

          <button
            onClick={handleSubmitWithdrawal}
            className="w-full py-2 px-4 bg-[#212121] text-white rounded-lg hover:bg-[#191919] transition-colors"
          >
            Submit Withdrawal Request
          </button>
        </div>
      </div>
    </div>
  );
};

const WalletDashboard = () => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank');
  const { openSnackbar } = useSnackbar()
  const [withdrawalData, setWithdrawalData] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    bankBranch: '',
    walletAddress: '',
    network: '',
    amount: '',
    note: '',
  });
  const [activeTab, setActiveTab] = useState('history');
  const [wallet, setWallet] = useState(null);
  const { auth } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWithdrawalData((prev) => ({ ...prev, [name]: value }));
  };

  async function getData() {
    const api = await WalletApi.getWallet(auth);
    setWallet(api?.data?.wallet);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleSubmitWithdrawal = async () => {
    const { amount, note, accountName, accountNumber, bankName, bankBranch, walletAddress, network } = withdrawalData;

    if (!amount) {
      openSnackbar('Please enter an amount.', {
                    type: "error",
                    duration: 4000,
                });
      return;
    }

    const payload = {
      amount,
      note,
      method: withdrawalMethod,
    };

    if (withdrawalMethod === 'bank') {
      if (!accountName || !accountNumber || !bankName) {
        openSnackbar('Please fill in all required bank information.', {
                    type: "error",
                    duration: 4000,
                });
        return;
      }
      payload.bankInfo = { accountName, accountNumber, bankName, bankBranch };
    } else if (withdrawalMethod === 'crypto') {
      if (!walletAddress || !network) {
        // alert('Please fill in all required cryptocurrency information.');
         openSnackbar('Please fill in all required cryptocurrency information.', {
                    type: "error",
                    duration: 4000,
                });
        return;
      }
      payload.cryptoInfo = { walletAddress, network };
    }

    try {
      const response = await WalletApi.getWithdrawalRequests(auth, payload);
      if (response.data.message) {

        openSnackbar(response.data.message, {
                    type: "success",
                    duration: 4000,
                });
        setIsWithdrawOpen(false);
        getData(); // Refresh wallet data
      } else {
         openSnackbar(response.data.error || 'An error occurred', {
                    type: "error",
                    duration: 4000,
                });
      }
    } catch (error) {
      console.error(error);
      openSnackbar('Failed to process withdrawal request.', {
                    type: "error",
                    duration: 4000,
                });
    }
  };

  if (!wallet) return <div>Loading wallet...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Balance</h3>
            <Wallet className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold">${wallet.balance.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-600">Available Balance</h3>
            <ArrowUpRight className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold">${wallet.availableBalance.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-600">Pending Balance</h3>
            <Clock className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold">
            ${wallet.pendingBalance.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Wallet Overview</h2>
          <button
            onClick={() => setIsWithdrawOpen(true)}
            className="px-4 py-2 bg-[#212121] text-white rounded-lg hover:bg-[#191919] transition-colors"
          >
            Withdraw Funds
          </button>
        </div>

        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'pending' ? 'bg-[#212121] text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Pending Balance
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'history' ? 'bg-[#212121] text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Transaction History
            </button>
          </div>

          {activeTab === 'pending' && (
            <div className="space-y-4">
              {wallet.pendingBalance.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">${item.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Release Date</p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.nextReleaseDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {wallet.transactions.map((transaction, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      {transaction.type === 'deposit' ? (
                        <ArrowDownRight className="h-8 w-8 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-8 w-8 text-[#212121]" />
                      )}
                      <div>
                        <p className="font-medium">
                          {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.note}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <WithdrawalModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        withdrawalMethod={withdrawalMethod}
        setWithdrawalMethod={setWithdrawalMethod}
        withdrawalData={withdrawalData}
        handleInputChange={handleInputChange}
        handleSubmitWithdrawal={handleSubmitWithdrawal}
      />
    </div>
  );
};

export default WalletDashboard;
