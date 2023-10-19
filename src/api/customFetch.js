import axios from "axios";
export default {
  host: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
    Authorization: "",
  },

  get basePath() {
    return this.host;
  },

  async get(path, params) {
    try {
      const res = await axios.get(this.basePath + path, {
        params: params,
        headers: this.headers,
      });
      return res;
    } catch (error) {
      console.error("Fetching data error:", error);
      throw error;
    }
  },
};
