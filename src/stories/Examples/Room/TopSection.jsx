import React from "react";
import styled from "styled-components";

const TopSectionContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 5%;
  background-color: #1756dd32;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0;
  z-index: 99;
`;

const Logo = styled.h1`
  margin: 0;
  color: #fff;
  font-weight: 700;
  font-size: 55px;
`;

const Slogan = styled.h4`
  margin: 0;
  color: #fff;
  font-weight: 700;
  font-size: 30px;
  margin-top: 1em;
`;

const Paragraph = styled.p`
  margin: 0;
  margin-top: 5em;
  color: #fff;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  max-width: 30%;
  text-align: start;
`;

const DonateButton = styled.button`
  outline: none;
  border: none;
  background-color: #2ee72e;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 3px;
  padding: 10px 2em;
  margin-top: 5em;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    background-color: transparent;
    border: 2px solid #2ee72e;
  }
`;

export function TopSection() {
  return (
    <TopSectionContainer>
      <Logo>开普勒4526</Logo>
      <Slogan>另外一个虚拟的地球</Slogan>
      <Paragraph>
        你可以通过捐赠帮助修复我们唯一的世界和我们心爱的地球，帮助我们让我们的世界降温，让它回到有史以来最好的座位
      </Paragraph>
      <DonateButton>捐赠!</DonateButton>
    </TopSectionContainer>
  );
}
