import { useSelector } from "react-redux";
import React, { useRef, useState } from "react";

// icons
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

function InputPost() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const imageInputRef = useRef(false);
  const [imageInput, setImageInput] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 object-cover rounded-full mt-4"
        src={userInfo?.profil?.photo || "https://links.papareact.com/gll"}
        alt=""
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="What's Happening?"
          />
          <div className="flex items-center">
            <div className="flex space-x-2 text-twitter flex-1">
              <InsertPhotoIcon
                onClick={() => setImageInput(!imageInput)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
            </div>

            <button
              onClick={() => {}}
              disabled={!input || !userInfo}
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
            >
              Posting
            </button>
          </div>
          {imageInput && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image URL..."
              />
              <button
                type="submit"
                onClick={() => {}}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              src={image}
              className="mt-10 h-40 w-full rounded-xl object-contain shadow.lg"
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default InputPost;
