'use client'
import { useRef, useState } from 'react'
import TripCard from "./TripCard";
function TripsRow() {
  const Ref=useRef(null)
  const [isMouseDown,setIsMouseDown]=useState(false)
  const [startX,setStartX]=useState(false)
  const [scrollLeft,setScrollLeft]=useState(false)
  const handleMouseDown =(e)=>{
    setIsMouseDown(true)
    setStartX(e.pageX - - Ref.current.offsetLeft)
    setScrollLeft(Ref.current.scrollLeft)
  }
  const handleMouseLeave =()=>{
    setIsMouseDown(false)
  }
  const handleMouseUp =()=>{
setIsMouseDown(false)
  }
  const handleMouseMove =(e)=>{
 
    if(!isMouseDown) return;
e.preventDefault();
const x =e.pageX - Ref.current.offsetLeft;
const walk =(x-startX)
Ref.current.scrollLeft=scrollLeft-walk
  }

  return (
    <div>
  <div>
        <div className="text-white text-2xl font-bold mt-5 ">
        You Can See More Type of
          <b className="text-secondry"> Journey</b>
        </div>
        <div className="text-white text-2xl font-semibold flex justify-center mt-10">
           <b className="text-secondry px-2"> All Types </b> 
        </div>
        <div
      ref={Ref}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
onMouseMove={handleMouseMove}
      className="mt-5 flex justify-start items-center overflow-x-auto 
    overflow-y-hidden">
          <TripCard type='sale' />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
          <TripCard />
        </div>
      </div>
    </div>
  )
}

export default TripsRow
