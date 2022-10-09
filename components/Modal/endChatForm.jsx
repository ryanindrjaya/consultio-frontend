import React from "react";
import { TextField } from "@mui/material";
import { TextBlock } from "iconsax-react";

export default function Modal({ closeModal, loading, message, onChange, onSubmit }) {
  return (
    <>
      <div className="justify-center h-screen items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          style={{
            width: "60vw",
          }}
          className="relative my-6 mx-auto max-w-3xl"
        >
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex relative items-start justify-center p-5  rounded-t">
              <h3 className="text-2xl font-medium text-center font-poppins">Masukan solusi yang bisa anda berikan</h3>
              <button
                className="absolute top-3 right-3 p-1 ml-auto bg-transparent border-0 text-black opacity-20 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              >
                <span title="Cancel" className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <TextField
                label="Solusi Permasalahan"
                className="w-full"
                placeholder="Solusi anda..."
                onChange={onChange}
                value={message}
                multiline
                rows={6}
              />
              <TextBlock size={24} color="#437EEB" className="absolute top-9 right-9" />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-solid border-slate-200 rounded-b">
              {loading ? (
                <button
                  disabled
                  className="bg-primary text-white font-inter text-sm px-9 py-3 hover:opacity-90 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  <svg
                    aria-hidden="true"
                    className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-white fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={onSubmit}
                  className="bg-primary text-white font-inter text-sm px-9 py-3 hover:opacity-90 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Ajukan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 h-screen fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
