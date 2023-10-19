export const formatDate = (dateTimeString) => {
  // Chuyển chuỗi thời gian thành đối tượng Date
  const dateTime = new Date(dateTimeString);

  // Lấy thời gian hiện tại
  const now = new Date();

  // Tính số miligiây khác biệt giữa hai thời điểm
  const timeDiff = now - dateTime;

  // Tính số ngày, tháng và năm
  const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(daysAgo / 365);

  // Xử lý kết quả dựa vào số ngày, tháng và năm
  if (daysAgo < 1) {
    return "Vừa xong";
  } else if (daysAgo === 1) {
    return "Hôm nay";
  } else if (daysAgo === 1) {
    return "Hôm qua";
  } else if (daysAgo < 30) {
    return `${daysAgo} ngày trước`;
  } else if (monthsAgo === 1) {
    return "1 tháng trước";
  } else if (monthsAgo < 12) {
    return `${monthsAgo} tháng trước`;
  } else if (yearsAgo === 1) {
    return "1 năm trước";
  } else {
    return `${yearsAgo} năm trước`;
  }
};

export const convertRelativeTimeToVietnamese = (relativeTime) => {
  const conversionMap = {
    Streamed: "",
    "minutes ago": "phút trước",
    "minute ago": "phút trước",
    "hours ago": "giờ trước",
    "hour ago": "giờ trước",
    "day ago": "ngày trước",
    "week ago": "tuần trước",
    "month ago": "tháng trước",
    "year ago": "năm trước",
    "days ago": "ngày trước",
    "weeks ago": "tuần trước",
    "months ago": "tháng trước",
    "years ago": "năm trước",
  };

  const result = relativeTime.replace(
    /(Streamed|minutes ago|minute ago|hours ago|hour ago|day ago|week ago|month ago|year ago|days ago|weeks ago|months ago|years ago)/g,
    (match) => conversionMap[match]
  );
  return result;
};
