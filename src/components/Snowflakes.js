/* eslint-disable no-unused-vars */
import React from "react";
import styled, {keyframes} from "styled-components"; 
 
// 스타일
const Container = styled.div`
   color:white;
   overflow:hidden;
   background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
   min-height: 100vh;
   width: 100vw;
 
//    overflow-x:hidden;

`;
 
export const Snowflakes = ({ children, ...props }) => {
   return (
       <Container {...props}>
           {children}
       </Container>
   )
}
 