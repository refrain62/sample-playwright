import { useEffect, useState } from "react";
import React from "react";
import './ScrollTop.css';

export const ScrollTop: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  const scrollTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollEvent = () => {
      // スクロール位置が以前より上の場合はページトップボタンを表示
      // ※ただし、スクロール位置が上の方にある場合は表示しない
      if (window.scrollY < currentPosition && window.scrollY > 100) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
      // スクロール位置の情報を更新
      setCurrentPosition(window.scrollY);
    };

    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, [currentPosition]);

  return (
    <>
      <button
        className={isShow ? 'pagetop--show' : 'pagetop--hide'}
        aria-label="ページ上部に戻る"
        onClick={scrollTop}
      >Top</button>
    </>
  );
};
