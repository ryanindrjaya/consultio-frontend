import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { Button } from "@mui/material";
import LandingPage from "../layouts/LandingPage";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Consultio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

Home.layout = LandingPage;
