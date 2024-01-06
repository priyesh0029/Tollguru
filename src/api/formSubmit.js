import baseURL from "./apiInterceptor";

export const submitHandler = async(body)=>{
    console.log("submitHandler : ",body);
    try {
        const response = await baseURL.post(
          "/toll/v2/origin-destination-waypoints/",
          body
        );
    
        console.log("response first : ", response);
        if(response.data.status === 'OK'){
          return response
        }
        
      } catch (error) {
       console.log(error);
      }
}