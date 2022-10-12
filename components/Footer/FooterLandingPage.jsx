import { Call, DirectboxNotif, Location } from "iconsax-react";
import Link from "next/link";
import React from "react";

const services = ["Konsultasi Kesehatan Mental", "Konsultasi Bantuan Hukum", "Bantuan Langsung"];

const sosmed = [
  { name: "Instagram", link: "#" },
  { name: "Linkedin", link: "#" },
  { name: "Twitter", link: "#" },
];

function FooterLandingPage() {
  return (
    <>
      <div className="grid-cols-8 lg:flex gap-x-16 justify-start pt-14 pb-11 mt-10 lg:flex-wrap px-4 lg:px-0">
        <div className="col-span-8 lg:col-span-2 flex flex-1 mb-5 justify-center lg:justify-start pb-3 border-b lg:border-none">
          <Link href={"/"}>
            <img className="cursor-pointer object-contain lg:h-4 lg:mt-1" src="/consultio.svg" alt="logo consultio" />
          </Link>
        </div>
        <div className="col-span-8 lg:col-span-6 flex flex-wrap gap-x-6 gap-y-5">
          <div className="col-span-4">
            <h2 className="font-inter mb-4 text-gray-700 text-base font-bold">Our Features</h2>
            <div className="space-y-3">
              {services.map((service, idx) => (
                <Link key={idx} href={`#`}>
                  <p className="cursor-pointer text-base font-medium text-gray-500">{service}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-4 flex-1 lg:flex-none">
            <h2 className="font-inter mb-4 text-gray-700 text-base font-bold">Our Social Media</h2>
            <div className="space-y-3">
              {sosmed.map((sosmed, idx) => (
                <Link key={idx} href={`#`}>
                  <p className="cursor-pointer text-base font-medium text-gray-500">{sosmed.name}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full lg:flex-1 lg:w-auto">
            <h2 className="font-inter mb-4 text-gray-700 text-base font-bold">Get in Touch</h2>
            <div className="space-y-3">
              <div className="flex gap-x-2">
                <Location size="24" color="#437EEB" />
                <p className="text-base font-medium text-gray-500">Jalan Kolonel Sutarto Nomor 150K, Jebres, Surakarta City, Central Java 57126</p>
              </div>
              <div className="flex gap-x-2">
                <DirectboxNotif size="24" color="#437EEB" />
                <p className="text-base font-medium text-gray-500">consultio@gmail.com</p>
              </div>
              <div className="flex gap-x-2">
                <Call size="24" color="#437EEB" />
                <p className="text-base font-medium text-gray-500">+62 0877 5101 9186</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterLandingPage;
