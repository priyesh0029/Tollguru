import React from "react";
import Map from "../../components/Map/Map";
import Form from "../../components/Form/Form";
import { useJsApiLoader } from "@react-google-maps/api";
import Login from "../../components/Login";

const libraries = ["places", "maps","geometry"]; 

const Home = () => {

  const { isLoaded, loadError  } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAUvxpccyeJPcbvNuo5r-C6Pyi_ewcqKkQ",
    libraries,
    language: "en",
    region: "IN",
  });
    return (
      <div className="flex flex-col md:flex-row p-24 h-full w-full justify-center gap-16">
        <div className="flex">
          <Form isLoaded={isLoaded}/>
        </div>
        <div className="flex w-full h-full">
          <Map isLoaded={isLoaded} loadError={loadError}/>
        </div>
      </div>
    );
  };
  
  export default Home;
  
