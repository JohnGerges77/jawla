// DescoverBox.js
import Image from "next/image";

function DescoverBox({ label, location, description, images }) {
  return (
    <div className=" bg-gradient-to-br from-[#0c1f47] to-[#161132] shadow-2xl shadow-black/60  grid grid-cols-1 sm:grid-cols-2 gap-4 text-white p-6 rounded-2xl max-w-6xl mx-auto relative mb-10 top-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {images.slice(0, 4).map((image, index) => (
          <Image
            key={index}
            src={image}
            width={400}
            height={400}
            alt={`${label} image ${index + 1}`}
            className="rounded-lg object-cover w-full h-48"
          />
        ))}
      </div>

      <div className="bg-primary p-6 rounded-lg border border-blue-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
          <span className="mr-2">
            <Image
              src="/Group 8.png" 
              width={15}
              height={15}
              alt="Location icon"
            />
          </span>
          <span className="text-xl font-semibold mr-2">Address:</span>
          <p className="text-lg">{location}</p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Info:</h2>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
}

export default DescoverBox;