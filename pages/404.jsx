import Head from "next/head";
import Custom404Layout from "../layouts/404";
import Lottie from "lottie-react";
import notFound from "../public/lottie/notfound.json";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className="w-full flex flex-col items-center ">
        <Lottie style={{ width: "20rem", height: "20rem" }} animationData={notFound} loop={true} />
        <h1 className="font-poppins text-xl font-bold text-gray-700">Aduh, halaman yang kamu cari tidak ada</h1>
        <Link href="/">
          <button className="font-sans py-3 px-6 rounded-lg bg-primary mt-6 text-md font-bold text-white">Kembali ke Beranda</button>
        </Link>
      </div>
    </>
  );
}

Custom404.layout = Custom404Layout;
