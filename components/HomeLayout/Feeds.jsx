import React from "react";
import InputPost from "./InputPost";
import Posts from "./Posts";

function Feeds({ data, onLike, onUnlike }) {
  return (
    <div className="w-3/5 px-5 overflow-scroll scrollbar-hide">
      {/* Input post */}
      <InputPost />
      {/* Posts */}
      <Posts posts={data} like={onLike} unlike={onUnlike} />
    </div>
  );
}

export default Feeds;
