import { useEffect, useState, memo } from "react";
import { BsCpuFill, BsHddNetworkFill } from "react-icons/bs";
import { FaCode, FaRegObjectUngroup } from "react-icons/fa6";
import { FaDatabase, FaServer } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { LiaMicrochipSolid } from "react-icons/lia";
import { LuBinary } from "react-icons/lu";
import { MdUsb } from "react-icons/md";
import { PiNetworkFill } from "react-icons/pi";
import { VscGitMerge } from "react-icons/vsc";
import "./WallPaper.scss";

const iconOptions = [
  FaCode, 
  PiNetworkFill,
  BsHddNetworkFill,
  VscGitMerge, 
  BsCpuFill,
  FaDatabase,
  FaServer,
  MdUsb,
  LuBinary,
  FaRegObjectUngroup,
  GrTechnology,
  LiaMicrochipSolid
];

let prevRandomIdx;

const getRandomIcon = () => {
  const randomIdx = Math.floor(Math.random() * iconOptions.length);
  if (prevRandomIdx === randomIdx) {
    return getRandomIcon();
  } else {
    prevRandomIdx = randomIdx;
    return iconOptions[randomIdx];
  }
};

const WallPaperRow = ({ className }) => {
  const windowWidth = window.innerWidth;
  const itemsPerRow = windowWidth < 320 
    ? 4
    : windowWidth <= 400
    ? 5
    : windowWidth <= 500
    ? 6
    : windowWidth <= 600
    ? 7
    : windowWidth <= 700
    ? 8
    : windowWidth <= 800
    ? 9
    : windowWidth <= 900
    ? 10
    : windowWidth <= 1000
    ? 11
    : 12;


  return (
    <div className={className}>
      {Array.from({ length: itemsPerRow }).map((_, idx) => {
        const RandomIcon = getRandomIcon();

        return (
          <div key={idx} className={`wallpaper__item ${idx + 1 === 8 ? "x" : ""}`}>
            <RandomIcon className="wallpaper__icon" />
          </div>
        );
      })}
    </div>
  );
};


const WallPaper = memo (() => {
  const [ rerenderTrigger, setRerenderTrigger ] = useState(0); 

  const numberOfRows = 15;

  useEffect(() => {
    const interval = setInterval(() => {
      setRerenderTrigger((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wallpaper">

      <div className="wallpaper__inner">
        {Array.from({ length: numberOfRows }).map((_, idx) => (
          <WallPaperRow
            key={idx}
            className={(idx + 1) % 2 === 0
              ? "wallpaper__row wallpaper__row--even"
              : "wallpaper__row wallpaper__row--odd"
            }
          />
        ))}
      </div>
    </div>
  );
});

export default WallPaper;