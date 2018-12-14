import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const font = "12px/14px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif";

const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin-bottom: 10px;
`;

const CommentAuthorInput = styled.input`
  width: 17%;
  color: #256aa3;
  line-height: 19px;
  overflow-wrap: break-word;
  height: 1.5rem;
  border: none;
  font: ${font}
`;

const CommentContentInput = styled.textarea`
  margin-left: 30px;
  display: block;
  flex-grow: 1;
  color: #256aa3;
  line-height: 19px;
  overflow-wrap: break-word;
  padding: 0;
  box-sizing: border-box;
  font: ${font}
`;

const CommentButton = styled.button`
  width: 100px;
  border: 1px solid #0083ca;
  border-radius: .25rem;
  padding: 0;
  background-color: #0083ca;
  color: white;
  margin-right: 30px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  
  :hover {
    background-color: #256aa3;
  }
`;  


class InputComments extends React.Component {

  onSubmitHandler = (e) => {
    this.props.send_comment({
      commenter: e.target["name"].value === "" ? this.props.user_name : e.target["name"].value,
      content: e.target["content"].value
    });
    e.preventDefault();
  }

  render() {
    return (
      <FormContainer onSubmit={this.onSubmitHandler}>
        <CommentAuthorInput
          type="text"
          placeholder={this.props.user_name}
          name="name" 
        />
        <CommentContentInput
          type="text"
          placeholder="введите свой комментарий"
          name="content" 
        />
        <CommentButton 
          type="submit"
        >
          Отправить
        </CommentButton>

      </FormContainer>
    );
  }
}

/* eslint-disable react/require-default-props */
InputComments.propTypes = {
  user_name: PropTypes.string, 
  send_comment: PropTypes.func.isRequired
};

export default InputComments;
