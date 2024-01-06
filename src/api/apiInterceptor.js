import axios from "axios";


const baseURL = axios.create({
  baseURL: process.env.TOLLGURU_BASE_URL,
});

baseURL.interceptors.request.use(
  (config) => {
    console.log("Entered to interceptor");
      config.headers["x-api-key"] = `tJJdp7qHJP6BqBpfD934Hp2HF4FJN4dq`

    return config;
  },
  (error) => {
    console.log("Error in interceptor");
    return Promise.reject(error);
  }
);

export default baseURL;