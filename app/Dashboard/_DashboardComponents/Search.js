import React from "react";
import Image from "next/image"; 

function Search() {
  return (
    <div className="flex items-center w-fit space-x-[1em]">
      <input
        type="search"
        placeholder="Search"
        className="w-[15em] h-[2em] px-[1em] rounded-[1em] bg-[#1E2D4B] text-white block mx-auto outline-none"
      />
      <button>
        <Image
          src="/images/search.png"
          alt="search"
          width={24} 
          height={24} 
          className="h-[1.5em] w-auto"
        />
      </button>
    </div>
  );
}

export default Search;
