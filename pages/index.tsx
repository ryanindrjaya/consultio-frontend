import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { Button } from "@mui/material";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Consultio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="font-poppins font-bold">Consultio</h1>
        <p>Selesaikan keluh kesahmu dengan berbagi.</p>

        <div className="mt-3">
          <Link href={"/auth/register"}>
            <Button variant={"outlined"}>Register</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
