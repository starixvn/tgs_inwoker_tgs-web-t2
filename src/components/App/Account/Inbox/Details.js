import React from "react";

import styled from "styled-components";
import CustomTextField from "../../../Share/TextField";
import CustomButton from "../../../Share/Button";

const Container = styled.div``;
const Content = styled.div`
  float: left;
  background-color: #fff;
  border: solid 1px rgb(182, 182, 182);
  margin: 10px 0 0 0;
  width: 350px;
  border-radius: 3px;
  padding: 10px;
  height: 210px;
  overflow-y: scroll;
  word-break: break-all;
`;
function Details(props) {
  return (
    <Container>
      <CustomTextField
        value={props.inbox.title}
        maxLength={30}
        readOnly={true}
        bold={true}
      ></CustomTextField>
      <CustomTextField
        value={props.inbox.create_time}
        readOnly={true}
      ></CustomTextField>
      <Content
        dangerouslySetInnerHTML={{
          __html: props.inbox.content
        }}
      ></Content>

      <CustomButton
        width={175}
        marginTop={10}
        name="确定"
        handleClick={props.onhandleClickConfirm}
      ></CustomButton>
      <CustomButton
        width={175}
        marginTop={10}
        name="删除"
        grayMode={true}
        handleClick={() => props.onhandleClickDelete(props.inbox.id)}
      ></CustomButton>
    </Container>
  );
}

export default Details;
