import React from "react";
import InputPost from "./InputPost";

function Feeds() {
  return (
    <div className="max-h-screen overflow-scroll scrollbar-hide">
      {/* Input post */}
      <InputPost />
      {/* Posts */}
    </div>
  );
}

export default Feeds;
