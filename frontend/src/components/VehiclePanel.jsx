import uberCarImage from "../assets/images/uber-car-image.jpg";
import uberMotercycleImage from "../assets/images/uber-motercycle-image.png";
import uberAutoImage from "../assets/images/uber-auto-image.jpg";

function VehiclePanel(props) {
  return (
    <div>
      <h5
        className="absolute top-0 w-[93%] cursor-pointer p-1 text-center"
        onClick={() => props.setVehiclePanelOpen(false)}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-400"></i>
      </h5>

      <h3 className="mb-5 text-2xl font-semibold">Choose a Vehicle</h3>

      {/* UberGo */}
      <div
        onClick={() => props.setConfirmRidePanel(true)}
        className="mb-3 flex w-full cursor-pointer items-center justify-between rounded-xl border-2 p-3 transition active:border-black"
      >
        <div className="flex h-16 w-16 items-center justify-center">
          <img
            src={uberCarImage}
            alt="UberGo"
            className="h-14 w-14 object-contain"
          />
        </div>

        <div className="ml-2 w-1/2">
          <h4 className="text-base font-medium">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i> 4
            </span>
          </h4>

          <h5 className="text-sm font-medium">2 mins away</h5>

          <p className="text-xs font-normal text-gray-600">
            Affordable, compact rides
          </p>
        </div>

        <h2 className="text-lg font-semibold">Rs fare.car</h2>
      </div>

      {/* Moto */}
      <div
        onClick={() => props.setConfirmRidePanel(true)}
        className="mb-3 flex w-full cursor-pointer items-center justify-between rounded-xl border-2 p-3 transition active:border-black"
      >
        <div className="flex h-16 w-16 items-center justify-center">
          <img
            src={uberMotercycleImage}
            alt="Moto"
            className="h-14 w-14 object-contain"
          />
        </div>

        <div className="ml-2 w-1/2">
          <h4 className="text-base font-medium">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i> 1
            </span>
          </h4>

          <h5 className="text-sm font-medium">3 mins away</h5>

          <p className="text-xs font-normal text-gray-600">
            Affordable motorcycle rides
          </p>
        </div>

        <h2 className="text-lg font-semibold">Rs fare.moto</h2>
      </div>

      {/* UberAuto */}
      <div
        onClick={() => props.setConfirmRidePanel(true)}
        className="mb-3 flex w-full cursor-pointer items-center justify-between rounded-xl border-2 p-3 transition active:border-black"
      >
        <div className="flex h-16 w-16 items-center justify-center">
          <img
            src={uberAutoImage}
            alt="UberAuto"
            className="h-14 w-14 object-contain"
          />
        </div>

        <div className="ml-2 w-1/2">
          <h4 className="text-base font-medium">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i> 3
            </span>
          </h4>

          <h5 className="text-sm font-medium">3 mins away</h5>

          <p className="text-xs font-normal text-gray-600">
            Affordable auto rides
          </p>
        </div>

        <h2 className="text-lg font-semibold">Rs fare.auto</h2>
      </div>
    </div>
  );
}

export default VehiclePanel;
