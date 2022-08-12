import React, { useState } from "react";

// Components
import InputText from "../../components/InputText";

// Icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Link from "next/link";

function register() {
  const [passVisibility, setPassVisibility] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleNameInput = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col mx-auto lg:flex-row justify-around items-center h-screen bg-gray-300">
      <div className="hidden lg:inline">
        <img
          style={{ width: 600 }}
          className=""
          src="https://static.vecteezy.com/system/resources/previews/000/341/499/original/doctor-caring-brain-character-for-mental-health-vector-illustration.png"
          alt=""
        />
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <span className="bg-gray-400 text-white px-10 py-2">logo</span>
        <div className="mt-3">
          <h1 className="font-bold font-poppins text-2xl">
            Selamat datang di Consultio
          </h1>
          <p className="text-md text-gray-400">
            selesaikan keluh kesahmu dengan mudah disini
          </p>
        </div>
        <form className="w-full">
          <div className="mt-4 flex-1">
            <InputText
              type="text"
              label="Full Name"
              handleChange={handleNameInput}
              value={fullName}
              icon={<PersonOutlineOutlinedIcon className="text-gray-400 w-5" />}
            />
          </div>
          <div className="mt-4">
            <InputText
              type="email"
              label="Email"
              handleChange={handleEmailInput}
              value={email}
              icon={
                <AlternateEmailOutlinedIcon className="text-gray-400 w-4" />
              }
            />
          </div>
          <div className="my-4">
            <InputText
              type={passVisibility ? "text" : "password"}
              label="Password"
              handleChange={handlePasswordInput}
              value={password}
              icon={
                <button
                  type="button"
                  onClick={() => setPassVisibility(!passVisibility)}
                >
                  {passVisibility ? (
                    <VisibilityOutlinedIcon className="text-gray-400 w-4" />
                  ) : (
                    <VisibilityOffOutlinedIcon className="text-gray-400 w-4" />
                  )}
                </button>
              }
            />
          </div>
          <div className="flex w-full flex-col justify-center items-center ">
            <button className="bg-primary w-3/4 text-white font-normal py-3 text-sm rounded-lg text-center">
              Register
            </button>
            <p className="text-sm font-medium mt-4">
              Sudah memiliki akun?{" "}
              <Link href={"/auth/login"}>
                <span className="text-primary cursor-pointer">Login</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default register;
