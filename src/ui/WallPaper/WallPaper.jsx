import { useEffect, useState } from "react";
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

// Function to get a random icon
const getRandomIcon = () => {
  const randomIdx = Math.floor(Math.random() * iconOptions.length);
  if (prevRandomIdx === randomIdx) {
    return getRandomIcon(); // Prevents repeating the same icon
  } else {
    prevRandomIdx = randomIdx;
    return iconOptions[randomIdx];
  }
};

const WallPaperRow = ({ className }) => {
  const [itemsPerRow] = useState(5);

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

const numberOfRows = 10;

const WallPaper = () => {
  const [rerenderTrigger, setRerenderTrigger] = useState(0); 

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
};

export default WallPaper;
