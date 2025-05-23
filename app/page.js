


import Trips from './_components/Trips'
import Footer from './_components/Footer'
import Hero from './_components/Hero'
import AboutUsPage from './_components/AboutUsPage'
import ServicesPage from './_components/ServicesPage'

function page() {
  return (
    <div className='bg-primary overflow-x-hidden'>
     
      <Hero />
      <AboutUsPage />
      <ServicesPage />
      <Trips />

    </div>
  )
}

export default page
