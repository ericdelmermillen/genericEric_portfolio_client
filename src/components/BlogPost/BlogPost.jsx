import "./BlogPost.scss";

const BlogPost = ({ description, title, videoID }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoID}`;

  console.log(description.slice(0, 50))

  return (
    <>
      <div className="blogPost">
        <div className="blogPost__inner">
          <div className="blogPost__video">
            <iframe
              className="blogPost__iframe"
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <div className="blogPost__video-text">
              <h3 className="blogPost__video-title">
                Title: {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
