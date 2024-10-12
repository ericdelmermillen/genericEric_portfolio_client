import "./BlogPost.scss";

const BlogPost = ({ description, title, videoID }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoID}`;

  const desc = description.split("\n")[0];


  return (
    <>
      <div className="blogPost">
        <div className="blogPost__inner">
          <div className="blogPost__video">
            <iframe
              className="blogPost__iframe"
              src={embedUrl}
              title={title}
              allow="clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>

            <div className="blogPost__video-text">
              <h3 className="blogPost__video-title">
                <span className="blogPost__title-label">Title:</span> {title}
              </h3>

              <p className="blogPost__description">
                <span className="blogPost__description-label">Description:</span> {desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )};

export default BlogPost;
