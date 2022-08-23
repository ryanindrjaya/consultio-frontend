import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../features/user/userAction";
import FormInput from "../../components/Inputs/FormInput";
import Auth from "../../layouts/Auth";
import nookies from "nookies";

export default function emailVerification() {
  const [isSent, setIsSent] = useState(false);

  const { loading, error, userInfo, success } = useSelector(
    (state) => state.user
  );

  console.log("token at next", userInfo.token);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center h-full p-6">
      {!loading ? (
        <>
          <div className="text-center mb-4">
            <h1 className="font-bold font-inter text-2xl">
              Konfirmasi Email Anda
            </h1>
            {isSent ? (
              <p className="text-md font-normal text-black text-opacity-40 mb-4">
                silahkan periksa email untuk memeriksa kode
              </p>
            ) : (
              <p className="text-md font-normal text-black text-opacity-40 mb-4">
                silahkan klik tombol dibawah untuk mengirim kode verifikasi ke{" "}
                <span className="underline">{userInfo.profile.email}</span>
              </p>
            )}

            {isSent ? (
              <p className="text-sm font-medium text-primary underline">
                Klik untuk mengirim ulang kode
              </p>
            ) : (
              <button
                type="submit"
                onClick={() => dispatch(verifyEmail(userInfo.token))}
                className="bg-blue-400 hover:bg-primary duration-150 w-3/4 cursor-pointer text-white font-normal py-3 mt-3 text-sm rounded-lg text-center"
                disabled={loading}
              >
                Kirim
              </button>
            )}
          </div>
          <form className="w-full">
            <div className="w-full flex justify-between">
              {error && (
                <p className="text-red-600 font-bold text-xs">{error}</p>
              )}
            </div>
            {error && (
              <div className="text-center  text-red-600 font-bold text-xs my-3"></div>
            )}
          </form>
        </>
      ) : (
        <p>loading ges</p>
      )}
    </div>
  );
}

emailVerification.layout = Auth;
