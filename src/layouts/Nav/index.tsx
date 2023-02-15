import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-bootstrap'

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  background: #FF9903!important;
  --custom-color-brand: #FF9903;

  div {
    background: #FF9903!important;
  }
  
  p, span, ul, li {
    text-decoration: none;
    color: #fff!important;
  }
`;

const Nav = () => {

  return (
    <div class="nav">
    <Wrapper>
            <ul>
              <li>Dashboard</li>
              <li>Bewerbungen</li>
              <li>Studiengänge</li>
              <li>Evulationsbögen</li>
            </ul>
      </Wrapper>
      </div>
  )
}

export default Nav