import React, { useState } from "react";
import Modal from "react-modal";
import { PencilIcon, BackwardIcon } from "@heroicons/react/24/solid";

function ImageUploader(props) {
  const [file, setFile] = useState(null);
  const {img, setImg} = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileUpload = (event) => {
    setImg(event.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="file-upload"
          className="relative flex flex-col items-center justify-center h-40 w-1/2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
        >
          <PencilIcon className="h-12 w-12 text-blue-500" />
          <span className="mt-2 text-sm font-medium text-gray-600">
            이미지 업로드
          </span>
          <input
            id="file-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            className="sr-only"
            onChange={handleFileUpload}
          />
        </label>
        <div className="w-1/2 h-40">
          {img && (
            <img
              src={URL.createObjectURL(img)}
              alt="uploaded image"
              className="w-full h-full rounded-lg object-cover cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src={URL.createObjectURL(img)}
              alt="uploaded image"
              className="w-full h-full rounded-lg object-contain"
            />
            <button
              className="absolute top-2 right-2 bg-gray-100 rounded-full p-2"
              onClick={() => setIsModalOpen(false)}
            >
              <BackwardIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
  
}

export default ImageUploader;
