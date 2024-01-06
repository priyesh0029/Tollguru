import React from "react";
import { Collapse, Card, Typography, CardBody } from "@material-tailwind/react";

const FuelInfo = ({
  open,
  setCityFuel,
  setHighwayFuel,
  setFuelPrice,
  cityFuel,
  highwayFuel,
  fuelPrice,
}) => {
  const handleFuelChange = (value, setValue) => {
    setValue(value);
  };

  return (
    <Collapse open={open}>
      <Card className="mx- w-11/12">
        <CardBody>
          <div>
            <Typography className="text-lg text-black font-semibold">
              Edit your mileage (km/L)
            </Typography>
            <div className="border-gray-300 border-2 rounded-lg w-full h-24 m-2">
              <div className="flex bg-gray-500 rounded-lg text-white justify-between px-8 h-12 items-center">
                <p>City</p>
                <p>Highway</p>
              </div>
              <div className="flex flex-row justify-between px-8 h-12 items-center">
                {["cityFuel", "highwayFuel"].map((type) => (
                  <input
                    key={type}
                    min="0"
                    type="number"
                    value={type === "cityFuel" ? cityFuel : highwayFuel}
                    className="w-16 px-2 border-b-2 border-black"
                    onChange={(e) =>
                      handleFuelChange(
                        e.target.value,
                        type === "cityFuel" ? setCityFuel : setHighwayFuel
                      )
                    }
                  />
                ))}
              </div>
            </div>
            <div className="my-4">
              <Typography className="text-lg text-black font-semibold my-2">
                Enter fuel price
              </Typography>
              <div className="flex">
                <input
                  min="0"
                  type="number"
                  value={fuelPrice}
                  className="w-[6em] px-2 border-b-2 border-black"
                  onChange={(e) =>
                    handleFuelChange(e.target.value, setFuelPrice)
                  }
                />
                <p>₹</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Collapse>
  );
};

export default FuelInfo;
