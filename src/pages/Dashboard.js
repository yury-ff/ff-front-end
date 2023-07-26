// import { Link } from "react-router-dom";
import styled from "styled-components";
import main from "../assets/main.svg";
import { Redirect } from "react-router-dom";
import { useGlobalContext } from "../context";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import useLocalState from "../utils/localState";

function Dashboard() {
  const { user } = useGlobalContext();
  const { name } = user;
  const [currentAccount, setCurrentAccount] = useState(null);
  const url = "https://server.forkedfinance.xyz";
  let [balance, setBalance] = useState(null);

  const getWalletAddress = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const currentAddress = await provider
        .getSigner()
        .getAddress()
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });

      setCurrentAccount(currentAddress);
    }
  };

  const updateBalance = async () => {
    try {
      const { data } = await axios.get(`${url}/api/v1/users/updateBalance`, {
        withCredentials: true,
      });
      setBalance(Math.round((data.balance / 1000000) * 100) / 100);
    } catch (error) {
      console.log(error);
    }
  };

  const chainChanged = () => {
    window.location.reload();
  };
  window.ethereum.on("chainChanged", chainChanged);
  window.ethereum.on("accountChanged", getWalletAddress);

  useEffect(() => {
    getWalletAddress();
    updateBalance();
  }, []);

  return (
    <>
      <Wrapper className="page">
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>{alert.text}</div>
        )}
        <h2>{name}</h2>
        <p>
          Your Balance: <span>{balance}</span>
          <br></br>
          Connected Wallet: <span>{currentAccount}</span>
        </p>
        <p>
          <ul>
            <li>Connect Your Wallet and Deposit USDC</li>
            <li>Pay Someone with USDC without Gas or Transaction Fees</li>
            <li>Recieve Payments in USDC to Your Account</li>
            <li> Withdraw Your USDC</li>
          </ul>
        </p>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  p span {
    padding: 0.15rem 0.25rem;
    color: var(--primary-200);
    font-size: 20px;
    background-color: var(--primary-600);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }
  input-span {
    background: var(--primary-0);
    padding: 0.15rem 0.25rem;
    color: green;

    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }
  button {
    margin: 0.15rem;
  }
`;

export default Dashboard;
