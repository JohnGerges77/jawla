"use client";
import React from "react";
import Image from "next/image";
import {useState} from "react"
function Input({ name, placeholder, icon, title, value, onChange, type }) {
  const [hidePassword, sethidePassword ] = useState(true);
    function togglePasswordVisibility() {
      sethidePassword((e)=>!e);
    }
  icon = (type==="password" && !hidePassword)? "/images/Eye.png" : icon;
  return (
    <div>
      <div className="absolute ">
        <span
          className="px-2 text-secondry text-[13px] bg-primary w-[24px]
          h-[200px] relative left-10 top-2 rounded-[100px]"
        >
          {title}
        </span>
      </div>
      <form className="flex flex-col mt-5 w-[100%] text-secondry">
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type==="password"? hidePassword ? "password" : "text" : type || "text"}
          className={` appearance-none peer outline-none placeholder-secondry placeholder-opacity-75 py-3 px-5 bg-primary border  rounded-[50px] `}
        />
        <div className="flex justify-end">
          <Image
            width={20}
            height={20}
            className={`${type === "password" ? "cursor-pointer" : ""} relative bottom-9 right-4`}
            src={icon || ''}
            alt={name}
            onClick={type === "password" ? () => togglePasswordVisibility() : null}
          />
        </div>
      </form>
    </div>
  );
}

export default Input;
