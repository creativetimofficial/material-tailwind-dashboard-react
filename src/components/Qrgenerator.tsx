import { useEffect, useRef, useState, ChangeEvent } from "react";

import logo from "@/assets/img/Vector.png";

import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  //   FileExtension,
  Options,
} from "qr-code-styling";

type QrCodeGeneratorProps = {
  code: string;
};

export default function QrCodeGenerator({ code }: QrCodeGeneratorProps) {
  const [options, setOptions] = useState<Options>({
    width: 170,
    height: 160,
    type: "svg" as DrawType,
    data: code,
    image: logo,
    margin: 0,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#222222",
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 0,
      //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
      // },
      type: "rounded" as DotType,
    },
    backgroundOptions: {
      // color: "#5FD4F3",
      color: "transparent",
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 0,
      //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
      // },
    },
    cornersSquareOptions: {
      color: "#222222",
      type: "square" as CornerSquareType,
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 180,
      //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
      // },
    },
    cornersDotOptions: {
      color: "#222222",
      type: "square" as CornerDotType,
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 180,
      //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
      // },
    },
  });
  //   const [fileExt, setFileExt] = useState<FileExtension>("svg");
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  //   const onDataChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     setOptions((options) => ({
  //       ...options,
  //       data: event.target.value,
  //     }));
  //   };

  //   const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //     setFileExt(event.target.value as FileExtension);
  //   };

  //   const onDownloadClick = () => {
  //     if (!qrCode) return;
  //     qrCode.download({
  //       extension: fileExt,
  //     });
  //   };

  return (
    <div ref={ref} />
    //   {/* <h2>QR code styling for React</h2> */}
    //   {/* <div style={styles.inputWrapper}>
    //     <input
    //       value={options.data}
    //       onChange={onDataChange}
    //       style={styles.inputBox}
    //     />
    //     <select onChange={onExtensionChange} value={fileExt}>
    //       <option value="svg">SVG</option>
    //       <option value="png">PNG</option>
    //       <option value="jpeg">JPEG</option>
    //       <option value="webp">WEBP</option>
    //     </select>
    //     <button onClick={onDownloadClick}>Download</button>
    //   </div> */}
  );
}

const styles = {
  inputWrapper: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "300px",
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20,
  },
};
