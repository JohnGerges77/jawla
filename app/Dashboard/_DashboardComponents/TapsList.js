import React from 'react'
import Tap from './Tap'
const tapsData = [
    {
      icon: '/images/home.png',
      yellowIcon: '/images/home (1).png',
      title: 'Dashboard'
    },
    {
      icon: '/images/add.png',
      yellowIcon: '/images/add (1).png',
      title: 'Trips'
    },
    {
      icon: '/images/crown.png',
      yellowIcon: '/images/crown (1).png',
      title: 'Custom_Programs'
    },
    {
      icon: '/images/user.png',
      yellowIcon: '/images/user (1).png',
      title: 'Drivers'
    },
    {
      icon: '/images/user.png',
      yellowIcon: '/images/user (1).png',
      title: 'Tour_Guides'
    },
    {
      icon: '/images/van.png',
      yellowIcon: '/images/van (1).png',
      title: 'Cars',
   
    },
  
 
  ]
function TapsList({ }) {
  return (
    <div>
         <ul className='mt-[3em] space-y-[1em] w-[100%]'>
      {tapsData.map((tap) => (

<Tap tap={tap} key={`${tap.title}`} />

      ))}
    </ul>
    </div>
  )
}

export default TapsList
