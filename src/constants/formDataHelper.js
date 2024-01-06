export const formDataHelper = (origin,
    destination,
    highwayFuel,
    typeVehicle,
    cityFuel,
    fuelPrice,
    timestamp)=>{
       return {
            from:origin ,
            to : destination,
            waypoints: [],
            serviceProvider: "gmaps",
            vehicleType: typeVehicle,
            truck: {
                truckRestrictionPenalty: "soft"
            },
            returnPath: "gmaps",
            returnFloats: true,
            departure_time: timestamp,
            fuelOptions: {
                fuelCost: {
                    value: fuelPrice,
                    currency: "INR",
                    units: "INR/liter"
                },
                fuelEfficiency: {
                    city: cityFuel,
                    hwy: highwayFuel,
                    units: "kmpl"
                }
            }
        }
}