"use client"; 
import Link from 'next/link';
import Image from 'next/image'; 
import React from 'react';

function Service({ photoSrc, title, active, link }) {
  return (
    <Link href={`/${link}`} className='block w-fit h-fit'>
      <button
        className='bg-gradient-to-r from-[#FFFFFF80] to-[#FFFFFF33] text-center px-[0.5em] py-[0.4em] rounded-lg lg:w-[5em] lg:h-[4.5em] md:w-[5.5em] md:h-[5.5em] w-[4em] h-[4em]'
      >
        <Image
          src={photoSrc}
          alt={title}
          width={32} 
          height={32}
          className='lg:w-[2em] md:w-[1.8em] w-[1em] block mx-auto'
        />
        <h3
          className={`text-[0.7em] text-center mt-[0.2em] font-semibold text-[${
            active ? '#F2CD7E' : '#1E2D4B'
          }]`}
        >
          {title}
        </h3>
      </button>
    </Link>
  );
}

export default Service;