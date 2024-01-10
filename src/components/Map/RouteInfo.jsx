import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Tolls", "Fuel", "Total"];

const RouteInfo = ({ currentRoute }) => {
  return (
    <Card className="h-full w-full">
      <table className="w-full table-auto text-center ">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-200 p-2"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr key={currentRoute.costs.tag}>
            <td className="p-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {currentRoute.costs.tag === 0
                  ? "No Tolls"
                  : "₹" + Math.ceil(currentRoute.costs.tag)}
              </Typography>
            </td>
            <td>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                ₹ {Math.ceil(currentRoute.costs.fuel)}
              </Typography>
            </td>
            <td>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                ₹ {currentRoute.costs.tag !== 0
                  ? Math.ceil(currentRoute.costs.tag + currentRoute.costs.fuel)
                  : Math.ceil(currentRoute.costs.fuel)}
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default RouteInfo;
