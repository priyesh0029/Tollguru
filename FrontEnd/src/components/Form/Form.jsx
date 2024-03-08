// import { Card, Input, Button, Typography } from "@material-tailwind/react";
// import SelectMenu from "./SelectMenu";
// import FuelInfo from "./FuelInfo";
// import { useState } from "react";
// import DateTimeComponent from "./Date";
// import axios from "axios"
// import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
// import L from 'leaflet';

// const Form = () => {
//   const [fuelOpen, setfuelOpen] = useState(false);

//   const fuelToggleOpen = () => setfuelOpen((fuelOpen) => !fuelOpen);

//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const handleInputChange = async (event) => {
//     const inputValue = event.target.value;
//     setQuery(()=>inputValue);

//     try {
//       const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json`, {
//         params: {
//           apiKey: "URueGm4SBzT1rYdagU4icvqkrT2OV4GHs_NS6JY3qcw",
//           query: inputValue,
//         },
//       });

//       const suggestions = response.data.suggestions.map((suggestion) => ({
//         label: suggestion.label,
//         locationId: suggestion.locationId,
//       }));

//       setSuggestions(suggestions);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error.message);
//     }
//   };

//   return (
//     <Card color="transparent" shadow={false}>
//       <Typography variant="h4" color="blue-gray">
//         TollGuru
//       </Typography>
//       <Typography color="gray" className="mt-1 font-normal">
//         India Toll Calculator – Google Maps with Tolls & Fuel
//       </Typography>
//       <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
//         <div className="mb-2 flex flex-col">
//           <div className="mb-2 flex flex-col gap-1">
//             <Input
//               size="lg"
//               placeholder="orgin"
//               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
//               value={query}
//               onChange={handleInputChange}
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//             />
//              <ul>
//         {suggestions.map((suggestion) => (
//           <li key={suggestion.locationId}>{suggestion.label}</li>
//         ))}
//       </ul>
//             <Input
//               size="lg"
//               placeholder="destination"
//               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//             />
//           </div>
//       <Typography variant="h6" color="blue-gray" className="mb-2">
//         Select your vehicle
//       </Typography>
//       <SelectMenu />
//       <Button
//         onClick={fuelToggleOpen}
//         ripple={true}
//         size="sm"
//         color="blue"
//         className="my-3 text-sm"
//       >
//         Fuel Info (optional)
//       </Button>
//       {fuelOpen && <FuelInfo open={fuelOpen} />}

//       <DateTimeComponent />

//       <Button className="mt-6" fullWidth>
//         submit
//       </Button>
//     </div>
//   </form>
// </Card>
//   );
// };

// export default Form;

import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import SelectMenu from "./SelectMenu";
import FuelInfo from "./FuelInfo";
import DateTimeComponent from "./Date";
import { locationDetailsGenerator } from "../../constants/locationGenerator";
import { submitHandler } from "../../api/formSubmit";
import { formDataHelper } from "../../constants/formDataHelper";
import { useData } from "../../contexts/DataContexts";

const Form = ({ isLoaded }) => {


  const {data,updateData,removeData} = useData()

  const [fuelOpen, setFuelOpen] = useState(false);

  const fuelToggleOpen = () => setFuelOpen((fuelOpen) => !fuelOpen);
  const [typeVehicle, setTypeVehicle] = useState("2AxlesAuto");

  const [cityFuel, setCityFuel] = useState(3);
  const [highwayFuel, setHighwayFuel] = useState(4);
  const [fuelPrice, setFuelPrice] = useState(104);

  const currentDateTime = new Date();
  const [timestamp, setTimestamp] = useState(currentDateTime.toISOString());

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const autocompleteOrginRef = useRef(null);
  const autocompleteDestRef = useRef(null);

  const handleOriginSelect = () => {
    let place = autocompleteOrginRef.current.getPlace();
    if (place) {
      console.log("places  ", place);
      const fromCoord = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
      updateData({...data,fromCoord})
      const from = locationDetailsGenerator(place);
      setOrigin(from);
    }
  };

  const handleDestinationSelect = () => {
    let place = autocompleteDestRef.current.getPlace();
    if (place) {
      console.log("places  ", place);
      const toCoord = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
      updateData({...data,toCoord})
      const to = locationDetailsGenerator(place);
      setDestination(to);
    }
  };

  useEffect(() => {
    console.log("console log of orgin : ", origin, destination);
  }, [origin, destination]);

  const handleFormSubmit = async () => {
    const body = formDataHelper(
      origin,
      destination,
      highwayFuel,
      typeVehicle,
      cityFuel,
      fuelPrice,
      timestamp
    );
    const response = await submitHandler(body);
    console.log("response : ",response);
    if(response.data.status === 'OK'){
      console.log("entered to if block  ");
      const newData ={
        routes : response.data.routes,
        summary : response.data.summary
      }
      console.log("newData : ",newData);
        updateData(newData)
    }
  };

  // const handleLocChange =(value)=>{
  //   if(value = 'from' && data.from){
  //     removeData()
  //   }else if(value = 'to' && data.to){
  //     removeData()
  //   }
  // }

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          TollGuru
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          India Toll Calculator – Google Maps with Tolls & Fuel
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-2 flex flex-col  gap-1">
            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteOrginRef.current = autocomplete;
              }}
              onPlaceChanged={handleOriginSelect}
            >
              <input
                placeholder="Origin"
                className=" border-2 border-gray-500 w-80 p-2 rounded-xl focus:border-t-gray-900"
                // onChange={()=>handleLocChange("from")}
              />
            </Autocomplete>

            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteDestRef.current = autocomplete;
              }}
              onPlaceChanged={handleDestinationSelect}
            >
              <input
                placeholder="Destination"
                className=" border-2 border-gray-500 w-80 p-2 rounded-xl focus:border-t-gray-900"
                // onChange={()=>handleLocChange("to")}
              />
            </Autocomplete>

            <Typography variant="h6" color="blue-gray" className="mb-2">
              Select your vehicle
            </Typography>
            <SelectMenu setTypeVehicle={setTypeVehicle} />
            <Button
              onClick={fuelToggleOpen}
              ripple={true}
              size="sm"
              color="blue"
              className="my-3 text-sm"
            >
              Fuel Info (optional)
            </Button>
            {fuelOpen && (
              <FuelInfo
                open={fuelOpen}
                setCityFuel={setCityFuel}
                setHighwayFuel={setHighwayFuel}
                setFuelPrice={setFuelPrice}
                cityFuel={cityFuel}
                highwayFuel={highwayFuel}
                fuelPrice={fuelPrice}
              />
            )}

            <DateTimeComponent
              timestamp={timestamp}
              setTimestamp={setTimestamp}
            />

            <Button className="mt-6" fullWidth onClick={handleFormSubmit}>
              submit
            </Button>
          </div>
        </form>
      </Card>
    );
  }
};

export default Form;
