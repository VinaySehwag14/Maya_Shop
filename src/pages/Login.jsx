import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  //*helps in fetching data from store
  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  // console.log(currentUser, "this is currentUser");

  if (currentUser) {
    navigate("/login");
    return null;
  }

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
          <Link to="/register">
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
