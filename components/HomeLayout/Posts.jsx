import { Heart, Message } from "iconsax-react";
import React, { useState } from "react";
const TimeAgo = dynamic(() => import("react-timeago"), { ssr: false });
import parse from "html-react-parser";
import nookies from "nookies";

import styles from "./Posts.module.css";

// icon
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Comments from "./Comments";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

function Posts({ posts, like, unlike, userInfo }) {
  const [openComment, setOpenComment] = useState(undefined);
  const [data, setData] = useState(posts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLike = async (id, isLiked) => {
    if (isLiked === 0) {
      const endpoint = process.env.API_URL + "/like/" + id;
      const cookies = nookies.get(null);

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token
        }
      };
      const res = await fetch(endpoint, config);

      if (res.status === 200) {
        const selectedPost = data.find((post) => post.postId === id);
        const index = data.indexOf(selectedPost);

        const newData = [...data];
        newData[index].isLiked = 1;
        newData[index].likesCount = newData[index].likesCount + 1;
        setData(newData);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const endpoint = process.env.API_URL + "/like/" + id;
      const cookies = nookies.get(null);

      const config = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.token
        }
      };
      const res = await fetch(endpoint, config);

      if (res.status === 200) {
        const selectedPost = data.find((post) => post.postId === id);
        const index = data.indexOf(selectedPost);

        const newData = [...data];
        newData[index].isLiked = 0;
        newData[index].likesCount = newData[index].likesCount - 1;
        setData(newData);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const getMorePosts = async () => {
    setLoading(true);
    const cookies = nookies.get(null);

    const endpoint = process.env.API_URL + `/posts?limit=10&page=${page}`;
    const config = {
      method: "GET",
      headers: {
        Authorization: cookies.token
      }
    };

    const req = await fetch(endpoint, config);
    const res = await req.json();

    if (res.data?.data?.length > 0) {
      setData([...data, ...res.data.data]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  return (
    <>
      {data.map((post, idx) => (
        <div
          show={openComment}
          key={idx}
          className="mt-5 mb-7 border-t rounded-lg shadow-lg px-3 lg:px-7 py-3"
        >
          <div className="pb-4 border-b mb-3">
            <div className="flex gap-x-3 mb-5">
              <img
                src={
                  post.isAnonymous !== 0
                    ? "https://www.nicepng.com/png/full/73-730154_open-default-profile-picture-png.png"
                    : `http://203.6.149.156:8480/public/${post.profilePhoto}`
                }
                className="h-12 w-12 object-cover rounded-lg"
                alt=""
              />

              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col justify-between h-12">
                  <h3 className="font-inter font-medium text-lg">
                    {post.isAnonymous !== 0 ? "Anonymous" : post.Author}
                  </h3>
                  <TimeAgo
                    style={{ color: "#023047" }}
                    className="font-inter text-sm"
                    date={post.updatedAt}
                  />
                </div>
                <div className="cursor-pointer">
                  <MoreVertIcon
                    fontSize="medium"
                    style={{ color: "black", opacity: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {post.attachment && (
              <img
                src={`http://203.6.149.156:8480/public/${post.attachment}`}
                className="max-h-96 mt-10 lg:mt-0 w-full mb-5 object-cover rounded-xl"
                alt=""
              />
            )}

            <div
              className="link mt-10 lg:mt-0 styles.ql-video w-full font-normal text-base"
              style={{ whiteSpace: "pre-line" }}
            >
              {parse(post.story)}
            </div>
          </div>
          <div className="w-full pb-4 border-b">
            <div className="w-1/2 lg:w-2/5 flex gap-x-2 lg:gap-x-0 justify-between">
              <button
                onClick={() => handleLike(post.postId, post.isLiked)}
                className="w-4/5 lg:w-2/5 justify-around cursor-pointer flex rounded-3xl bg-gray-100 px-3 py-2"
              >
                <p>{post.likesCount}</p>

                {post.isLiked !== 0 ? (
                  <Heart
                    size={24}
                    color="#F24949"
                    className="animate-wiggle"
                    variant="Bold"
                  />
                ) : (
                  <Heart size={24} color="#F24949" />
                )}
              </button>
              <div
                onClick={() =>
                  openComment === idx
                    ? setOpenComment(undefined)
                    : setOpenComment(idx)
                }
                className="w-4/5 lg:w-2/5 justify-around cursor-pointer flex rounded-3xl bg-gray-100 px-3 py-2"
              >
                <p>{post.commentsCount}</p>
                <Message color="#437EEB" />
              </div>
            </div>
          </div>
          {idx === openComment && (
            <Comments
              commentCount={post.commentsCount}
              userInfo={userInfo}
              id={post.postId}
            />
          )}
        </div>
      ))}
      {hasMore && (
        <div className="w-full flex justify-center">
          {!loading ? (
            <p
              onClick={getMorePosts}
              className="px-7 py-2 bg-primary hover:bg-primary/90 duration-150 text-white shadow-xl hover:shadow-lg rounded-lg mb-5 cursor-pointer"
            >
              Load More Post
            </p>
          ) : (
            <div className="px-7 py-2 bg-primary hover:bg-primary/90 duration-150 text-white shadow-xl hover:shadow-lg rounded-lg mb-5 cursor-progress">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-200 animate-spin dark:text-white fill-blue-600"
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
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Posts;
