import axios from "axios";
import { Send2 } from "iconsax-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TimeAgo from "react-timeago";

import nookies from "nookies";

function Comments({ commentCount, id, userInfo }) {
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("loading", loading);

  useEffect(() => {
    getComment(id);
  }, [handleSubmit]);

  const getComment = async (idPost) => {
    setLoading(true);
    const endpoint = process.env.API_URL + "/comments/" + idPost;
    const cookies = nookies.get(null, "token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.token,
      },
    };
    try {
      const res = await axios.get(endpoint, config);
      console.log(res.data.data.data);
      if (res.status === 200) {
        setLoading(false);
        setComments(res.data.data.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cookies = nookies.get(null, "token");
    const endpoint = process.env.API_URL + "/comments/" + id;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.token,
      },
    };

    const res = await axios.post(endpoint, { message: inputComment }, config);

    if (res.status == 201) {
      setLoading(false);
      toast("Komen anda telah terkirim");
      await getComment(id);

      commentCount += 1;
      setInputComment("");
    } else {
      console.log(res);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full pt-4 mb-4 flex gap-x-3 justify-between items-center"
      >
        <img
          src={userInfo?.photo || "https://links.papareact.com/gll"}
          className="h-12 w-12 object-cover rounded-lg"
          alt=""
        />

        <div className="bg-gray-100 rounded-xl flex flex-1 items-center h-12 px-6">
          <input
            type="text"
            onChange={(e) => setInputComment(e.target.value)}
            value={inputComment}
            className="outline-none bg-transparent flex-1 font-inter font-normal text-base"
            placeholder="Type a comment"
          />
        </div>

        <button type="submit">
          <Send2 size={32} variant="Bold" color="#B4C1C8" />
        </button>
      </form>

      {loading != true ? (
        comments.map((comment, idx) => (
          <div key={idx} className="flex justify-between mb-3">
            <div className="flex gap-x-6">
              <img
                src={
                  `http://203.6.149.156:8480/public/${comment.photo}` ||
                  "https://links.papareact.com/gll"
                }
                className="h-12 w-12 object-cover rounded-lg"
                alt=""
              />
              <div>
                <p
                  style={{ color: "#023047" }}
                  className="font-inter font-medium text-base"
                >
                  {comment.fullname}
                </p>
                <p
                  style={{ backgroundColor: "#F7F7F7" }}
                  className="font-inter font-normal rounded-md text-base p-2"
                >
                  {comment.message}
                </p>
              </div>
            </div>
            <TimeAgo
              style={{ color: "#023047" }}
              className="font-inter text-sm"
              date={comment.createdAt}
            />
          </div>
        ))
      ) : (
        <div className="w-full justify-center items-center flex gap-x-2">
          <p className="text-center text-blue-600">Sedang mengambil data... </p>
          <div
            class="w-5 h-5 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent"
          ></div>
        </div>
      )}
    </>
  );
}

export default Comments;
