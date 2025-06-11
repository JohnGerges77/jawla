import Link from 'next/link';
import Image from 'next/image'; 


function History() {
  return (
    <div>
      <div className='w-[90%] sm:w-[75%] mx-auto mt-[2em] h-fit px-[1em] py-[1em] bg-gradient-to-r from-[#FFFFFF40] to-[#FFFFFF1A] rounded-[1em]'>
        <Link href="/History">
          <div className='flex items-center space-between w-[100%] h-fit'>
            <nav className='flex w-full items-center justify-between'>
              <div className='flex items-center space-x-[1em] w-[75%]'>
                <Image
                  src='/restore.png'
                  alt='user'
                  width={24}
                  height={24}
                  className='h-[1.5em]'
                />
                <h3 className='text-[1.3em] text-white'> My Bookings</h3>
              </div>
              <button>
                <Image
                  src='/right-chevron.png'
                  alt='next'
                  width={24} 
                  height={24}
                  className='h-[1.5em]'
                />
              </button>
            </nav>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default History;