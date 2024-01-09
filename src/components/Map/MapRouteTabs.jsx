import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import RouteInfo from "./RouteInfo";

const MapRouteTabs = ({ setroute, currentRoute }) => {
  const data = [
    {
      label: "CHEAPEST",
      value: "cheapest",
      icon: Square3Stack3DIcon,
    },
    {
      label: "FASTEST",
      value: "fastest",
      icon: UserCircleIcon,
    },
    {
      label: "OTHERS",
      value: "others",
      icon: Cog6ToothIcon,
    },
  ];

  const handleRoute = (value) => {
    setroute(() => value);
  };

  return (
    <Tabs value="dashboard">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div
              className="flex items-center gap-2"
              onClick={() => handleRoute(value)}
            >
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      
      {currentRoute && (
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              <div className="flex flex-col gap-2">
                <p className="w-full py-1 px-4 border-2 border-gray-300 rounded-xl text-black bg-blue-gray-100 h-10">
                  {currentRoute.summary.name}
                </p>
                <p className="w-full py-1 px-4 border-2 border-gray-300 rounded-xl text-black bg-blue-gray-100 h-10">
                  Petrol ₹ {Math.ceil(currentRoute.costs.fuel)},{" "}
                  {currentRoute.summary.duration.text},
                  {currentRoute.summary.distance.metric}
                </p>
                <p className="w-full py-1 px-4 border-2 border-gray-300 rounded-xl text-black bg-blue-gray-100 h-10">
                  {currentRoute.summary.diffs.cheapest === 0 &&
                  currentRoute.summary.diffs.fastest === 0
                    ? "! chepest and fastest route"
                    : currentRoute.summary.diffs.cheapest > 0 &&
                      currentRoute.summary.diffs.fastest > 0
                    ? `₹${currentRoute.summary.diffs.cheapest} rupees ${
                        value === "cheapest"
                          ? "cheaper"
                          : "more than cheapest route"
                      } and ${currentRoute.summary.diffs.fastest} ${
                        value === "fastest"
                          ? "minutes faster than the cheapest route"
                          : "minutes slower than the fastest route"
                      }`
                    : currentRoute.summary.diffs.cheapest > 0
                    ? `₹ ${currentRoute.summary.diffs.cheapest} ${
                        value === "cheapest"
                          ? "rupees cheaper than the fastest route"
                          : "rupees more than the cheapest route"
                      }`
                    : currentRoute.summary.diffs.fastest > 0
                    ? `${currentRoute.summary.diffs.fastest} ${
                        value === "fastest"
                          ? "minutes faster than the cheapest route"
                          : "minutes slower than the fastest route"
                      } `
                    : ""}
                </p>
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      )}
    </Tabs>
  );
};

export default MapRouteTabs;
