import React from "react";
import PropTypes from "prop-types";
import {injectIntl} from "react-intl";

function JxIntl(props) {
  const {
    intl: {formatMessage},
    id,
    data
  } = props;
  return <>{formatMessage(data[id])}</>;
}

JxIntl.propTypes = {
  id: PropTypes.string,
  data: PropTypes.any
};

export default injectIntl(JxIntl);
