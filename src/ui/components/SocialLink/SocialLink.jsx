import "./SocialLink.scss";

const SocialLink = ({ socialLink, faClasses }) => {

  return (
    <>
      <a href={socialLink} target="_blank">
        <i className={`${faClasses} fa-2x text-white`}></i>
      </a>
    </>
  )};

export default SocialLink;