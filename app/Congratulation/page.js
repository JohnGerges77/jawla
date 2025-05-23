'use client'
import { useEffect, useState } from "react";
import "../globals.css";
import Link from "next/link";

const Confetti = () => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const generateConfetti = () => {
      return new Array(30).fill(0).map(() => ({
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: Math.random() * 3 + 2,
        size: Math.random() * 24 + 10,
        color: ["#ff4d6d", "#ff85a1", "#c084fc", "#9b5de5"][
          Math.floor(Math.random() * 4)
        ],
      }));
    };
    setPieces(generateConfetti());
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute confetti-piece"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDuration: `${piece.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function CongratsScreen() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#0b1437] text-center text-white overflow-hidden">
      <Confetti />
      <h1 className="text-5xl font-cursive text-secondry">Congratulations</h1>
      <p className="mt-4 text-lg font-semibold">Enjoy Your trip with us</p>
      <button className="mt-6 bg-secondry px-10 py-3 text-lg font-bold text-black rounded-lg shadow-md
       hover:bg-yellow-500 transition cursor-pointer z-50 transition-colors duration-300">
         <Link href='/'>
 Go To Home
         </Link>
      </button>
    </div>
  );
}
