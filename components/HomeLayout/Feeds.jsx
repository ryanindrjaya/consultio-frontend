import React from "react";
import InputPost from "./InputPost";
import Posts from "./Posts";

function Feeds() {
  return (
    <div className="w-3/5 px-5 overflow-scroll scrollbar-hide border-r">
      {/* Input post */}
      <InputPost />
      {/* Posts */}
      <Posts />
      <Posts />
    </div>
  );
}

export default Feeds;
