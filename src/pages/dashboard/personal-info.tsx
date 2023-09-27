import { ExportContext, ExportContextType } from "@/context/export";
import StudentContext from "@/context/students";
import { Card } from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";

import QRCode from "qrcode";
import { formatDate } from "@/utils";
import { PencilIcon, PrinterIcon } from "@heroicons/react/24/solid";
import Export from "@/layouts/exports";

export function PersonalInfo() {
  const exportContext = useContext<ExportContextType | null>(ExportContext);
  const { student } = useContext(StudentContext);

  const [inputText, setInputText] = useState(student?.qrcode?.toString());

  const canvasRef = useRef(null);

  useEffect(() => {
    console.log(inputText);
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        inputText || " ",
        (error: any) => error && console.error()
      );
    }
  }, [inputText, canvasRef.current]);

  console.log(student);

  if (!student) return;

  return (
    <div className="mt-12">
      <Card>
        <div className="flex flex-col rounded-[10px] border border-[#808080] bg-white p-[1.25rem] shadow-md">
          <div className="flex flex-row justify-between">
            <div className="flex w-[30%] flex-row items-center">
              <img
                src={student.avatar!}
                alt="img"
                className="h-20 w-20 rounded-[50%] object-cover"
              />
              <div className="ml-[0.3125rem] flex flex-col text-[0.875em]">
                <span className="text-[1.375em] font-bold text-black">
                  {student.fullname}
                </span>
                <span className="w-auto min-w-[25em] text-[0.875em]">
                  {student.birthplace}
                </span>
                <span className="text-[0.75em]">
                  {formatDate(student.birthday)}
                </span>
              </div>
            </div>
            <div className="flex h-[3.125em] w-[20%] flex-row justify-between">
              <button
                onClick={print}
                className="flex h-[1.875em] w-[5.3125em] items-center justify-between rounded-[5px] border-none p-[0.625rem] transition-all hover:bg-[#1A8DF8] hover:font-bold hover:text-white"
              >
                <span> Export</span>
                <PrinterIcon />
              </button>
              <button className="flex h-[1.875em] w-[5.3125em] items-center justify-between rounded-[5px] border-none p-[0.625rem] transition-all hover:bg-[#1A8DF8] hover:font-bold hover:text-white">
                <span> Edit</span>
                <PencilIcon />
              </button>
            </div>
          </div>
          <div className="mt-[0.9375rem] flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="flex w-[35%] flex-col">
                <div className="h-[1.5625em] border border-solid border-t-[#1A8DF8] text-[0.875em] font-bold text-[#1A8DF8]">
                  Information personnelle
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.sex === "male" ? "Masculin" : "Feminin"}
                  </span>
                  <span className="text-[0.75em]"> Sexe</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.height}
                  </span>
                  <span className="text-[0.75em]"> Taille</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {" "}
                    {student.profession}
                  </span>
                  <span className="text-[0.75em]"> Profession</span>
                </div>
              </div>

              <div className=" flex w-[35%] flex-col">
                <div className="h-[1.5625em] border border-solid border-t-[#1A8DF8] text-[0.875em] font-bold text-[#1A8DF8]">
                  Information supplementaires
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.fathername}
                  </span>
                  <span className="text-[0.75em]"> Nom du pere</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.mothername}
                  </span>
                  <span className="text-[0.75em]"> Nom de la mere</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.address}
                  </span>
                  <span className="text-[0.75em]"> Adresse</span>
                </div>
              </div>
            </div>

            <div className="mt-[1.875rem] flex flex-row justify-between">
              <div className="flex w-[35%] flex-col">
                <div className="h-[1.5625em] border border-solid border-t-[#1A8DF8] text-[0.875em] font-bold text-[#1A8DF8]">
                  Information complementaires
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {student.uniqueId}
                  </span>
                  <span className="text-[0.75em]"> Identifiant Unique</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    CE02
                  </span>
                  <span className="text-[0.75em]"> Poste d'identification</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {formatDate(student.deliveryDate)}
                  </span>
                  <span className="text-[0.75em]"> Date de delivrance</span>
                </div>
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {formatDate(student.expirationDate)}
                  </span>
                  <span className="text-[0.75em]"> Date d'expiration</span>
                </div>
              </div>

              <div className="flex w-[35%] flex-col">
                <div className="h-[1.5625em] border border-solid border-t-[#1A8DF8] text-[0.875em] font-bold text-[#1A8DF8]">
                  Codes
                </div>
                <div style={{ display: "flex" }}>
                  <div>
                    <input
                      className=""
                      value={student.qrcode!}
                      onChange={(e) => setInputText(e.target.value)}
                      hidden
                      style={{ display: "none" }}
                    />
                    <br />
                  </div>
                  <canvas className="" ref={canvasRef} />
                </div>
                {/* <QRCodeSVG
                    value={student.qrcode}
                    style={{ marginTop: 20, marginBottom: 10 }}
                  /> */}
                <div className="mt-[0.625rem] flex flex-col">
                  <span className="text-[0.875em] font-bold text-black">
                    {" "}
                    {student.numericCode}{" "}
                  </span>
                  <span className="text-[0.75em]"> Code Numerique</span>
                </div>
              </div>
              <div style={{ display: "none" }}>
                <Export
                  exportRef={exportContext!.exportRef}
                  qrcode={inputText}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
