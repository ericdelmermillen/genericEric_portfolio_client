import "./SocialLink.scss";

const SocialLink = ({ socialLink, faClasses }) => {

  return (
    <>
      <a href={socialLink} target="_blank">
        <i className={`${faClasses}`}></i>
      </a>
    </>
  )};

export default SocialLink;