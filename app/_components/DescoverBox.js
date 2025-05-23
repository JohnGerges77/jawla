import Image from "next/image";
function DescoverBox() {
  return (
    <div className="bg-primary grid grid-cols-1 sm:grid-cols-2 gap-4 text-white p-6 rounded-2xl max-w-6xl mx-auto relative mb-10 top-5 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Image
          src="/Rectangle 256.png"
          width={400}
          height={400}
          alt="Ancient statues"
          className="rounded-lg object-cover w-full h-48"
        />
        <Image
          src="/Rectangle 257.png"
          width={400}
          height={400}
          alt="Temple gate"
          className="rounded-lg object-cover w-full h-48"
        />
        <Image
          src="/Rectangle 258.png"
          width={400}
          height={400}
          alt="Obelisk"
          className="rounded-lg object-cover w-full h-48"
        />
        <Image
          src="/Rectangle 259.png"
          width={400}
          height={400}
          alt="Temple columns"
          className="rounded-lg object-cover w-full h-48"
        />
      </div>
      {/* Info Section */}
      <div className="bg-primary p-6 rounded-lg border border-blue-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
          <span className="mr-2">
            <Image
              src="/Group 8.png"
              width={15}
              height={15}
              alt="Temple columns"
            />
          </span>
          <span className="text-xl font-semibold mr-2">Address:</span>
          <p className="text-lg">Corniche El Nil, Luxor, Egypt</p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Info:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <span className="font-semibold">Construction Date:</span> Began
            around 2000 BCE during the Middle Kingdom, with major expansions
            during the New Kingdom.
          </li>
          <li>
            <span className="font-semibold">Primary Builders:</span> Pharaohs
            like Thutmose III, Hatshepsut, and Ramses II contributed
            significantly.
          </li>
          <li>
            <span className="font-semibold">Purpose:</span> Dedicated to
            Amun-Ra, it was the main religious center of Thebes and the site for
            major state ceremonies.
          </li>
          <li>
            <span className="font-semibold">Architectural Features:</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Hypostyle Hall: Contains 134 massive columns arranged in rows,
                making it one of the largest halls of its kind in history.
              </li>
              <li>
                Sacred Lake: Symbolizing the primordial waters from which
                creation emerged.
              </li>
              <li>
                Pylons: Large gateways depicting Pharaohs' victories and
                religious scenes.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DescoverBox;
