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

  const USDCAddress = "0x0991e741f70e8B44E8771064A96BB6D350d9954E";
  const bankAddress = "0xb13a4B6EE9F895652fcEF97C4003D490Ea4d7317";

  const [currentAccount, setCurrentAccount] = useState(null);
  const [chainName, setChainName] = useState(null);
  let [balance, setBalance] = useState(null);
  const [input, setInput] = useState(undefined);
  const [inputEmail, setInputEmail] = useState(undefined);

  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  } = useLocalState();

  const getAddress = async () => {
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

  const getWalletAddress = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider
        .send("eth_requestAccounts")
        .then((tx) => {
          //do whatever you want with tx
        })
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });
      const currentAddress = await provider
        .getSigner()
        .getAddress()
        .catch((e) => {
          if (e.code === 4001) {
            console.log("Rejected");
          }
        });

      setCurrentAccount(currentAddress);
      axios.patch(
        `https://ff-server-4tm6.onrender.com/api/v1/users/updateUserWallet`,
        {
          wallet: currentAddress,
        }
      );

      const chain = await provider.getNetwork().catch((e) => {
        if (e.code === 4001) {
          console.log("Rejected");
        }
      });
      getAddress();
      setChainName(chain.name);
    }
  };

  const updateBalance = async () => {
    try {
      const { data } = await axios.get(
        "https://ff-server-4tm6.onrender.com/api/v1/users/updateBalance"
      );
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
    getAddress();
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
          Step 1: Connect Your Wallet and Deposit USDT - Tether with 0.5% Fee
          <br></br>
          Step 2: Pay Someone with Deposited USDT with 0 Fees
          <br></br>
          Step 3: Recieve Payments in USDT with 0 Fees
          <br></br>
          Step 4: Withdraw Your USDT with 0.5% Fee
        </p>

        {/* <p>
          <button onClick={transferUserBalance}>
            {""}
            Transfer <input-span>{input}</input-span> to {inputEmail}
          </button>
        </p> */}
        {/* <input
          value={input}
          onInput={(e) => setInput(e.target.value)}
          placeholder={"amount"}
        />
        <br></br>
        <input
          value={inputEmail}
          onInput={(e) => setInputEmail(e.target.value)}
          placeholder={"email"}
        /> */}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  p span {
    background: var(--primary-500);
    padding: 0.15rem 0.25rem;
    color: var(--white);
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
