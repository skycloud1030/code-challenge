import AbortController from "./abortController.js";
import AuthService from "./authService.js";
import router from "../routes/index.js";
import _ from "lodash";
import json_data from "../assert/data/data.json";

export default class API {
  constructor() {
    this.Auth = new AuthService();
  }
  getAttendance = () => {
    if (window.location.protocol === "file:") {
      return Promise.resolve(json_data);
    }
    return this.RESTfulCall(`./data/data.json`);
  };
  RESTfulCall = (url, options) => {
    const fet = AbortController(
      this.Auth.fetch(`${url}`, options)
        .then((data) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(data);
            }, 100);
          });
        })
        .catch((e) => {
          if (e.code === 403) {
            router.push("/logout");
          }
          return Promise.reject(e);
        })
    );
    return fet;
  };
}
