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
import InfiniteScroll from "react-infinite-scroll-component";

function Posts({ posts, like, unlike, userInfo }) {
  const [openComment, setOpenComment] = useState(undefined);
  const [data, setData] = useState(posts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const handleLike = (id, isLiked) => {
    if (isLiked !== 0) {
      unlike(id);
    } else {
      like(id);
    }
  };

  const getMorePosts = async () => {
    const cookies = nookies.get(null);

    const endpoint = process.env.API_URL + `/posts?limit=10&page=${page}`;
    const config = {
      method: "GET",
      headers: {
        Authorization: cookies.token,
      },
    };

    const req = await fetch(endpoint, config);
    const res = await req.json();

    console.log(res);

    if (res.data.data.length > 0) {
      setData([...data, ...res.data.data]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      {data.map((post, idx) => (
        <div show={openComment} key={idx} className="mt-5 mb-7 border-t rounded-lg shadow-lg px-3 lg:px-7 py-3">
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
                  <h3 className="font-inter font-medium text-lg">{post.isAnonymous !== 0 ? "Anonymous" : post.Author}</h3>
                  <TimeAgo style={{ color: "#023047" }} className="font-inter text-sm" date={post.updatedAt} />
                </div>
                <div className="cursor-pointer">
                  <MoreVertIcon fontSize="medium" style={{ color: "black", opacity: 0.5 }} />
                </div>
              </div>
            </div>

            {post.attachment && (
              <img src={`http://203.6.149.156:8480/public/${post.attachment}`} className="max-h-96 w-full mb-5 object-cover rounded-xl" alt="" />
            )}

            <div className="link styles.ql-video w-full font-normal text-base" style={{ whiteSpace: "pre-line" }}>
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
                  <Heart size={24} color="#F24949" className="animate-wiggle" variant="Bold" />
                ) : (
                  <Heart size={24} color="#F24949" />
                )}
              </button>
              <div
                onClick={() => (openComment === idx ? setOpenComment(undefined) : setOpenComment(idx))}
                className="w-4/5 lg:w-2/5 justify-around cursor-pointer flex rounded-3xl bg-gray-100 px-3 py-2"
              >
                <p>{post.commentsCount}</p>
                <Message color="#437EEB" />
              </div>
            </div>
          </div>
          {idx === openComment && <Comments commentCount={post.commentsCount} userInfo={userInfo} id={post.postId} />}
        </div>
      ))}
      <div className="w-full flex justify-center">
        <p
          onClick={getMorePosts}
          className="px-7 py-2 bg-primary hover:bg-primary/90 duration-150 text-white shadow-xl hover:shadow-lg rounded-lg mb-5 cursor-pointer"
        >
          Load More Post
        </p>
      </div>
    </>
  );
}

export default Posts;
