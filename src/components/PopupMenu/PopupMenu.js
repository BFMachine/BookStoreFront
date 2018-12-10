import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import styled from "styled-components";

const colorLine = "#0083ca";//"#c9d3d8";

const Substrate = styled.div`
  position: absolute;
  top: 35px;
  width: 130px;
  left: -39px;
  z-index: 3;
  //border: 1px dashed gray;
  //background-color: rgba(255,255,255,.8);
`;
const MainWin = styled.div`
  margin: 10px;
  padding: 0px;
  border: 1px solid ${colorLine};
  border-radius: 0.25rem;
  background-color: white;
`;
const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 5px 20px;
  text-align: center;
  
  :first-child {
    padding-top: 15px;
  }
  
  :last-child {
    padding-bottom: 15px;
  }
`;
const ArrowUp = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;

  width: 0; 
  height: 0; 
  border: 10px solid transparent;
  border-bottom-color: ${colorLine};
`;  

class PopupMenu extends React.Component {
 
  onMouseLeaveHandler = (e) => {
    this.props.mouseLeave(e);
  }

  onClickMenuItem = (e) => {
    e.stopPropagation();
    this.props.mouseLeave(e);
  }

  onClickLogoutHandler = (e) => {
    e.stopPropagation();
    this.props.mouseLeave(e);
    this.props.logoutUser();
  }

  render() {
    if(this.props.menuVisible) {
      return (
        <Substrate onMouseLeave={this.onMouseLeaveHandler}>
          <ArrowUp />
          <MainWin>
            
            <StyledLink to='/cabinet' onClick={this.onClickMenuItem}>
              Кабинет 
            </StyledLink>
            <StyledLink to='/orders' onClick={this.onClickMenuItem}>
              Заказы 
            </StyledLink>

            { !this.props.authorized && (             
              <StyledLink to='/login/new' onClick={this.onClickMenuItem}>
                Новый 
              </StyledLink>
              )
            }

            { this.props.authorized && this.props.role === "admin" && (             
              <StyledLink to='/login/new' onClick={this.onClickMenuItem}>
                Новый админ
              </StyledLink>
              )
            }

            {this.props.authorized ? 
              (
                <StyledLink to='/logout' onClick={this.onClickLogoutHandler}>
                  Выход 
                </StyledLink> 
              ) : 
              (
                <StyledLink to='/login' onClick={this.onClickMenuItem}>
                  Войти 
                </StyledLink> 
              )
            } 

          </MainWin>
        </Substrate>
      );
    } else {
      return null;
    }
  }
}

PopupMenu.propTypes = {
  authorized: PropTypes.bool.isRequired,
  mouseLeave: PropTypes.func.isRequired,
  menuVisible: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired
};

export default PopupMenu;
