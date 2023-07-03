import React from "react";
import styled from "styled-components";
import logo from "../assets/ForkedFinance.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import { ethers } from "ethers";

// import BankABI from "../assets/BankABI.json";
// import USDCABI from "../assets/USDCABI.json";

const Navbar = () => {
  const getWalletAddress = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts");
      const currentAddress = await provider
        .getSigner()
        .getAddress()
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });

      axios.patch(`/api/v1/users/updateUserWallet`, {
        wallet: currentAddress,
      });
    }
  };

  const { user, logoutUser } = useGlobalContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <Link to="/" className="home-link">
          <img src={logo} alt="ForkedFinance app" className="logo" />
        </Link>
        {/* <Link to="/transfer" className="link">
          <div className="headerItem">Transfer</div>
        </Link> */}
        {!user && (
          <div>
            <Link to="/login" className="btn">
              Sign In
            </Link>
            <Link to="/register" className="btn">
              Sign Up
            </Link>
          </div>
        )}

        {/* Wallet: <span>{currentAccount}</span> */}
        {user && (
          <div className="nav-links">
            <Link to="/transfer" className="link">
              <div className="headerItem">Transfer</div>
            </Link>
            <Link to="/deposit" className="link">
              <div className="headerItem">Deposit</div>
            </Link>
            <Link to="/withdraw" className="link">
              <div className="headerItem">Withdraw</div>
            </Link>
          </div>
        )}
        {user && (
          <div className="nav-links">
            <button
              className="btn btn-small"
              onClick={() => {
                getWalletAddress();
              }}
            >
              {" "}
              Connect{" "}
            </button>
            <button
              className="btn btn-small"
              onClick={() => {
                logoutUser();
              }}
            >
              logout
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background: var(--white);
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .nav-center-nouser {
    display: flex;

    justify-content: space-around;
  }

  .logo {
    max-height: 6rem;
  }
  .nav-links {
    display: flex;
    justify-content: space-between;
    align-items: right;
  }
  .nav-links p {
    margin: 0;
    text-transform: capitalize;
    margin-bottom: 0.25rem;
  }
  .home-link {
    display: flex;
    align-items: flex-end;
  }
  span {
    background: var(--primary-500);
    padding: 0.1rem 0.2rem;
    color: var(--white);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }

  @media (min-width: 776px) {
    .nav-links {
      flex-direction: row;
      align-items: center;
    }
    .nav-links p {
      margin: 0;
      margin-right: 0rem;
    }
  }
`;

export default Navbar;
