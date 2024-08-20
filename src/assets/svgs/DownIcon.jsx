const DownIcon = ({ 
  className,
  height = "24px",
  width = "24px",
  strokeWidth = "12"
}) => {
  return (
    <>
      <svg 
        viewBox="0 0 83.396 44.812"
        className={className}
        height={height}
        width={width}
      >
        <path 
          d="M1530.436,80.478l39.486,38.427-39.486,41.453" 
          transform="translate(162.082 -1528.625) rotate(90)" 
          fill="none" 
          strokeLinecap="round" 
          strokeWidth={strokeWidth}
        />
      </svg>
    </>
  )};

export default DownIcon;
