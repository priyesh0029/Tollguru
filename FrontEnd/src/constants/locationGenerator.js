export const locationDetailsGenerator = (place)=>{
    return {
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        meta: {
          uri: `${place.address_components[0].long_name},${
            place.address_components[place.address_components.length - 2]
              .short_name
          }`,
          city: place.address_components[0].long_name,
          state:
            place.address_components[place.address_components.length - 2]
              .short_name,
          country: "IND",
        },
      }
}