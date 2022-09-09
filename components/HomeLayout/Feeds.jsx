import React from "react";
import InputPost from "./InputPost";
import Posts from "./Posts";

function Feeds({ data, onLike, onUnlike, userInfo, handleSubmit }) {
  return (
    <div className="w-3/5 px-5 overflow-scroll scrollbar-hide">
      {/* Input post */}
      <InputPost userInfo={userInfo} handlePost={handleSubmit} />
      {/* Posts */}
      <Posts posts={data} userInfo={userInfo} like={onLike} unlike={onUnlike} />
    </div>
  );
}

export default Feeds;
