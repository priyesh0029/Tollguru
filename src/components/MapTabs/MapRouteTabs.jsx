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
 
 const MapRouteTabs = ()=>{
  const data = [
    {
      label: "CHEAPEST",
      value: "dashboard",
      icon: Square3Stack3DIcon,
    },
    {
      label: "FASTEST",
      value: "profile",
      icon: UserCircleIcon,
    },
    {
      label: "OTHERS",
      value: "settings",
      icon: Cog6ToothIcon,
    },
  ];
  return (
    <Tabs value="dashboard">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {/* {React.createElement(icon, { className: "w-5 h-5" })} */}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      {/* <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody> */}
    </Tabs>
  );
}

export default MapRouteTabs