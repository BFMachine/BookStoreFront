import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import config from "../../../config";

const mobile_layout = "768px";
const phone_layout = "480px";


const MainContainer = styled.div `
  height: 430px;
  widht: 300px;
  display: flex;
  justify-content: start;

  @media only screen and (max-width : ${mobile_layout})  {
    margin-right: 10px;
    height: 400px;
  }
  @media only screen and (max-width : ${phone_layout})  {
    margin-right: 10px;
    height: 370px;
  }
`;

const ToolBar = styled.div`
  width: 50px;
  min-width: 35px;
  display: flex;
  flex-direction: column;
`;

const ImgToolbarContainer = styled.div `
  height: 37px;
  cursor: pointer;
  margin-bottom: 3px;
`;

const ImgContainer = styled.div `
  height: 400px;
  margin-bottom: 16px;

  @media only screen and (max-width : ${mobile_layout})  {
    height: 370px;
  }
  @media only screen and (max-width : ${phone_layout})  {
    height: 340px;
  }
`;

const Img = styled.img`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-height: 100%;
  max-width: 100%;
  display: block;
  margin: auto;
`;

class Covers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: this.props.img_array[0].name
    };
  }
  
  onClickSmallPic = (index) => {
    this.setState({
      src: this.props.img_array[index].name
    });
  }

  render() {
    return (
      <MainContainer>
        <ToolBar>
          {this.props.img_array.map((item, index) => (
            <ImgToolbarContainer 
              key={item.id}
              onClick={()=>this.onClickSmallPic(index) /*BAD */} 
            >
              <Img 
                src={config.SERVER + item.name}
                alt="обложка"
                title="нажмите, чтобы увеличить" 
              />
            </ImgToolbarContainer>
          ))}
        </ToolBar>
        <ImgContainer>
          <Img src={config.SERVER + this.state.src} alt="Обложка книги" title={this.props.title} />
        </ImgContainer>

      </MainContainer>
    );
  }
}

/* eslint-disable react/require-default-props */
Covers.propTypes = {
  title: PropTypes.string,
  img_array: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }))
};

export default Covers;
