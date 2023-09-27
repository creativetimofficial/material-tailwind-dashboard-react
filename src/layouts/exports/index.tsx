// import { useReactToPrint } from "react-to-print";
// import QRCODECARD from "../../assets/img/CNIC_QRCode_Card.png";
import RectoCard from "../../assets/img/recto_v4.svg";
import VersoCard from "../../assets/img/verso_v4.svg";
import team1 from "../../assets/img/team-1.jpeg";
import { useContext, useMemo, useRef, useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import StudentContext from "@/context/students";
import Student from "@/entities/student.entity";
import { formatDateBySlash } from "@/utils";
import QrCodeGenerator from "@/components/Qrgenerator";
import { ExportContext } from "@/context/export";
import { PrinterIcon } from "@heroicons/react/24/solid";

import logo from "@/assets/img/logo.svg";
import logoTransparent from "@/assets/img/logo_transparent.png";
import userImage from "@/assets/img/bruce-mars.jpeg";
import star from "@/assets/img/star.svg";
// import { formatDate } from "@/utils";
// import QRCode from "qrcode";

type ExportProps = {
  exportRef?: React.MutableRefObject<null>;
  qrcode?: string | undefined;
};

function Export({ exportRef }: ExportProps) {
  const { student } = useContext(StudentContext);

  const exportContext = useContext(ExportContext);

  // Some functions
  const getFullname = (student: Student) => {
    const firstnames = student.firstname.split(" ");
    const lastnames = student.lastname.split(" ");

    return `${firstnames[0].toUpperCase()} ${lastnames[0].toUpperCase()}`;
  };

  const canvasRef = useRef(null);
  const [userCode, setUserCode] = useState(student?.qrcode?.toString());

  const newStudent = useMemo(
    () =>
      new Student({
        id: "string",
        firstname: "michel rufin",
        lastname: "btompe tcheufa",
        birthday: new Date(Date.now()),
        profession: "string",
        birthplace: "douala",
        faculty: "informatique",
        avatar: "string",
        sex: "m",
        height: "string",
        fathername: "string",
        mothername: "string",
        address: "string",
        uniqueId: "string",
        identificationPost: "string",
        deliveryDate: new Date(Date.now()),
        expirationDate: new Date(Date.now()),
        numericCode: 1244845,
        qrcode: "sdfsdfsdf",
      }),
    [],
  );

  // useEffect(() => {
  //   const canvas: React.MutableRefObject<HTMLCanvasElement> | null =
  //     canvasRef.current;
  //   if (canvas) {
  //     const ctx = canvas.getContext("2d");
  //     canvas.width = canvas.offsetWidth;
  //     canvas.height = canvas.offsetHeight;
  //   }
  //   // draw something on the canvas
  // }, []);

  // useEffect(() => {
  //   console.log(userCode);
  //   if (canvasRef.current) {
  //     QRCode.toCanvas(
  //       canvasRef.current,
  //       userCode || " ",
  //       (error: any) => error && console.error()
  //     );
  //   }
  // }, [userCode, canvasRef.current]);

  return (
    <>
      {
        // student &&
        newStudent && (
          <div className="w-full">
            <IconButton className="flex" onClick={exportContext?.print}>
              <PrinterIcon
                fill="black"
                color="red"
                scale={1}
                className="bg-red-100"
              />
            </IconButton>
            <Typography className="text-[1.75rem] font-extrabold">
              This is your unique QRCode
            </Typography>
            {/* This will contain all the logic */}
            <div
              ref={exportContext?.exportRef}
              className="flex flex-col items-center"
            >
              {/* Recto of the card */}
              <div className="w-[42.875em] h-[29.125em] mt-4 relative bg-neutral-100 border-2 border-primary bg-gray-100 rounded-2xl">
                <div className="w-full h-[25%] bg-primary bg-opacity-60 rounded-t-2xl">
                  <div className="flex bg-primary justify-center items-center rounded-t-2xl h-[10%] w-full">
                    <div className="w-[40%] h-[50%] flex">
                      <div className="w-1/3 bg-[#6DAD9D]" />
                      <div className="w-1/3 bg-[#E8766E] flex justify-center items-center">
                        <img
                          src={star}
                          alt="Yellow star"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="w-1/3 bg-[#FAE24C]" />
                    </div>
                  </div>
                  <div className="flex w-full h-[90%] bg-primary">
                    <div className="w-[40%] text-white h-full font-gideonRomanRegular flex flex-col justify-center items-center">
                      <p>REPUBLIQUE DU CAMEROUN</p>
                      <p>Paix - Travail - Patrie</p>
                      <p>UNIVERSITE DE YAOUNDE 1</p>
                    </div>
                    <div className="w-[20%] h-full flex justify-center items-center">
                      <img
                        src={logo}
                        className="w-full h-full"
                        alt="UY1 transparent logo"
                      />
                    </div>
                    <div className="w-[40%] h-full font-gideonRomanRegular text-white flex flex-col justify-center items-center">
                      <p>REPUBLIC OF CAMEROON</p>
                      <p>Peace - Work - Fatherland</p>
                      <p>UNIVERSITY OF YAOUNDE 1</p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[15%] text-lg py-2 font-nunitoBold bg-[#BA68C8]">
                  <p className="h-1/2 w-full text-center">
                    CARTE D’ÉTUDIANT - FACULTE DES SCIENCES
                  </p>
                  <p className="h-1/2 w-full text-center">
                    <span className="text-white font-nunitoBoldItalic">
                      FILIÈRE/OPTION:
                    </span>
                    <span>{" INFORMATIQUE"}</span>
                  </p>
                </div>
                <div className="w-full h-[60%] flex bg-white p-3 rounded-b-2xl">
                  <div className="h-full w-[78%]">
                    <div className="h-1/3 font-nunitoBoldItalic text-primary flex w-full">
                      <div className="w-2/6 mr-2 h-full">
                        <p className="w-full">NOM/SURNAME</p>
                        <p className="font-nunitoBold text-black overflow-clip text-ellipsis">
                          SITCHI NDJINGA
                        </p>
                      </div>
                      <div className="w-3/6 mr-2 h-full">
                        <p className="w-full">PRÉNOMS/GIVEN NAMES</p>
                        <p className="font-nunitoBold text-black">
                          AURIEL YVES-MICHEL
                        </p>
                      </div>
                      <div className="w-1/6 h-full">
                        <p className="w-full">SEXE/SEX</p>
                        <p className="font-nunitoBold text-black">M</p>
                      </div>
                    </div>
                    <div className="h-1/3 font-nunitoBoldItalic text-primary w-full">
                      <p className="w-full">
                        DATE ET LIEU DE NAISSANCE/DATE AND PLACE OF BIRTH
                      </p>
                      <p className="w-full">
                        <span className="w-full h-full font-nunitoBold text-black">
                          14/05/2001
                        </span>
                        <span className="mx-4">À/AT</span>
                        <span className="w-full h-full font-nunitoBold text-black">
                          DOUALA
                        </span>
                      </p>
                    </div>
                    <div className="h-1/3 font-nunitoBoldItalic text-primary flex w-full">
                      <div className="w-1/2 h-full mr-2">
                        <p>NATIONALITÉ/NATIONALITY</p>
                        <p className="font-nunitoBold text-black">CAMEROUNAIS</p>
                      </div>
                      <div className="w-1/2 h-full">
                        <p>ANNÉE/ACADEMIC YEAR</p>
                        <p className="font-nunitoBold text-black">2023-2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-full flex flex-col justify-end pb-4 w-[22%]">
                    <div className="w-full h-[60%] rounded-3xl border-2 border-primary">
                      <img
                        src={userImage}
                        className="w-full h-full rounded-2xl object-cover"
                        alt="Student image"
                      />
                    </div>
                    <p className="w-full text-lg text-center mt-2 font-nunitoBold text-black">
                      MAT: 18T2615
                    </p>
                  </div>
                </div>
                <div className="absolute w-[50%] h-full top-0 left-0">
                  <img
                    src={logoTransparent}
                    className="w-full h-full object-fill opacity-[0.1]"
                    alt="University of Yaounde 1 logo"
                  />
                </div>
              </div>

              {/* Verso of the card */}
              <div className="w-[42.875em] h-[29.125em] mt-4 relative bg-neutral-100 border-2 border-primary bg-gray-100 rounded-2xl">
                <div className="w-full h-[56%] flex bg-white px-5 pt-5 pb-2 rounded-t-2xl">
                  <div className="h-full w-[70%] text-black font-nunitoBold mr-4">
                    <div className="h-1/3 flex w-full">
                      <div className="w-full h-full">
                        <p className="font-nunitoBoldItalic text-primary">
                          ADRESSE MAIL/EMAIL ADDRESS
                        </p>
                        <p className="w-full">example@facsciencesuy1.cm</p>
                      </div>
                    </div>
                    <div className="h-1/3 flex w-full">
                      <div className="w-1/2 h-full mr-2">
                        <p className="w-full font-nunitoBoldItalic text-primary">
                          TELEPHONE/PHONE
                        </p>
                        <p className="w-full">14/05/2001</p>
                      </div>
                      <div className="w-1/2 h-full">
                        <p className="w-full font-nunitoBoldItalic text-primary">
                          VALIDITÉ/VALIDITY
                        </p>
                        <p className="w-full">14/09/2001 - 14/09/2010</p>
                      </div>
                    </div>
                    <div className="h-1/3 flex w-full">
                      <div className="w-full h-full mr-2">
                        <p className="font-nunitoBoldItalic text-primary">
                          LE DOYEN/THE DEAN
                        </p>
                        <p className="w-full">PR TCHOUNKEU JEAN CLAUDE</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-full flex flex-col justify-center w-[30%]">
                    <div className="relative mb-2 flex justify-center items-center w-full h-[80%]">
                      {/* Top left*/}
                      <div className="absolute top-0 left-0 w-12 h-3 bg-black"></div>
                      <div className="absolute top-0 left-0 w-3 h-12 bg-black"></div>
                      {/* Top right*/}
                      <div className="absolute top-0 right-0 w-3 h-12 bg-black"></div>
                      <div className="absolute top-0 right-0 w-12 h-3 bg-black"></div>
                      {/* bottom left*/}
                      <div className="absolute bottom-0 left-0 w-12 h-3 bg-black"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-12 bg-black"></div>
                      {/* bottom right*/}
                      <div className="absolute bottom-0 right-0 w-3 h-12 bg-black"></div>
                      <div className="absolute bottom-0 right-0 w-12 h-3 bg-black"></div>
                      {/* QRcode */}
                      <div>
                        <QrCodeGenerator code="1000000000000" />
                      </div>
                    </div>
                    <p className="text-center font-nicoMojiRegular text-[0.9rem] uppercase tracking-[0.06563rem]">
                      1<span>000</span> <span>000</span> <span>000</span>{" "}
                      <span>000</span>
                    </p>
                  </div>
                </div>
                <div className="w-full h-[4%] flex">
                  <div className="w-1/3 bg-[#6DAD9D]" />
                  <div className="w-1/3 bg-[#E8766E] flex justify-center items-center">
                    <img src={star} alt="Yellow star" className="w-full h-full" />
                  </div>
                  <div className="w-1/3 bg-[#FAE24C]" />
                </div>
                <div className="font-nunitoRegular bg-white rounded-b-3xl h-[40%] px-3 pt-2">
                  <p>
                    La carte d’étudiant (CE) est unique à chaque étudiant et
                    considérée comme sa propriété. Le proriétaire de la CARTE
                    D’ETUDIANT est responsable de sa sécurité, de ne pas la prêter à
                    d’autres personnes et de signaler immédiatementement toute perte
                    ou vol.
                  </p>
                  <p>
                    The student card (CE) is unique to each student and considered as
                    his property. The owner of the STUDENT CARD is responsible for
                    its security, not lending it to other people and immediately
                    reporting any loss or theft.
                  </p>
                </div>
                <div className="absolute w-[50%] h-full top-0 left-0">
                  <img
                    src={logoTransparent}
                    className="w-full h-full object-fill opacity-[0.1]"
                    alt="University of Yaounde 1 logo"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default Export;
