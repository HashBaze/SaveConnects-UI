import React, { useRef } from "react";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";

interface QRGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyKey: string | undefined;
}

const QRGenerateModal: React.FC<QRGenerateModalProps> = ({
  isOpen,
  onClose,
  companyKey,
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const exhibitorUrl = `http://localhost:3000/${companyKey}`;

  if (!isOpen) return null;

  const downloadQRAsPNG = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr_code.png";
      downloadLink.click();
    }
  };

  const downloadQRAsPDF = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const pdf = new jsPDF();
      const pngUrl = canvas.toDataURL("image/png");
      pdf.addImage(pngUrl, "PNG", 15, 40, 180, 180);
      pdf.save("qr_code.pdf");
    }
  };

  return (
    <div className="fixed absolute z-50 inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center p-6">
      <div className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-[350px] p-6">
        <div className="flex bg-white text-white px-4 rounded-t-lg items-center justify-between">
          <div className="flex-grow text-center">
            <h2 className="text-sm text-naviblue font-semibold">Share Your Card</h2>
          </div>
          <button
            onClick={onClose}
            className="flex w-6 h-6 items-center justify-center bg-white hover:text-gray-300 rounded-full border border-gray-300"
          >
            <img src="/icon/close.svg" alt="Close" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center" ref={qrRef}>
          <QRCode value={exhibitorUrl} size={200} renderAs="canvas" />
          <p className="text-sm text-gray-500 font-medium text-center px-[50px]">
            Add This QR To Your Website, Social Profile Or Even Print It Out
          </p>
          <button
            onClick={downloadQRAsPNG}
            className="flex items-center justify-center bg-naviblue w-[200px] h-[40px] p-2 rounded-lg cursor-pointer hover:bg-naviblue/90 border border-naviblue"
          >
            <img
              src="/icon/download.svg"
              alt="Download"
              className="w-8 h-8"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="text-white text-base text-sm ml-2">Download As PNG</span>
          </button>
          <button
            onClick={downloadQRAsPDF}
            className="flex items-center justify-center bg-naviblue w-[200px] h-[40px] rounded-lg cursor-pointer hover:bg-naviblue/90 border border-naviblue mt-4 mb-4"
          >
            <img
              src="/icon/download.svg"
              alt="Download"
              className="w-8 h-8"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="text-white text-base text-sm ml-2">Download As PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRGenerateModal;
