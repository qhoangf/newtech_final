const axiosConfig = {
  baseURL: process.env.REACT_APP_BACKEND_API,
  withCredentials: true,
  credentials: "include",
  timeout: 5000,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Credentials": "true",
  },
  params: {},
};
export default axiosConfig;
