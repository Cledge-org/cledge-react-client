import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin-right: 32px;
  gap: 10px;
  /* Card boarder */

  border: 1px solid #dedeff;
  /* Shadow large */
  :hover {
    cursor: pointer;
  }
  box-shadow: 0px 2px 22px 9px rgba(0, 0, 0, 0.03);
  border-radius: 8px;
`;
const Question = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;
const Option = styled.div`
  width: 100%;
  flex-basis: auto;
  background-color: #F7BC76;
  m  
`;

interface Props {
  question: string;
  answers?: {
    op: string;
    tag: string;
  }[];
  children?: React.ReactNode | React.ReactNode[] | undefined;
  classNames?: string;
}

function FormCarouselItem({
  question,
  answers: options,
  children = undefined,
  classNames,
}: Props) {
  const router = useRouter();
  return (
    <MainContainer
      onClick={() => {
        // router.push(`/blog/${article._slug}`);
      }}
      className={classNames}
    >
      <Question>{question}</Question>
      {options.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap:'20px' }}>
          {options.map((option) => (
            <Option>{option.op}</Option>
          ))}
        </div>
      )}
      {children}
    </MainContainer>
  );
}

// make a carousel component for a form with questions

export default FormCarouselItem;
