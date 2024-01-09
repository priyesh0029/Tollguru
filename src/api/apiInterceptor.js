import axios from "axios";


const baseURL = axios.create({
  baseURL: process.env.TOLLGURU_BASE_URL,
});

baseURL.interceptors.request.use(
  (config) => {
    console.log("Entered to interceptor");
      // config.headers["x-api-key"] = `tJJdp7qHJP6BqBpfD934Hp2HF4FJN4dq`
      // config.headers["x-api-key"] = `3bMT4PbMgbP82NdLm3ggLt9JHjp9mT4M`
      // config.headers["x-api-key"] = `f673qgrhRfh9BffNrBTJFjHgnDF4qL23`
      // config.headers["x-api-key"] = `Q7J98Hjf9g6jJ4RmqTpm2H3D9j3m3B8r`
      // config.headers["x-api-key"] = `9Qr4tRB4T6bNM969mPhT7JQ6663DDfM7`
      config.headers["x-api-key"] = `mDGrGF2J6mBT3D6mMpTJHP7NpNBFB43G`

    return config;
  },
  (error) => {
    console.log("Error in interceptor");
    return Promise.reject(error);
  }
);

export default baseURL;