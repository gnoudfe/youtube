import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  getVideoSearch,
  getDetailVideoSearch,
  getMoreVideoSearch,
} from "../api/fetchApi/getVideoSearch";
export const useSearchStore = defineStore("search", () => {
  const SearchState = reactive({
    VideoSearch: [],
    VideoDetail: [],
    searchQuery: "",
  });

  const setVideoSearch = (payload) => {
    SearchState.VideoSearch = payload;
  };
  const setVideoDetail = (payload) => {
    SearchState.VideoDetail = payload;
  };

  //   const actionGetMoreVideos = async (idAuthor, nextPage) => {
  //     try {
  //       if (state.isLoading) return;
  //       if (nextPage !== null) {
  //         state.isLoading = true;
  //         const res = await getMoreVideoAuthor(idAuthor, nextPage);
  //         state.isLoading = false;
  //         return res.data;
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  const actionGetMoreVideoSearch = async (nextpage, query) => {
    try {
      if (nextpage !== null) {
        const res = await getMoreVideoSearch(nextpage, query);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const actionGetSearchVideo = async (query) => {
    try {
      const res = await getVideoSearch(query);
      setVideoSearch(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const actionGetDetailSearchVideo = async (query) => {
    try {
      const res = await getDetailVideoSearch(query);
      setVideoDetail(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    SearchState,
    actionGetSearchVideo,
    actionGetDetailSearchVideo,
    actionGetMoreVideoSearch,
  };
});
