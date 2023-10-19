export const scrollToTop = () => {
  if ("scrollBehavior" in document.documentElement.style) {
    // Nếu trình duyệt hỗ trợ thuộc tính scrollBehavior
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    // Nếu trình duyệt không hỗ trợ thuộc tính scrollBehavior
    const scrollToTop = () => {
      const currentPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentPosition > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentPosition - currentPosition / 8);
      }
    };
    scrollToTop();
  }
};
