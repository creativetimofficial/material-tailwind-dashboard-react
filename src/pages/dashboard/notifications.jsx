import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";

// Örnek güzergah verisi
const routesData = [
  { route: "İstanbul - Ankara" },
  { route: "İzmir - Antalya" },
  { route: "Bursa - Eskişehir" },
];

export function Notifications() {
  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card>
        {/* Güzergahlar başlığı ve ekleme butonu */}
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Güzergahlar
          </Typography>
          <Button size="sm" className="bg-green-700 text-white hover:bg-green-800">
            Güzergah Ekle
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[400px] table-auto">
            <thead>
              <tr>
                {["Güzergah", "İşlem"].map((el) => (
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
              {routesData.map(({ route }, key) => {
                const className = `py-3 px-5 ${
                  key === routesData.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={route}>
                    {/* Güzergah */}
                    <td className={className}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {route}
                      </Typography>
                    </td>

                    {/* İşlem butonları */}
                    <td className={`${className} text-right`}>
                      <div className="flex flex-col items-end gap-1">
                        <Button
                          size="xs"
                          variant="gradient"
                          color="darkblue"
                          className="normal-case text-[10px] py-1 px-2"
                        >
                          Düzenle
                        </Button>
                        <Button
                          size="xs"
                          variant="gradient"
                          color="red"
                          className="normal-case text-[10px] py-1 px-2"
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

export default Notifications;
