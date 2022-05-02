import React from "react";
import PropTypes from "prop-types";

const JxDomText = ({ className, content = "" }) => {
  // content = content.replace(/\n|\r/g, "<br/>");
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  );
};

JxDomText.defaultProps = {
  className: "",
  content: ""
};

JxDomText.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string
};

export default JxDomText;
