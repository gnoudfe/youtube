import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  getTrendingVideos,
  getMoreTrendingVideos,
} from "../api/fetchApi/getTrending";

export const useTrendingStore = defineStore("trending", () => {
  const StateTrending = reactive({
    VideoTrendings: [],
  });

  const setVideoTrendings = (payload) => {
    StateTrending.VideoTrendings = payload;
  };

  const actionGetMoreTrendingVideos = async (videoId) => {
    try {
      const res = await getMoreTrendingVideos(videoId);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const actionGetTrendingVideos = async () => {
    try {
      const res = await getTrendingVideos();
      setVideoTrendings(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return { StateTrending, actionGetTrendingVideos,actionGetMoreTrendingVideos };
});
