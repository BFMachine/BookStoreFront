import React from "react";
import PropTypes from "prop-types";
import styled, {css, keyframes} from "styled-components";

const colorLine = "#0083ca";
const borderColor = "#ddd";
const fontColor = "#337ab7";
const mobile_layout = "768px";

const MainWrapper = styled.div`
    position: relative;
    user-select: none;
    width: ${props => props.width || "auto"};
    
    @media only screen and (max-width : ${mobile_layout})  {
      width: auto;
      flex: 1 1 auto;
      margin-top: -1px;
      min-width: 120px;
    }
`;

const arrow_up = keyframes`
  from {
    transform: rotate(-135deg);    
    top: 5px;
  }
  to {
    transform: rotate(45deg);
    top: 2px;
  }
`;

const arrow_up_mix = css`
  animation: ${arrow_up} 100ms ease-in-out;
`;

const arrow_down = keyframes`
  from {
    transform: rotate(45deg);    
    top: 2px;
  }
  to {
    transform: rotate(-135deg);
    top: 5px;
  }
`;

const ArrowUp = styled.div`
  display: inline-block;
  width: 6px;
  min-width: 6px;
  height: 6px;
  position: relative;
  top: 5px;
  margin: 0 5px;
  border: solid ${colorLine};;
  border-width: 0 2px 2px 0;
  animation: ${arrow_down} 100ms ease-in-out;
  transform: rotate(-135deg);

`;  

const ArrowDown = styled.div`
  display: inline-block;
  width: 6px;
  min-width: 6px;
  height: 6px;
  position: relative;
  top: 2px;
  margin: 0 5px;
  border: solid ${props => (props.no_comments ? "#cccccc" : colorLine)};
  ${props => (props.animationArrow && arrow_up_mix)}
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
`;  

const firstRoundBorder = css`
  border-left: 1px solid ${borderColor};
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`;

