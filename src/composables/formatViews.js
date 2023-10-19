export const formatViews = (value) => {
  if (value === undefined || value === null) {
    return "N/A"; // Or any other default value you prefer
  }
  
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1) + " G";
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + " Tr";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + " N";
  } else {
    return value.toString();
  }
};