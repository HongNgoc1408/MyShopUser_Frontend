import React, { useState, useEffect } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // Xử lý khi cuộn trang
  const toggleVisibility = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    setIsVisible(scrollTop > 300); // Hiện nút khi cuộn quá 300px
    setIsAtTop(scrollTop + clientHeight < scrollHeight); // Kiểm tra nếu chưa ở cuối trang
  };

  // Cuộn lên đầu hoặc xuống cuối trang
  const handleScroll = () => {
    if (isAtTop) {
      window.scrollTo({
        top: document.documentElement.scrollHeight, // Xuống cuối trang
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0, // Lên đầu trang
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // // Xử lý khi cuộn trang
  // const toggleVisibility = () => {
  //   if (window.scrollY > 300) {
  //     setIsVisible(true);
  //   } else {
  //     setIsVisible(false);
  //   }
  // };

  // // Cuộn lên đầu trang
  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth", // Cuộn mượt
  //   });
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", toggleVisibility);
  //   return () => {
  //     window.removeEventListener("scroll", toggleVisibility);
  //   };
  // }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={handleScroll}
          className="fixed z-50 bottom-5 right-24 bg-blue-500 text-white border-none rounded-full cursor-pointer"
          style={{
            width: "60px",
            height: "60px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isAtTop ? (
            <AiOutlineArrowDown className="mx-auto w-6 h-6" /> // Biểu tượng xuống
          ) : (
            <AiOutlineArrowUp className="mx-auto w-6 h-6" /> // Biểu tượng lên
          )}
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
