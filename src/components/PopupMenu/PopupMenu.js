import React from "react";
//import { connect } from "react-redux";
import styled from "styled-components";


const MainWin = styled.div`
    position: absolute;
    top: 45px;
    padding: 5px;
    border: 1px solid gray;
    background-color: white;
`;

const MenuItem = styled.div`
    padding: 5px;
`;


class PopupMenu extends React.Component {
  constructor(props){
    super(props);
    console.log("");
  }

  onMouseLeaveHandler = (e) => {
    this.props.menuVisibleOff();
  }

  render() {
    if(this.props.menuVisible) {
      return (
        <MainWin onMouseLeave={this.onMouseLeaveHandler}>
          <MenuItem>menuItem1</MenuItem> 
          <MenuItem>menuItem1</MenuItem>
          <MenuItem>menuItem1</MenuItem>
          <MenuItem>menuItem1</MenuItem>
        </MainWin>
      );
    } else {
      return null;
    }
  }
}

export default PopupMenu;
