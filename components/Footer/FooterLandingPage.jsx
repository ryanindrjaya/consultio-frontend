import { DirectboxNotif, Location } from "iconsax-react";
import Link from "next/link";
import React from "react";

const services = [
  "Konsultasi Kesehatan Mental",
  "Konsultasi Bantuan Hukum",
  "Bantuan Langsung",
];

const sosmed = [
  { name: "Instagram", link: "#" },
  { name: "Linkedin", link: "#" },
  { name: "Twitter", link: "#" },
];

function FooterLandingPage() {
  return (
    <div className="grid-cols-8">
      <div className="col-span-8 lg:col-span-2 flex mb-5 justify-center pb-3 border-b lg:border-none">
        <Link href={"/"}>
          <img
            className="cursor-pointer object-contain"
            src="/consultio.svg"
            alt="logo consultio"
          />
        </Link>
      </div>
      <div className="col-span-8 lg:col-span-6 flex flex-wrap gap-x-6 gap-y-5">
        <div className="col-span-4">
          <h2 className="font-inter mb-4 text-gray-700 text-base font-bold">
            Our Features
          </h2>
          <div className="space-y-3">
            {services.map((service, idx) => (
              <Link key={idx} href={`#`}>
                <p className="cursor-pointer text-base font-medium text-gray-500">
                  {service}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-4 flex-1 lg:flex-none">
          <h2 className="font-inter mb-4 text-gray-700 text-base font-bold">
            Our Social Media
          </h2>
          <div className="space-y-3">
            {sosmed.map((sosmed, idx) => (
              <Link key={idx} href={`#`}>
                <p className="cursor-pointer text-base font-medium text-gray-500">
                  {sosmed.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full">
          <h2 className="font-inter mb-4 text-gray-700 text-base font-bold">
            Get in Touch
          </h2>
          <div className="space-y-3">
            <div className="flex gap-x-2">
              <Location size="32" color="#437EEB" />
              <p className="text-base font-medium text-gray-500">
                Jalan Kolonel Sutarto Nomor 150K, Jebres, Surakarta City,
                Central Java 57126
              </p>
            </div>
            <div className="flex gap-x-2">
              <DirectboxNotif size="32" color="#437EEB" />
              <p className="text-base font-medium text-gray-500">
                Jalan Kolonel Sutarto Nomor 150K, Jebres, Surakarta City,
                Central Java 57126
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterLandingPage;
