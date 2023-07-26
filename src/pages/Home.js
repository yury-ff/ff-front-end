import { Link } from "react-router-dom";
import styled from "styled-components";
// import main from "../assets/eth.svg";
import { Redirect } from "react-router-dom";
import { useGlobalContext } from "../context";
function Home() {
  const { user } = useGlobalContext();
  return (
    <>
      {user && <Redirect to="/dashboard" />}
      <Wrapper className="page">
        <div className="info">
          <h2>
            <span>Web3</span>
            Banking
          </h2>
          <p>
            Sign Up
            <br></br>
            Connect Your Wallet and Deposit USDC
            <br></br>
            Pay Someone with USDC without Gas or Transaction Fees
            <br></br>
            Recieve Payments in USDC to Your Account
            <br></br>
            Withdraw Your USDC
          </p>

          {/* <Link to="/login" className="btn">
            Sign In
          </Link>
          <Link to="/register" className="btn">
            Sign Up
          </Link> */}
        </div>
        {/* <img src={main} alt="job hunt" className="img main-img" /> */}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  h2 {
    font-weight: 700;
  }
  h2 span {
    color: var(--primary-200);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 6rem;
    align-items: center;
    .main-img {
      
      display: block;
     
  }
  .btn {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
`;

export default Home;
