import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  getDetailVideos,
  getPlaylistVideo,
} from "../api/fetchApi/getDetailVideo";
import {
  getDetailVideosComments,
  getDetailVideosReplyComments,
} from "../api/fetchApi/getCommentVideo";
export const useDetailVideoStore = defineStore("detailVideo", () => {
  const state = reactive({
    isDetailVideos: [],
    VideoComments: [],
    ReplyComments: [],
    currentTime: null,
    isChapters: 0,
    PlayList: [],
  });
  // mutation

  const setDetailVideos = (payload) => {
    state.isDetailVideos = payload;
  };
  const setDetailVideosComments = (payload) => {
    state.VideoComments = payload;
  };
  const setDetailReplyComments = (payload) => {
    state.ReplyComments = payload;
  };
  const setPlaylistVideos = (payload) => {
    state.PlayList = payload;
  };

  // action

  const actionGetPlaylistVideos = async (list) => {
    try {
      const res = await getPlaylistVideo(list);
      setPlaylistVideos(res.data);
      return res;
    } catch (err) {
      console.log(err);
    }
  };




  const actionGetMoreComments = async (idVideo, nextpage) => {
    try {
      if (nextpage === null) return;
      const res = await getDetailVideosReplyComments(idVideo, nextpage);
      state.VideoComments.comments.push(...res.data?.comments);
      state.VideoComments.nextpage = res.data.nextpage;
    } catch (err) {
      console.log(err);
    }
  };

  const actionGetNextComment = async (idVideo, nextPage) => {
    try {
      if (nextPage === null) return;
      const res = await getDetailVideosReplyComments(idVideo, nextPage);
      state.ReplyComments.comments.push(...res.data?.comments);
      state.ReplyComments.nextpage = res.data.nextpage;
    } catch (e) {
      console.log("fetch data error at get next comment");
      return e.data;
    }
  };

  // get reply comments
  const actionGetDetailReplyComments = async (idVideo, nextPage) => {
    try {
      if (nextPage === null) return;
      const res = await getDetailVideosReplyComments(idVideo, nextPage);
      setDetailReplyComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // get video comments
  const actionGetDetailVideoComment = async (idVideo) => {
    try {
      const res = await getDetailVideosComments(idVideo);
      setDetailVideosComments(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // get video details
  const actionGetDetailVideo = async (idVideo) => {
    try {
      const res = await getDetailVideos(idVideo);
      setDetailVideos(res.data);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    state,
    actionGetDetailVideo,
    actionGetDetailVideoComment,
    actionGetDetailReplyComments,
    actionGetNextComment,
    actionGetMoreComments,
    actionGetPlaylistVideos,
  };
});
