import axios from "axios";
import { Send2 } from "iconsax-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";

function Comments({ commentCount, id }) {
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo, userToken } = useSelector((state) => state.user);

  useEffect(() => {
    getComment(id);
  }, [handleSubmit]);

  const getComment = async (idPost) => {
    setLoading(true);
    const endpoint = process.env.API_URL + "/comments/" + idPost;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = process.env.API_URL + "/comments/" + id;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
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
          src={userInfo?.profile?.photo || "https://links.papareact.com/gll"}
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

      {commentCount > 0
        ? comments.map((comment, idx) => (
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
        : ""}
    </>
  );
}

export default Comments;
