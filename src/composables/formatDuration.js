export const formatDuration = (duration) => {
  const durationInSeconds = parseInt(duration, 10);
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  let formattedDuration = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  if (hours !== 0) {
    formattedDuration = `${hours}:${formattedDuration}`;
  }
  return formattedDuration;
};
