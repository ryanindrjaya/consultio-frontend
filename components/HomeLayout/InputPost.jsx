import { useSelector } from "react-redux";
import React, { useRef, useState } from "react";

// icons
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Gallery } from "iconsax-react";

// components
import { IOSSwitch } from "../Switch";
import toast from "react-hot-toast";
import axios from "axios";

function InputPost() {
  const [story, setStory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnonym, setIsAnonym] = useState(false);

  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.user);
  const firstName = userInfo?.profile?.fullname?.split(" ");

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 10485760) {
      toast.error("File maksimum yang bisa diupload cuman 10Mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removePhoto = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = userInfo.profile.userId;
    const file = new FormData();

    file.append("photo", image);
    file.append("story", story);
    file.append("userId", userId);

    try {
      const config = {
        headers: {
          Authorization: userInfo.token,
        },
      };

      const endpoint = process.env.API_URL + "/posts";

      const res = await axios.post(endpoint, file, config);
      console.log(res);

      setLoading(false);
      setStory("");
      setImage(null);
      setImagePreview(null);
      toast("Cerita anda telah terupload");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      encType="mutipart/form-data"
      onSubmit={handlePost}
      className="mt-5 mb-7 border-t rounded-lg shadow-lg px-7 py-3"
    >
      <div className="flex gap-x-5 pb-5 border-b">
        <img
          src={userInfo?.profile?.photo || "https://links.papareact.com/gll"}
          className="h-12 w-12 object-cover rounded-lg"
          alt=""
        />

        <div className="bg-gray-100 rounded-xl flex flex-1 items-center h-12 px-6">
          <input
            type="text"
            onChange={(e) => setStory(e.target.value)}
            value={story}
            className="outline-none bg-transparent flex-1 font-inter font-normal text-base"
            placeholder={
              userInfo ? `Apa yang mau kamu ceritakan, ${firstName[0]}?` : ""
            }
          />
        </div>
      </div>
      {imagePreview && (
        <div className="relative">
          <img
            src={imagePreview}
            className="max-h-96 w-full mb-5 object-cover rounded-xl"
            alt=""
          />
          <button
            onClick={removePhoto}
            className="p-2 flex shadow-xl justify-center items-center w-8 h-8 absolute top-3 right-3 bg-red-600 text-xs rounded-lg text-white"
          >
            <p>X</p>
          </button>
        </div>
      )}
      <div className="flex py-4">
        <label
          htmlFor="photo"
          className="flex-1 cursor-pointer hover:text-primary duration-100 flex gap-x-4 justify-center items-center"
        >
          <input onChange={validateImg} type="file" id="photo" hidden />

          <Gallery variant="Bold" size={22} color="#437EEB" />

          <p className="font-inter text-sm font-normal">Photo</p>
        </label>
        <div className="flex-1 flex gap-x-4 justify-end items-center">
          <span onClick={() => setIsAnonym(!isAnonym)}>
            <IOSSwitch />
          </span>
          <p className="font-inter text-sm font-normal">
            Sembunyikan identitas
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end">
        {loading ? (
          <button
            type="submit"
            className="font-medium flex justify-center bg-primary text-white duration-200 px-7 py-2 text-sm rounded-lg border"
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
          </button>
        ) : (
          <button
            type="submit"
            disabled={!userInfo}
            className="font-medium hover:bg-primary hover:text-white duration-200 px-7 py-2 text-sm rounded-lg border"
            style={{ borderColor: "#437EEB" }}
          >
            Posting
          </button>
        )}
      </div>
    </form>
  );
}

export default InputPost;
