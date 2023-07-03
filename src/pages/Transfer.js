import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import useLocalState from "../utils/localState";

import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
  WalletTwoTone,
} from "@ant-design/icons";

// const updateBalance = async () => {
//   try {
//     const { data } = await axios.get("/api/v1/users/updateBalance");
//     setBalance(data.balance);
//   } catch (error) {
//     console.log(error);
//   }
// };

const validate = (
  <>
    <div className="validation"> Failed </div>
  </>
);

const Transfer = () => {
  let [transferTo, setTransferTo] = useState(null);
  const [transferAmount, setTransferAmount] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);

  const [userTo, setUserTo] = useState(null);

  let [balance, setBalance] = useState(null);

  const updateBalance = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/updateBalance");
      setBalance(Math.round((data.balance / 1000000) * 100) / 100);
    } catch (error) {
      console.log(error);
    }
  };
  const findUser = { credentials: transferTo };

  const transferUserBalance = async (e) => {
    e.preventDefault();
    setLoading(true);
    hideAlert();
    if (!transferAmount) {
      showAlert({
        text: "Please provide value",
      });
      setLoading(false);
      return;
    }
    if (!transferTo) {
      showAlert({
        text: "Please provide email",
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.patch(`/api/v1/users/transferUserBalance`, {
        email: transferTo,
        value: parseInt(transferAmount),
      });

      showAlert({ text: data.msg, type: "success" });
      setSuccess(true);
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setSuccess(true);
    }
    updateBalance();
    setLoading(false);
    setIsAlertVisible(true);
  };

  const validateUser = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    setSuccess(false);
    setIsResultVisible(false);

    try {
      const { data } = await axios.post(
        `/api/v1/users/validateUserTo`,
        findUser
      );
      console.log(data);

      setEmail(data.email);
      setName(data.name);
      setWallet(data.wallet);
      setUserTo("Email: " + data.email + " Name: " + data.name);
      showAlert({
        text: `Validating...`,
        type: "success",
      });
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
    setIsAlertVisible(true);
  };

  const setting = () => {
    return (
      <>
        <div>{balance} USDT</div>
      </>
    );
  };

  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  } = useLocalState();

  // const validateUserTo = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   hideAlert();
  //   if (!transferTo) {
  //     showAlert({
  //       text: "Please provide Email, Name or Wallet",
  //     });
  //     setLoading(false);
  //     return;
  //   }
  //   try {
  //     const { data } = await axios.get("/api/v1/users/validateUserTo", {
  //       value: transferTo,
  //     });
  //     setData(data);

  //     showAlert({ text: data.msg, type: "success" });
  //     setSuccess(true);
  //   } catch (error) {
  //     showAlert({
  //       text: "Something went wrong, please try again",
  //     });
  //     setSuccess(true);
  //   }
  //   // updateBalance();
  //   setLoading(false);
  // };

  function changeAmount(e) {
    setTransferAmount(e.target.value);
  }
  function changeCredentials(e) {
    setTransferTo(String(e.target.value));
  }

  useEffect(() => {
    updateBalance();
  }, []);

  setTimeout(() => {
    setIsAlertVisible(false);
    setIsResultVisible(true);
  }, 7000);

  return (
    <Wrapper>
      {isAlertVisible && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {isResultVisible && <div> {userTo}</div>}

      {/* {loading && hideAlert()} */}
      <div className="tradeBox">
        <div className="tradeBoxHeader">
          <h4>Pay Someone</h4>
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
            placeholder="to Name, Email, Wallet"
            value={transferTo}
            type="text"
            onChange={changeCredentials}
            //   disabled={!prices}
          />
          <Input
            placeholder="Amount"
            type="number"
            value={transferAmount}
            onChange={changeAmount}
          />
        </div>

        <div className="buttons">
          {/* <Popover
            content={userTo}
            title="Details matching..."
            // trigger=
            placement="bottom"
            arrow=""
          > */}
          <div
            type="button"
            className="validateButton"
            onClick={validateUser}
            //   disabled={!transferTo || !transferAmount}
          >
            Validate
          </div>
          {/* </Popover> */}
          <div
            type="button"
            className="swapButton"
            onClick={transferUserBalance}

            //   disabled={!transferTo || !transferAmount}
          >
            Transfer
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-flow: column wrap;
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
    align-self: center;
    justify-content: flex-end;
    flex-direction: column;
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
    position: relative;
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

export default Transfer;
