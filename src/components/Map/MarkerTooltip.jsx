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
      onCloseClick={onCloseClick}
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        width: "40em",
        height: "45em",
      }}
    >
      <div>
        <h4>{toll.road} Road</h4>
        <p>Exit: {toll.name}</p>
        <p>Tag One way: {toll.tagCost}</p>
        <p>Return: {toll.cashCostReturn}</p>
        <p>Monthly: {toll.cashCostMonthly}</p>
        <p>Tag Monthly: {toll.tagCostMonthly}</p>
        <p>Tag Return: {toll.tagCostReturn}</p>
      </div>
    </InfoWindow>
  );
};

export default MarkerTooltip;
