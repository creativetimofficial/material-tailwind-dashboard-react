import { useReactToPrint } from "react-to-print";
import QRCODECARD from "../../assets/img/CNIC_QRCode_Card.png";
import { useContext, useEffect, useRef, useState } from "react";
import { Typography } from "@material-tailwind/react";
import StudentContext from "@/context/students";
import Student from "@/entities/student.entity";
import { formatDate } from "@/utils";
import QRCode from "qrcode";

type ExportProps = {
  exportRef: React.MutableRefObject<null>;
  qrcode: string | undefined;
};

function Export({ exportRef }: ExportProps) {
  const { student } = useContext(StudentContext);

  // Some functions
  const getFullname = (student: Student) => {
    const firstnames = student.firstname.split(" ");
    const lastnames = student.lastname.split(" ");

    return `${firstnames[0].toUpperCase()} ${lastnames[0].toUpperCase()}`;
  };

  const canvasRef = useRef(null);
  const [userCode, setUserCode] = useState(student?.qrcode?.toString());

  useEffect(() => {
    const canvas: React.MutableRefObject<HTMLCanvasElement> | null =
      canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    // draw something on the canvas
  }, []);

  useEffect(() => {
    console.log(userCode);
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        userCode || " ",
        (error: any) => error && console.error()
      );
    }
  }, [userCode, canvasRef.current]);

  return (
    <>
      {student && (
        <div ref={exportRef} className="absolute top-[0.9375rem] w-[60%]">
          <div>
            <div className="">
              <Typography
                sx={{
                  fontSize: 28,
                  fontWeight: 800,
                }}
              >
                This is your unique QRCode
              </Typography>
            </div>
            {/* This will contain all the logic */}
            <div className="relative">
              <div className="rounded-[20px]">
                <img src={QRCODECARD} className="rounded-[1.25rem]" />
              </div>

              <div className="absolute top-[10px] left-[50%] text-center">
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
                  {getFullname(student)}
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
                  {student.numericCode}
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
                  {formatDate(student.expirationDate)}
                </Typography>
              </div>

              <div className="absolute top-[22%] -right-[4.375rem]">
                {/* <QRCodeSVG
                    value={student.qrcode}
                    style={{ 
                      padding: 10,
                      width:"260px",
                      height: "260px"
                    }}
                  /> */}
                <canvas
                  style={{ width: 500, height: 200 }}
                  ref={canvasRef}
                ></canvas>
              </div>
            </div>
          </div>

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
      )}
    </>
  );
}

export default Export;
