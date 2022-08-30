import { Gallery, Heart, Message, Send2 } from "iconsax-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import nookies from "nookies";

// icon
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useEffect } from "react";
import Comments from "./Comments";

function Posts({ posts, like, unlike }) {
  const handleLike = (id, isLiked) => {
    if (isLiked !== 0) {
      unlike(id);
    } else {
      like(id);
    }
  };

  return (
    <>
      {posts.map((post) => {
        const [openComment, setOpenComment] = useState(false);
        return (
          <div
            key={post.postId}
            className="mt-5 mb-7 border-t rounded-lg shadow-lg px-7 py-3"
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
                  className="max-h-96 w-full mb-5 object-cover rounded-xl"
                  alt=""
                />
              )}

              <p className="font-normal text-base">{post.story}</p>
            </div>
            <div className="w-full pb-4 border-b">
              <div className="w-2/5 flex gap justify-between">
                <button
                  onClick={() => handleLike(post.postId, post.isLiked)}
                  className="w-2/5 justify-around cursor-pointer flex rounded-3xl bg-gray-100 px-3 py-2"
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
                  onClick={() => setOpenComment(!openComment)}
                  className="w-2/5 justify-around cursor-pointer flex rounded-3xl bg-gray-100 px-3 py-2"
                >
                  <p>{post.commentsCount}</p>
                  <Message color="#437EEB" />
                </div>
              </div>
            </div>
            {openComment && (
              <Comments commentCount={post.commentsCount} id={post.postId} />
            )}
          </div>
        );
      })}
    </>
  );
}

export default Posts;
