
import React from 'react'
import DescoverBox from '../_components/DescoverBox';
export const metadata={
  title:"Descover", 
 }
function page() {
  return (<div>

   <div className='bg-secondry'>
   <div className="flex flex-col items-center justify-center  text-white p-4">
 
      <h1 className="text-primary text-1xl md:text-3xl font-semibold mb-3">Discover New Place</h1>

 
  
    </div>
    <DescoverBox />
    <DescoverBox />
    <DescoverBox />
    <DescoverBox />
    <div className='h-16'>

    </div>
              </div>
  </div>
      );
    };
    
 
  

export default page









