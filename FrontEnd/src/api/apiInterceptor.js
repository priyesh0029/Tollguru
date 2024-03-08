import axios from "axios";


const baseURL = axios.create({
  baseURL: process.env.TOLLGURU_BASE_URL,
});

baseURL.interceptors.request.use(
  (config) => {
    console.log("Entered to interceptor");
      config.headers["x-api-key"] = `nDRd7b9MT7PQ69bNBFJL4PJttHMHHm66`

    return config;
  },
  (error) => {
    console.log("Error in interceptor");
    return Promise.reject(error);
  }
);

export default baseURL;