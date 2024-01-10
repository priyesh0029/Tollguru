import { InfoWindow } from "@react-google-maps/api";
import React from "react";

const MarkerTooltip = ({ toll, onCloseClick }) => {
  console.log("toll inside the markettooltip : ", toll);
  if (!toll) {
    return null;
  }
  return (
    <InfoWindow
      position={{
        lat: Number(toll.lat),
        lng: Number(toll.lng),
      }}
      onCloseClick={() => {
        onCloseClick(); 
      }}
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        width: "30rem",
        height: "30em",
      }}
    >
      <div className="bg-white p-2 rounded-md shadow-md">
        <h4 className="text-lg font-bold mb-2">{toll.road} Road</h4>
        <p className="mb-1 text-md font-semibold">Exit: {toll.name}</p>
        <p className="mb-1 text-md font-normal">Tag One way: {toll.tagCost}</p>
        <p className="mb-1 text-md font-normal">Return: {toll.cashCostReturn}</p>
        <p className="mb-1 text-md font-normal">Monthly: {toll.cashCostMonthly}</p>
        <p className="mb-1 text-md font-normal">Tag Monthly: {toll.tagCostMonthly}</p>
        <p className="mb-1 text-md font-normal">Tag Return: {toll.tagCostReturn}</p>
      </div>
    </InfoWindow>
  );
};

export default MarkerTooltip;
