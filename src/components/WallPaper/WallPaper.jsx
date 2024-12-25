import { useEffect, useState, memo } from "react";
import { useAppContext } from "../../contexts/AppContext";
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
  LiaMicrochipSolid,
];


const getRandomIconsForRow = (itemsPerRow) => {
  return Array.from({ length: itemsPerRow }, () => {
    const randomIdx = Math.floor(Math.random() * iconOptions.length);
    return iconOptions[randomIdx];
  });
};


const WallPaperRow = ({ className, colorMode, rowIcons }) => {

  return (
    <div className={className}>
      {rowIcons.map((IconComponent, idx) => (
        <div
          key={idx}
          className={`wallpaper__item ${
            idx + 1 === 8 
              ? "x" 
              : ""} 
            ${colorMode === "light" 
                ? "light" 
                : "dark"}`
          }
        >
          <IconComponent className="wallpaper__icon" />
        </div>
      ))}
    </div>
  )};


const WallPaper = memo(() => {
  const [ iconsMatrix, setIconsMatrix ] = useState([]);
  const { colorMode } = useAppContext();

  const itemsPerRow = (() => {
    const windowWidth = window.innerWidth;
    return windowWidth < 320
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
  })();

  const numberOfRows = 15;

  const generateIconsMatrix = () =>
    Array.from({ length: numberOfRows }, () =>
      getRandomIconsForRow(itemsPerRow)
    );


  // useEffect to generate initialize icons matrix
  useEffect(() => {
    setIconsMatrix(generateIconsMatrix());

    const interval = setInterval(() => {
      setIconsMatrix(generateIconsMatrix());
    }, 1000);

    return () => clearInterval(interval);
  }, [itemsPerRow]);


  return (
    <div className="wallpaper">
      <div className="wallpaper__inner">
        {iconsMatrix.map((rowIcons, idx) => (
          <WallPaperRow
            key={idx}
            className={
              (idx + 1) % 2 === 0
                ? "wallpaper__row wallpaper__row--even"
                : "wallpaper__row wallpaper__row--odd"
            }
            itemsPerRow={itemsPerRow}
            colorMode={colorMode}
            rowIcons={rowIcons}
          />
        ))}
      </div>
    </div>
  );
});

export default WallPaper;