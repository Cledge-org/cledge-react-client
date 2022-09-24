import { Button } from '@mui/material';
import { useRouter } from 'next/router';

import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string;
  link: string;
  content: string;

}

const Block = styled.div`
display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  margin-right: 32px;
  gap: 10px;
  min-width: 380px;
  min-height: 183px;
  max-width: 385px;
  background: #ffffff;
  @media screen and (max-width: 450px) {
    min-width: 340px;
  }
  /* Card boarder */

  border: 1px solid #dedeff;
  /* Shadow large */
  :hover {
    cursor: pointer;
  }
  box-shadow: 0px 2px 22px 9px rgba(0, 0, 0, 0.03);
  border-radius: 8px;
h2{
  font-size: 20px;
  font-weight: 600;
}
`


function QuickAccessLinkBlock({ title, content, link }) {
  const router = useRouter();

  return (
    <Block onClick={() => { window.open(link, "_blank") }}>
      <h2>{title}</h2>
      <p>{content}</p>
    </Block>
  )
}

export default QuickAccessLinkBlock