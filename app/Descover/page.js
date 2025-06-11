// page.js
import DescoverBox from '../_components/DescoverBox';
import { staticData } from '../_components/StaticDataModel'; // استورد البيانات

export const metadata = {
  title: "Descover",
};

function Page() {
  return (
    <div>
      <div className="bg-primary">
        <div className="flex flex-col items-center justify-center text-white p-4 ">
          <h1 className="text-primary text-1xl md:text-3xl font-semibold mb-3">
            Discover New Place
          </h1>
        </div>
        {staticData.map((item, index) => (
          <DescoverBox
            key={index}
            label={item.label}
            location={item.location}
            description={item.description}
            images={item.images}
          />
        ))}
        <div className="h-16"></div>
      </div>
    </div>
  );
}

export default Page;