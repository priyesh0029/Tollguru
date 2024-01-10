// import React, { useEffect, useRef } from 'react';
// import H from '@here/maps-api-for-javascript';

// const Map = (props) => {
//   const mapRef = useRef(null);
//   const map = useRef(null);
//   const platform = useRef(null);
//   const { apikey } = props;

//   useEffect(() => {
//     if (!map.current) {
//       platform.current = new H.service.Platform({ apikey });
//       const rasterTileService = platform.current.getRasterTileService({
//         queryParams: {
//           style: "explore.day",
//           lang: "en",
//           size: 512,
//         },
//       });
//       const rasterTileProvider = new H.service.rasterTile.Provider(rasterTileService);
//       const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);
//       const newMap = new H.Map(mapRef.current, rasterTileLayer, {
//         pixelRatio: window.devicePixelRatio,
//         center: {
//           lat: 64.144,
//           lng: -21.94,
//         },
//         zoom: 14,
//       });

//       const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));
//       map.current = newMap;
//     }
//   }, [apikey]);

//   // Apply inline styles to the map container
//   const mapContainerStyle = {
//     width: '62vw',
//     height: '80vh',
//     paddingLeft : "2em",
//     paddingRight : "2em"
//   };

//   return <div style={mapContainerStyle} ref={mapRef} />;
// };

// export default Map;

// import React, { useEffect, useState } from "react";
// import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
// import { Spinner } from "@material-tailwind/react";

// const Map = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyAUvxpccyeJPcbvNuo5r-C6Pyi_ewcqKkQ",
//   });

