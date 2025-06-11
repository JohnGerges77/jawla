import Image from 'next/image';
import Link from 'next/link';


function ServicesPage() {
  return (
    <section className='bg-primary mt-5 w-full h-full flex flex-col items-center justify-center'>
      <span className='text-[1.5em] md:text-[2em] text-white font-bold'>
        Some of <span className='text-[#F2CD7E]'>Our Services</span> <br />
        For <span className='text-[#F67D05]'>Your Convenience</span>
      </span>
      <div className='w-[90%] md:w-fit md:px-[5em] py-[3em] h-fit text-center mt-[1.5em] bg-gradient-to-b from-[#D7DCE61A] to-[#23365bb2]  rounded-[1em] '>
        <h1 className='text-[1.5em] w-f font-bold text-white'>Special Services</h1>
        <div className='w-[100%] h-fit flex items-center justify-center space-x-[2em] mt-[1em]'>
          <Link href='/ServicesCar' className='block w-fit h-fit'>
            <button className="bg-[#F2CD7E] text-center  px-[0.5em] py-[0.5em]  rounded-lg lg:w-[6.5em] lg:h-[5em] md:w-[5.5em] md:h-[5.5em] w-[4em] h-[4em]">
              <Image src='/car (2).png' width={100} height={100}  alt="car" className="lg:w-[2em] md:w-[1.8em] w-[1em] block mx-auto" />
              <h3 className={`text-[0.7em] text-center mt-[0.2em] font-bold text-[#1E2D4B]`}>Car</h3>
            </button>
          </Link>
          <Link href='./ServicesTour' className='block w-fit h-fit'>
            <button className="bg-[#F2CD7E] text-center px-[0.5em] py-[0.5em]  rounded-lg lg:w-[6.5em] lg:h-[5em] md:w-[5.5em] md:h-[5.5em]  w-[4em] h-[4em]">
              <Image src="/tour.png" width={100} height={100} alt="Tour Guide" className="lg:w-[2em] md:w-[1.8em] w-[1em] block mx-auto" />
              <h3 className={`text-[0.7em] text-center mt-[0.2em] font-bold text-[#1E2D4B]`}>Tour Guide</h3>
            </button>
          </Link>
          <Link href='./ServicesCustomTrip' className='block w-fit h-fit'>
            <button className="bg-[#F2CD7E] text-center px-[0.5em] py-[0.5em]  rounded-lg lg:w-[6.5em] lg:h-[5em] md:w-[5.5em] md:h-[5.5em]  w-[4em] h-[4em]">
              <Image src="/images/crown.png" width={100} height={100} alt="Custom Program" className="lg:w-[2em] md:w-[1.8em] w-[1em] block mx-auto" />
              <h3 className={`text-[0.7em] text-center mt-[0.2em] font-bold text-[#1E2D4B]`}>Custom Program</h3>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
export default ServicesPage
