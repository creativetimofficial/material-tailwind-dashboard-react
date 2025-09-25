import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import apiClient from "@/api/axiosConfig";

export function Profile() {
  // Verileri, yüklenme durumunu ve hata durumunu tutmak için state'ler
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bu effect, bileşen ilk yüklendiğinde çalışır ve verileri çeker
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Backend'de oluşturduğumuz endpoint'e istek atıyoruz
        const response = await apiClient.get("/users");
        setUsers(response.data); // Gelen veriyi state'e kaydediyoruz
      } catch (err) {
        setError("Kullanıcı verileri yüklenirken bir hata oluştu.");
        console.error(err);
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };

    fetchUsers();
  }, []); // [] dependency array'i sayesinde sadece bir kez çalışır

  // YENİ: Kullanıcı silme fonksiyonu eklendi
  const handleDelete = async (userId, userName) => {
    // Kazara silmeyi önlemek için kullanıcıdan onay al
    if (window.confirm(`'${userName}' adlı kullanıcıyı silmek istediğinizden emin misiniz?`)) {
      try {
        // Backend'deki DELETE endpoint'ine istek gönder
        await apiClient.delete(`/users/${userId}`);

        // Arayüzü anında güncellemek için silinen kullanıcıyı listeden çıkar
        setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));

        // Kullanıcıya başarı mesajı göster (isteğe bağlı)
        // alert("Kullanıcı başarıyla silindi.");
      } catch (err) {
        alert("Kullanıcı silinirken bir hata oluştu.");
        console.error(err);
      }
    }
  };


  // Yüklenme sırasında gösterilecek içerik
  if (loading) {
    return (
        <div className="mt-12 text-center">
          <Typography>Kullanıcılar Yükleniyor...</Typography>
        </div>
    );
  }

  // Hata durumunda gösterilecek içerik
  if (error) {
    return (
        <div className="mt-12 text-center">
          <Typography color="red">{error}</Typography>
        </div>
    );
  }

  return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-4 p-6 flex justify-between items-center">
            <Typography variant="h6" color="white">
              Kullanıcılar
            </Typography>
            <Button size="sm" className="bg-green-700 text-white hover:bg-green-800">
              Kullanıcı Ekle
            </Button>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[600px] table-auto">
              <thead>
              <tr>
                {["Ad Soyad", "Araç Plakası", "Telefon", "İşlem"].map((el) => (
                    <th
                        key={el}
                        className={`border-b border-blue-gray-50 py-3 px-5 ${
                            el === "İşlem" ? "text-right" : "text-left"
                        }`}
                    >
                      <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {/* Statik veri yerine backend'den gelen 'users' state'ini map'liyoruz */}
              {users.map((user, key) => {
                const isLast = key === users.length - 1;
                const className = `py-3 px-5 ${
                    isLast ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                    // React'te listeler için 'key' prop'u benzersiz olmalıdır, ID kullanmak en iyisidir.
                    <tr key={user.id}>
                      <td className={className}>
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {user.fullName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {user.licensePlate}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {user.phoneNumber}
                        </Typography>
                      </td>
                      <td className={`${className} text-right`}>
                        <div className="flex flex-col items-end gap-2">
                          <Button
                              size="xs"
                              variant="gradient"
                              color="blue" // Renkleri Material Tailwind'in kabul ettiği değerlerle güncelledim
                              className="normal-case text-[10px] py-1 px-2"
                          >
                            Düzenle
                          </Button>
                          {/* YENİ: Sil butonuna onClick olayı eklendi */}
                          <Button
                              size="xs"
                              variant="gradient"
                              color="red"
                              className="normal-case text-[10px] py-1 px-2"
                              onClick={() => handleDelete(user.id, user.fullName)}
                          >
                            Sil
                          </Button>
                        </div>
                      </td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
  );
}

export default Profile;