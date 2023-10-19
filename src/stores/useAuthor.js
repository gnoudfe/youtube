import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  getDetailAuthorInfor,
  getMoreVideoAuthor,
  getTabsData,
} from "../api/fetchApi/getAuthor";
export const useAuthorStore = defineStore("author", () => {
  const state = reactive({
    AuthorInfor: [],
    Tabs: [],
    isLoading: false,
    initAuthor: false,
  });

  const setAuthorInfor = (payload) => {
    state.AuthorInfor = payload;
  };
  const setAuthorData = (payload) => {
    state.Tabs = payload;
  };

  const actionGetTabVideos = async (data) => {
    try {
      const res = await getTabsData(data);
      setAuthorData(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const actionGetMoreVideos = async (idAuthor, nextPage) => {
    try {
      if (state.isLoading) return;
      if (nextPage !== null) {
        state.isLoading = true;
        const res = await getMoreVideoAuthor(idAuthor, nextPage);
        state.isLoading = false;
        return res.data;
      } 
    } catch (err) {
      console.log(err);
    }
  };

  const actionGetAuthorInfor = async (idAuthor) => {
    try {
      const res = await getDetailAuthorInfor(idAuthor);
      setAuthorInfor(res.data);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    state,
    actionGetAuthorInfor,
    actionGetMoreVideos,
    actionGetTabVideos,
  };
});
