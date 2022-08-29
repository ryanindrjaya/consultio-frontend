import React from "react";
import InputPost from "./InputPost";
import Posts from "./Posts";

function Feeds({ data }) {
  return (
    <div className="w-3/5 px-5 overflow-scroll scrollbar-hide">
      {/* Input post */}
      <InputPost />
      {/* Posts */}
      <Posts posts={data} />
    </div>
  );
}

export default Feeds;
