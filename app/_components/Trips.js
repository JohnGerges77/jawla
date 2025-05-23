import VipTripsRow from "./VipTripsRow";
import ComingTripsRow from "./ComingTripsRow";

function Trips() {
  return (
    <div className=" sm:pl-12 pl-2 mt-10 ">
      <ComingTripsRow />
      <VipTripsRow />
    </div>
  );
}

export default Trips;
