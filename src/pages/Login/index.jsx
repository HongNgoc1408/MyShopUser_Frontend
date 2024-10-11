import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <>
      <section className="py-12 xl:px-20 ">
        <form className="max-w-[555px] h-auto bg-white m-auto px-14 py-10 rounded-md">
          <div className="w-full flex flex-col mx-32">
            <img src={logo} alt="" width={"50%"} />
          </div>

          <h3 className="title text-center">ACCESS YOUR ACCOUNT</h3>
          <div className="w-full flex flex-col">
            <div>
              <input
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                type="username"
                placeholder="Email Address"
                autoComplete="username"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />
            </div>
            <div className="relative">
              <span
                className="z-10 absolute top-4 right-8"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              <input
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                // type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="password"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm">Remember me</p>
            </div>
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
              Forgot Password ?
            </p>
          </div>

          <div className="w-full flex flex-col my-4">
            <button
              // onClick={handleLogin}
              // disabled={!username.length || !password.length}
              className="bg-dark-button  disabled:bg-gray-400 disabled:cursor-no-drop"
            >
              Log in
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
