import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;

  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;
const Title = styled.h1`
  margin: 1rem 0;
  padding: 0;
`;
const SubTitle = styled.h2`
  margin: 1rem 0;
  padding: 0;
  font-weight: bold;
`;
const Logo = () => {
  return (
    <Container>
      <Title>PHPM</Title>
      <SubTitle>핸드폰 판매 전문점</SubTitle>
    </Container>
  );
};

export default Logo;
