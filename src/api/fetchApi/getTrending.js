import fetch from '../customFetch'

export const getTrendingVideos = () => {
    return fetch.get(`/trending?region=VN`);
}




export const getMoreTrendingVideos = (idVideo) => {
    return fetch.get(`/streams/${idVideo}`)
}

