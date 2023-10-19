import fetch from "../customFetch";

export const getVideoSearch = (query) => {
  return fetch.get(`/opensearch/suggestions?query=${query}`);
};

export const getDetailVideoSearch = (query) => {
  return fetch.get(`/search?q=${query}&filter=all`);
};

export const getMoreVideoSearch = (nextpage,query) => {
  const queryString = new URLSearchParams(nextpage)
    .toString()
    .split("&")
    .join("%26");

  return fetch.get(`/nextpage/search/?nextpage=${queryString}&filter=all&q=${query}`);
};
