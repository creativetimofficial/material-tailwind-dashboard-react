import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '@/ipconfig';

export function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);
  const [status, setStatus] = useState('NEW');
  const [type, setType] = useState('USER');
  const token = localStorage.getItem('token');

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BaseUrl}/admin-reports?status=${status}&type=${type}&page=${page}&limit=5`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReports(res.data.reports || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách báo cáo:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [page, status, type]);

  const handleApprove = async (reportId) => {
    try {
      await axios.post(
        `${BaseUrl}/admin-reports/${reportId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Đã duyệt thành công!');
      fetchReports();
    } catch (err) {
      console.error('Lỗi khi duyệt báo cáo:', err.response?.data || err);
      alert('Không thể duyệt báo cáo.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Danh sách báo cáo</h1>

      {/* Bộ lọc */}
      <div className="flex gap-4 mb-4">
        <select
          className="border rounded px-2 py-1"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="NEW">NEW</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
        <select
          className="border rounded px-2 py-1"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="USER">USER</option>
          <option value="POST">POST</option>
        </select>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : reports.length === 0 ? (
        <p>Không có báo cáo nào.</p>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="p-3 border rounded bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>ID:</strong> {report.id}</p>
                  <p><strong>Loại:</strong> {report.type}</p>
                  <p><strong>Lý do:</strong> {report.reason}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Xem chi tiết
                  </button>
                  {report.status === 'NEW' && (
                    <button
                      onClick={() => handleApprove(report.id)}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                      Duyệt
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Phân trang */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Trước
        </button>
        <span className="px-3 py-1">{page} / {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>

      {/* Modal chi tiết */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-4 w-96">
            <h2 className="font-semibold text-lg mb-2">Chi tiết báo cáo</h2>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-60">
              {JSON.stringify(selectedReport, null, 2)}
            </pre>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
