"use client";
import Search from './Search'
import ProfileIcon from './ProfileIcon'
import Notifications from './Notifications'
import { usePathname } from "next/navigation";
function Header() {
  const pathname = usePathname();
  const pageName = pathname.split("/Dashboard/")[1] || "Dashboard";
  return (
    <header className='flex items-center space-between w-full mx-auto h-fit px-[2em] py-[1.5em] 
   bg-gradient-to-br from-[#052563] to-[#000000]'>
<h1 className='w-fit text-[white] text-[1.5em] font-bold'>{pageName}</h1>
      <div className='w-fit ml-auto flex items-center space-x-[1em] px-[1em]'>
        {/* <Search /> */}
        {/* <Notifications /> */}
        <ProfileIcon />
      </div>
    </header>
  )
}

export default Header
