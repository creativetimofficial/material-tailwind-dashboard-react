import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  CheckCircle2,
  XCircle,
  CircleX
} from 'lucide-react';
import WalletApi from '@/api/Wallet.api';
import { useAuth } from '@/hooks/Auth';

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
 const {auth} = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await WalletApi.adminWallets(auth);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <AdminWalletDashboard
      stats={dashboardData.dashboardStats}
      transactions={dashboardData.transactions}
      pieChartData={dashboardData.pieChartData}
    />
  );
};

export default AdminDashboardPage;

const AdminWalletDashboard = ({ stats, transactions, pieChartData }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [transactionData, setTransactionData] = useState(transactions);
  const {auth} = useAuth()
  const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    approved: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    rejected: 'bg-red-100 text-gray-800',
  };

  const TYPE_COLORS = {
    deposit: 'text-green-600',
    withdrawal: 'text-red-600',
  };

  const getStatusBadge = (status) => {
    return <span className={`px-2 py-1 text-xs rounded ${STATUS_COLORS[status]}`}>{status.toUpperCase()}</span>;
  };

  const handleApproveTransaction = async (transactionId) => {
    try {
      await axios.patch(`https://sea-turtle-app-rwcjs.ondigitalocean.app/api/v1/wallet/admin/wallets/transactions/${transactionId}/approve`,{},{headers:{token:auth}});
      setTransactionData((prev) =>
        prev.map((transaction) =>
          transaction.id === transactionId
            ? { ...transaction, status: 'completed' }
            : transaction
        )
      );
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error approving transaction:', error);
      alert('Failed to approve transaction.');
    }
  };

  const handleRejectTransaction = async (transactionId) => {
    try {
      await axios.patch(`https://sea-turtle-app-rwcjs.ondigitalocean.app/api/v1/wallet/admin/wallets/transactions/${transactionId}/reject`,{},{headers:{token:auth}});
      setTransactionData((prev) =>
        prev.map((transaction) =>
          transaction.id === transactionId
            ? { ...transaction, status: 'rejected' }
            : transaction
        )
      );
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error rejecting transaction:', error);
      alert('Failed to reject transaction.');
    }
  };

  const filteredTransactions = transactionData.filter((transaction) => {
    const matchesSearch =
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center pb-2">
              <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Transaction Management</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by user name or ID..."
              className="pl-8 pr-4 py-2 border rounded w-full focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Completed</option>
            <option value="failed">Failed</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="withdrawal">Withdrawals</option>
            <option value="deposit">Deposits</option>
          </select>
        </div>
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedTransaction(transaction)}
            >
              <div className="flex items-center space-x-4">
                {transaction.type === 'deposit' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <div>
                  <div className="font-medium">{transaction.userName}</div>
                  <div className="text-sm text-gray-500">{transaction.userId}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`font-medium ${TYPE_COLORS[transaction.type]}`}
                >
                  ${transaction.amount.toFixed(2)}
                </span>
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <div
              onClick={() => setSelectedTransaction(null)}
              className="text-black mb-10 pointer-events-auto cursor-pointer hover:text-red-600"
            >
              {<CircleX />}
            </div>
            <h3 className="text-lg font-medium mb-4">Transaction Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium">User Name:</div>
                <div>{selectedTransaction.userName}</div>
                <div className="text-sm font-medium">User ID:</div>
                <div>{selectedTransaction.userId}</div>
                <div className="text-sm font-medium">Type:</div>
                <div className="capitalize">{selectedTransaction.type}</div>
                <div className="text-sm font-medium">Method:</div>
                <div className="capitalize">{selectedTransaction.method}</div>
                <div className="text-sm font-medium">Amount:</div>
                <div>${selectedTransaction.amount.toFixed(2)}</div>
                <div className="text-sm font-medium">Status:</div>
                <div>{getStatusBadge(selectedTransaction.status)}</div>
                <div className="text-sm font-medium">Date:</div>
                <div>{selectedTransaction.date}</div>
                {selectedTransaction.accountDetails && (
                  <div className="border-t pt-4 w-full">
                    <h4 className="font-medium mb-2">Account Details</h4>
                    {Object.entries(selectedTransaction.accountDetails).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-4">
                        <div className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</div>
                        <div>{value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedTransaction.status === 'pending' && (
                <div className="border-t pt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleRejectTransaction(selectedTransaction.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    <XCircle className="mr-2 h-4 w-4 inline" /> Reject
                  </button>
                  <button
                    onClick={() => handleApproveTransaction(selectedTransaction.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4 inline" /> Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
