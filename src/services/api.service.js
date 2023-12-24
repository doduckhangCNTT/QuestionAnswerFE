// baseURL: 'http://localhost:5000/api/',
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import axios from "axios";

const API_ERROR = {
  DEFAULT: "Something when wrong",
};

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // Show error
    switch (true) {
      case error.response.data.status === 400:
        Swal.fire({
          title: "Error!",
          text: error.response.data.message || API_ERROR.DEFAULT,
          icon: "error",
          confirmButtonText: "Got it!",
        });
        break;
      case error.response.data.status === 401:
        Swal.fire({
          title: "Error!",
          text: error.response.data.message || API_ERROR.DEFAULT,
          icon: "error",
          confirmButtonText: "Got it!",
        });
        break;
      case error.response.data.status === 403:
        Swal.fire({
          title: "Error!",
          text: error.response.data.message || API_ERROR.DEFAULT,
          icon: "error",
          confirmButtonText: "Got it!",
        });
        break;
      case error.response.data.status === 404:
        Swal.fire({
          title: "Error!",
          text: error.response.data.message || API_ERROR.DEFAULT,
          icon: "error",
          confirmButtonText: "Got it!",
        });
        break;
      case error.response.data.status === 409:
        Swal.fire({
          title: "Error!",
          text: error.response.data.message || API_ERROR.DEFAULT,
          icon: "error",
          confirmButtonText: "Got it!",
        });
        break;
      case error.response.data.status === 500:
        Swal.fire({
          title: "Error!",
          text: error.response.data.message || API_ERROR.DEFAULT,
          icon: "error",
          confirmButtonText: "Got it!",
        });
        break;
      default:
        Swal.fire({
          title: "Error!",
          text: API_ERROR.DEFAULT,
          icon: "error",
          confirmButtonText: "Got it!",
        });
        break;
    }
    return error.response;
  }
);

export default axiosClient;
