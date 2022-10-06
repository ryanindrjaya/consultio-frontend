import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";
import Auth from "../../layouts/Auth";

// Components
import FormInput from "../../components/Inputs/FormInput";
import { Eye, EyeSlash, User } from "iconsax-react";
import axios from "axios";
import Head from "next/head";

// Icons

export default function Login() {
  const token = nookies.get("token");

  // controlled form hooks
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passVisibility, setPassVisibility] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (success) {
      router.replace("/home");
    }
    // if (userInfo) {
    //   router.replace("/home");
    // }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = process.env.API_URL + "/login";
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const req = await axios.post(endpoint, { email, password }, config);
      const user = req.data.data;

      console.log(user);

      let userData;
      if (user.role === "USER") {
        userData = {
          userId: user.profile.userId,
          fullname: user.profile.fullname,
          email: user.profile.email,
          role: user.profile.role,
          photo: user.profile.photo,
          address: user.profile.address,
          phone: user.profile.phone,
          city: user.profile.city,
          isVerified: user.profile.isVerified,
          isPrivate: user.profile.isPrivate,
        };
      } else {
        userData = user.profile;
      }

      if (user.token) {
        const role = user.profile.role;

        // set new token
        nookies.set(null, "token", user.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
        });

        // set role token
        nookies.set(null, "role", role, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
        });

        // save authenticated user to cookies
        nookies.set(null, "user", JSON.stringify(userData), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
        });
        setSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Login - Consultio</title>
      </Head>
      <div className="flex flex-col justify-center h-full p-6">
        <div className="text-center mb-7">
          <h1 className="font-bold font-inter text-2xl">Selamat datang di Consultio</h1>
          <p className="text-md font-normal text-black text-opacity-40">selesaikan keluh kesahmu dengan mudah disini</p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <FormInput type="email" label="Email" handleChange={handleEmailInput} value={email} icon={<User className="text-gray-400 w-4" />} />
          </div>
          <div className="my-4">
            <FormInput
              type={passVisibility ? "text" : "password"}
              label="Password"
              handleChange={handlePasswordInput}
              value={password}
              icon={
                <button type="button" onClick={() => setPassVisibility(!passVisibility)}>
                  {passVisibility ? <Eye className="text-gray-400 w-4" /> : <EyeSlash className="text-gray-400 w-4" />}
                </button>
              }
            />
          </div>
          {error && <div className="text-center  text-red-600 font-bold text-xs my-3">{error}</div>}
          <div className="flex w-full flex-col justify-center items-center ">
            {loading ? (
              <button
                type="submit"
                className="bg-primary flex justify-center items-center w-3/4 text-white font-normal py-3 text-sm rounded-lg text-center"
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
                <span>Loading...</span>
              </button>
            ) : (
              <button type="submit" className="bg-primary w-3/4 text-white font-normal mt-2 py-3 text-sm rounded-lg text-center">
                Masuk
              </button>
            )}
            <p className="text-sm font-medium mt-4">
              Belum punya akun?{" "}
              <Link href={"/auth/register"}>
                <span className="text-primary cursor-pointer">Daftar</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

Login.layout = Auth;
