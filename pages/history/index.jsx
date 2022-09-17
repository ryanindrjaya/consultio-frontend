import { ArrowSquareRight } from "iconsax-react";
import React from "react";
import HistoryLayout from "../../layouts/History";

export default function History() {
  return (
    <div className="w-full px-8 py-6">
      <div className="w-full flex bg-black/20  rounded-lg">
        <div className="w-1/2 cursor-pointer hover:bg-primary/90 bg-primary rounded-lg py-4 flex justify-center items-center">
          <h2 className="font-poppins text-white font-medium">
            Konsultasi Kesehatan Mental
          </h2>
        </div>
        <div className="w-1/2 cursor-pointer duration-150 hover:bg-primary/60 rounded-lg py-4 flex justify-center items-center">
          <h2 className="font-poppins text-white font-medium">
            Konsultasi Hukum
          </h2>
        </div>
      </div>

      {/* History Card */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 mt-9 gap-x-5 gap-y-5">
        <div
          style={{ borderColor: "#437EEB" }}
          className="w-full col-span-1 flex justify-between items-center  border-2 rounded-lg"
        >
          <div className="flex gap-x-6 px-4 py-2">
            <img
              src="https://interclinical.com.au/wp-content/uploads/2019/11/shutterstock_580538548-scaled.jpg"
              className="w-32 h-32 object-cover object-center rounded-lg"
              alt=""
            />
            <div className="flex flex-col justify-center font-poppins">
              <h1 className="font-medium text-base">Angelia Marche</h1>
              <p className="text-xs text-black/40">30 Oktober 2022</p>
              <h3 className="text-sm">Konsultan Kesehatan Mental</h3>
            </div>
          </div>
          <div className="group cursor-pointer transition-all duration-300 w-2/6 bg-primary/0 hover:bg-primary h-full rounded-l-lg flex flex-col justify-center items-center">
            <ArrowSquareRight
              size={32}
              className="text-primary transition-all duration-300 group-hover:text-white"
            />
            <p className="hidden transition-all duration-300 group-hover:block font-poppins font-medium text-xs mt-2 text-white">
              Lihat Riwayat
            </p>
          </div>
        </div>

        <div
          style={{ borderColor: "#437EEB" }}
          className="w-full flex justify-between items-center  border-2 rounded-lg"
        >
          <div className="flex gap-x-6 px-4 py-2">
            <img
              src="https://interclinical.com.au/wp-content/uploads/2019/11/shutterstock_580538548-scaled.jpg"
              className="w-32 h-32 object-cover object-center rounded-lg"
              alt=""
            />
            <div className="flex flex-col justify-center font-poppins">
              <h1 className="font-medium text-base">Angelia Marche</h1>
              <p className="text-xs text-black/40">30 Oktober 2022</p>
              <h3 className="text-sm">Konsultan Kesehatan Mental</h3>
            </div>
          </div>
          <div className="group cursor-pointer transition-all duration-300 w-2/6 bg-primary/0 hover:bg-primary h-full rounded-l-lg flex flex-col justify-center items-center">
            <ArrowSquareRight
              size={32}
              className="text-primary transition-all duration-300 group-hover:text-white"
            />
            <p className="hidden transition-all duration-300 group-hover:block font-poppins font-medium text-xs mt-2 text-white">
              Lihat Riwayat
            </p>
          </div>
        </div>

        <div
          style={{ borderColor: "#437EEB" }}
          className="w-full flex justify-between items-center  border-2 rounded-lg"
        >
          <div className="flex gap-x-6 px-4 py-2">
            <img
              src="https://interclinical.com.au/wp-content/uploads/2019/11/shutterstock_580538548-scaled.jpg"
              className="w-32 h-32 object-cover object-center rounded-lg"
              alt=""
            />
            <div className="flex flex-col justify-center font-poppins">
              <h1 className="font-medium text-base">Angelia Marche</h1>
              <p className="text-xs text-black/40">30 Oktober 2022</p>
              <h3 className="text-sm">Konsultan Kesehatan Mental</h3>
            </div>
          </div>
          <div className="group cursor-pointer transition-all duration-300 w-2/6 bg-primary/0 hover:bg-primary h-full rounded-l-lg flex flex-col justify-center items-center">
            <ArrowSquareRight
              size={32}
              className="text-primary transition-all duration-300 group-hover:text-white"
            />
            <p className="hidden transition-all duration-300 group-hover:block font-poppins font-medium text-xs mt-2 text-white">
              Lihat Riwayat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

History.layout = HistoryLayout;
