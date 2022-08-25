import React from 'react'
import styles from './styles.module.scss'
import styled from 'styled-components'

const MainContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px;
gap: 10px;
width: 384px;
height: 185px;
background: #FFFFFF;
/* Card boarder */

border: 1px solid #DEDEFF;
/* Shadow large */

box-shadow: 0px 2px 22px 9px rgba(0, 0, 0, 0.03);
border-radius: 8px;

`



function BlogCaroselItem({title,image}) {
  return (
    <MainContainer>
       <p>
       </p>
    </MainContainer>
  )
}

export default BlogCaroselItem