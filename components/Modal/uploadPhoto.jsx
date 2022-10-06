import React from "react";
import { useState } from "react";
import nookies from "nookies";
import DropFile from "../DropFile/DropFile";
import axios from "axios";

export default function Modal({ showModal, closeModal, userPhoto, onUpload }) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleUploadFiles = (files) => {
    console.log(files);
    const uploaded = [...uploadedFiles];
    const preview = [...previewImages];
    files.some((file) => {
      uploaded.push(file);
      preview.push(URL.createObjectURL(file));
    });

    setPreviewImages(preview);
    setUploadedFiles(uploaded);
  };

  const handleFileChange = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);

    handleUploadFiles(chosenFiles);
    setIsUploaded(true);
  };

  const handleUpdatePhoto = (e) => {
    e.preventDefault();
    onUpload(uploadedFiles[0]);

    closeModal();
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center h-screen items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              style={{
                width: "40vw",
              }}
              className="relative my-6 mx-auto max-w-3xl"
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Upload Foto Profil</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex flex-col justify-center items-center w-full p-6 ">
                  <div className="mb-7">
                    <img
                      className="w-40 h-40 object-cover rounded-full"
                      src={!isUploaded ? `http://203.6.149.156:8480/public/${userPhoto}` : previewImages}
                      alt=""
                    />
                  </div>
                  <DropFile onDisable={isUploaded} handleFile={handleFileChange} />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal}
                  >
                    Batalkan
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleUpdatePhoto}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 h-screen fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
