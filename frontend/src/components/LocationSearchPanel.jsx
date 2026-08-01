function LocationSearchPanel(props) {
  const locations = [
    "Durrani Street, New Gullberg Town, Gulberg # 02, Peshawar, Khyber Pakhtunkhwa, Pakistan",
    "Askari 6, Phase 2, Nasir Bagh Road, Borad Bazar, Peshawar, Khyber Pakhtunkhwa, Pakistan",
    "Nouthia Qadeem, Saddar Bazar Peshawar, Khyber Pakhtunkhwa, Pakistan",
    "Institute of Managemnent Sciences, Phase 7, Hayatabad Peshawar, Khyber Pakhtunkhwa, Pakistan",
    "Faqirabad near Arbab Niaz Stadium and Shahi Bagh, Peshawar, Khyber Pakhtunkhwa, Pakistan",
  ];

  return (
    <div>
      {locations.map(function (element, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanelOpen(true);
              props.setPanelOpen(false);
            }}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{element}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default LocationSearchPanel;
