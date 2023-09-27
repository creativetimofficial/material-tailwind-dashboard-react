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
            <>
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
              <div ref={exportContext?.exportRef}>
                {/* Recto of the card */}

                <div className="w-[686px] h-[466px] relative bg-neutral-100 border-2 border-primary bg-gray-100 rounded-2xl">
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
                        FACULTES DES SCIENCES:
                      </span>
                      <span>{" INFORMATIQUE"}</span>
                    </p>
                  </div>
                  <div className="w-full h-[60%] flex bg-white p-3 rounded-b-2xl">
                    <div className="h-full w-[78%]">
                      <div className="h-1/3 font-nunitoBoldItalic text-primary flex w-full">
                        <div className="w-2/6 mr-2 bg-red-100 h-full">
                          <p>NOM/SURNAME</p>
                          <p className="font-nunitoBold text-black">
                            BTOMPE SSSSSSFFF
                          </p>
                        </div>
                        <div className="w-3/6 mr-2 bg-red-100 h-full">
                          <p>PRÉNOMS/GIVEN NAMES</p>
                          <p className="font-nunitoBold text-black">MICHEL RUFIN</p>
                        </div>
                        <div className="w-1/6 h-full">
                          <p>SEXE/SEX</p>
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
                      className="w-full h-full object-fill opacity-[0.15]"
                      alt="University of Yaounde 1 logo"
                    />
                  </div>
                </div>

                {/* Verso of the card */}
                <div className="w-[686px] h-[466px] relative bg-neutral-100 border-2 border-primary bg-gray-100 rounded-2xl">
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
                        FACULTES DES SCIENCES:
                      </span>
                      <span>{" INFORMATIQUE"}</span>
                    </p>
                  </div>
                  <div className="w-full h-[60%] flex bg-white p-3 rounded-b-2xl">
                    <div className="h-full w-[78%]">
                      <div className="h-1/3 font-nunitoBoldItalic text-primary flex w-full">
                        <div className="w-2/6 mr-2 bg-red-100 h-full">
                          <p>NOM/SURNAME</p>
                          <p className="font-nunitoBold text-black">
                            BTOMPE SSSSSSFFF
                          </p>
                        </div>
                        <div className="w-3/6 mr-2 bg-red-100 h-full">
                          <p>PRÉNOMS/GIVEN NAMES</p>
                          <p className="font-nunitoBold text-black">MICHEL RUFIN</p>
                        </div>
                        <div className="w-1/6 h-full">
                          <p>SEXE/SEX</p>
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
                      className="w-full h-full object-fill opacity-[0.15]"
                      alt="University of Yaounde 1 logo"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="flex w-full" ref={exportContext?.exportRef}>
                <div className="relative w-1/2 font-nunitoBold uppercase leading-[150%]">
                  <img
                    src={RectoCard}
                    alt=""
                    className="w-full rounded-3xl border border-purple-500"
                  />
                  <p className="absolute top-[9.4rem] w-full text-center text-[1.1rem]">
                    <span className="font-nunitoBoldItalic text-white">
                      filière/option:
                    </span>{" "}
                    <span>{newStudent.faculty}</span>
                  </p>
                  <p className="absolute bottom-[10.7rem] left-[1.1rem]">
                    {newStudent.lastname}
                  </p>
                  <p className="absolute bottom-[10.7rem] left-[12.7rem]">
                    {newStudent.firstname}
                  </p>
                  <p className="absolute bottom-[10.7rem] left-[26.4rem]">
                    {newStudent.sex}
                  </p>
                  <p className="absolute bottom-[6.066rem] left-[1.1rem]">
                    {formatDateBySlash(newStudent.birthday)}
                  </p>
                  <p className="absolute bottom-[6.05rem] left-[9.9rem]">
                    {newStudent.birthplace}
                  </p>
                  <p className="absolute bottom-[1.566rem] left-[1.1rem]">cmr</p>
                  <p className="absolute bottom-[1.566rem] left-[15.9rem]">
                    2023-2024
                  </p>
                  <p className="absolute bottom-[1.24rem] right-[1.1rem] text-[1.2rem]  ">
                    18T6547
                  </p>
                  <img
                    src={team1}
                    alt=""
                    className="absolute right-[1.34rem] bottom-[3.1rem] h-[7.65em] w-[7.65em] rounded-[1rem]"
                  />
                </div>
                <div className="relative w-1/2 font-nunitoBold uppercase leading-[150%]">
                  <img
                    src={VersoCard}
                    alt=""
                    className="w-full rounded-3xl border border-purple-500"
                  />
                  <p className="absolute top-[3rem] left-[1.12rem] lowercase">
                    example.mail@facsciencesuy1.cm
                  </p>
                  <p className="absolute top-[7.6rem] left-[4.15rem] lowercase">
                    {55898324}
                  </p>
                  <p className="absolute top-[7.6rem] left-[12.8rem] lowercase">
                    04/09/23 - 31/07/26
                  </p>
                  <p className="absolute top-[12.35rem] left-[1.12rem]">
                    pr tchouankeu jean claude
                  </p>
                  <p className="absolute bottom-[10.72rem] right-[1.6rem] font-nicoMojiRegular text-[0.9rem] uppercase tracking-[0.06563rem]">
                    1<span>000</span> <span>000</span> <span>000</span>{" "}
                    <span>000</span>
                  </p>
                  <div className="absolute right-[1.75rem] top-[2.45rem]">
                    <QrCodeGenerator code="1000000000000" />
                  </div>
                </div>
              </div> */}
              {/* <div className="relative">
                <div className="rounded-[20px]">
                  <img src={QRCODECARD} className="rounded-[1.25rem]" />
                </div>

                <div className="absolute top-[0.6rem]  w-full bg-red-100 text-center">
                  <Typography sx={{ fontWeight: 600, color: "#FFD700" }}>
                    REPUBLIQUE DU CAMEROUN
                  </Typography>
                  <Typography sx={{ fontWeight: 600, color: "#FFD700" }}>
                    REPUBLIC OF CAMEROUN
                  </Typography>
                </div>
                <div className="absolute top-[22%] left-[3.75rem]">
                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: 40,
                      fontWeight: 500,
                    }}
                  >
                    {getFullname(newStudent)}
                  </Typography>
                </div>
                <div className="absolute top-[30%] left-[3.75rem]">
                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: 28,
                      fontWeight: 400,
                    }}
                  >
                    {newStudent.numericCode}
                  </Typography>
                </div>
                <div className="absolute top-[15%] left-[3.75rem]">
                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: 28,
                      fontWeight: 400,
                    }}
                  >
                    {formatDate(newStudent.expirationDate)}
                  </Typography>
                </div>

                <div className="absolute top-[22%] -right-[4.375rem]">
                  <QRCodeSVG
                    value={student.qrcode}
                    style={{ 
                      padding: 10,
                      width:"260px",
                      height: "260px"
                    }}
                  />
                  <canvas
                    style={{ width: 500, height: 200 }}
                    ref={canvasRef}
                  ></canvas>
                </div>
              </div> */}
            </>

            {/* <div
   className=""            sx={{
                backgroundColor: "#FFFFFF",
                padding: 3,
                border: "2px solid grey",
                borderRadius: 5,
              }}
            >
              <div sx={{ textAlign: "center" }}>
                <Typography sx={{ fontWeight: 600, color: "#FFD700" }}>
                  REPUBLIQUE DU CAMEROUN
                </Typography>
                <Typography sx={{ fontWeight: 600, color: "#FFD700" }}>
                  REPUBLIC OF CAMEROUN
                </Typography>
              </div>
              <div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div sx={{}}>
                  <div>
                    <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                      ISSUED TO
                    </Typography>

                    <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
                      Fenyep Wangue
                    </Typography>
                  </div>
                  <div sx={{ marginTop: 3 }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                      NUMERIC CODE
                    </Typography>

                    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                      872031
                    </Typography>
                  </div>
                  <div sx={{ marginTop: 3 }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                      DELIVERY DATE
                    </Typography>

                    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                      {formattedDate()}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className=""
              sx={{
                marginTop: 2,
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                &copy; 2023, made with Love, by CNIC for a better web.
              </Typography>
            </div> */}
          </div>
        )
      }
    </>
  );
}

export default Export;