const lastRoundBorder = css`
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const MainButton = styled.button`
  width: 100%;
  position: relative;
  color: ${fontColor};
  border: 1px solid ${borderColor};
  border-left: 0;
  background-color: white;
  outline-style: none;
  text-align: center;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;

  z-index: ${props => (props.showOptions ? 2 : 0)};
  ${props => (props.first && firstRoundBorder)}
  ${props => (props.last && lastRoundBorder)}
  
  @media only screen and (max-width : ${mobile_layout})  {
    border-left: 1px solid ${borderColor};
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  span {
    padding: 0 5px;
    display: inline-block;
    max-width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    //width: 120%;
  }

  :hover {
    background-color: ${borderColor};
  }
  :active {
    box-shadow: inset 0 1px 2px rgba(0,0,0,.3);    
  }
`;

const dropdown_menu = keyframes`
  from {
    opacity: 0;
    z-index: 0;
    transform: translateY(-26px) translateX(-50%);
  }
  to {
    opacity: 1;
    z-index: 1;
    transform: translateY(0) translateX(-50%);
  }
`;

const OptionsWrapper = styled.div`
  position: absolute;
  top: 25px;
  border: 1px solid ${borderColor};
  border-radius: 3px;
  background-color: white;
  text-align: center;
  animation: ${dropdown_menu} 200ms ease-out;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
`;

const StarsGray = styled.div`
  vertical-align: middle;
  background: 0 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,17px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,34px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,51px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,68px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23c8c8ce' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat;
  height: 14px;
  width: 82px
`;

const StarsMask = styled.div`
  background: 0 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,17px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,34px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,51px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat,68px 0 url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMid' viewBox='0 0 15 15'%3E%3Cpath class='st0' fill='%23FEC71C' d='M7.5 0l2.3 4.9 5.2.8-3.7 3.8.9 5.4-4.6-2.6L2.9 15l.9-5.4L0 5.7l5.2-.8L7.5 0z'/%3E%3C/svg%3E") no-repeat;
  height: 14px;
  width: 82px;
  width: ${props => ranking(props.rank)}
`;

function ranking (rank) {
  switch(rank) {
    case "one" : 
      return "17px";
    case "two" :
      return "34px";
    case "three" :
      return "51px";
    case "four" :
      return "67px";
    case "five" :
      return "82px";
    default:
    return 0;
  }
}

const Option = styled.div`
  padding: 6px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  
  :hover {
    background-color: ${borderColor};
  }
  :active {
    box-shadow: inset 0 1px 2px rgba(0,0,0,.3);    
  }
`;


class CustomSelectStar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showOptions: false,
      animationArrow: false,
      menuTimerIn: 0,
      menuTimerOut: 0,
      inAnimation: false
    };
  }

  onClickSelectHandler = (e) => {

    this.setState({
      animationArrow: true
    });

    if(this.state.inAnimation) {
      if(e) {
        e.preventDefault();
      }
      return;  
    }

    if(this.state.menuTimerIn) {
      clearTimeout(this.state.menuTimerIn);
    }
   
    if(this.state.menuTimerOut) {
      clearTimeout(this.state.menuTimerOut);
    }

    this.setState(prevState => {
      return {
        showOptions: !prevState.showOptions,
        menuTimerOut: 0,
        menuTimerIn: 0
      };
    });

    if(e) {
      e.preventDefault();
    }
  }

  onMouseEnterHandler = () => {

    if(this.state.menuTimerOut) {
        clearTimeout(this.state.menuTimerOut);
        this.setState({
          menuTimerOut: 0
        });
    }

    if(!this.state.menuTimerIn) { 
      this.setState({
        menuTimerIn: setTimeout(()=>{
          let self = this;
          self.setState({
            menuTimerIn: 0,
            showOptions: true
          });
        }, 400)
      });
    }
  }

  onMouseLeaveHandler = () => {

    if(this.state.menuTimerIn) {
        clearTimeout(this.state.menuTimerIn);
        this.setState({
          menuTimerIn: 0
        });
    }

    if(!this.state.menuTimerOut) { 
      this.setState({
        menuTimerOut: setTimeout(()=>{
          let self = this;
          self.setState({
            menuTimerOut: 0,
            showOptions: false
          });
        }, 400)
      });
    }
  }

  onClickOptioin = (value) => {
    return () => {
      const {callback} = this.props;
      this.onClickSelectHandler();
      callback(value);
    };
  }

  onAnimationEndHandler = () => {
    this.setState({
      inAnimation: false
    });
  }

  onAnimationStartHandler = () => {
    this.setState({
      inAnimation: true
    });
  }

  getStarsMarkup = (rank) => {
    return (
      <StarsGray>
        <StarsMask rank={rank} />  
      </StarsGray>
    );
  }

  render() {
    return (
      <MainWrapper
        onMouseLeave={this.onMouseLeaveHandler}
        onMouseEnter={this.onMouseEnterHandler}
        width={this.props.width}
      >
        <MainButton 
          first={this.props.first}
          last={this.props.last}
          onClick={this.onClickSelectHandler}
          showOptions={this.state.showOptions}
        >
          <span>
            {this.props.value === "" ? 
              "Рейтинг" :
              this.getStarsMarkup(this.props.value)
            }
          </span>
          {this.state.showOptions ? 
            <ArrowUp /> : 
            (
              <ArrowDown 
                animationArrow={this.state.animationArrow}
              />
            )
          }
        </MainButton>

        {this.state.showOptions && (
          <OptionsWrapper 
            onAnimationStart={this.onAnimationStartHandler}
            onAnimationEnd={this.onAnimationEndHandler}
          >
            <Option onClick={this.onClickOptioin("")}>
              {this.getStarsMarkup("")}
            </Option>  
            <Option onClick={this.onClickOptioin("one")}>
              {this.getStarsMarkup("one")}
            </Option>    
            <Option onClick={this.onClickOptioin("two")}>
              {this.getStarsMarkup("two")}
            </Option>    
            <Option onClick={this.onClickOptioin("three")}>
              {this.getStarsMarkup("three")}
            </Option>    
            <Option onClick={this.onClickOptioin("four")}>
              {this.getStarsMarkup("four")}
            </Option>    
            <Option onClick={this.onClickOptioin("five")}>
              {this.getStarsMarkup("five")}
            </Option>    
          </OptionsWrapper>
        )}
      </MainWrapper>
    );
  }
}

/* eslint-disable react/require-default-props */
CustomSelectStar.propTypes = {
  callback: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool,
  width: PropTypes.string
};

export default CustomSelectStar;
