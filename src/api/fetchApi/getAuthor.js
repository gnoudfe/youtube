import fetch from "../customFetch";

export const getDetailAuthorInfor = (idAuthor) => {
  return fetch.get(`/channel/${idAuthor}`);
};

export const getMoreVideoAuthor = (idAuthor, nextPage) => {
  const queryString = new URLSearchParams(nextPage)
    .toString()
    .split("&")
    .join("%26");

  return fetch.get(
    `/nextpage/channel/${idAuthor}?nextpage=${queryString}
    `
  );
};

export const getTabsData = (data) => {
  return fetch.get(`/channels/tabs?data=${data}`);
};
