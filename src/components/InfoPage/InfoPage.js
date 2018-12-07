import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

//const colorLine = "#c9d3d8"; //"#0083ca";

const Frame = styled.div`
  width: 360px;
  //height: 290px;
  position: absolute;
  //top: 50%;
  left: 50%;
  margin-left: -180px;
  //margin-top: -145px;
  margin-top: 24px;
  text-align: center;
  border: 1px solid $border-color;
  border-radius: 0.25rem;
  background: white;
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
