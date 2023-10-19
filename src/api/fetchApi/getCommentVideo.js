import fetch from "../customFetch";

export const getDetailVideosComments = (idVideo) => {
  return fetch.get(`/comments/${idVideo}`);
};

export const getDetailVideosReplyComments=  (idVideo, nextPage) =>  {
    return fetch.get(`/nextpage/comments/${idVideo}?nextpage=${nextPage}`)
}
