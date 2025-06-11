import Image from 'next/image';

function AboutUsPage() {
  return (
    <section id="about-us-section" className='bg-primary w-full px-[10%] -14 mx-auto h-fit md:flex items-center justify-between py-[5em] mt-16'>
      <div className="left-side w-[90%] md:w-[40%] mx-auto md:mx-0 h-full flex items-center justify-center">
        <Image src="/Back.png" width={100} height={100} alt="temple" className='w-[60%] md:w-[50%]' />
        <Image src="/Front.png" width={100} height={100} alt="temple" className='w-[50%] mt-[10vw] ml-[-5vw] md:w-[40%]' />
      </div>
      <div className="right-side w-full md:w-[50%] h-full flex flex-col space-y-[1em] md:mt-[5em] md:mx-auto">
        <h1 className='text-[2rem] text-center md:text-left mt-4 md:mt-0 md:text-[1em] text-[#F2CD7E] font-bold'> About Us </h1>
        <span className='text-[2em] text-center md:text-left font-bold text-white md:max-w-[80%]'>
          Our tour plan is to fulfill your 
          <span className='text-[#F2CD7E] font-bold block md:inline'> dream wish </span>
        </span>
        <p className='text-[#8d8d8d] md:max-w-[75%] text-center md:text-left'>
          Understand to achieve anything requires faith and belief in yourself, vision, hard work, determination, and dedication.
        </p>
        <div className='w-[100%] h-fit md:flex justify-between md:space-x-[1em] text-center md:text-left'>
          <div className='w-[80%] md:w-[25%] h-[10%] flex flex-col space-y-[0.5em] py-[1em] mx-auto md:mx-0'>
            <h3 className='text-[#F2CD7E] text-[2rem] md:text-[1.5em] font-bold'>15</h3>
            <p className='md:max-w-[80%] text-white text-[1em] font-[500]'>Years of Experience</p>
          </div>
          <div className='w-[80%] md:w-[25%] h-[10%] flex flex-col space-y-[0.5em] py-[1em] mx-auto md:mx-0'>
            <h3 className='text-[#F2CD7E] text-[2rem] md:text-[1.5em] font-bold'>1K</h3>
            <p className='md:max-w-[80%] text-white text-[1em] font-[500]'>Successful Trips</p>
          </div>
          <div className='w-[80%] md:w-[25%] h-[10%] flex flex-col space-y-[0.5em] py-[1em] mx-auto md:mx-0'>
            <h3 className='text-[#F2CD7E] text-[2rem] md:text-[1.5em] font-bold'>20K</h3>
            <p className='md:max-w-[80%] text-white text-[1em] font-[500]'>Happy Customers</p>
          </div>
          <div className='w-[80%] md:w-[25%] h-[10%] flex flex-col space-y-[0.5em] py-[1em] mx-auto md:mx-0'>
            <h3 className='text-[#F2CD7E] text-[2rem] md:text-[1.5em] font-bold'>4.9</h3>
            <p className='md:max-w-[80%] text-white text-[1em] font-[500]'>Overall Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsPage;