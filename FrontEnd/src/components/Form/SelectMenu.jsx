import { Select, Option } from "@material-tailwind/react";
import React from "react";

const SelectMenu = ({setTypeVehicle}) => {
  const vehicles = [
    {
      Vname: "CAR/JEEP/VAN/SUV",
      value: "2AxlesAuto",
      vehicleType: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGz2aUBAlhKCICxhLlz8a0RypntbS2_EMmYAKunPQ5dSutDRo&s`,
    },
    {
      Vname: "Bike",
      value: "2AxlesMotorcycle",
      vehicleType: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Rw764wzhWM3AsPTCHKucyiRHSS3vR5145KqN2SjFc9a1WjnO&s`,
    },
    {
      Vname: "Taxi",
      value: "2AxlesTaxi",
      vehicleType: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0oRjWfhwQQ0w-0q5SaUptb6hC-wxq2Vn8IgEU3sMrFgg2RJI&s`,
    },
    {
      Vname: "Pickup truck, Light Commercial Vehicles",
      value: "2AxlesLCV",
      vehicleType: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVmtAgyLPWUFerKqJgzgbrmK-zFgjaUey6CDLYBRUuVU2je4&s`,
    },
    {
      Vname: "Truck",
      value: "2AxlesTruck",
      vehicleType: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFpp4JbmYuvrgyHquqrLcl2WC6LUD9iFa9ZtS839L8LXFc5YNq&s`,
    },
    {
      Vname: "Bus",
      value: "2AxlesBus",
      vehicleType: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtGku9cyPBEKww2TJbqoHGPoiFZy8SIiyNQF-OlKJ7iwvyR1-0&s`,
    },
    {
      Vname: "Motorhome",
      value: "2AxlesRv",
      vehicleType: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZbruPAb_Ogygy--xMJSvIrQpY6YGKPo8ysF9yl_5LKuPtmW3L&s`,
    },
    {
      Vname: "HCM, EME ",
      value: "2AxlesHCMEME",
      vehicleType: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShDRXoaHQRvpAgvI8QLHw078CishrsTDlS-Ki3inYtAfd9RRU&s`,
    },
  ];

  const handleSelectChange = (selectedValue) => {
    setTypeVehicle(selectedValue);
  };

  return (
    <div className="w-72">
      <Select
        size="lg"
        label="Select Vehicle"
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            disabled: true,
            className:
              "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
          })
        }
        onChange={handleSelectChange}
      >
        {vehicles.map(({ Vname,value, vehicleType }) => (
          <Option key={Vname} value={value} className="flex items-center gap-2">
            <img
              src={vehicleType}
              alt={Vname}
              className="h-10 w-18 object-cover"
            />
            {Vname}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectMenu;
