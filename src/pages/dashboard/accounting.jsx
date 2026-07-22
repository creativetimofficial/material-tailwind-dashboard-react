import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowPathIcon,
  BanknotesIcon,
  ChevronUpDownIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "@/api/axiosConfig";

const TRANSACTION_TYPES = {
  credit: 1,
  debit: 2,
};

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

const todayInput = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
};

const currentDate = new Date();

const emptyForm = {
  transactionDate: todayInput(),
  description: "",
  type: String(TRANSACTION_TYPES.credit),
  amount: "",
};

const controlClassName =
  "block h-11 w-full min-w-0 rounded-md border border-blue-gray-200 bg-white px-3 text-sm font-medium text-blue-gray-800 shadow-sm outline-none transition-colors placeholder:font-normal placeholder:text-blue-gray-300 hover:border-blue-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-blue-gray-50 disabled:text-blue-gray-400";

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

const parseAmount = (value) => {
  const normalized = String(value || "")
    .trim()
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  return Number(normalized);
};

const getApiError = (error, fallback) => {
  const data = error?.response?.data;
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (data.message) return data.message;
  if (data.title) return data.title;
  return fallback;
};

export function AccountingPage() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [periodMonth, setPeriodMonth] = useState(
    String(currentDate.getMonth() + 1),
  );
  const [periodYear, setPeriodYear] = useState(
    String(currentDate.getFullYear()),
  );
  const [sort, setSort] = useState("asc");
  const [ledger, setLedger] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingLedger, setLoadingLedger] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [usersError, setUsersError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const selectedUser = useMemo(
    () => users.find((user) => String(user.id) === selectedUserId),
    [users, selectedUserId],
  );

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      setUsersError("");
      const response = await apiClient.get("/accounting/users");
      setUsers(response.data || []);
    } catch (err) {
      const message = getApiError(err, "Kullanıcı listesi yüklenemedi.");
      setUsersError(message);
      toast.error(message);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchLedger = async () => {
    if (!selectedUserId) {
      setLedger(null);
      setError("");
      return;
    }

    setLoadingLedger(true);
    setError("");
    try {
      const params = new URLSearchParams({
        periodMonth,
        periodYear,
        sort,
      });
      const response = await apiClient.get(
        `/accounting/users/${selectedUserId}/ledger?${params.toString()}`,
      );
      setLedger(response.data);
    } catch (err) {
      setLedger(null);
      setError(getApiError(err, "Cari hareketler yüklenemedi."));
    } finally {
      setLoadingLedger(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchLedger();
  }, [selectedUserId, periodMonth, periodYear, sort]);

  const clearValidationError = (name) => {
    setValidationErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  };

  const handleChange = (name, value) => {
    setFormData((previous) => ({ ...previous, [name]: value }));
    clearValidationError(name);
  };

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
    clearValidationError("user");
    resetForm(true);
  };

  const resetForm = (keepDate = true) => {
    setEditingId(null);
    setValidationErrors({});
    setFormData((previous) => ({
      ...emptyForm,
      transactionDate: keepDate ? previous.transactionDate : todayInput(),
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!selectedUserId) nextErrors.user = "İşlem yapılacak kullanıcıyı seçin.";
    if (!formData.transactionDate)
      nextErrors.transactionDate = "Tarih zorunludur.";
    if (!formData.description.trim())
      nextErrors.description = "Açıklama zorunludur.";
    if (
      ![
        String(TRANSACTION_TYPES.credit),
        String(TRANSACTION_TYPES.debit),
      ].includes(formData.type)
    ) {
      nextErrors.type = "Geçerli bir işlem türü seçin.";
    }

    const amount = parseAmount(formData.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      nextErrors.amount = "Tutar sıfırdan büyük olmalıdır.";
    }

    setValidationErrors(nextErrors);
    return nextErrors;
  };

  const buildPayload = () => ({
    transactionDate: formData.transactionDate,
    description: formData.description.trim(),
    type: Number(formData.type),
    amount: parseAmount(formData.amount),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    const firstError = Object.values(errors)[0];

    if (firstError) {
      toast.error(firstError);
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await apiClient.put(
          `/accounting/transactions/${editingId}`,
          buildPayload(),
        );
        toast.success("Cari hareket güncellendi.");
      } else {
        await apiClient.post(
          `/accounting/users/${selectedUserId}/transactions`,
          buildPayload(),
        );
        toast.success("Cari hareket kaydedildi.");
      }

      resetForm(true);
      await fetchLedger();
    } catch (err) {
      toast.error(getApiError(err, "Cari hareket kaydedilemedi."));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setValidationErrors({});
    setFormData({
      transactionDate: transaction.date?.slice(0, 10) || todayInput(),
      description: transaction.description || "",
      type: String(transaction.type),
      amount: String(transaction.amount || ""),
    });
    document.getElementById("accounting-entry-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setSaving(true);
    try {
      await apiClient.delete(`/accounting/transactions/${deleteTarget.id}`);
      toast.success("Cari hareket silindi.");
      setDeleteTarget(null);
      if (editingId === deleteTarget.id) resetForm(true);
      await fetchLedger();
    } catch (err) {
      toast.error(getApiError(err, "Cari hareket silinemedi."));
    } finally {
      setSaving(false);
    }
  };

  const toggleSort = () => {
    setSort((previous) => (previous === "asc" ? "desc" : "asc"));
  };

  const transactions = ledger?.transactions || [];
  const selectedUserName = selectedUser
    ? selectedUser.fullName || selectedUser.userName
    : "Kullanıcı seçilmedi";

  const summaryItems = [
    {
      label: "Seçili Kullanıcı",
      value: selectedUserName,
      className: "text-blue-gray-800",
    },
    {
      label: "Dönem Başı Devir",
      value: money(ledger?.openingBalance),
      className: "text-blue-gray-800",
    },
    {
      label: "Aylık Net",
      value: money((ledger?.totalCredit || 0) - (ledger?.totalDebit || 0)),
      className: "text-blue-gray-800",
    },
    {
      label: "Ay Sonu Bakiye",
      value: money(ledger?.closingBalance),
      className:
        (ledger?.closingBalance || 0) >= 0 ? "text-green-700" : "text-red-700",
    },
  ];

  const periodSummary = [
    {
      label: "Dönem Başı Devir",
      value: money(ledger?.openingBalance),
      className: "text-blue-gray-800",
    },
    {
      label: "Toplam Alacak",
      value: money(ledger?.totalCredit),
      className: "text-green-700",
    },
    {
      label: "Toplam Borç",
      value: money(ledger?.totalDebit),
      className: "text-red-700",
    },
    {
      label: "Ay Sonu Bakiye",
      value: money(ledger?.closingBalance),
      className:
        (ledger?.closingBalance || 0) >= 0 ? "text-green-700" : "text-red-700",
    },
  ];

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Dialog
        open={Boolean(deleteTarget)}
        handler={() => setDeleteTarget(null)}
        size="xs"
      >
        <DialogHeader>Silme Onayı</DialogHeader>
        <DialogBody divider>
          <Typography className="text-sm leading-6 text-blue-gray-700">
            <span className="font-semibold">{deleteTarget?.description}</span>{" "}
            açıklamalı,{" "}
            <span className="font-semibold">{money(deleteTarget?.amount)}</span>{" "}
            tutarındaki hareket kalıcı olarak silinecek.
          </Typography>
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => setDeleteTarget(null)}
            disabled={saving}
          >
            Vazgeç
          </Button>
          <Button color="red" onClick={handleDelete} disabled={saving}>
            {saving ? "Siliniyor..." : "Sil"}
          </Button>
        </DialogFooter>
      </Dialog>

      <main className="mb-8 mt-8 flex min-w-0 flex-col gap-6">
        <Card className="min-w-0 overflow-visible rounded-lg border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 overflow-visible rounded-b-none rounded-t-lg bg-gray-900 p-5"
          >
            <div className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_minmax(280px,1.35fr)_160px_132px] xl:items-end">
              <div className="min-w-0 md:col-span-2 xl:col-span-1 xl:self-center">
                <Typography variant="h6" color="white" className="text-base">
                  Cari Hesap Hareketleri
                </Typography>
                <Typography
                  variant="small"
                  className="mt-1 max-w-md font-normal leading-5 text-blue-gray-200"
                >
                  Kullanıcı seçerek alacak ve borç hareketlerini yönetin.
                </Typography>
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="account-user"
                  className="mb-1.5 block text-xs font-semibold text-blue-gray-100"
                >
                  Kullanıcı
                </label>
                <div className="relative">
                  <select
                    id="account-user"
                    value={selectedUserId}
                    onChange={handleUserChange}
                    disabled={loadingUsers}
                    aria-invalid={Boolean(validationErrors.user)}
                    aria-describedby={
                      validationErrors.user ? "account-user-error" : undefined
                    }
                    className={`${controlClassName} appearance-none truncate pr-10`}
                  >
                    <option value="">
                      {loadingUsers
                        ? "Kullanıcılar yükleniyor..."
                        : "Kullanıcı seçin"}
                    </option>
                    {users.map((user) => {
                      const userName =
                        user.fullName ||
                        user.userName ||
                        `Kullanıcı ${user.id}`;
                      const optionLabel =
                        user.userName && user.userName !== userName
                          ? `${userName} (${user.userName})`
                          : userName;

                      return (
                        <option key={user.id} value={String(user.id)}>
                          {optionLabel}
                        </option>
                      );
                    })}
                  </select>
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-gray-500"
                  />
                </div>
                {(validationErrors.user || usersError) && (
                  <p
                    id="account-user-error"
                    className="mt-1.5 text-xs font-medium text-red-200"
                    role="alert"
                  >
                    {validationErrors.user || usersError}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="account-month"
                  className="mb-1.5 block text-xs font-semibold text-blue-gray-100"
                >
                  Ay
                </label>
                <div className="relative">
                  <select
                    id="account-month"
                    value={periodMonth}
                    onChange={(event) => setPeriodMonth(event.target.value)}
                    className={`${controlClassName} appearance-none pr-10`}
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-gray-500"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="account-year"
                  className="mb-1.5 block text-xs font-semibold text-blue-gray-100"
                >
                  Yıl
                </label>
                <input
                  id="account-year"
                  type="number"
                  inputMode="numeric"
                  value={periodYear}
                  onChange={(event) => setPeriodYear(event.target.value)}
                  className={controlClassName}
                />
              </div>
            </div>
          </CardHeader>

          <CardBody className="grid min-w-0 gap-0 p-0 sm:grid-cols-2 xl:grid-cols-4">
            {summaryItems.map((item, index) => (
              <div
                key={item.label}
                className={`min-w-0 px-5 py-4 ${
                  index > 0
                    ? "border-t border-blue-gray-50 sm:border-l sm:border-t-0"
                    : ""
                } ${
                  index === 2
                    ? "sm:border-l-0 sm:border-t xl:border-l xl:border-t-0"
                    : ""
                }`}
              >
                <Typography className="text-xs font-bold uppercase text-blue-gray-400">
                  {item.label}
                </Typography>
                <Typography
                  title={item.value}
                  className={`mt-1 truncate text-sm font-semibold ${item.className}`}
                >
                  {item.value}
                </Typography>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card
          id="accounting-entry-form"
          className="min-w-0 scroll-mt-4 overflow-hidden rounded-lg border border-blue-gray-100 shadow-sm"
        >
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 rounded-b-none rounded-t-lg bg-gray-900 px-5 py-4"
          >
            <Typography variant="h6" color="white" className="text-base">
              {editingId ? "Cari Hareketi Düzenle" : "Yeni Cari Hareket"}
            </Typography>
          </CardHeader>

          <CardBody className="p-5">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 xl:grid-cols-[minmax(150px,0.8fr)_minmax(240px,2fr)_minmax(180px,1fr)_minmax(160px,0.9fr)_auto] xl:items-start"
            >
              <div className="min-w-0">
                <label
                  htmlFor="transaction-date"
                  className="mb-1.5 block text-xs font-semibold text-blue-gray-600"
                >
                  Tarih
                </label>
                <input
                  id="transaction-date"
                  type="date"
                  value={formData.transactionDate}
                  onChange={(event) =>
                    handleChange("transactionDate", event.target.value)
                  }
                  disabled={saving}
                  aria-invalid={Boolean(validationErrors.transactionDate)}
                  aria-describedby={
                    validationErrors.transactionDate
                      ? "transaction-date-error"
                      : undefined
                  }
                  className={controlClassName}
                />
                {validationErrors.transactionDate && (
                  <p
                    id="transaction-date-error"
                    className="mt-1.5 text-xs font-medium text-red-700"
                    role="alert"
                  >
                    {validationErrors.transactionDate}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="transaction-description"
                  className="mb-1.5 block text-xs font-semibold text-blue-gray-600"
                >
                  Açıklama
                </label>
                <input
                  id="transaction-description"
                  type="text"
                  value={formData.description}
                  onChange={(event) =>
                    handleChange("description", event.target.value)
                  }
                  placeholder="Örn. Temmuz ayı hakediş"
                  disabled={saving}
                  aria-invalid={Boolean(validationErrors.description)}
                  aria-describedby={
                    validationErrors.description
                      ? "transaction-description-error"
                      : undefined
                  }
                  className={controlClassName}
                />
                {validationErrors.description && (
                  <p
                    id="transaction-description-error"
                    className="mt-1.5 text-xs font-medium text-red-700"
                    role="alert"
                  >
                    {validationErrors.description}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="transaction-type"
                  className="mb-1.5 block text-xs font-semibold text-blue-gray-600"
                >
                  İşlem Türü
                </label>
                <div className="relative">
                  <select
                    id="transaction-type"
                    value={formData.type}
                    onChange={(event) =>
                      handleChange("type", event.target.value)
                    }
                    disabled={saving}
                    aria-invalid={Boolean(validationErrors.type)}
                    aria-describedby={
                      validationErrors.type
                        ? "transaction-type-error"
                        : undefined
                    }
                    className={`${controlClassName} appearance-none pr-10`}
                  >
                    <option value={String(TRANSACTION_TYPES.credit)}>
                      Alacak / Gelir
                    </option>
                    <option value={String(TRANSACTION_TYPES.debit)}>
                      Borç / Gider
                    </option>
                  </select>
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-gray-500"
                  />
                </div>
                {validationErrors.type && (
                  <p
                    id="transaction-type-error"
                    className="mt-1.5 text-xs font-medium text-red-700"
                    role="alert"
                  >
                    {validationErrors.type}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="transaction-amount"
                  className="mb-1.5 block text-xs font-semibold text-blue-gray-600"
                >
                  Tutar
                </label>
                <input
                  id="transaction-amount"
                  type="text"
                  inputMode="decimal"
                  value={formData.amount}
                  onChange={(event) =>
                    handleChange("amount", event.target.value)
                  }
                  placeholder="175.500,00"
                  disabled={saving}
                  aria-invalid={Boolean(validationErrors.amount)}
                  aria-describedby={
                    validationErrors.amount
                      ? "transaction-amount-error"
                      : undefined
                  }
                  className={controlClassName}
                />
                {validationErrors.amount && (
                  <p
                    id="transaction-amount-error"
                    className="mt-1.5 text-xs font-medium text-red-700"
                    role="alert"
                  >
                    {validationErrors.amount}
                  </p>
                )}
              </div>

              <div className="flex min-w-0 items-end gap-2 sm:col-span-2 xl:col-span-1">
                {editingId && (
                  <Button
                    type="button"
                    variant="text"
                    color="blue-gray"
                    onClick={() => resetForm(true)}
                    disabled={saving}
                    className="h-11 flex-1 whitespace-nowrap px-4 xl:flex-none"
                  >
                    Vazgeç
                  </Button>
                )}
                <Button
                  type="submit"
                  color="green"
                  disabled={saving || loadingUsers || !selectedUserId}
                  className="h-11 flex-1 whitespace-nowrap bg-green-700 px-5 shadow-sm xl:min-w-[120px] xl:flex-none"
                >
                  {saving
                    ? "Kaydediliyor..."
                    : editingId
                    ? "Güncelle"
                    : "Kaydet"}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        <Card className="min-w-0 overflow-hidden rounded-lg border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 flex flex-col gap-3 rounded-b-none rounded-t-lg bg-gray-900 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <Typography variant="h6" color="white" className="text-base">
                Cari Hareket Tablosu
              </Typography>
              <Typography
                variant="small"
                className="mt-1 font-normal leading-5 text-blue-gray-200"
              >
                Bakiyeler gerçek kronolojik sıraya göre hesaplanır.
              </Typography>
            </div>
            <Button
              type="button"
              size="sm"
              color="white"
              variant="outlined"
              className="flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap px-3 text-xs"
              onClick={toggleSort}
              disabled={!selectedUserId || loadingLedger}
              aria-label={`Tarih sıralaması: ${
                sort === "asc" ? "eskiden yeniye" : "yeniden eskiye"
              }`}
            >
              <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
              {sort === "asc" ? "Eskiden Yeniye" : "Yeniden Eskiye"}
            </Button>
          </CardHeader>

          <CardBody className="min-w-0 p-0">
            {loadingUsers || loadingLedger ? (
              <div
                className="flex min-h-[220px] flex-col items-center justify-center gap-3 p-8"
                role="status"
              >
                <Spinner className="h-8 w-8" />
                <Typography className="text-sm text-blue-gray-500">
                  Cari hareketler yükleniyor...
                </Typography>
              </div>
            ) : !selectedUserId ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 p-8 text-center">
                <BanknotesIcon
                  className="h-10 w-10 text-blue-gray-300"
                  aria-hidden="true"
                />
                <div>
                  <Typography className="text-sm font-semibold text-blue-gray-700">
                    Kullanıcı seçilmedi
                  </Typography>
                  <Typography className="mt-1 text-sm text-blue-gray-400">
                    Cari hareketleri görmek için üst bölümden bir kullanıcı
                    seçin.
                  </Typography>
                </div>
              </div>
            ) : error ? (
              <div
                className="flex min-h-[220px] flex-col items-center justify-center gap-3 p-8 text-center"
                role="alert"
              >
                <ExclamationTriangleIcon
                  className="h-10 w-10 text-red-400"
                  aria-hidden="true"
                />
                <div>
                  <Typography className="text-sm font-semibold text-red-700">
                    Veriler yüklenemedi
                  </Typography>
                  <Typography className="mt-1 text-sm text-blue-gray-500">
                    {error}
                  </Typography>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outlined"
                  color="blue-gray"
                  onClick={fetchLedger}
                >
                  Tekrar Dene
                </Button>
              </div>
            ) : (
              <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain">
                <table className="w-full min-w-[900px] table-fixed">
                  <colgroup>
                    <col className="w-[140px]" />
                    <col />
                    <col className="w-[155px]" />
                    <col className="w-[155px]" />
                    <col className="w-[165px]" />
                    <col className="w-[112px]" />
                  </colgroup>
                  <thead className="bg-blue-gray-50/70">
                    <tr>
                      <th className="border-b border-blue-gray-100 px-5 py-3 text-left">
                        <span className="text-xs font-bold uppercase text-blue-gray-500">
                          Tarih
                        </span>
                      </th>
                      <th className="border-b border-blue-gray-100 px-5 py-3 text-left">
                        <span className="text-xs font-bold uppercase text-blue-gray-500">
                          Açıklama
                        </span>
                      </th>
                      <th className="border-b border-blue-gray-100 px-5 py-3 text-right">
                        <span className="text-xs font-bold uppercase text-blue-gray-500">
                          Alacak
                        </span>
                      </th>
                      <th className="border-b border-blue-gray-100 px-5 py-3 text-right">
                        <span className="text-xs font-bold uppercase text-blue-gray-500">
                          Borç
                        </span>
                      </th>
                      <th className="border-b border-blue-gray-100 px-5 py-3 text-right">
                        <span className="text-xs font-bold uppercase text-blue-gray-500">
                          Bakiye
                        </span>
                      </th>
                      <th className="border-b border-blue-gray-100 px-4 py-3 text-right">
                        <span className="text-xs font-bold uppercase text-blue-gray-500">
                          İşlem
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-blue-gray-50/40">
                      <td className="border-b border-blue-gray-100 px-5 py-3 text-sm font-semibold text-blue-gray-700">
                        Önceki dönem
                      </td>
                      <td className="border-b border-blue-gray-100 px-5 py-3 text-sm text-blue-gray-600">
                        Devir
                      </td>
                      <td className="border-b border-blue-gray-100 px-5 py-3" />
                      <td className="border-b border-blue-gray-100 px-5 py-3" />
                      <td className="border-b border-blue-gray-100 px-5 py-3 text-right text-sm font-semibold tabular-nums text-blue-gray-800">
                        {money(ledger?.openingBalance)}
                      </td>
                      <td className="border-b border-blue-gray-100 px-4 py-3" />
                    </tr>

                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="transition-colors hover:bg-blue-gray-50/50"
                      >
                        <td className="whitespace-nowrap border-b border-blue-gray-50 px-5 py-3 text-sm text-blue-gray-700">
                          {dateText(transaction.date)}
                        </td>
                        <td className="break-words border-b border-blue-gray-50 px-5 py-3 text-sm leading-5 text-blue-gray-700">
                          {transaction.description}
                        </td>
                        <td className="whitespace-nowrap border-b border-blue-gray-50 px-5 py-3 text-right text-sm font-medium tabular-nums text-green-700">
                          {transaction.creditAmount
                            ? money(transaction.creditAmount)
                            : ""}
                        </td>
                        <td className="whitespace-nowrap border-b border-blue-gray-50 px-5 py-3 text-right text-sm font-medium tabular-nums text-red-700">
                          {transaction.debitAmount
                            ? money(transaction.debitAmount)
                            : ""}
                        </td>
                        <td
                          className={`whitespace-nowrap border-b border-blue-gray-50 px-5 py-3 text-right text-sm font-semibold tabular-nums ${
                            transaction.runningBalance >= 0
                              ? "text-blue-gray-800"
                              : "text-red-700"
                          }`}
                        >
                          {money(transaction.runningBalance)}
                        </td>
                        <td className="border-b border-blue-gray-50 px-4 py-2 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <IconButton
                              type="button"
                              size="sm"
                              variant="text"
                              color="blue"
                              onClick={() => handleEdit(transaction)}
                              aria-label={`${transaction.description} hareketini düzenle`}
                              title="Düzenle"
                            >
                              <PencilSquareIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </IconButton>
                            <IconButton
                              type="button"
                              size="sm"
                              variant="text"
                              color="red"
                              onClick={() => setDeleteTarget(transaction)}
                              aria-label={`${transaction.description} hareketini sil`}
                              title="Sil"
                            >
                              <TrashIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {transactions.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <BanknotesIcon
                            className="mx-auto h-9 w-9 text-blue-gray-300"
                            aria-hidden="true"
                          />
                          <p className="mt-3 text-sm font-semibold text-blue-gray-600">
                            Bu dönemde hareket yok
                          </p>
                          <p className="mt-1 text-sm text-blue-gray-400">
                            Yeni hareket eklediğinizde burada görünecek.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {ledger && !loadingLedger && !error && (
              <div className="grid border-t border-blue-gray-100 bg-blue-gray-50/40 sm:grid-cols-2 xl:grid-cols-4">
                {periodSummary.map((item, index) => (
                  <div
                    key={item.label}
                    className={`min-w-0 px-5 py-4 ${
                      index > 0
                        ? "border-t border-blue-gray-100 sm:border-l sm:border-t-0"
                        : ""
                    } ${
                      index === 2
                        ? "sm:border-l-0 sm:border-t xl:border-l xl:border-t-0"
                        : ""
                    }`}
                  >
                    <p className="text-xs font-bold uppercase text-blue-gray-400">
                      {item.label}
                    </p>
                    <p
                      className={`mt-1 whitespace-nowrap text-sm font-semibold tabular-nums ${item.className}`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </main>
    </>
  );
}

export default AccountingPage;
