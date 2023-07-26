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
            <ul>
              <li>Sign Up</li>
              <li>Connect Your Wallet and Deposit USDC</li>
              <li>Pay Someone with USDC without Gas or Transaction Fees</li>
              <li>Recieve Payments in USDC to Your Account</li>
              <li> Withdraw Your USDC</li>
            </ul>
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
  li::marker {
    color: var(--primary-200);
    content: '◍';
  }
  li {
    padding-left: 12px;
    cursor: pointer;
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
