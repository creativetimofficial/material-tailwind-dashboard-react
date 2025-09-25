import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";

export function Tables() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Araçlar
          </Typography>
          <Button size="sm" className="bg-green-700 text-white hover:bg-green-800">
            Araç Ekle
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[500px] table-auto">
            <thead>
              <tr>
                {["Araçlar", "Şoför", "İşlem"].map((el) => (
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
              {authorsTableData.map(({ plaka, driver }, key) => {
                const className = `py-3 px-5 ${
                  key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={plaka}>
                    {/* Araç Plaka */}
                    <td className={className}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {plaka}
                      </Typography>
                    </td>

                    {/* Şoför */}
                    <td className={className}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {driver}
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

export default Tables;
