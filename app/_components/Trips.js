import VipTripsRow from "./VipTripsRow";
import ComingTripsRow from "./ComingTripsRow";

function Trips() {
  return (
    <section id="trips-section" className=" sm:pl-12 pl-2 mt-10 ">
      <ComingTripsRow />
      <VipTripsRow />
    </section>
  );
}

export default Trips;
