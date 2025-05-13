"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const AuthButton = ({menuDisplay}) => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/LogIn");
  };
  return (
    <Link
      href="/LogIn"
      className={`bg-gray-300 text-gray-700 text-center py-2 w-[6rem] rounded-3xl ${menuDisplay==="block"? "block mx-auto" : ""}`}
    >
      <button
        onClick={isLoggedIn ? handleLogout : () => router.push("/login")}
        className="text-center"
      >

        {isLoggedIn ? "Sign Out" : "Sign In"}

      </button>
    </Link>
  );
};

export default AuthButton;
