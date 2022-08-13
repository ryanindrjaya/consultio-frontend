import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Link from "next/link";

// Components
import InputText from "../../components/InputText";

// Icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function register() {
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passVisibility, setPassVisibility] = useState(false);
  const [passConfirmVisibility, setPassConfirmVisibility] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError(true);
    }

    if (fullName.length <= 8) {
      setNameError(true);
      return;
    }

    setLoading(true);

    const endpoint = "http://localhost:5000";

    try {
      await axios.post(`${endpoint}/register/user`, {
        fullname: fullName,
        email: email,
        password: password,
      });
      setLoading(false);
      router.push("/auth/login");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setLoading(false);
        setFullName("");
        setEmail("");
        setPassword("");
      }
    }
  };

  const handleNameInput = (e) => {
    setFullName(e.target.value);
    setNameError(false);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError(false);
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
      <div className="bg-white rounded-xl max-w-xl h-auto p-6 shadow-lg">
        <span className="bg-gray-400 text-white px-10 py-2">logo</span>
        <div className="mt-3">
          <h1 className="font-bold font-poppins text-2xl">
            Selamat datang di Consultio
          </h1>
          <p className="text-md text-gray-400">
            selesaikan keluh kesahmu dengan mudah disini
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mt-4 flex-1">
            <InputText
              helperText={nameError ? "Harap masukkan nama yang valid" : ""}
              type="text"
              invalid={nameError ? true : false}
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
              helperText={passwordError ? "Password tidak sama!" : ""}
              invalid={passwordError ? true : false}
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
          <div className="my-4">
            <InputText
              invalid={passwordError ? true : false}
              type={passConfirmVisibility ? "text" : "password"}
              label="Konfirmasi password"
              handleChange={handleConfirmPasswordInput}
              value={confirmPassword}
              icon={
                <button
                  type="button"
                  onClick={() =>
                    setPassConfirmVisibility(!passConfirmVisibility)
                  }
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
            {loading ? (
              <button
                type="submit"
                className="bg-primary flex justify-center items-center w-3/4 text-white font-normal py-3 text-sm rounded-lg text-center"
              >
                <svg
                  aria-hidden="true"
                  class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-white fill-blue-600"
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
              <button
                type="submit"
                className="bg-primary w-3/4 text-white font-normal py-3 text-sm rounded-lg text-center"
              >
                Register
              </button>
            )}
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
