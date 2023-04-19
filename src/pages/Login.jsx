import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  //*helps in fetching data from store
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center',
      }}
      className="h-screen w-screen flex items-center justify-center bg-cover "
    >
      <div className="p-[20px] w-3/4 sm:w-1/4 bg-white ">
        <h1 className="text-[24px] font-light ">SIGN IN</h1>
        <form className="flex flex-col">
          <input
            type="text"
            className="flex-1 min-w-2/5 my-[10px] p-[10px] outline-none
          border"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            placeholder="password"
            type="password"
            className="flex-1 min-w-2/5 my-[10px] p-[10px] outline-none
          border "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            onClick={handleClick}
            disabled={isFetching}
            className="w-2/5 py-[15px] px-[20px] mb-[10px] bg-[teal] text-white cursor-pointer
            disabled:text-green-600 disabled:cursor-not-allowed "
          >
            LOGIN
          </button>
          {error && (
            <span className="text-red-500 ">Something Went Wrong...</span>
          )}
          <Link className="my-[5px] text-[12px] underline cursor-pointer ">
            DO NOT REMEMBER THE PASSWORD?
          </Link>
          <Link>
            <a
              href="/register"
              className="my-[5px] text-[12px] underline cursor-pointer "
            >
              CREATE A NEW ACCOUNT
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
