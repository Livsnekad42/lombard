import axios from "axios";
import { mainUrl } from "../../_config";
import router from "@/router";

const _axios = axios.create({
  baseURL: mainUrl
});

_axios.interceptors.response.use((resp) => {
    if ( !!resp && !!resp.err ) {
      if ( resp.code === 1 ) {
        localStorage.removeItem('user');
        // router.push({ path: "/sign-in-admin" });
        location.pathname = "/sign-in-admin";
        return Promise.resolve();
      }
    }
    return resp;
  }, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('user');
    // router.push({ path: "/sign-in-admin" });
    location.pathname = "/sign-in-admin";
  }
  return Promise.reject(error.response);
});

export default _axios;
