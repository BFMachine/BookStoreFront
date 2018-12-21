import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const fontColor= "#0083ca";

const Frame = styled.div`
  width: 360px;
  position: absolute;
  left: 50%;
  margin-left: -180px;
  margin-top: 24px;
  text-align: center;
  border: 1px solid $border-color;
  border-radius: 0.25rem;
  background: white;
  color: ${fontColor};
`;

function InfoPage(props) {

  return (
    <Frame>
      {props.message}
    </Frame>
  );
}

InfoPage.propTypes = {
  message: PropTypes.string.isRequired
};

export default InfoPage;
