import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Input, Popover } from "antd";
import { WalletTwoTone } from "@ant-design/icons";

import axios from "axios";
import { ethers } from "ethers";
import BankABI from "../assets/BankABI.json";
import USDCABI from "../assets/USDCABI.json";
import useLocalState from "../utils/localState";

const USDCAddress = "0x55d030B2A681605b7a1E32d8D924EE124e9D01b7";
const bankAddress = "0xb58AB2cdC285B31bb9CD2440DEe6faaa5E98336b";

const Deposit = () => {
  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  } = useLocalState();

  const [currentAccount, setCurrentAccount] = useState(null);
  let [balance, setBalance] = useState(null);
  const [transferAmount, setTransferAmount] = useState(null);

  function changeAmount(e) {
    setTransferAmount(e.target.value);
  }

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

  const setting = () => {
    return (
      <>
        <div>{balance} USDT</div>
      </>
    );
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
    }
  };

  const approveUSDC = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const bankContract = new ethers.Contract(bankAddress, BankABI, signer);
    const tokenContract = new ethers.Contract(USDCAddress, USDCABI, signer);
    await tokenContract
      .approve(bankAddress, 1000000000000)
      .then((tx) => {
        //do whatever you want with tx
      })
      .catch((e) => {
        if (e.code === 4001) {
          console.log("Rejected");
        }
      });

    // const unlimitedTokens = Math.pow(2, 255);
  };

  const deposit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(bankAddress, BankABI, signer);
    const currentAddress = await provider.getSigner().getAddress();

    await contract
      .depositUSDC(transferAmount * 10 ** 6)
      .then((tx) => {
        //do whatever you want with tx
      })
      .catch((e) => {
        if (e.code === 4001) {
          console.log("Rejected");
        }
      });
  };

  const chainChanged = () => {
    window.location.reload();
  };
  window.ethereum.on("chainChanged", chainChanged);
  window.ethereum.on("accountChanged", getWalletAddress);

  useEffect(() => {
    updateBalance();
  }, []);
  return (
    <Wrapper>
      <div className="tradeBox">
        <div className="tradeBoxHeader">
          <h4>USDT - Tether. In...</h4>
          <Popover
            content={setting}
            title="Balance"
            trigger="click"
            placement="bottom"
          >
            <WalletTwoTone twoToneColor="#504acc" className="cog" />
          </Popover>
        </div>
        <div className="inputs">
          <Input
            placeholder="Amount"
            type="number"
            value={transferAmount}
            onChange={changeAmount}
          />
        </div>

        {!currentAccount && (
          <div className="buttons">
            <div
              type="button"
              className="swapButton"
              onClick={getWalletAddress}
            >
              Connect Wallet
            </div>
          </div>
        )}
        {currentAccount && (
          <div className="buttons">
            <div type="button" className="validateButton" onClick={approveUSDC}>
              Approve
            </div>
            <div type="button" className="swapButton" onClick={deposit}>
              Deposit
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 5rem;

  .tradeBox {
    width: 400px;
    background-color: var(--primary-300);
    border: 2px solid #21273a;
    min-height: 300px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 30px;
    padding-right: 30px;
  }
  .tradeBoxHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 98%;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .validation {
    color: red;
  }

  .inputs {
    display: flex;
    width: 100%;
  }
  input {
    hover: black;
    border-radius: 4px;
    padding: 12px 20px;
    margin: 6px 0;
  }
  input:focus {
    border: 3px solid #555;
  }

  h1 {
    font-size: 9rem;
  }
`;

export default Deposit;
