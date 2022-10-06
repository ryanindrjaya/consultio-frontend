import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Auth from "../../layouts/Auth";
import nookies from "nookies";

import Lottie from "lottie-react";
import successLottie from "../../public/lottie/success.json";
import failedLottie from "../../public/lottie/failed.json";
import axios from "axios";
import toast from "react-hot-toast";

export default function Verify() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const Indicator = () => {
    if (success) {
      return (
        <Lottie
          className="w-36 h-36"
          animationData={successLottie}
          loop={false}
        />
      );
    } else {
      return (
        <Lottie
          className="w-36 h-36"
          animationData={failedLottie}
          loop={false}
        />
      );
    }
  };

  const router = useRouter();

  const handleVerifyUser = async (userInfo, id) => {
    setLoading(true);

    const token = id;
    const cookies = nookies.get(null);
    const userId = userInfo.userId;

    try {
      const config = {
        headers: {
          Authorization: cookies.token
        }
      };

      const endpoint = process.env.API_URL + "/users/verifyEmail";

      const res = await axios.post(endpoint, { token }, config);

      if (res) {
        try {
          const getUser = await axios.get(
            process.env.API_URL + "/users/" + userId,
            config
          );

          const newUser = getUser.data.data;

          let userData;
          if (newUser.role === "USER") {
            userData = {
              userId: newUser.profile.userId,
              fullname: newUser.profile.fullname,
              email: newUser.profile.email,
              role: newUser.profile.role,
              photo: newUser.profile.photo,
              address: newUser.profile.address,
              phone: newUser.profile.phone,
              city: newUser.profile.city,
              isVerified: newUser.profile.isVerified,
              isPrivate: newUser.profile.isPrivate,
            };
          } else {
            userData = newUser.profile;
          }

          if (getUser) {
            setSuccess(true);
            nookies.set(null, "user", JSON.stringify(userData), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict"
            });

            nookies.set(null, "role", JSON.stringify(newUser.role), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict"
            });
            setLoading(false);

            setTimeout(() => router.replace("/home"), 5000);
          }
        } catch (error) {
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cookies = nookies.get(null);
    const user = JSON.parse(cookies.user);
    const id = router.query.id;

    if (user && user.isVerified === false) {
      handleVerifyUser(user, id);
    } else {
      toast.error("Akun anda sudah terverifikasi");
      setSuccess(false);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full p-6">
      {!loading ? (
        <>
          <Indicator />
          {success ? (
            <p className="text-lg text-gray-700 text-center font-bold">
              Email telah terkonfirmasi
            </p>
          ) : (
            <p className="text-lg text-gray-700 text-center font-bold">
              Email gagal terverifikasi
            </p>
          )}
        </>
      ) : (
        <svg
          aria-hidden="true"
          className="w-16 h-16 text-gray-200 animate-spin dark:text-white fill-blue-600"
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
      )}
    </div>
  );
}

Verify.layout = Auth;
