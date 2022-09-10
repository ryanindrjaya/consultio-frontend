import { Edit2, User } from "iconsax-react";
import React, { useState } from "react";
import FormInput from "../../components/Inputs/FormInput";
import PhotoModal from "../../components/Modal/uploadPhoto";
import { IOSSwitch } from "../../components/Switch";
import ProfileLayout from "../../layouts/Profile";
import nookies from "nookies";
import toast from "react-hot-toast";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  if (cookies.user) {
    return {
      props: {
        userInfo: JSON.parse(cookies.user),
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}

export default function Profile({ userInfo }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(userInfo);
  const [fullname, setFullname] = useState(user.fullname);
  const [address, setAddress] = useState(
    user.address == null ? "" : user.address
  );
  const [city, setCity] = useState(user.city == null ? "" : user.city);
  const [phone, setPhone] = useState(user.phone == null ? "" : user.phone);

  const fetchUser = async () => {
    const cookies = nookies.get(null, "token");
    try {
      const endpoint = process.env.API_URL + "/users/" + userInfo.userId;
      const config = {
        method: "GET",
        headers: {
          Authorization: cookies.token,
        },
      };
      const res = await axios.get(endpoint, config);
      setUser(res.data.data.profile);

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = user.userId;
    const cookies = nookies.get(null, "token");

    try {
      const endpoint = process.env.API_URL + "/users/" + userId;

      const config = {
        headers: {
          Authorization: cookies.token,
        },
      };

      const req = await axios.put(
        endpoint,
        { fullname, address, city, phone },
        config
      );

      if (req.status == 200) {
        const newData = await fetchUser();

        if (newData) {
          nookies.set(null, "user", JSON.stringify(newData.profile), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
          });

          setLoading(false);
          toast.success("Update profil berhasil");
          Router.reload("/profile");
        }
      } else {
        toast.error("Gagal mengupdate profile");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Gagal mengupdate profile");
    }
  };

  const uploadPhotoProfile = async (file) => {
    setLoading(true);
    const cookies = nookies.get(null, "token");
    const endpoint = process.env.API_URL + "/users/" + user.userId + "/photo";

    const config = {
      headers: {
        Authorization: cookies.token,
      },
    };

    const formData = new FormData();
    formData.append("photo", file);
    try {
      const req = await axios.put(endpoint, formData, config);

      if (req.status == 200) {
        const newData = await fetchUser();

        nookies.set(null, "user", JSON.stringify(newData.profile), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
        });
        toast.success("Update foto berhasil");
      } else {
        toast.error("Gagal mengupdate foto");
        console.log(req);
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengupdate foto");
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>{user.fullname || "Profile"}</title>
      </Head>
      <div className="container-lg rounded-xl shadow-md border mb-10 overflow-scroll h-screen mx-auto w-4/5 mt-10 relative scrollbar-hide">
        <div className="w-full relative">
          <img
            src="/banner.png"
            className="w-full rounded-t-xl h-50 object-cover object-bottom"
          />
          <div className="absolute left-20 shadow-sm -bottom-20 object-cover object-center w-40 h-48 rounded-xl bg-white z-10"></div>
          <img
            src={
              `http://203.6.149.156:8480/public/${user.photo}` ||
              "https://links.papareact.com/gll"
            }
            className="absolute left-20 -bottom-20 object-cover object-center z-20 w-40 h-48 rounded-xl"
          />
          <div
            onClick={() => setShowModal(true)}
            className="absolute z-40 group cursor-pointer left-20 flex justify-center items-center -bottom-20 duration-150 hover:bg-black/30 w-40 h-48 rounded-xl"
          >
            <Edit2
              className="hidden group-hover:block duration-150"
              size="64"
              color="#FFFFFF"
            />
          </div>
        </div>

        <div className="mt-28 p-5">
          <div className="w-full flex mb-10">
            <div className="w-1/2 mx-2">
              <FormInput
                type="text"
                label="Full Name"
                handleChange={(e) => setFullname(e.target.value)}
                value={fullname}
                icon={<User className="text-gray-400 w-4" />}
              />
            </div>
            <div className="w-1/2 mx-2">
              <FormInput
                type="text"
                label="City"
                handleChange={(e) => setCity(e.target.value)}
                value={city}
                icon={<User className="text-gray-400 w-4" />}
              />
            </div>
          </div>

          <div className="w-full flex mb-10">
            <div className="w-1/2 mx-2">
              <FormInput
                type="text"
                label="Address"
                handleChange={(e) => setAddress(e.target.value)}
                value={address}
                icon={<User className="text-gray-400 w-4" />}
              />
            </div>
            <div className="w-1/2 mx-2">
              <FormInput
                type="text"
                label="Phone"
                handleChange={(e) => setPhone(e.target.value)}
                value={phone}
                icon={<User className="text-gray-400 w-4" />}
              />
            </div>
          </div>

          <div className="w-full flex mb-10">
            <div className="w-1/2 mx-2">
              <span className="flex">
                <p style={{ marginBottom: 0, marginRight: "10px" }}>
                  Private Profile
                </p>
                <IOSSwitch />
              </span>
            </div>
          </div>
        </div>

        <div className="w-full justify-end px-5 py-3 flex items-center">
          {loading ? (
            <button
              type="submit"
              className="bg-primary flex justify-center items-center w-2/12 text-white font-normal py-3 text-sm rounded-lg text-center"
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
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-primary w-2/12 text-white font-normal mt-2 py-3 text-sm rounded-lg text-center"
            >
              Simpan
            </button>
          )}
        </div>
        {showModal && (
          <PhotoModal
            loading={loading}
            userPhoto={user.photo}
            showModal={showModal}
            onUpload={uploadPhotoProfile}
            closeModal={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
}

Profile.layout = ProfileLayout;