//   useEffect(() => {
//     if (isLoaded) {
//       // Use browser's Geolocation API to get the current position
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation({ lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.error("Error getting location:", error.message);
//         }
//       );
//     }
//   }, [isLoaded]);

//   if (!isLoaded) {
//     return (
//       <div className="flex justify-center w-full h-[70%] items-center">
//         <Spinner />
//       </div>
//     );
//   }

//   return (
//     <div className="flex w-[100%] h-screen">
//       <GoogleMap
//         center={currentLocation || { lat: 8.5241, lng: 76.9366 }}
//         zoom={15}
//         mapContainerStyle={{ width: "100%", height: "70%" }}
//         options={{
//           zoomControl: false,
//           mapTypeControl: false,
//           fullscreenControl: false,
//           streetViewControl: false,
//         }}
//       >
//         {currentLocation && <Marker position={currentLocation} />}
//       </GoogleMap>
//     </div>
//   );
// };

// export default Map;

import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { Spinner } from "@material-tailwind/react";
import { useData } from "../../contexts/DataContexts";
import MapRouteTabs from "./MapRouteTabs";
import { findRoutes } from "../../constants/toGetRouteInfo";
import MarkerTooltip from "./MarkerTooltip";
import RouteInfo from "./RouteInfo";

const Map = ({ isLoaded, loadError }) => {
  const { data, updateData } = useData();
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [path, setPath] = useState([]);
  const [orgin, setorgin] = useState(null);
  const [destination, setdestination] = useState(null);
  const [cheapest, setcheapest] = useState(null);
  const [fastest, setfastest] = useState(null);
  const [others, setothers] = useState(null);
  const [route, setroute] = useState("fastest");
  const [currentRoute, setcurrentRoute] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToll, setSelectedToll] = useState(null);

  // const [tolls, settolls] = useState(second)

  const handleLocateClick = () => {
    setIsLocating(!isLocating);

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          getCurrentLocation();
        } else if (permissionStatus.state === "prompt") {
          getCurrentLocation();
        } else {
          console.warn("Geolocation permission denied");
          setIsLocating(false);
        }
      });
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error.message);
        setIsLocating(false);
      }
    );
  };

  useEffect(() => {
    if (data.length !== 0) {
      console.log("data.fromCoord", data);
      if (data.fromCoord) {
        setorgin(() => data.fromCoord);
      }
      if (data.toCoord) {
        setdestination(() => data.toCoord);
      }
      if (data.routes) {
        const routeInfo = findRoutes(data.routes);
        console.log("result of to getrouteIndfo function : ", routeInfo);
        if (routeInfo !== null) {
          setcheapest(() => routeInfo.cheapest);
          setfastest(() => routeInfo.fastest);
          setothers(() => routeInfo.others);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (fastest && cheapest && others) {
      if (route === "fastest") {
        setcurrentRoute(fastest);
      }
      if (route === "cheapest") {
        setcurrentRoute(cheapest);
      }
      if (route === "others") {
        setcurrentRoute(others);
      }
    }
  }, [fastest, cheapest, others, route]);

  useEffect(() => {
    setPath([]);
    if (currentRoute && currentRoute.polyline) {
      const newPaths = decodePolyline(currentRoute.polyline);
      setPath((prev)=>newPaths);
    }
  }, [currentRoute]);

  useEffect(() => {
    const animateToCoordinate = (coordinate, zoomLevel = 15) => {
      if (map && coordinate) {
        map.panTo(coordinate);
        map.setZoom(zoomLevel);
      }
    };

    const fitBoundsAndZoomOut = (bounds, delay) => {
      if (map && bounds) {
        setTimeout(() => {
          map.fitBounds(bounds);
          map.setZoom(7); // Adjust the zoom level as needed
        }, delay);
      }
    };

    const delay = 600; // Adjust the delay time as needed

    if (orgin) {
      setTimeout(() => animateToCoordinate(orgin), delay);
    }

    if (destination) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(orgin);
      bounds.extend(destination);
      fitBoundsAndZoomOut(bounds, delay);
    }
  }, [map, orgin, destination]);

  const decodePolyline = (polyline) => {
    if (
      window.google &&
      window.google.maps &&
      window.google.maps.geometry &&
      window.google.maps.geometry.encoding
    ) {
      return window.google.maps.geometry.encoding.decodePath(polyline);
    }
    return [];
  };

  const mapTosetBounds = () => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(orgin);
    bounds.extend(destination);
    setTimeout(() => {
      map.fitBounds(bounds);
      map.setZoom(7); // Adjust the zoom level as needed
    }, 600);
  };

  return isLoaded ? (
    <div className=" w-full h-full flex flex-col">
      <div className="mb-2">
        {currentRoute && (
          <MapRouteTabs setroute={setroute} currentRoute={currentRoute} />
        )}
      </div>
      <GoogleMap
        center={currentLocation || { lat: 8.5241, lng: 76.9366 }}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "30em" }}
        options={{
          zoomControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        }}
        onClick={() => {
          setSelectedToll(null);
          if (map && orgin && destination) {
            mapTosetBounds();
          }
        }}
        onLoad={(map) => setMap(map)}
      >
        {currentLocation && <Marker position={currentLocation} />}

        <div
          className="absolute bottom-4 right-4 bg-gray-700 p-2 rounded-full shadow-md cursor-pointer"
          onClick={
            !currentLocation
              ? handleLocateClick
              : () => map.panTo(currentLocation)
          }
          disabled={isLocating}
        >
          {isLocating ? "Locating..." : "📍"}
        </div>

        {path.length > 0 && (
          <>
            {path.length > 0 && (
              <Polyline
                path={path}
                options={{
                  strokeColor:
                    route === "fastest"
                      ? "rgba(0, 0, 255)"
                      : route === "cheapest"
                      ? "green"
                      : route === "others"
                      ? "rgba(0, 150, 255)"
                      : "",
                  strokeOpacity: 1.0,
                  strokeWeight: 5,
                }}
              />
            )}

            {path.length > 0 && mapTosetBounds()}
          </>
        )}

        {isLoaded && map && orgin && <Marker position={orgin} />}
        {isLoaded && map && destination && <Marker position={destination} />}
        {currentRoute &&
          currentRoute.tolls.map((toll, index) => (
            <Marker
              position={{
                lat: Number(toll.lat),
                lng: Number(toll.lng),
              }}
              onClick={() => {
                setSelectedToll(toll);
              }}
              key={`${toll.id + index}`}
            />
          ))}

        {selectedToll ? (
          <MarkerTooltip
            toll={selectedToll}
            onCloseClick={() => setSelectedToll(null)}
          />
        ) : null}
      </GoogleMap>
      <div className="rounded-xl mt-2">
        {currentRoute && <RouteInfo currentRoute={currentRoute} />}
      </div>
    </div>
  ) : (
    <div className="flex justify-center w-full h-[70%] items-center">
      <Spinner />
    </div>
  );
};

export default Map;
