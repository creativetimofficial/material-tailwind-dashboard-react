import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "@/api/axiosConfig";

const months = [
  { value: "1", label: "Ocak" },
  { value: "2", label: "Şubat" },
  { value: "3", label: "Mart" },
  { value: "4", label: "Nisan" },
  { value: "5", label: "Mayıs" },
  { value: "6", label: "Haziran" },
  { value: "7", label: "Temmuz" },
  { value: "8", label: "Ağustos" },
  { value: "9", label: "Eylül" },
  { value: "10", label: "Ekim" },
  { value: "11", label: "Kasım" },
  { value: "12", label: "Aralık" },
];

const currentDate = new Date();

const selectMenuProps = {
  className: "z-[9999] max-h-72",
};

const money = (value) =>
  Number(value || 0).toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  });

const dateText = (value) =>
  value
    ? new Date(value).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "-";

const getApiError = (error, fallback) => {
  const data = error?.response?.data;
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (data.message) return data.message;
  if (data.title) return data.title;
  return fallback;
};

export function MyAccounting() {
  const [periodMonth, setPeriodMonth] = useState(String(currentDate.getMonth() + 1));
  const [periodYear, setPeriodYear] = useState(String(currentDate.getFullYear()));
  const [sort, setSort] = useState("asc");
  const [ledger, setLedger] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLedger = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        periodMonth,
        periodYear,
        sort,
      });
      const response = await apiClient.get(`/accounting/my-ledger?${params.toString()}`);
      setLedger(response.data);
    } catch (err) {
      setLedger(null);
      const message = getApiError(err, "Cari hareketleriniz yüklenemedi.");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, [periodMonth, periodYear, sort]);

  const toggleSort = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const transactions = ledger?.transactions || [];

  return (
    <>
      <ToastContainer />
      <div className="mt-12 mb-8 flex flex-col gap-8">
        <Card className="overflow-visible">
          <CardHeader
            variant="gradient"
            color="gray"
            className="relative z-40 mb-4 flex flex-col gap-4 overflow-visible p-6 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <Typography variant="h6" color="white">
                Cari Hesap Ekstrem
              </Typography>
              <Typography variant="small" color="white" className="font-normal opacity-70">
                Seçtiğiniz döneme ait alacak, borç ve bakiye hareketleri
              </Typography>
            </div>
            <div className="grid w-full gap-3 rounded-lg bg-white p-3 shadow-sm md:w-auto md:grid-cols-[180px_140px_auto]">
              <Select label="Ay" value={periodMonth} onChange={(val) => setPeriodMonth(val)} menuProps={selectMenuProps}>
                {months.map((month) => (
                  <Option key={month.value} value={month.value}>
                    {month.label}
                  </Option>
                ))}
              </Select>
              <Input label="Yıl" type="number" value={periodYear} onChange={(e) => setPeriodYear(e.target.value)} />
              <Button size="sm" color="white" variant="text" className="flex items-center justify-center gap-2" onClick={toggleSort}>
                <ArrowPathIcon className="h-4 w-4" />
                {sort === "asc" ? "Eski → Yeni" : "Yeni → Eski"}
              </Button>
            </div>
          </CardHeader>
          <CardBody className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-blue-gray-50 p-4">
              <Typography variant="small" className="font-bold uppercase text-blue-gray-400">
                Dönem Başı Devir
              </Typography>
              <Typography className="font-semibold text-blue-gray-700">{money(ledger?.openingBalance)}</Typography>
            </div>
            <div className="rounded-lg border border-blue-gray-50 p-4">
              <Typography variant="small" className="font-bold uppercase text-blue-gray-400">
                Toplam Alacak
              </Typography>
              <Typography className="font-semibold text-green-700">{money(ledger?.totalCredit)}</Typography>
            </div>
            <div className="rounded-lg border border-blue-gray-50 p-4">
              <Typography variant="small" className="font-bold uppercase text-blue-gray-400">
                Toplam Borç
              </Typography>
              <Typography className="font-semibold text-red-700">{money(ledger?.totalDebit)}</Typography>
            </div>
            <div className="rounded-lg border border-blue-gray-50 p-4">
              <Typography variant="small" className="font-bold uppercase text-blue-gray-400">
                Dönem Sonu Bakiye
              </Typography>
              <Typography className={`font-semibold ${(ledger?.closingBalance || 0) >= 0 ? "text-green-700" : "text-red-700"}`}>
                {money(ledger?.closingBalance)}
              </Typography>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-4 p-6">
            <Typography variant="h6" color="white">
              Cari Hareketlerim
            </Typography>
          </CardHeader>
          <CardBody className="px-0 pt-0 pb-2">
            {loading ? (
              <div className="flex justify-center p-10">
                <Spinner className="h-10 w-10" />
              </div>
            ) : error ? (
              <Typography color="red" className="p-6 text-center">{error}</Typography>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[840px] table-auto">
                  <thead>
                    <tr>
                      {["Tarih", "Açıklama", "Alacak", "Borç", "Bakiye"].map((head) => (
                        <th key={head} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                          <Typography variant="small" className="font-bold uppercase text-blue-gray-400">
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-blue-gray-50/40">
                      <td className="border-b border-blue-gray-50 py-3 px-5 font-semibold text-blue-gray-700">Önceki dönem</td>
                      <td className="border-b border-blue-gray-50 py-3 px-5">Devir</td>
                      <td className="border-b border-blue-gray-50 py-3 px-5" />
                      <td className="border-b border-blue-gray-50 py-3 px-5" />
                      <td className="border-b border-blue-gray-50 py-3 px-5 font-semibold">{money(ledger?.openingBalance)}</td>
                    </tr>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-blue-gray-50/50">
                        <td className="border-b border-blue-gray-50 py-3 px-5">{dateText(transaction.date)}</td>
                        <td className="border-b border-blue-gray-50 py-3 px-5">{transaction.description}</td>
                        <td className="border-b border-blue-gray-50 py-3 px-5 text-green-700">
                          {transaction.creditAmount ? money(transaction.creditAmount) : ""}
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-5 text-red-700">
                          {transaction.debitAmount ? money(transaction.debitAmount) : ""}
                        </td>
                        <td className={`border-b border-blue-gray-50 py-3 px-5 font-semibold ${transaction.runningBalance >= 0 ? "text-blue-gray-800" : "text-red-700"}`}>
                          {money(transaction.runningBalance)}
                        </td>
                      </tr>
                    ))}
                    {transactions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-blue-gray-400">
                          Seçilen dönemde cari hareket bulunamadı.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default MyAccounting;
