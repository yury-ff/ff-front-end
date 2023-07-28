import React from "react";
import styled from "styled-components";
import logo from "../assets/FF-logo.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import {
  TwitterCircleFilled,
  TwitterOutlined,
  GithubFilled,
  GithubOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <Wrapper>
      <div className="nav-footer">
        <a href={"https://twitter.com/ForkedFinance_"} target="_blank">
          <TwitterOutlined style={{ fontSize: "30px", color: "#0055cb" }} />
        </a>

        <a href={"https://github.com/yury-ff"} target="_blank">
          <GithubOutlined style={{ fontSize: "30px", color: "#0055cb" }} />
        </a>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.nav`
  background: var(--balck);
  height: 3rem;
  display: flex;
  border-top-style: solid;
  border-top-color: var(--primary-100);
  align-items: center;
  justify-content: space-evenly;
  .nav-footer {
    display: flex;
    justify-content: space-between;
    min-width: 70px;
    margin: 0 auto;
    padding: 10px 0;
  }
`;

export default Footer;
