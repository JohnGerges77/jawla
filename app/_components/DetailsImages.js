import Image from 'next/image';

function DetailsImages({ images }) {

  const defaultImages = [
    '/Rectangle 59.png',
    '/Rectangle 58.png',
    '/Rectangle 57.png',
  ];


  const safeImages = Array.isArray(images) ? images : [];

 
  const imageList = [
    safeImages[0] || defaultImages[0],
    safeImages[1] || defaultImages[1],
    safeImages[2] || defaultImages[2],
  ];

  return (
    <div className="w-full flex flex-col mb-6 md:mb-0">
      <div className="grid grid-cols-1 gap-5 place-items-center">
 
        <Image
          src={imageList[0]}
          alt="Image 1"
          width={250}
          height={300}
          className="rounded-lg object-cover"
        />
       
        <div className="absolute">
          <Image
            src={imageList[1]}
            alt="Image 2"
            width={250}
            height={310}
            className="rounded-lg object-cover relative left-12 sm:left-36 z-50"
          />
        </div>
 
        <Image
          src={imageList[2]}
          alt="Image 3"
          width={250}
          height={300}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}

export default DetailsImages;