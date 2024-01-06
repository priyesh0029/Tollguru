import React, { useState } from "react";
import {
    Collapse,
    Button,
    Card,
    Typography,
    CardBody,
  } from "@material-tailwind/react";

const LocationOptions = ({
  setSelectedLocOption,
  suggestions,
  locOptState,
  setLocOptState,
}) => {
  const handleSelectChange = (value) => {
    console.log("setSelectedLocOption value : ",value);
    setSelectedLocOption(()=>value);
    setLocOptState(() => false);
  };

  return (
    <>
      <Collapse open={locOptState} className="z-50">
        <Card className=" p-2 w-8/12">
          <CardBody>
            {suggestions.map((option) => (
              <div className="border-gray-100 shadow-md gap-1" key={option.value} value={option.value} onClick={()=>handleSelectChange(option.value)}>
                {option.label}
              </div>
            ))}
          </CardBody>
        </Card>
      </Collapse>
    </>
  );
};

export default LocationOptions;
