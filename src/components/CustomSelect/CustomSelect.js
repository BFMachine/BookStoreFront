import React from "react";
import PropTypes from "prop-types";
import styled, {css, keyframes} from "styled-components";

const colorLine = "#0083ca";
const borderColor = "#ddd";
const fontColor = "#337ab7";


const MainWrapper = styled.div`
    position: relative;
    user-select: none;
    width: ${props => props.width || "auto"};

    @media only screen and (max-width : 768px)  {
      width: auto;
      flex: 1 2 auto;
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
  z-index: 2;
  color: ${fontColor};
  border: 1px solid ${borderColor};
  border-left: 0;
  background-color: white;
  outline-style: none;
  text-align: center;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  
  ${props => (props.first && firstRoundBorder)}
  ${props => (props.last && lastRoundBorder)}
  
  @media only screen and (max-width : 768px)  {
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
    z-index: -1;
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


class CustomSelect extends React.Component {
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

  renderOptions = () => {
    const {options} = this.props;
    /* eslint-disable react/no-array-index-key */
    return options.map((item, i) => (
      <Option onClick={this.onClickOptioin(item.value)} key={i}>
        {item.name}
      </Option>  
    ));
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

  getName = () => {
    const {value, options} = this.props;

    if(!options || !options.length) {
      return "";
    }

    let found = options.find(item => item.value === value);
    if(!found) {
      return "";
    }
    
    return found.name;
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
        >
          <span>{this.getName()}</span>
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
            {this.renderOptions()}
          </OptionsWrapper>
        )}

      </MainWrapper>
    );
  }
}

/* eslint-disable react/require-default-props */
CustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })),
  callback: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool,
  width: PropTypes.string
};

export default CustomSelect;
