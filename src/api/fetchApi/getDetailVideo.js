import fetch from "../customFetch";

export const getDetailVideos = (idVideo) => {
  return fetch.get(`/streams/${idVideo}`);
};

export const getPlaylistVideo = (list) => {
  return fetch.get(`/playlists/${list}`)
}