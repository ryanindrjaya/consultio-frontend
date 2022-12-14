import React from "react";

function DropFile({ handleFile, onDisable }) {
  return (
    <div class="max-w-xl">
      <label
        htmlFor="fileUpload"
        class="flex justify-center items-center
         w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
      >
        <span class="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span class="font-medium text-gray-600">
            Upload foto profilmu disini
            <span class="text-blue-600 underline ml-1">telusuri file</span>
          </span>
        </span>
        <input disabled={onDisable} id="fileUpload" multiple type="file" onChange={handleFile} name="file_upload" class="hidden" />
      </label>
    </div>
  );
}

export default DropFile;
